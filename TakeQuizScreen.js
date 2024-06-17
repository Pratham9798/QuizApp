import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { firestore } from './firebaseConfig';

const TakeQuizScreen = ({ route }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizDoc = await firestore.collection('quizzes').doc(quizId).get();
      setQuiz(quizDoc.data());
    };

    fetchQuiz();
  }, []);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quiz.questions[currentQuestionIndex].correctOption) {
      setScore(score + parseInt(quiz.points));
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished
      alert(`Quiz finished! Your score is: ${score}`);
    }
  };

  if (!quiz) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text>{currentQuestion.questionText}</Text>
      {currentQuestion.options.map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(index)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
});

export default TakeQuizScreen;
