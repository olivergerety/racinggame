console.log('working')

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

var g1 = document.getElementById('gpininp1');
var g2 = document.getElementById('gpininp2');
var g3 = document.getElementById('gpininp3');
var g4 = document.getElementById('gpininp4');
var g5 = document.getElementById('gpininp5');
var g6 = document.getElementById('gpininp6');

var jform = document.getElementById('joingame');

var invalid = document.getElementById('invalid');

firebase.initializeApp(config);

g1.oninput = function(){console.log(g1.value);if(g1.value !== '') {g2.focus();}}
g2.oninput = function(){console.log(g2.value);if(g2.value !== '') {g3.focus();}}
g3.oninput = function(){console.log(g3.value);if(g3.value !== '') {g4.focus();}}
g4.oninput = function(){console.log(g4.value);if(g4.value !== '') {g5.focus();}}
g5.oninput = function(){console.log(g5.value);if(g5.value !== '') {g6.focus();}}
g6.oninput = function(){console.log(g6.value);if(g6.value !== '') {
  gpincombined = g1.value + g2.value + g3.value + g4.value + g5.value + g6.value;

  firebase.database().ref('game').on('value',(snap)=>{
    var currpins = Object.keys(snap.val());
    console.log(currpins)
  
    if (currpins.includes(gpincombined)) {
      console.log('in')
      document.cookie = 'gpin='+gpincombined
    jform.submit();
    } else {
      console.log('not in');
      jform.reset();
      g1.focus();
      invalid.style.display = 'block';

      setTimeout(function() {invalid.style.display='none';},8000)
    }
    
  });
}}

// g1.addEventListener('change', function(){
//   g6.focus();
// });