import { Inter_400Regular, Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";

import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionCreator from "../../Buttons/ActionButton";

const HomeContent = () => {
	const navigation = useNavigation();
	const [contentLoaded, setContentLoaded] = useState(false);

	// Load fonts
	const [fontsLoaded] = useFonts({
		"Sora-SemiBold": require("../../../assets/Sora/Sora-SemiBold.ttf"),
		"Sora-Light": require("../../../assets/Sora/Sora-Light.ttf"),
	});

	useFonts({
		Inter_900Black,
		Inter_400Regular,
	});

	// navigate to notes screen
	const navigateToLearn = useCallback(() => {
		navigation.navigate("Learn");
	}, [navigation]);

	return (
		<View>
			{contentLoaded ? (
				<View style={[styles.headerContent, { paddingHorizontal: "8%" }]}>
					<Text style={styles.headerText}>Continue Working</Text>
				</View>
			) : (
				<View style={[styles.headerContent, { paddingHorizontal: "8%" }]}>
					<Text style={styles.headerText}>Begin Working</Text>
					<View style={styles.emptyNotes}>
						<Text style={styles.emptyNotesText}>Looks like you have no notes :(</Text>
						<Text style={styles.emptyNotesUnderText}>Get started and make your first note</Text>
					</View>
				</View>
			)}
			<View style={[styles.headerContent, { paddingHorizontal: "8%", marginTop: "4%" }]}>
				<Text style={styles.headerText}>Discover</Text>
				<ActionCreator title="test your knowledge" underText />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerText: {
		color: "#1F2024",
		fontFamily: "Sora-SemiBold",
		fontWeight: "bold",
		alignSelf: "flex-start",
		fontSize: 16,
	},
	emptyNotes: {
		height: 185,
		width: "104%",
		marginLeft: "-2%",
		marginTop: "4%",
		backgroundColor: "#EAF2FF",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyNotesText: {
		color: "#1F2024",
		fontFamily: "Inter_900Black",
		fontWeight: "bold",
		letterSpacing: "0.5%",
		fontSize: 19,
		width: "75%",
		textAlign: "center",
	},
	emptyNotesUnderText: {
		color: "#71727A",
		fontFamily: "Inter_400Regular",
		fontWeight: "400",
		fontSize: 15,
		width: "75%",
		textAlign: "center",
		paddingTop: 10,
	},
});

export default HomeContent;
