import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BackButton = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.back}>
				<AntDesign
					style={styles.icon}
					onPress={() => {
						navigation.goBack();
					}}
					name="arrowleft"
					size={30}
					color="white"
				/>
				<Text style={styles.text}>Note Creation</Text>
			</View>
		</SafeAreaView>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#256FE5",
		alignItems: "center",
		justifyContent: "center",
	},
	back: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
	},
	text: {
		color: "white",
		fontSize: 20,
		marginLeft: -30,
		flex: 1,
		textAlign: "center",
		fontWeight: "bold",
	},
	icon: {},
});
