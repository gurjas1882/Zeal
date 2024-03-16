import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DisplayNotes from '../../components/Screens/Notes/DisplayNotes';

const AllButton = () => {
  const [showDisplayNotes, setShowDisplayNotes] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1, // Generate unique ID
      title: `New Note ${notes.length + 1}`,
      // Add any other properties you need for your note
    };
    setNotes([...notes, newNote]);
  };

  const handleButtonClick = () => {
    setShowDisplayNotes(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      {/* Add button to create a new note */}
      <TouchableOpacity onPress={handleAddNote} style={styles.addButton}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {showDisplayNotes && <DisplayNotes notes={notes} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {     
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AllButton;
