import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import CreateNoteScreen from "../../screens/Notes/CreateNoteScreen";
import KnowledgeTestingScreen from "../../screens/Notes/KnowledgeTestingScreen";
import PreloadScreen from "../../screens/PreloadScreen";
import BottomTabs from "./BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import GradeScreen from "../../screens/Notes/GradeScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	const [isAppReady, setIsAppReady] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));

	const retrieveAllAnnotatedData = async () => {
		try {
			const directory = FileSystem.documentDirectory;
			const files = await FileSystem.readDirectoryAsync(directory);
			const annotatedDataFiles = files.filter((file) => file.startsWith("annotated_data_"));

			const allAnnotatedData = [];

			for (const file of annotatedDataFiles) {
				const fileContent = await FileSystem.readAsStringAsync(directory + file);
				const parsedData = JSON.parse(fileContent);
				const annotatedImages = parsedData.images.map((image, index) => ({
					text: parsedData.ocrResults[index],
					image: `data:image/jpeg;base64,${image}`,
				}));
				allAnnotatedData.push(annotatedImages);
			}

			return allAnnotatedData;
		} catch (error) {
			console.error("Error retrieving data:", error);
			throw new Error("An error occurred while retrieving data");
		}
	};

	useEffect(() => {
		const checkAppReady = async () => {
			// preload code

			await retrieveAllAnnotatedData()
				.then(async (data) => {
					if (data.length > 0) {
						await AsyncStorage.setItem("notes", JSON.stringify(data));
					}
					setIsAppReady(true);
					Animated.timing(fadeAnim, {
						toValue: 1,
						duration: 500,
						useNativeDriver: true,
					}).start();
				})
				.catch((error) => {
					console.error("Error retrieving data:", error);
				});
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
						<Stack.Screen name="GradeScreen" component={GradeScreen} options={{ headerShown: false }} />
					</Stack.Navigator>
				</Animated.View>
			) : (
				<PreloadScreen />
			)}
		</NavigationContainer>
	);
};

export default Navigation;
