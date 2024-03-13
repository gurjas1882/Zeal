import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import CreateNoteScreen from "../../screens/Notes/CreateNoteScreen";
import KnowledgeTestingScreen from "../../screens/Notes/KnowledgeTestingScreen";
import PreloadScreen from "../../screens/PreloadScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	const [isAppReady, setIsAppReady] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		const checkAppReady = async () => {
			// preload code

			// simulating
			// setTimeout(() => {
			// 	setIsAppReady(true);
			// 	Animated.timing(fadeAnim, {
			// 		toValue: 1,
			// 		duration: 500,
			// 		useNativeDriver: true,
			// 	}).start();
			// }, 2000);
			setIsAppReady(true);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
		};

		checkAppReady();
	}, []);

	return (
		<NavigationContainer>
			{isAppReady ? (
				<Animated.View style={{ flex: 1, opacity: fadeAnim }}>
					<Stack.Navigator>
						<Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
						<Stack.Screen name="NoteCreateMenu" component={CreateNoteScreen} options={{ headerShown: false }} />
						<Stack.Screen name="KnowledgeTesting" component={KnowledgeTestingScreen} options={{ headerShown: false }} />
					</Stack.Navigator>
				</Animated.View>
			) : (
				<PreloadScreen />
			)}
		</NavigationContainer>
	);
};

export default Navigation;
