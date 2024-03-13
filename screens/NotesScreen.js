// TODO
// - finish refresh system

import { Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Notes from "../components/Screens/Notes/Notes";
import colors from "../components/Utilities/Colors";

const LearnScreen = () => {
	const insets = useSafeAreaInsets();
	const [fontsLoaded] = useFonts({
		Montserrat_700Bold,
		Montserrat_600SemiBold,
	});

	const [refreshNotes, setRefreshNotes] = useState(false);

	const translateY = useRef(new Animated.Value(0)).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				return gestureState.dy > 0 && translateY._value === 0;
			},
			onPanResponderMove: (evt, gestureState) => {
				translateY.setValue(gestureState.dy / 2); // Adjusted speed
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dy > 0 && gestureState.dy > 50) {
					// Adjusted threshold
					handleRefresh();
					Animated.timing(translateY, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}).start();
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	const handleRefresh = () => {
		console.log("Refreshing data...");
		setRefreshNotes(true); // Trigger the refresh of the Notes component
		setTimeout(() => {
			setRefreshNotes(false); // Reset refresh state after a delay (you can adjust the delay as needed)
		}, 1000);
	};

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
				},
			]}
			{...panResponder.panHandlers}
		>
			<LinearGradient
				style={[
					styles.gradient,
					{
						paddingBottom: insets.bottom,
						paddingTop: insets.top,
					},
				]}
				colors={[colors["gradient-blue-1"], colors["gradient-blue-2"]]}
			>
				<Text style={styles.title}>NOTES</Text>
			</LinearGradient>
			<Notes />
		</Animated.View>
	);
};

export default LearnScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
		fontFamily: "Montserrat_700Bold",
		fontStyle: "italic",
		textAlign: "center",
		marginTop: "5%",
	},
});
