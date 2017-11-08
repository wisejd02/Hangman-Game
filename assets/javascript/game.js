var wordList = ["thanksgiving", "turkey", "football", "family", "friends", "pumpkin","food","harvest","autumn" ];
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
elSectHdr.innerHTML += '<br>Press any key to get started!';
elJumbHdr.innerHTML = 'Used Letters';


document.onkeypress=function(e){ 
  if(wordList.length == 0 && objGame.numTries == 0 ){

  }else if(wordList.length == 0 && arrayOfBlanks.toString() == arrayWord.toString()) {
    elGameWord.innerHTML ="You got the last word "+objGame.puzzleWord+" correct! ";
    elSectHdr.innerHTML = "Played all words in word list!! Game Over!"
    elJumbMsg.innerHTML = "";
    elImgHint.innerHTML = '<img src="assets/images/winner.jpeg" />';
  }else if(objGame.keyCount === -1){
    elSectHdr.innerHTML = "Hangman <br> Press letters on keyboard to play "
    newGameWord();
    objGame.keyCount ++;
  }else{
    if(e.keyCode >= 97 && e.keyCode <= 122||e.keyCode >= 65 && e.keyCode <= 90){
      userGuess = e.key.toLowerCase();
      startValue = 0;
      if(objGame.usedLetters.indexOf(userGuess) === -1){
        objGame.usedLetters += userGuess;
        elJumbMsg.innerHTML = objGame.usedLetters;
        objGame.keyCount ++;
        checkInput(); 
      }else{
        newDiv.innerHTML = "Already guessed that letter!";
        elGameWord.appendChild(newDiv);
      }
    }else{
      newDiv.innerHTML = "Please enter a letter!";
      elGameWord.appendChild(newDiv);
    }
 }
 elDivGmStats.innerHTML = "Wins : " + objGame.win +
 "<br> Lose : " + objGame.lose
}

function newGameWord(){
  objGame.usedLetters = "";
  elJumbMsg.innerHTML = "";
  if(wordList.length !== 0){
    //randomly selects a word from the array of words
    var ranNum = getRandomInt(0, wordList.length);
    objGame.puzzleWord = wordList[ranNum];
    elImgHint.innerHTML = '<img src="assets/images/'+objGame.puzzleWord+'.jpeg" />';
    objGame.numTries = parseInt(objGame.puzzleWord.length*.5);
    arrayWord = objGame.puzzleWord.split("")
    //takes word and then replaces letters with '_' 
    // var arrayOfBlanks = arrayWord.map(a=>'_')
    arrayOfBlanks = arrayWord.map(function(a){
      return ' _ ';
    })
    removeWord(wordList, objGame.puzzleWord);
    elGameWord.innerHTML = "You have "+objGame.numTries+" misses left to guess word! <br> "+ insertSpaces(arrayOfBlanks);
  }else{
    elSectHdr.innerHTML = "Played all words in word list!! Game Over!"
    elGameWord.innerHTML ="";
    elJumbMsg.innerHTML = "";
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


function checkInput(){
  elGameWord.innerHTML = "You have "+objGame.numTries+" misses left to guess word! <br> "+insertSpaces(arrayOfBlanks);
  elSectMsg.innerHTML = "";
  while (objGame.puzzleWord.indexOf(userGuess, startValue) !== -1) {   
    startValue = objGame.puzzleWord.indexOf(userGuess, startValue) + 1;
    console.log(startValue);
    arrayOfBlanks[startValue-1] = userGuess;
    // replace letter
    // remove letter
    // fill blanks
    elGameWord.innerHTML = "You have "+objGame.numTries+" misses left to guess word! <br> "+insertSpaces(arrayOfBlanks);
    if(arrayOfBlanks.toString() == arrayWord.toString()){
      elGameWord.innerHTML = objGame.puzzleWord + "<br>"
      +"HOORAY You got the word right!! "+
      "You had "+objGame.keyCount+" guesses!!";
      objGame.win++;
      document.getElementById('sectHdr').innerHTML = 'Press any key to play next word!';
      objGame.keyCount = -1;
    }
  }
  if(!startValue){
    objGame.numTries--;
    elGameWord.innerHTML = "You have "+objGame.numTries+" misses left to guess word! <br> "+insertSpaces(arrayOfBlanks);
    if(objGame.numTries === 0){
      objGame.lose++;
      objGame.keyCount = 0;
      if(wordList.length !== 0){
        elSectMsg.innerHTML = "You lost!! Try next word!";
        newGameWord();
      }else{
        if(objGame.numTries>0){
          
          elGameWord.innerHTML ="You got the last word "+objGame.puzzleWord+" correct! ";
          
        }else{
          
          elGameWord.innerHTML ="You did not get the last word correct! ";
          elImgHint.innerHTML = '<img src="assets/images/turkeyEatsHuman.jpg" />';
          
        }
        elSectHdr.innerHTML = "Played all words in word list!! Game Over!"
        elJumbMsg.innerHTML = "";
        
      }
    }
  }
  
}