import React from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from "react-native";

import HomeContent from "../components/Screens/Home/HomeContent";
import HomeHeader from "../components/Screens/Home/HomeHeader";
import PlantGrowing from "../components/Screens/Home/modules/PlantGrowing";

const HomeScreen = () => {
	return (
		<ScrollView style={styles.scrollView}>
			<StatusBar barStyle="light-content" />
			<HomeHeader />
			<View style={{ alignItems: "center" }}>
				<PlantGrowing />
			</View>
			<HomeContent />
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	scrollView: {
		maxHeight: Dimensions.get("window").height - 80,
	},
});
