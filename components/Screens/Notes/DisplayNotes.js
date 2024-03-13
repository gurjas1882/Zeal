import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DisplayNotes = () => {
	const [annotatedData, setAnnotatedData] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigation = useNavigation();

	useEffect(() => {
		retrieveAllAnnotatedData()
			.then((data) => {
				if (data.length > 0) {
					setAnnotatedData(data);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving data:", error);
				setLoading(false);
			});
	}, []);

	const retrieveAllAnnotatedData = async () => {
		try {
			const directory = FileSystem.documentDirectory;
			const files = await FileSystem.readDirectoryAsync(directory);
			const annotatedDataFiles = files.filter((file) => file.startsWith("annotated_data_"));

			const allAnnotatedData = [];

			for (const file of annotatedDataFiles) {
				const fileContent = await FileSystem.readAsStringAsync(directory + file);
				const parsedData = JSON.parse(fileContent);
				const annotatedImages = parsedData.images.map((image, index) => ({
					text: parsedData.ocrResults[index],
					image: `data:image/jpeg;base64,${image}`,
					// Include any other relevant data for each image
					// Example: fileName: file
				}));
				allAnnotatedData.push(annotatedImages);
			}

			return allAnnotatedData;
		} catch (error) {
			console.error("Error retrieving data:", error);
			throw new Error("An error occurred while retrieving data");
		}
	};

	const handleImagePress = (item) => {
		navigation.navigate("KnowledgeTesting", { annotatedData: item });
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text style={styles.loadingText}>Retrieving Notes</Text>
				</View>
			) : (
				annotatedData.map((item, index) => (
					<TouchableOpacity key={index} onPress={() => handleImagePress(item)}>
						<View style={styles.noteContainer}>
							{/* You may include text here if needed */}
							{/* <Text style={styles.noteText}>{item.text}</Text> */}
							<Image source={{ uri: item[0].image }} style={styles.noteImage} />
						</View>
					</TouchableOpacity>
				))
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
	},
	noteContainer: {
		marginVertical: 20,
		paddingHorizontal: 20,
	},
	noteText: {
		fontSize: 16,
		marginBottom: 10,
	},
	noteImage: {
		width: 150,
		height: 150,
	},
});

export default DisplayNotes;
