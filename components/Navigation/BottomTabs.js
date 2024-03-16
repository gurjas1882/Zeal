import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { HomeSvg, NotesSvg, PlantSvg } from "../../assets/icons/icons";
import HomeScreen from "../../screens/HomeScreen";
import NotesScreen from "../../screens/NotesScreen";
import PlantScreen from "../../screens/PlantScreen";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
	headerShown: false,
};

const BottomTabs = () => {
	const [fontsLoaded] = useFonts({
		"Sora-SemiBold": require("../../assets/Sora/Sora-SemiBold.ttf"),
		"Sora-Light": require("../../assets/Sora/Sora-Light.ttf"),
	});

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					position: "absolute",
					bottom: 15,
					left: 0,
					height: 90,
					paddingTop: 13,
					backgroundColor: "white",
					elevation: 5,
					marginBottom: -15,
					borderTopStartRadius: 26,
					borderTopEndRadius: 26,
					borderWidth: 0,
					borderTopWidth: 0,
					shadowColor: "#E4E4E4",
					shadowOpacity: 0.25,
					shadowOffset: { width: 0, height: -10 },
					shadowRadius: 24,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					...tabBarOptions,
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								fontSize: 11,
								fontFamily: focused ? "Sora-SemiBold" : "Sora-Light",
								color: focused ? "#006FFD" : "#71727A",
							}}
						>
							HOME
						</Text>
					),
					tabBarIcon: ({ focused }) => (focused ? <HomeSvg color={"#006FFD"} /> : <HomeSvg color={"#71727A"} />),
				}}
			/>
			<Tab.Screen
				name="Notes"
				component={NotesScreen}
				options={{
					...tabBarOptions,
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								fontSize: 11,
								fontFamily: focused ? "Sora-SemiBold" : "Sora-Light",
								color: focused ? "#006FFD" : "#71727A",
							}}
						>
							NOTES
						</Text>
					),
					tabBarIcon: ({ focused }) => (focused ? <NotesSvg color={"#006FFD"} /> : <NotesSvg color={"#71727A"} />),
				}}
			/>
			<Tab.Screen
				name="Plant"
				component={PlantScreen}
				options={{
					...tabBarOptions,
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								fontSize: 11,
								fontFamily: focused ? "Sora-SemiBold" : "Sora-Light",
								color: focused ? "#006FFD" : "#71727A",
							}}
						>
							PLANT
						</Text>
					),
					tabBarIcon: ({ focused }) => (focused ? <PlantSvg color={"#006FFD"} /> : <PlantSvg color={"#71727A"} />),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabs;
