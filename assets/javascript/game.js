var wordList = ["thanksgiving", "turkey", "football", "family", "friends", "pumpkin","food","harvest","autumn" ];
var userGuess;
var startValue;
var arrayOfBlanks;
var objGame = {};
//objGame.puzzleWord;
//objGame.numTries;
objGame.keyCount = -1;
objGame.usedLetters = "";
var elGameWord = document.getElementById('gameWord');
var elSectHdr = document.getElementById('sectHdr');
elSectHdr.innerHTML += '<br>Press any key to get started!';

document.onkeypress=function(e){  
 if(objGame.keyCount === -1){
  elSectHdr.innerHTML = "Hangman <br> Press letters on keyboard to play "
  newGameWord();
 
  objGame.keyCount ++;
  console.log(arrayOfBlanks);
  console.log(arrayWord);
  console.log(wordList);
 }else{
  userGuess = e.key.toLowerCase();
  startValue = 0;
  console.log(userGuess);
  console.log("startvalue "+startValue);
  if(objGame.usedLetters.indexOf(userGuess) === -1){

   objGame.usedLetters += userGuess;
   objGame.keyCount ++;
   
   console.log("tries: "+ objGame.numTries +" count: "+objGame.keyCount);
   objGame.numTries--;
   
   if(objGame.numTries == 0){
    alert("out of tries")
    if(objGame.lose == undefined){
      objGame.lose = 1;
    }else{
      objGame.lose++;
    }
    
    keyCount = 0;
    objGame.keyCount = 0;
    newGameWord();
   }else{
    checkInput();
   }
  }else{
   alert("already guessed "+userGuess)
    ///use  var newDiv = document.createElement("div");
      // newDiv.innerHTML = "A pleasure to meet you!";
      //       targetDiv.appendChild(newDiv); // append child will create an array of elements and puts it inside 
      //       // We then apply that CSS to our newDiv.
      //       newDiv.setAttribute("class", "fancy");
  }
 }
console.log(objGame);
}
function newGameWord(){
 
 objGame.usedLetters = "";
 //randomly selects a word from the array of words
 var ranNum = getRandomInt(0, wordList.length);
 objGame.puzzleWord = wordList[ranNum];
 objGame.numTries = objGame.puzzleWord.length+parseInt(objGame.puzzleWord.length*.5);
 console.log("numTries "+objGame.numTries);
 //console.log(puzzleWord);
 arrayWord = objGame.puzzleWord.split("")
 //takes word and then replaces letters with '_' 
 // var arrayOfBlanks = arrayWord.map(a=>'_')
 arrayOfBlanks = arrayWord.map(function(a){
  return '_';
 })
 removeWord(wordList, objGame.puzzleWord);
 elGameWord.innerHTML = "You have "+objGame.numTries+" tries to guess word! <br> "+arrayOfBlanks;
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
function checkInput(){
 elGameWord.innerHTML = "You have "+objGame.numTries+" tries to guess word! <br> "+arrayOfBlanks;
 while (objGame.puzzleWord.indexOf(userGuess, startValue) !== -1) {   
  startValue = objGame.puzzleWord.indexOf(userGuess, startValue) + 1;
  arrayOfBlanks[startValue-1] = userGuess;
  // replace letter
  // remove letter
  // fill blanks
  elGameWord.innerHTML = "You have "+objGame.numTries+" tries to guess word! <br> "+arrayOfBlanks;
  if(arrayOfBlanks.toString() == arrayWord.toString()){
   elGameWord.innerHTML = objGame.puzzleWord + "<br>"
    +"HOORAY You got the word right!! "+
    "You had "+objGame.keyCount+" guesses!!";
    
     if(objGame.win == undefined){
      objGame.win = 1;
     }else{
      objGame.win++;
     }
   document.getElementById('sectHdr').innerHTML = 'Press any key to play next word!';
   if(wordList.length === 0){
    elSectHdr.innerHTML = "Played all words in word list!! Refresh page to play again!"
    elGameWord.innerHTML ="";
    objGame.usedLetters = "";
    break; 
   }
   keyCount = -1;
   objGame.keyCount = -1;
  }
 }
}