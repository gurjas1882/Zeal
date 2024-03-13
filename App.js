import { AppRegistry } from "react-native";
import Navigation from "./components/Navigation/Navigation";

export default function App() {
	return <Navigation />;
}

AppRegistry.registerComponent("Zeal", () => App);

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });
