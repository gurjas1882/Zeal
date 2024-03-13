import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ActionCreator from "../../Buttons/ActionButton";
import colors from "../../Utilities/Colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const animationDuration = 750;

const HomeContent = () => {
	const navigation = useNavigation();

	// Load fonts
	const [fontsLoaded] = useFonts({
		"Sora-SemiBold": require("../../../assets/Sora/Sora-SemiBold.ttf"),
		"Sora-Light": require("../../../assets/Sora/Sora-Light.ttf"),
	});

	// map fade animation
	const fadeAnim = useRef([1, 2, 3, 4].map(() => new Animated.Value(0)));

	// uses a callback to fade the elements
	const fadeIn = useCallback(() => {
		Animated.stagger(
			100,
			fadeAnim.current.map((anim) =>
				Animated.timing(anim, {
					toValue: 1,
					duration: animationDuration,
					useNativeDriver: true,
				})
			)
		).start();
	}, []);

	// wait until the component is mounted before fading
	useEffect(() => {
		if (fontsLoaded) {
			fadeIn();
		}
	}, [fontsLoaded, fadeIn]);

	// navigate to notes screen
	const navigateToLearn = useCallback(() => {
		navigation.navigate("Learn");
	}, [navigation]);

	return (
		<View style={[styles.headerContent, { paddingHorizontal: screenWidth * 0.06 }]}>
			<Text style={[styles.headerText, { fontSize: screenWidth * 0.05 }]}>start your adventure</Text>
			{fadeAnim.current.map((anim, index) => (
				<Animated.View key={index} style={{ opacity: anim }}>
					{index === 0 ? (
						<ActionCreator title={"test your knowledge"} underText={"answer ai-generated questions "} action={navigateToLearn} color={colors["default-blue"]} />
					) : index === 1 ? (
						<ActionCreator title={"prepare for your exam"} underText={"interactive study material"} color={colors["cascade-blue-1"]} />
					) : index === 2 ? (
						<ActionCreator title={"generate magic notes"} underText={"upload your notes to create adaptive material"} color={colors["cascade-blue-2"]} />
					) : (
						<>
							<Text style={[styles.headerText, { fontSize: screenWidth * 0.05 }]}>prepare for your future</Text>
							<ActionCreator title={"SAT"} underText={"ace the SAT with our interactive material"} color={colors["cascade-blue-2"]} />
							<ActionCreator title={"LSAT"} underText={"practice for your LSAT using local material"} color={colors["cascade-blue-1"]} />
							<ActionCreator style={styles.lastItem} title={"MCAT"} underText={"become unstoppable with our MCAT material"} color={colors["default-blue"]} />
						</>
					)}
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	headerText: {
		color: "black",
		fontFamily: "Sora-SemiBold",
		fontWeight: "bold",
		alignSelf: "flex-start",
		paddingTop: screenHeight * 0.04,
		paddingLeft: 2,
	},
	headerContent: {
		flexDirection: "column",
	},
	lastItem: {
		paddingBottom: 300,
	},
});

export default HomeContent;
