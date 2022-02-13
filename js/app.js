$(document).ready(function(){
    startHangman();
    createButtons();
});

//Start hangman instance
let hangman = new Hangman("","");

function startHangman(){
    let categories = [];
    let wordList = [];

    //Add the categories to a list
    for(let x in Words){
        categories.push(x);
    }
    //Choose random category
    let randomCategory = Math.floor((Math.random() * categories.length));
    let chosenCategory = categories[randomCategory];

    //Add the words from the chosen category into the list
    for(let x of Words[chosenCategory]){
        wordList.push(x);
    }
    //Choose random word
    let randomWord = Math.floor((Math.random() * wordList.length));
    let chosenWord = wordList[randomWord];

    //Set values to hangman then render
    hangman.category = chosenCategory;
    hangman.word = chosenWord;
    hangman.render();
}

function createButtons(){
    //Create the buttons
    for(let i = 1; i<=3; i++){
        LetterListRow[i].forEach(letter => {
            let button = new Buttons(letter, i);
            button.render();
        });
    }
}