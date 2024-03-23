import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { Montserrat_400Regular_Italic, useFonts } from "@expo-google-fonts/montserrat";

const ProgressBar = ({ progress }) => {
	const widthAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(widthAnimation, {
			toValue: progress,
			duration: 750, // Adjust initial animation duration
			easing: Easing.bezier(0.4, 0, 0.2, 1), // Cubic Bezier curve for smooth deceleration
			useNativeDriver: false,
		}).start();
	}, [progress]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.background}>
			<Animated.View style={[styles.fill, { width: widthAnimation.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} />
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		width: "90%",
		height: 10,
		backgroundColor: "#D9D9D9",
		borderRadius: 100,
		justifyContent: "center",
		position: "relative",
	},
	fill: {
		height: "90%",
		backgroundColor: "#256FE5",
		borderRadius: 100,
		position: "absolute",
	},
});

export default ProgressBar;
