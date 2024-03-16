import { Montserrat_400Regular_Italic, Montserrat_700Bold_Italic, useFonts } from "@expo-google-fonts/montserrat";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationSvg } from "../../../assets/icons/icons";

const HomeHeader = () => {
	let [fontsLoaded] = useFonts({
		Montserrat_700Bold_Italic,
		Montserrat_400Regular_Italic,
	});

	useFonts({
		"Sora-Regular": require("../../../assets/Sora/Sora-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	const currentHour = new Date().getHours();
	const greeting = currentHour >= 5 && currentHour < 12 ? "Good morning" : currentHour >= 12 && currentHour < 18 ? "Good afternoon" : "Good evening";

	const handleIconPress = () => {
		console.log("Icon pressed!");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContent}>
				<Text style={styles.headerText}>ZEAL</Text>
				<TouchableOpacity onPress={handleIconPress}>
					<View style={styles.icon}>
						<NotificationSvg color="#1F2024" />
					</View>
				</TouchableOpacity>
			</View>
			<Text style={styles.timeText}>{greeting} Jaskaran</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContent: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: "8%",
		paddingTop: "8%",
	},
	icon: {
		alignItems: "center",
		backgroundColor: "#F1F1F1",
		borderRadius: 12,
		height: 40,
		justifyContent: "center",
		width: 40,
	},
	headerText: {
		color: "#1F2024",
		fontFamily: "Montserrat_700Bold_Italic",
		fontSize: 36,
		fontStyle: "italic",
		fontWeight: "bold",
		letterSpacing: -5,
	},
	timeText: {
		color: "#1F2024",
		fontFamily: "Sora-Regular",
		fontSize: 18,
		fontWeight: "bold",
		paddingHorizontal: "8%",
		paddingTop: "4%",
	},
});

export default HomeHeader;
