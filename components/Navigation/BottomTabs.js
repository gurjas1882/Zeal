import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../../screens/HomeScreen";
import LearnScreen from "../../screens/NotesScreen";
import PlantScreen from "../../screens/PlantScreen";
import ProfileScreen from "../../screens/ProfileScreen";

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();

// Common options - spread to each of the tab screen elements
const tabBarOptions = {
	tabBarLabel: "",
	headerShown: false,
	tabBarLabelStyle: { color: "white" },
};

// Main component

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "white",
					position: "absolute",
					bottom: 15,
					left: 0,
					paddingTop: 13,
					height: 80,
					elevation: 0,
					marginBottom: -15,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					...tabBarOptions,
					tabBarIcon: ({ focused }) => (focused ? <Entypo name="home" size={24} color="#3a86ff" /> : <Entypo name="home" size={24} color="black" />),
				}}
			/>
			<Tab.Screen
				name="Learn"
				component={LearnScreen}
				options={{
					...tabBarOptions,
					tabBarIcon: ({ focused }) => (focused ? <FontAwesome name="microphone" size={24} color="#3a86ff" /> : <FontAwesome name="microphone" size={24} color="black" />),
				}}
			/>
			<Tab.Screen
				name="Plant"
				component={PlantScreen}
				options={{
					...tabBarOptions,
					tabBarIcon: ({ focused }) => (focused ? <MaterialCommunityIcons name="flower-tulip" size={24} color="#3a86ff" /> : <MaterialCommunityIcons name="flower-tulip" size={24} color="black" />),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					...tabBarOptions,
					tabBarIcon: ({ focused }) => (focused ? <FontAwesome name="user" size={24} color="#3a86ff" /> : <FontAwesome name="user" size={24} color="black" />),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabs;
