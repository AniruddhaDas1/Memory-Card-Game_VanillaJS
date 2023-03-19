const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip')

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();

}

function checkForMatch(){
    //do card match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disablCard() : unflipCards();
    // if(firstCard.dataset.framework === secondCard.dataset.framework){
    //     //It's a match
    //     disablCard();
    // } else {
    //     //not a match
    //     unflipCards();
    // }
}

function disablCard(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard,secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard))