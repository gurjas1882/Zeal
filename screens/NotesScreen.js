import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AllButton from './Notes/AllButton'; // Check the path
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import DisplayNotes from '../components/Screens/Notes/DisplayNotes'; // Check the path

const NotesScreen = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  const [showAllNotes, setShowAllNotes] = useState(false);
  const [notes, setNotes] = useState([]); // State to store notes

  const handleButtonClick = index => {
    setShowAllNotes(index === 0);
  };

  const navigateToCreateNote = () => {
    navigation.navigate('NoteCreateMenu'); // Navigate to CreateNoteScreen
  };

  return (
    <View style={styles.container}>
      {/* Render the "Notes" title */}
      <Text style={styles.title}>Notes</Text>

      {/* Render the buttons container */}
      <View style={styles.buttonContainer}>
        {/* Render the "Note" button */}
        <TouchableOpacity
          onPress={() => handleButtonClick(0)}
          style={[
            styles.button,
            showAllNotes ? styles.buttonClicked : styles.buttonUnclicked,
          ]}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>

        {/* Render the "Favorite" button */}
        <TouchableOpacity
          onPress={() => handleButtonClick(1)}
          style={[
            styles.button,
            !showAllNotes ? styles.buttonClicked : styles.buttonUnclicked,
          ]}
        >
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      </View>

      {/* Render AllButton component if showAllNotes is true */}
      {showAllNotes ? (
        <View style={styles.centerContainer}>
          {notes.length === 0 ? (
            <Text style={styles.nothingText}>There is nothing there</Text>
          ) : (
            <DisplayNotes />
          )}
          <AllButton onPress={navigateToCreateNote} />
        </View>
      ) : (
        <DisplayNotes />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white', // Set background color to white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Align text to the center
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#F1F1F1',
    padding: 5,
    borderRadius: 10, // Round the edges of the button container
  },
  button: {
    flex: 1, // Make the button take up equal space
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Round the edges of the button
  },
  buttonClicked: {
    backgroundColor: 'white', // Change background color when clicked
  },
  buttonUnclicked: {
    backgroundColor: '#F1F1F1', // Change background color when not clicked
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nothingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotesScreen;
