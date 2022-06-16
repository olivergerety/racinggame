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

var dataelement = document.getElementById('data');
var splash = document.getElementById('splashmain')
var gamepinElement = document.getElementById('gamepin')

dataelement.innerText = document.cookie;

var obint = document.cookie.split('; ').find(row => row.startsWith('obint=')).split('=')[1];
var qset = document.cookie.split('; ').find(row => row.startsWith('qset=')).split('=')[1];
var length = document.cookie.split('; ').find(row => row.startsWith('length=')).split('=')[1];
var custom = document.cookie.split('; ').find(row => row.startsWith('custom=')).split('=')[1];

var pregpin = (Math.floor(Math.random()*999999)).toString();
var gpin = '0'.repeat(6-pregpin.length) + pregpin;

console.log('GPIN - ' + gpin);

setTimeout(function() { splash.style.display = 'none'},2000) // Remove splash screen

var board = setupBoard(length,obint) // Set up board

dataelement.innerText = board; // Display raw board

gamepinElement.innerText = 'Gamepin : ' + gpin

setDB({gamepin:gpin.toString(),
       qset:qset === 'custom' ? '+'+custom:qset,
       boardlength:length
      },'/game/'+gpin) // Set gamepin


for (let i = 0; i < board.length; i++) {
  updateDB(board[i],'/game/'+gpin+'/board/b'+i) // Add board row i
}


function setDB(data,path) {
  var messagesRef = firebase.database().ref(path);
  messagesRef.set(data)
}

function updateDB(data,path) {
  var messagesRef = firebase.database().ref(path)
  messagesRef.update(data)
}

function setupBoard(boardLength,obint) {
  const board = [['|','==','==','==','==','|']]

  const obstacleLuckTable = Array(100).fill('0').fill('1',0,obint)

  console.log(obstacleLuckTable)
  
  for (let i = 0; i < 20; i++) {
    board.push(['|','--','--','--','--','|'])
  }
  
  for (let i = 0; i < boardLength; i++) {
    board.push(['|',obstacleLuckTable[Math.floor(Math.random() * 100)] === '1' ? '##' : '--',obstacleLuckTable[Math.floor(Math.random() * 100)] === '1' ? '##' : '--',obstacleLuckTable[Math.floor(Math.random() * 100)] === '1' ? '##' : '--',obstacleLuckTable[Math.floor(Math.random() * 100)] === '1' ? '##' : '--','|'])
  }

  board.push(['|','==','==','==','==','|'])
  
  console.log(board)

  return board
  
}

// def createGame(gpin,questions):
//     print('<HOST> Setting up game...')
//     board=setupBoard()
//     encoded = encodeBoard(board)
//     gdata = {
//         'gpin':gpin,
//         'board':encoded
//     }
//     setDB(gdata,f'/game/{gpin}')
//     setDB(input('What is the path for the questions?'),f'/game/{gpin}/questions')

//     print(f'<HOST> The game pin is {gpin}')