import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQuizScreen from './CreateQuizScreen';
import ManageQuestionsScreen from './ManageQuestionsScreen';
import TakeQuizScreen from './TakeQuizScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateQuiz">
        <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
        <Stack.Screen name="ManageQuestions" component={ManageQuestionsScreen} />
        <Stack.Screen name="TakeQuiz" component={TakeQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

