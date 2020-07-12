  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA0YWl0YyHa60UGY6xo-odXT1oUsVzoOFw",
    authDomain: "sempiternal-culture.firebaseapp.com",
    databaseURL: "https://sempiternal-culture.firebaseio.com",
    projectId: "sempiternal-culture",
    storageBucket: "sempiternal-culture.appspot.com",
    messagingSenderId: "590315107942",
    appId: "1:590315107942:web:723852327732e455e21fa7",
    measurementId: "G-58FBTGR6GE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();