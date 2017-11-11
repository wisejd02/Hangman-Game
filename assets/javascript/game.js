var userGuess;
var startValue;
var arrayOfBlanks = "_";
var arrayWord = "";
var elGameWord = document.getElementById('gameWord');
var elSectHdr = document.getElementById('sectHdr');
var elJumbHdr = document.getElementById('jumbHdr');
var elJumbMsg = document.getElementById('jumbMsg');
var elSectMsg = document.getElementById('sectMsg');
var elDivGmStats  = document.getElementById('divGmStats');
var elImgHint =  document.getElementById('hint');
var newDiv = document.createElement("div");
var objGame = {};
objGame.keyCount = -1;
objGame.usedLetters = "";
objGame.win = 0;
objGame.lose = 0;
objGame.wordList = ["thanksgiving", "turkey", "football", "family", "friends", "pumpkin","food","harvest","autumn" ];
elSectHdr.innerHTML += '<br>Press any key to get started!';
elJumbHdr.innerHTML = 'Used Letters';

 //main code triggered by keypress
document.onkeypress=function(e){ 
 if(isGameOver()){
 }else if(isGameNew()){
  elSectHdr.innerHTML = "Hangman <br> Press letters on keyboard to play "
  newGameWord();
  objGame.keyCount ++;
 }else if(isString(e.keyCode )){
  userGuess = e.key.toLowerCase();
  startValue = 0;
  if(letterUsed(userGuess)){
   newDiv.innerHTML = "Already guessed that letter!";
   elGameWord.appendChild(newDiv);
  }else{
   objGame.usedLetters += userGuess;
   elJumbMsg.innerHTML = objGame.usedLetters;
   objGame.keyCount ++;
   checkInput();
   
  }
 }

}

function isGameOver(){
 if(objGame.wordList.length == 0 && objGame.numTries == 0 ){
  //last word incorrect
  elGameWord.innerHTML ="You did not get the last word correct! ";
  elSectHdr.innerHTML = "Played all words in word list!! Game Over!"
  elJumbMsg.innerHTML = "";
  elImgHint.innerHTML = '<img src="assets/images/turkeyEatsHuman.jpg" />';
  return true;
 }else if(objGame.wordList.length == 0 && arrayOfBlanks.toString() == arrayWord.toString()){
  //last word correct"
  elGameWord.innerHTML ="You got the last word "+objGame.puzzleWord+" correct! ";
  elSectHdr.innerHTML = "Played all words in word list!! Game Over!"
  elJumbMsg.innerHTML = "";
  elImgHint.innerHTML = '<img src="assets/images/winner.jpeg" />';
  return true;
 }
}
function isGameNew(){
 if(objGame.keyCount === -1){
  return true;
 }
}
function newGameWord(){
  objGame.usedLetters = "";
  elJumbMsg.innerHTML = "";
  if(!isGameOver()){
    objGame.keyCount = 0;
    //randomly selects a word from the array of words
    var ranNum = getRandomInt(0, objGame.wordList.length);
    objGame.puzzleWord = objGame.wordList[ranNum];
    elImgHint.innerHTML = '<img src="assets/images/'+objGame.puzzleWord+'.jpeg" />';
    objGame.numTries = parseInt(objGame.puzzleWord.length*.5);
    arrayWord = objGame.puzzleWord.split("")
    //takes word and then replaces letters with '_' 
    // var arrayOfBlanks = arrayWord.map(a=>'_')
    arrayOfBlanks = arrayWord.map(function(a){
      return ' _ ';
    })
    removeWord(objGame.wordList, objGame.puzzleWord);
    elGameWord.innerHTML = "You have "+objGame.numTries+" incorrect letters left to guess word! <br> "+ insertSpaces(arrayOfBlanks);
  }else if(isGameOver()){
   isGameOver();
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function removeWord(arr, word){
  var index = arr.indexOf(word);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}
function insertSpaces(val) {
  var aString = "";
  for(var i = 0; i < val.length; i++){
    aString += val[i];
  }
  return aString.split("").join(" ");
}
function isString(val){
 if(val >= 97 && val <= 122||val >= 65 && val <= 90){
  return true;
 }else{
  newDiv.innerHTML = "Please enter a letter!";
  elGameWord.appendChild(newDiv);
 }
}
function letterUsed(val){
 if(objGame.usedLetters.indexOf(val) !== -1){
  return true;
 }
}
function checkInput(){
 console.log("check input");
  elGameWord.innerHTML = "You have "+objGame.numTries+" incorrect letters left to guess word! <br> "+insertSpaces(arrayOfBlanks);
  elSectMsg.innerHTML = "";
  while (objGame.puzzleWord.indexOf(userGuess, startValue) !== -1) {   
    startValue = objGame.puzzleWord.indexOf(userGuess, startValue) + 1;
    goodGuess();
   
  }
  goodGuess();
  }
 

function goodGuess(){
 if(!startValue && objGame.numTries>0){
  console.log("!startValue && objGame.numTries>0");
  objGame.numTries--;
  elGameWord.innerHTML = "You have "+objGame.numTries+" incorrect letters left to guess word! <br> "+insertSpaces(arrayOfBlanks);
   if(objGame.numTries === 0){
    elSectMsg.innerHTML = "You lost!! Try next word!";
    objGame.lose++;
    updateScore();
    newGameWord();
   }
 }else if(startValue && arrayOfBlanks.toString() == arrayWord.toString()){
  console.log("startValue && arrayOfBlanks.toString() == arrayWord.toString()");
  elGameWord.innerHTML = objGame.puzzleWord + "<br>"
  +"HOORAY You got the word right!! "+
  "You had "+objGame.keyCount+" guesses!!";
  objGame.win++;
  updateScore();
  document.getElementById('sectHdr').innerHTML = 'Press any key to play next word!';
  objGame.keyCount = -1;
 }else {
  console.log("else");
  // replace letter
  // remove letter
  // fill blanks
  arrayOfBlanks[startValue-1] = userGuess;
  elGameWord.innerHTML = "You have "+objGame.numTries+" incorrect letters left to guess word! <br> "+insertSpaces(arrayOfBlanks);
 }
 
}

function updateScore(){
 elDivGmStats.innerHTML = "Wins : " + objGame.win +
 "<br> Lose : " + objGame.lose;
}