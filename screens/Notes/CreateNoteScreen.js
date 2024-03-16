import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TextRecognition from "../../components/Screens/Notes/TextRecognition";

const CreateNoteScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<TextRecognition />
		</SafeAreaView>
	);
};

export default CreateNoteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
