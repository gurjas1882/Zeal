import { AppRegistry } from "react-native";
import Navigation from "./components/Navigation/Navigation";
import { useFonts } from "expo-font";
import { Inter_800ExtraBold, Inter_700Bold, Inter_600SemiBold, Inter_900Black, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Montserrat_700Bold_Italic, Montserrat_400Regular_Italic, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Sora-SemiBold": require("./assets/Sora/Sora-SemiBold.ttf"),
		"Sora-Light": require("./assets/Sora/Sora-Light.ttf"),
		"Sora-Regular": require("./assets/Sora/Sora-Regular.ttf"),
		Montserrat_700Bold_Italic,
		Montserrat_400Regular_Italic,
		Montserrat_700Bold,
		Inter_800ExtraBold,
		Inter_700Bold,
		Inter_600SemiBold,
		Inter_900Black,
		Inter_400Regular,
		Inter_500Medium,
	});

	if (fontsLoaded) {
		return <Navigation />;
	}
}

AppRegistry.registerComponent("Zeal", () => App);
