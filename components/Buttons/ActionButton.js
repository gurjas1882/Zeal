import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

/**
 * ActionCreator component renders a touchable action button, primary used in the home screen
 * @param {string} title - Title text displayed on the button
 * @param {Function} action - Function to execute when the button is pressed
 * @param {string} underText - A brief description of the buttons purpose
 * @param {string} color - Background color of the button
 * @returns {JSX.Element} ActionCreator component
 */
const ActionCreator = ({ title, action, underText, color }) => {
	// Render the button
	return (
		<TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={action}>
			<View style={styles.content}>
				<Text style={styles.containerText}>{title}</Text>
				<Text style={styles.underText}>{underText}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		height: 90,
		padding: 20,
		marginTop: 20,
		justifyContent: "center",
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	content: {
		flexDirection: "column",
	},
	containerText: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
		fontFamily: "Sora-SemiBold",
	},
	underText: {
		fontSize: 13,
		color: "white",
		fontFamily: "Sora-Light",
		paddingTop: 2,
	},
});

export default ActionCreator;
