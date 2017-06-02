/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

//New rules
- A player looses his entire (roundScore + globalScore) score if he rolls 2 sixes in a row. Next player starts after that
- An input field exists where you can write the winning score
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is 1

*/
var scores, roundScore, activePlayer, gamePlaying, counter, inp, winningScore;


init();


function init(){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    counter=0;
    
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='PLAYER1';
    document.getElementById('name-1').textContent='PLAYER2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying=true;
}





document.querySelector('.btn-roll').addEventListener('click',function(){
    //if game is playing then do something 
    if(gamePlaying){
        
    //first we need a randome number
    var dice=Math.floor(Math.random()*6)+1;
    var dice1=Math.floor(Math.random()*6)+1;
    
    
    //display the number
    var diceDOM=document.querySelector('.dice');
    var diceDOM1=document.querySelector('.dice1');
    diceDOM.style.display='block';
    diceDOM1.style.display='block';
    diceDOM.src='dice-'+dice+'.png';
    diceDOM1.src='dice-'+dice1+'.png';
    //Update the round score only if rolled number is not 1
    if(dice===6 && dice1 ===6){
        roundScore=0;
        scores[activePlayer]=0;
        document.getElementById('current-' + activePlayer).textContent=0;
        document.getElementById('score-' + activePlayer).textContent=0;
        nextPlayer();
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
    }else if(dice!==1 && dice1!==1){
        //add score
        roundScore+=dice+dice1;
        document.querySelector('#current-'+activePlayer).textContent=roundScore;
    }else{
        //next player
        
        nextPlayer();
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
    }
    
}
});



document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
       
   //ADD current score to global score
    scores[activePlayer]+=roundScore;
    
    
    //update the UI
    
    document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
    //Check if the player won the game
        
    inp=document.querySelector('.final-score').value;
    //"", undefined, 0 are COERCED to false everything else coerced to true
    if(inp){
        winningScore=inp;        
    }else{
        winningScore=10;
    }
        
    console.log(inp)
    playerWins();    
}

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore=0;
    
    //set current score to 0 in user interface
    document.getElementById("current-0").textContent=0;
    document.getElementById("current-1").textContent=0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function playerWins(){
    if(scores[activePlayer]>=winningScore){
        document.querySelector('#name-' + activePlayer).textContent='WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying=false;
    }else{
        nextPlayer();
    }
}

document.querySelector('.btn-new').addEventListener('click',function(){
    init();
});







