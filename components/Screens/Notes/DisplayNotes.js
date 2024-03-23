import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DisplayNotes = ({ annotatedData }) => {
	const navigation = useNavigation();

	const handleImagePress = (item) => {
		Alert.alert(
			"Choose an Action",
			"Please select one of the following options",
			[
				{
					text: "Test Your Knowledge",
					onPress: () => navigation.navigate("KnowledgeTesting", { annotatedData: item }),
					style: "default",
				},
				{
					text: "Create Flash Cards",
					onPress: () => {},
					style: "default",
				},
				{
					text: "Create Practice Material",
					onPress: () => {},
					style: "default",
				},
				{
					text: "Cancel",
					onPress: () => {},
					style: "cancel",
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={styles.container}>
			{annotatedData.map((item, index) => (
				<TouchableOpacity key={index} onPress={() => handleImagePress(item)}>
					<View style={styles.noteContainer}>
						<Image source={{ uri: item[0].image }} style={styles.noteImage} />
						<Text style={styles.noteText}>note {index + 1}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between", // Changed justifyContent to space-between
		paddingHorizontal: 10, // Add some padding to space out the items
		flexWrap: "wrap",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
	},
	noteContainer: {
		marginTop: 20,
		marginBottom: 20,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	noteText: {
		fontSize: 14,
		marginTop: 6,
		fontFamily: "Inter_500Medium",
		color: "#675D5D",
	},
	noteImage: {
		width: 140,
		height: 200,
		resizeMode: "cover",
		borderRadius: 24,
	},
});

export default DisplayNotes;
