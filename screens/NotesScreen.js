import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Note = ({ title }) => {
  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteTitle}>{title}</Text>
    </View>
  );
};

const NotesScreen = () => {
  const [notes, setNotes] = useState([
    { title: 'All', isClicked: false },
    { title: 'Favourite', isClicked: false },
  ]);

  const handleButtonClick = index => {
    setNotes(prevNotes =>
      prevNotes.map((note, i) => {
        if (i === index) {
          // Toggle clicked state for the new button
          return { ...note, isClicked: !note.isClicked };
        } else if (prevNotes[index].isClicked && i !== index) {
          // Reset clicked state for the previously clicked button
          return { ...note, isClicked: false };
        }
        return note;
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the "Notes" title */}
      <Text style={styles.title}>Notes</Text>

      {/* Render the buttons container */}
      <View style={styles.buttonContainer}>
        {/* Render the "All" button */}
        <TouchableOpacity
          onPress={() => handleButtonClick(0)}
          style={[
            styles.button,
            notes[0].isClicked ? styles.buttonClicked : styles.buttonUnclicked,
          ]}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>

        {/* Render the "Favorite" button */}
        <TouchableOpacity
          onPress={() => handleButtonClick(1)}
          style={[
            styles.button,
            notes[1].isClicked ? styles.buttonClicked : styles.buttonUnclicked,
          ]}
        >
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      </View>
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
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  noteTitle: {
    fontSize: 16,
  },
});

export default NotesScreen;
