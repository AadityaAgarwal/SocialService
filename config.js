import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyB06loht9y5YvTJ5dSTJ8c-wTmIozE_PQs",
    authDomain: "socialservice-bc198.firebaseapp.com",
    projectId: "socialservice-bc198",
    storageBucket: "socialservice-bc198.appspot.com",
    messagingSenderId: "345560792908",
    appId: "1:345560792908:web:7e2d2a29bf2dd9dc0199e9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();