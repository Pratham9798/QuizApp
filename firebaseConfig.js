import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCjoyc-3u20L-yOyYIJJNLNEOJo0ATGXeE",
    authDomain: "quizapp-d4cf5.firebaseapp.com",
    projectId: "quizapp-d4cf5",
    storageBucket: "quizapp-d4cf5.appspot.com",
    messagingSenderId: "689222636626",
    appId: "1:689222636626:web:57d42369da01c8f09d3b8b"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const firestore = firebase.firestore();