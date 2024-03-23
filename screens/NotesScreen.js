import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AllButton from "./Notes/AllButton"; // Check the path
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import DisplayNotes from "../components/Screens/Notes/DisplayNotes"; // Check the path
import { ImageSvg } from "../assets/icons/icons"; // Import the ImageSvg component
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotesScreen = () => {
	const navigation = useNavigation(); // Initialize navigation hook

	const [showAllNotes, setShowAllNotes] = useState(true);
	const [notes, setNotes] = useState([]); // State to store notes

	useEffect(() => {
		const retrieveNotes = async () => {
			try {
				const storedNotes = await AsyncStorage.getItem("notes");
				const notesArray = storedNotes ? JSON.parse(storedNotes) : [];
				setNotes(notesArray);
			} catch (error) {
				console.error("Error retrieving notes:", error);
			}
		};

		retrieveNotes();
	}, []);

	const handleButtonClick = (index) => {
		setShowAllNotes(index === 0);
	};

	const navigateToCreateNote = () => {
		navigation.navigate("NoteCreateMenu"); // Navigate to CreateNoteScreen
	};

	return (
		<View style={styles.container}>
			{/* Render the "Notes" title */}
			<Text style={styles.title}>Notes</Text>

			{/* Render the buttons container */}
			<View style={styles.buttonContainer}>
				{/* Render the "Note" button */}
				<TouchableOpacity onPress={() => handleButtonClick(0)} style={[styles.button, showAllNotes ? styles.buttonClicked : styles.buttonUnclicked]}>
					<Text style={styles.buttonText}>All</Text>
				</TouchableOpacity>

				{/* Render the "Favorite" button */}
				<TouchableOpacity onPress={() => handleButtonClick(1)} style={[styles.button, !showAllNotes ? styles.buttonClicked : styles.buttonUnclicked]}>
					<Text style={styles.buttonText}>Favorite</Text>
				</TouchableOpacity>
			</View>

			{/* Render AllButton component if showAllNotes is true */}
			{showAllNotes ? (
				<View style={styles.centerContainer}>
					{notes.length === 0 ? (
						<View>
							<Text style={styles.nothingText1}>Nothing here. For now.</Text>
							<Text style={styles.nothingText2}>This is where you'll find your notes</Text>
						</View>
					) : (
						<ScrollView style={{ flex: 1 }}>
							<DisplayNotes annotatedData={notes} />
						</ScrollView>
					)}
					<AllButton onPress={navigateToCreateNote} />
				</View>
			) : (
				<ScrollView style={{ flex: 1 }}>
					<DisplayNotes annotatedData={notes} />
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 20,
		backgroundColor: "white", // Set background color to white
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center", // Align text to the center
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
		backgroundColor: "#F1F1F1",
		padding: 5,
		borderRadius: 10, // Round the edges of the button container
	},
	button: {
		flex: 1, // Make the button take up equal space
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10, // Round the edges of the button
	},
	buttonClicked: {
		backgroundColor: "white", // Change background color when clicked
	},
	buttonUnclicked: {
		backgroundColor: "#F1F1F1", // Change background color when not clicked
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	nothingText1: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	nothingText2: {
		fontSize: 16,
		textAlign: "center",
		color: "grey",
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		alignItems: "center",
		backgroundColor: "#F1F1F1",
		borderRadius: 12,
		height: 40,
		justifyContent: "center",
		width: 40,
	},
});

export default NotesScreen;
