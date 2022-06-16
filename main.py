from firebase_admin import credentials, db
import random, time, firebase_admin, secrets, os
from flask import Flask, request, render_template

#------------
CRED = credentials.Certificate({
  "type":os.environ['type'],
  "project_id":os.environ['project_id'],
  "private_key_id":os.environ['private_key_id'],
  "private_key":os.environ['private_key'],
  "client_email":os.environ['client_email'],
  "client_id":os.environ['client_id'],
  "auth_uri":os.environ['auth_uri'],
  "token_uri":os.environ['token_uri'],
  "auth_provider_x509_cert_url":os.environ['auth_provider_x509_cert_url']
})

QSET1 = {
    'amount':'2',
    '1':'What does CPU stand for?|central processing unit',
    '2':'What does RAM stand for?|random access memory'
}
#------------
firebase_admin.initialize_app(CRED, {
    'databaseURL': 'https://racinggame-ec7dd-default-rtdb.firebaseio.com/'
})
#------------
def setupBoard():
    obInt = 0#!!!
    boardLength = 60#!!!

    obstacleLuckTable = ['1']*obInt+['0']*(100-obInt)

    board = [['|','--','--','--','--','|'] for _ in range(20)]
    board.insert(0,['|','==','==','==','==','|'])
    for _ in range(boardLength-20):
        board.append(['|', '**' if random.choice(obstacleLuckTable) == '1' else '--','**' if random.choice(obstacleLuckTable) == '1' else '--','**' if random.choice(obstacleLuckTable) == '1' else '--','**' if random.choice(obstacleLuckTable) == '1' else '--','|'])

    return board
#---
def setDB(data:dict,path:str,chld:str=None) -> None:
    ref = db.reference(path)
    if chld != None:    
        ref = ref.child(chld)

    return ref.set(data)
#---
def createGame(gpin,questions):
    print('<HOST> Setting up game...')
    board=setupBoard()
    encoded = encodeBoard(board)
    gdata = {
        'gpin':gpin,
        'board':encoded
    }
    setDB(gdata,f'/game/{gpin}')
    setDB(input('What is the path for the questions?'),f'/game/{gpin}/questions')

    print(f'<HOST> The game pin is {gpin}')
#---
def encodeBoard(track:list) -> str:
    header = ''
    for x in track:
        for y in x:
            header += y
        header+='¬'
    return header
#---

def routeGameScreen():
  obstacles = request.args['obstacles']
  qset = request.args['qset']
  if qset == 'custom':
    custom = request.args['custom']
  else:
    custom = None

  gpin = str(random.randint(0,999999))
  createGame('0'*(6-len(gpin))+gpin,QSET1)
  return render_template('gamescreen.html', gamepin=gpin)
