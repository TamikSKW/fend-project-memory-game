/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardList = document.querySelectorAll('li.card');
let openCardList = [];
let moves = 0; //move counter

/**Event Listeners */

Array.from(cardList).forEach(function(element){
    element.addEventListener('click', onClick)
});

/**Functions */

//main functionality function
function onClick(trigger){
    let card = trigger.currentTarget;

    //this check is supposed to prevent selecting more than two cards
    if (pushCard(card)){
        toggleDisplay(card);
    }

    //if openCardList.length > 1
    if (openCardList.length == 2)
    {
        //this checks the value stored in the card, yes the path ends up being long
        if (openCardList[0].firstElementChild.classList[1] == openCardList[1].firstElementChild.classList[1]){
            cardMatch(openCardList);
        }
        else {
            //if there is no match, then run that after a short pause
            setTimeout(function(){  //have to pass our real function call through an anonymous one
                cardNoMatch(openCardList);
            }, 750); //pause is set to 750 miliseconds here
        }
    }

    moveCount();
    gameOver();
}

// display the card's symbol
function toggleDisplay(card){
    //using toggle so we can call this whenever we have to flip a card
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// add the card to a *list* of "open" cards 
// returns TRUE if a card was added, otherwise FALSE
function pushCard(card){
    // we only want to add the card if there is only one other card selected
    if (openCardList.length < 2){
        openCardList.push(card);
        return true;    
    }
    else return false;
}


// if the cards do match, lock the cards in the open position    
function cardMatch(cards){
    //switch the cards to the matching style
    cards.forEach(function(card){
        card.classList.add('match');
    })
    //loop through the list and remove each value
    for ( let i = cards.length; i > 0; i--){
        cards.pop();
    }
}
    
    // must be called after the open function

//if the cards do not match, remove the cards from the list and hide the card's symbol
function cardNoMatch(cards){
    cards.forEach(function(card){
        toggleDisplay(card);
    })
    //loop through the list and remove each value
    for ( let i = cards.length; i > 0; i--){
        cards.pop();
    }
}

//Increment move counter
function moveCount(){
    moves += 1;
    //get the element storing the move value from document
    let el = document.querySelector('.moves');
    el.innerText = moves; //and update it
}

//Checks to see if the game is over
function gameOver(){
    //Set this bool to false if any card does not match
    let allMatch = true;
    cardList.forEach(card => {
        if (!(card.classList.contains('match'))){
            allMatch = false;
        }
    });

    if (allMatch){
        //display win
        console.log('You win!');
    }
}

//Shuffles our array of cards and updates the document
function boardShuffle() {
    shuffle(cardList);
    debugger;

    //get a current list of all the elements on the page
    let dCardList = document.querySelectorAll('li.card');

    for ( let i = 0; i < cardList.length; i++){
        let oldClass = dCardList[i].firstElementChild.classList[1];
        let newClass = cardList[i].firstElementChild.classList[1];
        dCardList[i].firstElementChild.classList.remove(oldClass);
        dCardList[i].firstElementChild.classList.add(newClass);
    }

    cardList = document.querySelectorAll('li.card');
}