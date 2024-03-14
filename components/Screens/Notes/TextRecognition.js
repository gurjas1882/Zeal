import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import styles from './TextRecognition.module.css'; 

const TextRecognition = () => {
	const [imageUris, setImageUris] = useState([]);
	const [ocrResults, setOcrResults] = useState([]);

	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission Required", "Please grant access to your camera roll.", [{ text: "OK" }]);
			}
		})();
	}, []);

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

		for (const uri of imageUris) {
			const { result, base64Image } = await analyzeImage(uri);
			results.push(result);
			base64Images.push(base64Image);
		}

		saveAnnotatedData(base64Images, results); // Save annotated data
		setOcrResults(results);
	};

	const analyzeImage = async (uri) => {
		try {
			const imageBase64 = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.Base64,
			});

			const apiKey = "";
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

			Alert.alert("Data Saved", "Annotated data saved successfully");
		} catch (error) {
			console.error("Error saving data:", error);
			Alert.alert("Error", "An error occurred while saving data");
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

	return (
		<ScrollView style={styles.container}>
			<Button title="Pick Images" onPress={pickImage} style={styles.button} />
			<Button title="Take Photo" onPress={takePhoto} style={styles.button} />
			<Button title="Continue" onPress={analyzeImages} style={styles.button} />
			<Button title="Reset Saved Data" onPress={resetSavedData} style={styles.button} />

			<View style={styles.imageContainer}>
				{imageUris.map((uri, index) => (
					<Image key={index} source={{ uri: uri }} style={styles.image} />
				))}
			</View>
			<View style={styles.resultsContainer}>
				{ocrResults.map((result, index) => (
					<Text key={index} style={styles.resultText}>
						{result}
					</Text>
				))}
			</View>
		</ScrollView>
	);
};

export default TextRecognition;
