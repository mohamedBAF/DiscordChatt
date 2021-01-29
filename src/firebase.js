import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBxHv_fEruzpWVjaJzvF4v1ZmBUxMkrxeI",
    authDomain: "discord-efe1b.firebaseapp.com",
    projectId: "discord-efe1b",
    storageBucket: "discord-efe1b.appspot.com",
    messagingSenderId: "212926813100",
    appId: "1:212926813100:web:744e3d37a2e55893906009",
    measurementId: "G-7H39T45D5Q"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider}

  export default db;