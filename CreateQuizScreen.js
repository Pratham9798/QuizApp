import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { firestore } from './firebaseConfig';

const CreateQuizScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  const handleSaveQuiz = () => {
    firestore.collection('quizzes').add({
      name,
      description,
      points,
      timeLimit
    }).then((docRef) => {
      navigation.navigate('ManageQuestions', { quizId: docRef.id });
    }).catch(error => {
      console.error("Error adding document: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quiz Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Points/Grading System"
        value={points}
        onChangeText={setPoints}
      />
      <TextInput
        style={styles.input}
        placeholder="Time Limit"
        value={timeLimit}
        onChangeText={setTimeLimit}
      />
      <Button title="Save Quiz" onPress={handleSaveQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  }
});

export default CreateQuizScreen;
