import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AllButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Add notes</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', // Set background color to blue
    borderRadius: 20, // Set border radius to make it rounded
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white', // Set text color to white
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AllButton;
