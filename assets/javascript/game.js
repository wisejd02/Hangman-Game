var wordList = ["thanksgiving", "turkey", "football", "family", "friends", "pumpkin","food","harvest","autumn" ];
var puzzleWord;
var wordListMax;
var userGuess;
var startValue;
var usedLetters;
var keyCount = 0;
var arrayOfBlanks;
var arrayOfBlanks;

document.getElementById('sectHdr').innerHTML += '<br>Press any key to get started!';

document.onkeypress=function(e){  
  if(keyCount === 0){
    document.getElementById('sectHdr').innerHTML = "Hangman <br> Press letters on keyboard to play"
    newGameWord();
    keyCount++;
    console.log(arrayOfBlanks);
    console.log(arrayWord);
    console.log(wordList);
  }else{
    userGuess = e.key.toLowerCase();
    startValue = 0;
    console.log(userGuess);
    console.log("startvalue "+startValue);
      if(usedLetters.indexOf(userGuess) === -1 && wordList.length > 0){
        usedLetters.push(userGuess);
        keyCount++;
        while (puzzleWord.indexOf(userGuess, startValue) !== -1) {   
          startValue = puzzleWord.indexOf(userGuess, startValue) + 1;
          arrayOfBlanks[startValue-1] = userGuess;

                // replace letter
                // remove letter
                // fill blanks
                document.getElementById('gameWord').innerHTML = arrayOfBlanks;
                if(arrayOfBlanks.toString() == arrayWord.toString()){
                  document.getElementById('gameWord').innerHTML = puzzleWord + "<br>"
                  +"HOORAY You got the word right!! "+
                 "You had "+keyCount+" guesses!!";
                 document.getElementById('sectHdr').innerHTML = 'Press any key to play next word!';
                 if(wordList.length === 0){
                  document.getElementById('sectHdr').innerHTML = "Played all words in word list!! Refresh page to play again!"
                  document.getElementById('gameWord').innerHTML ="";
                  usedLetters = [];
                  break; 
                }
                 keyCount = 0;
                }
        }
      }else{
        alert("already guessed "+userGuess)
      }

    }

  }

function newGameWord(){
   usedLetters = [];
   
   //randomly selects a word from the array of words
   var ranNum = getRandomInt(0, wordList.length);
   puzzleWord = wordList[ranNum];
   console.log(puzzleWord);
   arrayWord = puzzleWord.split("")
   //takes word and then replaces letters with '_' 
   // var arrayOfBlanks = arrayWord.map(a=>'_')
   arrayOfBlanks = arrayWord.map(function(a){
     return '_';
   })
   removeWord(wordList, puzzleWord);
   document.getElementById('gameWord').innerHTML = arrayOfBlanks;
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


