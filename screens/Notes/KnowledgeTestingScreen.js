import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const KnowledgeTestingScreen = ({ route }) => {
	const { annotatedData } = route.params;
	const [randomQuestion, setRandomQuestion] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isRecording, setIsRecording] = useState(false);
	const [transcription, setTranscription] = useState("");
	const [grading, setGrading] = useState("");
	const [feedback, setFeedback] = useState("");
	const [recording, setRecording] = useState(null);
	const [recordingUri, setRecordingUri] = useState(null);
	const [sound, setSound] = useState(null);

	async function generateQuestions(schoolNoteText) {
		try {
			const apiEndpoint = "https://api.openai.com/v1/chat/completions";
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer `,
			};

			const requestBody = {
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: "Produce questions for students using the notes that are provided to you.",
					},
					{
						role: "user",
						content: schoolNoteText,
					},
				],
				temperature: 0.7,
				max_tokens: 1000,
				top_p: 1,
			};

			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
			}

			const responseData = await response.json();
			const generatedQuestions = responseData.choices[0].message.content.trim();
			const questionsArray = generatedQuestions.split(/\d+\./).filter(Boolean);
			const randomIndex = Math.floor(Math.random() * questionsArray.length);
			setRandomQuestion(questionsArray[randomIndex]);
		} catch (error) {
			console.error("Error generating questions:", error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		const getPermission = async () => {
			try {
				const { status } = await Audio.requestPermissionsAsync();
				if (status !== "granted") {
					Alert.alert("Permission Denied", "You need to grant audio recording permission to use this feature.");
				}
			} catch (error) {
				console.error("Error requesting audio recording permission:", error);
			}
		};
		getPermission();
		const allText = annotatedData.map((item) => item.text).join(" ");
		generateQuestions(allText);
	}, []);

	const startRecording = async () => {
		try {
			setIsRecording(true);
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			const newRecording = new Audio.Recording();
			await newRecording.prepareToRecordAsync({
				ios: {
					extension: ".wav",
					audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
					sampleRate: 16000,
					numberOfChannels: 1,
					bitRate: 128000,
					linearPCMBitDepth: 16,
					linearPCMIsBigEndian: false,
					linearPCMIsFloat: false,
				},
				android: {
					extension: ".m4a",
					outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
					audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
					sampleRate: 16000,
					numberOfChannels: 1,
					bitRate: 128000,
				},
			});
			await newRecording.startAsync();
			setRecording(newRecording);
		} catch (error) {
			console.error("Error starting recording:", error);
			Alert.alert("Error", "Couldn't start recording.");
		}
	};

	const stopRecording = async () => {
		try {
			setIsRecording(false);
			if (recording) {
				await recording.stopAndUnloadAsync();
				const uri = await recording.getURI();
				setRecordingUri(uri);

				const base64String = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
				await loadAudio(base64String);

				const request = {
					config: {
						encoding: "LINEAR16",
						sampleRateHertz: 16000,
						languageCode: "en-US",
					},
					audio: {
						content: base64String,
					},
				};

				const speechResponse = await fetch("https://speech.googleapis.com/v1/speech:recognize?key=", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				});

				if (!speechResponse.ok) {
					const errorMessage = await speechResponse.text();
					throw new Error(`Speech API response was not ok: ${errorMessage}`);
				}

				const data = await speechResponse.json();
				if (data.results && data.results.length > 0) {
					setTranscription(data.results[0].alternatives[0].transcript);
					try {
						const apiEndpoint = "https://api.openai.com/v1/chat/completions";
						const headers = {
							"Content-Type": "application/json",
							Authorization: `Bearer `,
						};
						console.log(`Question: ${randomQuestion}\n\nAnswer: ${data.results[0].alternatives[0].transcript}`);

						const requestBody = {
							model: "gpt-3.5-turbo",
							messages: [
								{
									role: "system",
									content: "Provide a grading out of 100 of how well the provided question was answered with provided answer.",
								},
								{
									role: "user",
									content: `Question: ${randomQuestion}\n\nAnswer: ${data.results[0].alternatives[0].transcript}`,
								},
							],
							temperature: 0.7,
							max_tokens: 1000,
							top_p: 1,
						};

						const response = await fetch(apiEndpoint, {
							method: "POST",
							headers: headers,
							body: JSON.stringify(requestBody),
						});

						if (!response.ok) {
							throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
						}

						const responseData = await response.json();
						const answer = responseData.choices[0].message.content.trim();
						console.log(answer);

						const gradeRegex = /Grade:\s*(.+?)(?=\s*Feedback:|$)/;
						const [_, grade] = answer.match(gradeRegex) || [, null];
						const feedback = answer.replace(gradeRegex, "").trim();

						setGrading(grade);
						setFeedback(feedback);
					} catch (error) {
						console.error("Error generating questions:", error);
					}
				} else {
					setTranscription("No transcription available");
				}
			}
		} catch (error) {
			console.error("Error in stopRecording:", error);
			Alert.alert("Error", "An error occurred. Please try again.");
		}
	};

	const loadAudio = async (base64String) => {
		try {
			const { sound: newSound } = await Audio.Sound.createAsync({ uri: `data:audio/wav;base64,${base64String}` }, { shouldPlay: false });
			setSound(newSound);
		} catch (error) {
			console.error("Error loading audio:", error);
		}
	};

	const playAudio = async () => {
		try {
			if (sound) {
				await sound.playAsync();
			}
		} catch (error) {
			console.error("Error playing audio:", error);
		}
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={styles.loadingText}>Generating Questions</Text>
				</View>
			) : (
				<>
					<Text style={styles.question}>{randomQuestion}</Text>
					<TouchableWithoutFeedback onPress={isRecording ? stopRecording : startRecording}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={playAudio}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Replay Audio</Text>
						</View>
					</TouchableWithoutFeedback>
					<Text style={styles.transcription}>{transcription}</Text>
					<Text style={styles.grading}>{grading}</Text>
					<Text style={styles.feedback}>{feedback}</Text>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		fontSize: 18,
		marginTop: 10,
	},
	question: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	transcription: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 20,
	},
	grading: {
		// Style for grading text
	},
	feedback: {
		// Style for feedback text
	},
});

export default KnowledgeTestingScreen;
