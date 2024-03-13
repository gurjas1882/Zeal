import { Montserrat_400Regular_Italic, Montserrat_700Bold_Italic, useFonts } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../Utilities/Colors";

const HomeHeader = () => {
	let [fontsLoaded] = useFonts({
		Montserrat_700Bold_Italic,
		Montserrat_400Regular_Italic,
	});

	const insets = useSafeAreaInsets();

	if (!fontsLoaded) {
		return null;
	}

	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;

	return (
		<SafeAreaView style={[styles.container, { height: Platform.OS === "android" ? screenHeight * 0.25 : screenHeight * 0.3 }]}>
			<LinearGradient
				style={[
					styles.gradient,
					{
						height: Platform.OS === "android" ? screenHeight * 0.25 : screenHeight * 0.3,
						paddingBottom: insets.bottom,
						paddingTop: insets.top,
						marginTop: -insets.top,
					},
				]}
				colors={[colors["gradient-blue-1"], colors["gradient-blue-2"]]}
			>
				<View style={styles.headerContent}>
					<Text style={styles.headerText}>ZEAL</Text>
					<Ionicons name="notifications" size={screenWidth * 0.08} color="white" />
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors["progress-blue"],
	},
	headerContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "8%",
		paddingTop: "8%",
	},
	headerText: {
		fontSize: Dimensions.get("window").width * 0.1,
		fontWeight: "bold",
		color: "white",
		fontFamily: "Montserrat_700Bold_Italic",
		letterSpacing: -5,
		fontStyle: "italic",
	},
	underTextContent: {
		alignItems: "center",
		marginTop: "6%",
	},
	underText: {
		fontSize: Dimensions.get("window").width * 0.05,
		color: "white",
		fontFamily: "Montserrat_400Regular_Italic",
		alignSelf: "flex-start",
		paddingHorizontal: "7%",
		paddingBottom: "3%",
	},
});

export default HomeHeader;
