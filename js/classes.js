class Hangman{
    constructor(category, word){
        this.category = category;
        this.word = word;
        this.livesLeft = 6;
        this.wordLength = this.getWordLength();
        this.correctGuesses = 0;
    }

    set category(category){
        this._category = category;
    }
    set word(word){
        this._word = word;
        this._wordLength = this.getWordLength();
    }
    set livesLeft(livesLeft){
        this._livesLeft = livesLeft;
    }
    set wordLength(wordLength){
        this._wordLength = wordLength;
    }
    set correctGuesses(correctGuesses){
        this._correctGuesses = correctGuesses;
    }

    get category(){
        return this._category;
    }
    get word(){
        return this._word;
    }
    get livesLeft(){
        return this._livesLeft;
    }
    get wordLength(){
        return this._wordLength;
    }
    get correctGuesses(){
        return this._correctGuesses;
    }

    //Get length without spaces, - and &
    getWordLength(){
        let tempWord = this.word;
        tempWord = tempWord.replace(/\s|-|&/g, "");
        return tempWord.length;
    }

    checkLetter(letter){
        if(!(this.word.toUpperCase()).includes(letter)){
            //If letter is not in the word, lose a life
            this.loseLife();
        }
        else{
            let indexes = [];
            let lastIndex = 0;

            //we 100% have a first index because we previously checked
            let index = (this.word.toUpperCase()).indexOf(letter, lastIndex);
            while(index != -1){
                indexes.push(index);
                lastIndex = index + 1;

                //get next index
                index = (this.word.toUpperCase()).indexOf(letter, lastIndex);
            }

            indexes.forEach(index => {
                //Change the _ to the right letter
                $("#letter_"+index).html(letter);
                
                //Increase correct guesses for each index
                this.correctGuesses++;
            });
        }

        //If we guessed all letters, we won
        if(this.correctGuesses == this.wordLength){
            this.renderGameStatus("win");
        }
    }

    loseLife(){
        //Remove lives
        this.livesLeft--;
        this.renderLivesLeft();

        //Change hangman image
        $("#game-hangman-image").attr("src","img/hangman"+(6-this.livesLeft)+".png");

        //If player loses, show loss screen
        if(this.livesLeft == 0){
            this.renderGameStatus("lose");
        }
    }

    render(){
        //Hide the alert
        $("#game-result").hide();

        //Show category, length, lives left
        $("#game-category").html("Category: "+this.category);
        $("#game-length").html("Word length: "+this.wordLength+" letters");
        this.renderLivesLeft();

        //Show the field for the word
        $("#game-word").empty();
        for(let i = 0; i < this.word.length; i++){
            let element = ``;
            if(this.word.charAt(i) == " "){
                element = `<p id="letter_`+i+`">&nbsp;</p>`;
            }
            else if(this.word.charAt(i) == "-"){
                element = `<p id="letter_`+i+`">-</p>`;
            }
            else if(this.word.charAt(i) == "&"){
                element = `<p id="letter_`+i+`">&</p>`;
            }
            else{
                element = `<p id="letter_`+i+`">_</p>`;
            }
            $("#game-word").append(element);
        }
    }

    renderLivesLeft(){
        $("#game-lives").html(this.livesLeft+" lives left");
    }

    renderGameStatus(status){
        //Disable all buttons
        $(".letter-button").prop("disabled", true);

        //Render status screen
        let element = ``;
        //Win Case
        if(status == "win"){
            element = `
                <h2>Congratulations!</h2>
                <h2>You won!</h2>
            `;
        }
        //Lose case
        else{
            element = `
                <h2>Ohh no!</h2>
                <h2>You lost!</h2>
            `;
        }
        //Standard
        element += `
            <p>The word was: `+this.word+`</p>
            <p>You had `+(6 - this.livesLeft)+` mistake(s)</p>
            <button id="play-again-button">Play again</button>
        `;
        
        $("#game-result").html(element);
        $("#game-result").show();

        //Set reset button click Event
        $("#play-again-button").click(() => {
            this.resetGame();
        });
    }

    resetGame(){
        //Reset the game
        this.livesLeft = 6;
        this.correctGuesses = 0;
        
        //Enable all buttons
        $(".letter-button").prop("disabled", false);

        //Reset hangman image
        $("#game-hangman-image").attr("src","img/hangman"+(6-this.livesLeft)+".png");

        //Hide the alert
        $("#game-result").hide();
        $("#game-result").empty();

        startHangman();
    }
}

class Buttons{
    constructor(name, row){
        this.name = name;
        this.row = row;
        this.wasPressed = false;
    }

    set name(name){
        this._name = name;
    }
    set row(row){
        this._row = row;
    }
    set wasPressed(wasPressed){
        this._wasPressed = wasPressed;
    }

    get name(){
        return this._name;
    }
    get row(){
        return this._row;
    }
    get wasPressed(){
        return this._wasPressed;
    }

    render(){
        //Add buttons
        let element = `<button class="letter-button" id="letter-button_`+this.name+`">`+this.name+`</button>`;
        $("#game-buttons-row-"+this.row).append(element);

        //Set click Event
        $("#letter-button_"+this.name).click(() => {
            //Disable button
            this.wasPressed = true;
            $("#letter-button_"+this.name).prop("disabled", true);

            //Check the letter for the button pressed
            hangman.checkLetter(this.name);
        });
    }
}