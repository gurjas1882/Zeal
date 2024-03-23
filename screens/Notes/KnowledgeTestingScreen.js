import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import OPENAI_KEY, { GOOGLE_CLOUD_KEY } from "../../config";
import { Circle, Defs, G, Rect, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const KnowledgeTestingScreen = ({ route }) => {
	const { annotatedData } = route.params;
	const [randomQuestion, setRandomQuestion] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [transcription, setTranscription] = useState("");
	const [grading, setGrading] = useState("");
	const [feedback, setFeedback] = useState("");
	const [recording, setRecording] = useState(null);
	const [recordingUri, setRecordingUri] = useState(null);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [timeThinking, setTimeThinking] = useState(0);
	const [timeRecording, setTimeRecording] = useState(0);
	const [note, setNote] = useState("");

	const navigation = useNavigation();

	async function generateQuestions(schoolNoteText) {
		try {
			const apiEndpoint = "https://api.openai.com/v1/chat/completions";
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_KEY}`,
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
		setNote(allText);
	}, []);

	useEffect(() => {
		// Start the timer as soon as the component mounts
		const timer = setInterval(() => {
			setTimeElapsed((prevTime) => prevTime + 1);
		}, 1000);

		// Cleanup function to clear the timer on component unmount
		return () => clearInterval(timer);
	}, []);

	const startRecording = async () => {
		try {
			setIsRecording(true);
			setTimeThinking(timeElapsed);
			setTimeElapsed(0);
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
			setTimeRecording(timeElapsed);
			setIsRecording(false);
			setIsAnalyzing(true);
			if (recording) {
				await recording.stopAndUnloadAsync();
				const uri = await recording.getURI();
				setRecordingUri(uri);

				const base64String = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });

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

				const speechResponse = await fetch("https://speech.googleapis.com/v1/speech:recognize?key=" + GOOGLE_CLOUD_KEY, {
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
							Authorization: `Bearer ${OPENAI_KEY}`,
						};
						console.log(`Question: ${randomQuestion}\n\nAnswer: ${data.results[0].alternatives[0].transcript}`);

						const requestBody = {
							model: "gpt-3.5-turbo",
							messages: [
								{
									role: "system",
									content:
										"Provide a grading out of 100 of how well the provided question was answered with provided answer. Use this format to display the grading: \n\nGrade: 'Grade Here' \n\nFeedback: 'Feedback Here' ",
								},
								{
									role: "user",
									content: `Question: ${randomQuestion}\n\nAnswer: ${data.results[0].alternatives[0].transcript}\n\n Use this note to conduct your grade: ${note}`,
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
						const answer = responseData.choices[0].message.content.trim().split("\n"); // Split by newline characters
						console.log(answer);

						let grade, feedback;

						answer.forEach((line) => {
							const [key, value] = line.split(":").map((part) => part.trim());
							if (key === "Grade") grade = value;
							if (key === "Feedback") feedback = value;
						});

						setGrading(grade);
						setFeedback(feedback);
						navigation.navigate("GradeScreen", { grading: grade, feedback: feedback, thinkingTime: timeThinking, recordingTime: timeRecording });
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

	const handleCancel = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={styles.loadingText}>Generating Questions</Text>
				</View>
			) : (
				<>
					{isAnalyzing ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color="blue" />
							<Text style={styles.loadingText}>Analyzing Data</Text>
						</View>
					) : (
						<>
							<View style={styles.topContainer}>
								<TouchableOpacity onPress={handleCancel} style={styles.button}>
									<Text style={styles.buttonText}>Cancel</Text>
								</TouchableOpacity>

								<Text style={styles.centeredText}>Questions</Text>
							</View>
							<View style={styles.submissionGuidelines}>
								<Text style={styles.submissionGuidelinesHeader}>Submission Guidelines</Text>
								<Text style={styles.submissionGuidelinesText}>
									Ensure your responses are complete, as grades are assigned based on clarity, accuracy, and detail. There are no time constraints on recordings, but a timer is available if you wish
									to impose your own limits.
								</Text>
							</View>
							<View style={styles.questionContainer}>
								<Text style={styles.questionHeader}>Question</Text>
								<Text style={styles.question}>{randomQuestion}</Text>
							</View>
							<View style={styles.statusContainer}>
								<Text style={styles.statusHeader}>{isRecording ? "Recording" : "Thinking"}</Text>
								<Text style={styles.timeElapsed}>
									{Math.floor(timeElapsed / 60)}:{timeElapsed % 60 < 10 ? "0" : ""}
									{timeElapsed % 60}
								</Text>
							</View>

							<TouchableWithoutFeedback onPress={isRecording ? stopRecording : startRecording}>
								<View style={styles.record}>
									{isRecording ? (
										<Svg xmlns="http://www.w3.org/2000/svg" width={78} height={78} fill="none">
											<G filter="url(#a)">
												<Circle cx={39} cy={35} r={33.5} fill="#fff" stroke="#FF5B5B" strokeWidth={3} />
												<Rect width={20} height={20} x={29} y={25} fill="#FF5B5B" rx={4} />
											</G>
											<Defs></Defs>
										</Svg>
									) : (
										<Svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} fill="none">
											<Circle cx={35} cy={35} r={35} fill="#FF5B5B" />
										</Svg>
									)}
								</View>
							</TouchableWithoutFeedback>
						</>
					)}
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 25,
	},
	button: {
		position: "absolute",
		left: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "rgb(0, 122, 255)",
		fontSize: 16,
	},
	centeredText: {
		fontSize: 16,
		fontFamily: "Inter_800ExtraBold",
		fontWeight: "bold",
	},
	container: {
		flex: 1,
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
	submissionGuidelines: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	submissionGuidelinesHeader: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		color: "#1F2024",
		marginTop: 20,
		fontFamily: "Inter_900Black",
	},
	submissionGuidelinesText: {
		fontSize: 12,
		fontWeight: "light",
		textAlign: "center",
		color: "#71727A",
		width: "90%",
		marginBottom: 20,
		fontFamily: "Inter_400Regular",
	},
	questionContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	questionHeader: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		color: "#1F2024",
		fontFamily: "Inter_900Black",
	},
	question: {
		fontSize: 16,
		fontWeight: "light",
		textAlign: "center",
		color: "#71727A",
		fontFamily: "Inter_400Regular",
		width: "50%",
	},
	record: {
		justifyContent: "center",
		alignItems: "center",
	},
	transcription: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 20,
	},
	statusContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 60,
		marginTop: 40,
	},
	statusHeader: {
		fontSize: 16,
		fontWeight: "light",
		textAlign: "center",
		marginBottom: 5,
		color: "#1F2024",
		fontFamily: "Inter_400Regular",
	},
	timeElapsed: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		letterSpacing: 1,
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
	},
	grading: {
		// Style for grading text
	},
	feedback: {
		// Style for feedback text
	},
});

export default KnowledgeTestingScreen;
