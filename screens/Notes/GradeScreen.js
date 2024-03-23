import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const GradeScreen = ({ route }) => {
	const navigation = useNavigation();

	const handleCancel = () => {
		navigation.navigate("Notes");
	};
	const { grading, feedback, thinkingTime, recordingTime } = route.params;
	return (
		<SafeAreaView>
			<View style={styles.topContainer}>
				<TouchableOpacity onPress={handleCancel} style={styles.button}>
					<Text style={styles.buttonText}>Done</Text>
				</TouchableOpacity>

				<Text style={styles.centeredText}>Grading</Text>
			</View>
			<View style={styles.gradeContainer}>
				<Text style={styles.gradeHeader}>Grade</Text>
				<Text style={styles.grade}>{grading}%</Text>
			</View>
			<View style={styles.feedbackContainer}>
				<Text style={styles.feedbackHeader}>Feedback</Text>
				<Text style={styles.feedback}>{feedback}</Text>
			</View>

			<View style={styles.timeTakenContainer}>
				<Text style={styles.timeTakenHeader}>Time Taken</Text>
				<Text style={styles.time}>
					Time Thinking:{" "}
					<Text
						style={{
							fontStyle: "bold",
							fontFamily: "Inter_800ExtraBold",
							color: "#1F2024",
						}}
					>
						{Math.floor(thinkingTime / 60)}:{thinkingTime % 60 < 10 ? "0" : ""}
						{thinkingTime % 60}
					</Text>
				</Text>
				<Text style={styles.time}>
					Time Recording:{" "}
					<Text
						style={{
							fontStyle: "bold",
							fontFamily: "Inter_800ExtraBold",
							color: "#1F2024",
						}}
					>
						{Math.floor(recordingTime / 60)}:{recordingTime % 60 < 10 ? "0" : ""}
						{recordingTime % 60}
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default GradeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 25,
	},
	button: {
		position: "absolute",
		left: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "rgb(0, 122, 255)",
		fontSize: 16,
	},
	centeredText: {
		fontSize: 16,
		fontFamily: "Inter_800ExtraBold",
		fontWeight: "bold",
	},
	gradeContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 40,
	},
	gradeHeader: {
		fontSize: 18,
		fontWeight: "light",
		textAlign: "center",
		marginBottom: 5,
		color: "#1F2024",
		fontFamily: "Inter_500Medium",
	},
	grade: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		letterSpacing: 1,
		fontFamily: "Inter_700Bold",
		color: "#1F2024",
	},
	feedbackContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 20,
	},
	feedbackHeader: {
		fontSize: 18,
		fontWeight: "light",
		textAlign: "center",
		marginBottom: 5,
		color: "#1F2024",
		fontFamily: "Inter_500Medium",
	},
	feedback: {
		fontSize: 16,
		fontWeight: "light",
		textAlign: "center",
		color: "#71727A",
		width: "90%",
		marginBottom: 20,
		fontFamily: "Inter_400Regular",
	},

	timeTakenContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 20,
	},
	timeTakenHeader: {
		fontSize: 18,
		fontWeight: "light",
		textAlign: "center",
		marginBottom: 10,
		color: "#1F2024",
		fontFamily: "Inter_500Medium",
	},
	time: {
		fontSize: 20,
		fontWeight: "light",
		textAlign: "center",
		width: "90%",
		fontFamily: "Inter_400Regular",
		color: "#1F2024",
	},
});
