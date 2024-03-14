import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Montserrat_400Regular_Italic, useFonts } from "@expo-google-fonts/montserrat";
import DisplayNotes from "./DisplayNotes";
//import styles from './Notes.module.css'; 

const Notes = () => {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular_Italic,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Your ScrollView content here */}
                <DisplayNotes />
            </ScrollView>
            <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => {
                    navigation.navigate("NoteCreateMenu");
                }}
            >
                <View style={styles.arrow}>
                    <AntDesign name="plus" size={26} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arrow: {
        backgroundColor: "#256FE5",
        padding: 13,
        borderRadius: 100,
    },
    touchableButton: {
        position: "absolute",
        bottom: 100,
        right: 20,
    },
});

export default Notes;