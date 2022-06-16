var config = {
    apiKey: "AIzaSyADJ1iAmylCIEVq_K59tZiW0HRJutyg9sE",
    authDomain: "racinggame-ec7dd.firebaseapp.com",
    databaseURL: "https://racinggame-ec7dd-default-rtdb.firebaseio.com",
    projectId: "racinggame-ec7dd",
    storageBucket: "racinggame-ec7dd.appspot.com",
    messagingSenderId: "750749528770",
    appId: "1:750749528770:web:035ad769979de6fd42c15b",
    measurementId: "G-ST6HH9M70R"
  };
  
firebase.initializeApp(config);

var username = document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1];
var gpin = document.cookie.split('; ').find(row => row.startsWith('gpin=')).split('=')[1];

setDB({score:'0'},'game/'+gpin+'/users/'+username)

function setDB(data,path) {
    var messagesRef = firebase.database().ref(path);
    messagesRef.set(data)
}
