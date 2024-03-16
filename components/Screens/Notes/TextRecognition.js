import { Inter_400Regular, Inter_900Black, Inter_800ExtraBold, Inter_700Bold, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator } from "react-native";
import { PlusSvg } from "../../../assets/icons/icons";

const TextRecognition = () => {
	const [imageUris, setImageUris] = useState([]);
	const [ocrResults, setOcrResults] = useState([]);
	const [name, setName] = useState("");
	const [analyzing, setAnalyzing] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission Required", "Please grant access to your camera roll.", [{ text: "OK" }]);
			}
		})();
	}, []);

	useFonts({
		Inter_800ExtraBold,
		Inter_700Bold,
		Inter_600SemiBold,
		Inter_900Black,
		Inter_400Regular,
	});

	const pickImage = async () => {
		let images = [];

		while (true) {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [16, 9],
				quality: 1,
			});

			if (result.canceled) {
				break;
			}

			images.push(result.assets[0].uri);
		}

		if (images.length > 0) {
			setImageUris(images);
		}
	};

	const takePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUris((prevUris) => [...prevUris, result.assets[0].uri]);
			const takeAnother = await askForAnotherPhoto();
			if (takeAnother) {
				takePhoto();
			}
		}
	};

	const askForAnotherPhoto = async () => {
		return new Promise((resolve) => {
			Alert.alert(
				"Take Another Photo?",
				"Do you want to take another photo?",
				[
					{ text: "No", onPress: () => resolve(false), style: "cancel" },
					{ text: "Yes", onPress: () => resolve(true) },
				],
				{ cancelable: false }
			);
		});
	};

	const analyzeImages = async () => {
		const results = [];
		const base64Images = [];

		if (imageUris.length === 0) {
			Alert.alert("Upload images");
			return;
		}

		setAnalyzing(true);
		navigation.canGoBack(false);

		for (const uri of imageUris) {
			const { result, base64Image } = await analyzeImage(uri);
			results.push(result);
			base64Images.push(base64Image);
		}

		saveAnnotatedData(base64Images, results);
		setOcrResults(results);
		navigation.goBack();
	};

	const analyzeImage = async (uri) => {
		try {
			const imageBase64 = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.Base64,
			});

			const apiKey = "AIzaSyA9g-1bw2e2UvQLXv7hZhR5d7akJjLYoFQ";
			const apiEndpoint = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

			const requestData = {
				requests: [
					{
						image: {
							content: imageBase64,
						},
						features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
					},
				],
			};

			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const data = await response.json();

			const fullTextAnnotation = data.responses[0].fullTextAnnotation;
			return { result: fullTextAnnotation ? fullTextAnnotation.text : "No text detected", base64Image: imageBase64 };
		} catch (error) {
			console.error("Error analyzing the image:", error);
			return { result: "Error analyzing the image: " + error.message, base64Image: "" };
		}
	};

	const saveAnnotatedData = async (base64Images, annotatedData) => {
		try {
			const directory = FileSystem.documentDirectory;
			const fileName = `annotated_data_${new Date().getTime()}.json`; // Unique file name

			const dataToSave = { images: base64Images, ocrResults: annotatedData };

			await FileSystem.writeAsStringAsync(directory + fileName, JSON.stringify(dataToSave));
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const retrieveAllAnnotatedData = async () => {
		try {
			const directory = FileSystem.documentDirectory;
			const files = await FileSystem.readDirectoryAsync(directory);
			const annotatedDataFiles = files.filter((file) => file.startsWith("annotated_data_"));

			const allAnnotatedData = [];

			for (const file of annotatedDataFiles) {
				const fileContent = await FileSystem.readAsStringAsync(directory + file);
				const parsedData = JSON.parse(fileContent);
				const images = parsedData.images.map((base64) => `data:image/jpeg;base64,${base64}`);
				const ocrResults = parsedData.ocrResults;
				allAnnotatedData.push({ images, ocrResults });
			}

			return allAnnotatedData;
		} catch (error) {
			console.error("Error retrieving data:", error);
			throw new Error("An error occurred while retrieving data");
		}
	};

	const resetSavedData = async () => {
		try {
			const directory = FileSystem.documentDirectory;
			const files = await FileSystem.readDirectoryAsync(directory);

			for (const file of files) {
				if (file.startsWith("annotated_data_")) {
					await FileSystem.deleteAsync(directory + file);
				}
			}

			Alert.alert("Data Reset", "All saved data has been reset successfully");
		} catch (error) {
			console.error("Error resetting data:", error);
			Alert.alert("Error", "An error occurred while resetting data");
		}
	};

	const navigation = useNavigation();

	const handleCancel = () => {
		navigation.goBack();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<View style={styles.topContainer}>
					{!analyzing && (
						<TouchableOpacity onPress={handleCancel} style={styles.button}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
					)}

					<Text style={styles.centeredText}>Create</Text>
				</View>

				<View style={styles.statusContainer}>
					<View style={styles.uploadContainer}>
						<View style={[styles.uploadUpperTextContainer, { backgroundColor: analyzing ? "#F8F9FE" : "#006FFD" }]}>
							<Text style={[styles.uploadUpperText, { color: analyzing ? "#8F9098" : "white" }]}>1</Text>
						</View>
						<Text style={[styles.uploadUnderText, { color: analyzing ? "#8F9098" : "#1F2024" }]}>Upload</Text>
					</View>
					<View style={styles.analyzeContainer}>
						<View style={[styles.analyzeUpperTextContainer, { backgroundColor: analyzing ? "#006FFD" : "#F8F9FE" }]}>
							<Text style={[styles.analyzeUpperText, { color: analyzing ? "white" : "#8F9098" }]}>2</Text>
						</View>
						<Text style={[styles.analyzeUnderText, { color: analyzing ? "#1F2024" : "#8F9098" }]}>Analyze</Text>
					</View>
				</View>
				{analyzing ? (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<Text style={styles.analyzeImagesHeaderText}>Analyzing Images</Text>
						<Text style={styles.analyzeImagesUnderText}>Stand By...</Text>
						<ActivityIndicator size="large" color="blue" style={{ marginTop: 25 }} />
					</View>
				) : (
					<View style={{ flex: 1 }}>
						<View style={styles.informationContainer}>
							<Text style={styles.informationHeaderText}>let's create a new note!</Text>
							<Text style={styles.informationUnderText}>Let's get started with some basic information.</Text>
						</View>
						<View style={styles.nameContainer}>
							<Text style={styles.nameText}>Name</Text>
							<TextInput value={name} onChangeText={setName} style={styles.textInput} placeholder="Type Here..." />
						</View>
						<View style={styles.imageContainer}>
							<Text style={styles.imageText}>Upload Images</Text>
							<ScrollView horizontal={true}>
								<View style={styles.imageWrapper}>
									{imageUris.map((uri, index) => (
										<Image key={index} source={{ uri: uri }} style={{ height: 150, width: 120, marginRight: 10, borderRadius: 14 }} resizeMode="cover" />
									))}
									<TouchableOpacity
										style={styles.createImage}
										onPress={() => {
											Alert.alert(
												"Upload Image",
												"Alert Message",
												[
													{ text: "Take Photo", onPress: takePhoto },
													{ text: "Pick Images", onPress: pickImage },
													{ text: "Cancel", style: "cancel" },
												],
												{ cancelable: false }
											);
										}}
									>
										<PlusSvg color={"#006FFD"} />
									</TouchableOpacity>
								</View>
							</ScrollView>
						</View>
						<TouchableOpacity onPress={analyzeImages} style={styles.continueButton}>
							<Text style={styles.continueText}>Continue</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	analyzeImagesHeaderText: {
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
		fontSize: 30,
		marginBottom: 10,
	},
	analyzeImagesUnderText: {
		fontFamily: "Inter_400Regular",
		color: "#71727A",
		fontSize: 20,
	},
	continueButton: {
		backgroundColor: "#006FFD",
		width: "88%",
		position: "absolute",
		bottom: 0,
		left: "6%",
		padding: 15,
		borderRadius: 12,
	},
	continueText: {
		textAlign: "center",
		color: "white",
		fontFamily: "Inter_600SemiBold",
	},
	imageContainer: {
		justifyContent: "center",
		width: "88%",
		marginLeft: "6%",
		borderRadius: 18,
	},
	imageText: {
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
		marginBottom: 10,
	},
	createImage: {
		height: 150,
		width: 120,
		backgroundColor: "#EAF2FF",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 14,
	},
	imageWrapper: {
		flexDirection: "row",
	},
	nameContainer: {
		justifyContent: "center",
		height: 100,
		width: "88%",
		marginLeft: "6%",
		borderRadius: 18,
	},
	nameText: {
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#C5C6CC",
		borderRadius: 12,
		width: "90%",
		paddingHorizontal: 15,
		paddingVertical: 15,
		marginTop: 5,
		fontFamily: "Inter_400Regular",
		color: "#8F9098",
	},
	informationContainer: {
		justifyContent: "center",
		height: 100,
		width: "88%",
		marginLeft: "6%",
		borderRadius: 18,
	},
	informationHeaderText: {
		fontFamily: "Inter_900Black",
		fontSize: 18,
		color: "#1F2024",
		marginBottom: 10,
	},
	informationUnderText: {
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		color: "#71727A",
	},
	statusContainer: {
		backgroundColor: "#F8F9FE",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: 100,
		width: "88%",
		marginLeft: "6%",
		borderRadius: 18,
	},
	uploadContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
	},
	uploadUpperText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
	},
	uploadUpperTextContainer: {
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		marginBottom: 10,
	},
	uploadUnderText: {
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
	},
	analyzeContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
	},
	analyzeUpperText: {
		color: "#8F9098",
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
	},
	analyzeUpperTextContainer: {
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F8F9FE",
		borderRadius: 100,
		marginBottom: 10,
	},
	analyzeUnderText: {
		fontFamily: "Inter_700Bold",
		color: "#8F9098",
	},
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
	image: {
		width: 150,
		height: 150,
		margin: 5,
	},
	resultsContainer: {
		marginBottom: 20,
	},
	resultText: {
		marginBottom: 10,
		fontSize: 16,
	},
});

export default TextRecognition;
