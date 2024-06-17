import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { firestore } from './firebaseConfig';

const ManageQuestionsScreen = ({ route }) => {
  const { quizId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const quizDoc = await firestore.collection('quizzes').doc(quizId).get();
      if (quizDoc.exists) {
        setQuestions(quizDoc.data().questions || []);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText,
      options,
      correctOption
    };

    firestore.collection('quizzes').doc(quizId).update({
      questions: firebase.firestore.FieldValue.arrayUnion(newQuestion)
    }).then(() => {
      setQuestions([...questions, newQuestion]);
      setQuestionText('');
      setOptions(['', '', '', '']);
    }).catch(error => {
      console.error("Error adding question: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Question Text"
        value={questionText}
        onChangeText={setQuestionText}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={text => {
            const newOptions = [...options];
            newOptions[index] = text;
            setOptions(newOptions);
          }}
        />
      ))}
      <Button title="Add Question" onPress={handleAddQuestion} />
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <View style={styles.question}>
            <Text>{item.questionText}</Text>
            {item.options.map((option, index) => (
              <Text key={index}>{option}</Text>
            ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  },
  question: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default ManageQuestionsScreen;
