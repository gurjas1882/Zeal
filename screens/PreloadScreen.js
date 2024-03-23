import { Montserrat_400Regular_Italic, Montserrat_700Bold_Italic, useFonts } from "@expo-google-fonts/montserrat";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PreloadScreen = () => {
	return (
		<View style={styles.loadingContainer}>
			<Text style={styles.loadingText}>ZEAL</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#256FE5",
	},
	loadingText: {
		fontSize: 60,
		fontWeight: "bold",
		color: "white",
		fontFamily: "Montserrat_700Bold_Italic",
		letterSpacing: -5,
	},
});

export default PreloadScreen;
