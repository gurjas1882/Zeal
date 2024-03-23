import { Montserrat_400Regular_Italic, Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDisplay = () => {
	return (
		<SafeAreaView style={styles.container}>
			<FontAwesome name="user-circle-o" size={125} color="white" />
			<Text style={styles.userText}>user-19388745238</Text>
			<Text style={styles.creationText}>Account Created March 9th, 2024</Text>
		</SafeAreaView>
	);
};

export default UserDisplay;

const styles = StyleSheet.create({
	container: {
		height: "65%",
		backgroundColor: "#256FE5",
		justifyContent: "center",
		alignItems: "center",
	},
	userText: {
		fontSize: 25,
		color: "white",
		fontFamily: "Montserrat_700Bold",
		marginTop: 20,
		letterSpacing: 1,
	},
	creationText: {
		fontSize: 11,
		color: "white",
		marginTop: 2,
		letterSpacing: 1,
	},
});
