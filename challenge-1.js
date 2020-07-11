/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score, roundScore, activePlayer, dice, dice2, gamePlaying;
var final;
init();

var lastDice;

    alert('GAME RULES:');
    alert('Player lose his ENTIRE SCORE if rolls two 6s in a row');
    alert('you can choose your winning score by adding in FINAL SCORE box [default Winning Score: 100]');
    alert('player loss his CURRENT SCORE when one of dice rolls 1');
    alert('START GAME');


document.querySelector('.btn-roll').addEventListener('click', function()
{

    if (gamePlaying)
    {
        //1. random number

        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        

        //2. display the result

        //dice-1
        var diceDOM =  document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // dice-2
        var diceDOM =  document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        

        //3. update the round score IF the rolled number is NOT 1
        if (lastDice === 6 && dice === 6)
        {
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1 || dice2 !== 1){
        // add score
        roundScore += (dice + dice2);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
        // next player
        nextPlayer();

            }

            lastDice = dice;

    }

});

// HOLD BUTTON


document.querySelector('.btn-hold').addEventListener('click',function(){


    if (gamePlaying)
    {
    //add current score to global score
    score[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    
    //check if player has won
    var winningScore;
    var input = final = document.getElementById('final').value;

    if (input)
    {
        winningScore = input;
    }
    else{
        winningScore = 100;
    }
    

    if (score[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        gamePlaying = false;

    }
    else{
        nextPlayer();

    }

   

    }
   
});


document.querySelector('.btn-new').addEventListener('click',init);


function init()
{
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //document.querySelector('#current-0').textContent = dice;

    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}
