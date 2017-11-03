var wordList = ["thanksgiving", "turkey", "football", "family", "friends", "pumpkin","food","harvest","autumn" ];
var puzzleWord;
var wordListMax =  wordList.length-1;
hdrTitle = document.getElementById(hdrHangman).innerHTML ;
hdrTitle =  hdrTitle + '<br>Press any key to get started!';
document.onkeypress=function(e){
    //do the required work
 var ranNum = getRandomInt(0,wordListMax);
 alert(wordListMax);
 puzzleWord = wordList[getRandomInt(0,wordListMax)];
 alert(puzzleWord);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}