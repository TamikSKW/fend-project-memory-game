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

//Running boardShuffle so that the page does proper initalizing
boardShuffle();

/**Event Listeners */

Array.from(cardList).forEach(function(element){
    element.addEventListener('click', onClick)
});

document.querySelector('.restart').addEventListener('click', function(){
    boardShuffle()
});

/**Functions */

//main functionality function
function onClick(trigger){
    let card = trigger.currentTarget;

    //this check is supposed to prevent selecting more than two cards
    if (pushCard(card)){
        toggleDisplay(card);

        //if openCardList.length > 1
        if (openCardList.length == 2)
        {
            //Move counter should only be incremented when a cards are compared
            moveCount();
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
        
    }

    
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
    if (openCardList.length < 2 && card !== openCardList[0]){
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

    //rating logic
    let stars = document.querySelector('.stars');
    if (moves < 12){
        //3 stars
        stars.children[0].style.color = 'gold';
        stars.children[1].style.color = 'gold';
        stars.children[2].style.color = 'gold';
    }
    else if (moves < 16){
        //2 stars
        stars.children[0].style.color = 'gold';
        stars.children[1].style.color = 'gold';
        stars.children[2].style.color = 'black';
    }
    else if (moves < 20){
        //1 star
        stars.children[0].style.color = 'gold';
        stars.children[1].style.color = 'black';
        stars.children[2].style.color = 'black';
    }
    else{
        //no stars
        stars.children[0].style.color = 'black';
        stars.children[1].style.color = 'black';
        stars.children[2].style.color = 'black';
        
    }
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
        setTimeout(function(){
            alert(`You won after ${moves} moves!`);
        }, 250);
    }
}

//Shuffles our array of cards and updates the document
function boardShuffle() {
    //make a simple array of the card values (the symbols)
    let sCards = [];
    cardList.forEach(function(card){
        sCards.push(card.firstElementChild.classList[1]);
    })
    sCards = shuffle(sCards);

    //get a current list of all the elements on the page
    let dCardList = document.querySelectorAll('li.card');

    //takes each element and changes the class to the value in the shuffled list
    for ( let i = 0; i < cardList.length; i++){
        let oldClass = dCardList[i].firstElementChild.classList[1];
        let newClass = sCards[i];
        dCardList[i].firstElementChild.classList.remove(oldClass);
        dCardList[i].firstElementChild.classList.add(newClass);
    }

    //make sure our list matches the new one
    cardList = document.querySelectorAll('li.card');
    
    //reset the move counter
    moves = -1;
    moveCount();

    dCardList.forEach(function(element){
        element.classList.remove('show');
        element.classList.remove('open');
    });
}