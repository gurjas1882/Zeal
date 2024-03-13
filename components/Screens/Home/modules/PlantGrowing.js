import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "./ProgressBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PlantGrowing = () => {
	const [fontsLoaded] = useFonts({
		"Sora-SemiBold": require("../../../../assets/Sora/Sora-SemiBold.ttf"),
		"Sora-Light": require("../../../../assets/Sora/Sora-Light.ttf"),
	});

	const navigation = useNavigation();

	const progress = 0.5;

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				navigation.navigate("Plant");
			}}
		>
			<View style={styles.contentLeft}>
				<Image style={styles.image} source={require("../../../../assets/seedling.png")} />
			</View>
			<View style={styles.contentRight}>
				<Text style={styles.rightTitle}>plant growing</Text>
				<Text style={styles.progressText}>{((1 - progress) * 100).toFixed(0)}% until next stage</Text>
				<ProgressBar progress={progress} />
			</View>
		</TouchableOpacity>
	);
};

export default PlantGrowing;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 16,
		height: 150,
		padding: 20,
		marginTop: "-23%",
		justifyContent: "center",
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		width: screenWidth - screenWidth * 0.06 * 2,
		flexDirection: "row",
		alignItems: "center",
	},
	contentLeft: {
		width: "30%",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	contentRight: {
		width: "70%",
		justifyContent: "center",
		paddingLeft: 25,
	},
	rightTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "black",
		fontFamily: "Sora-SemiBold",
	},
	content: {
		flexDirection: "column",
	},
	progressText: {
		fontSize: 13,
		color: "black",
		fontFamily: "Sora-Light",
		paddingTop: 2,
		marginTop: 10,
		marginBottom: 2,
	},
});
