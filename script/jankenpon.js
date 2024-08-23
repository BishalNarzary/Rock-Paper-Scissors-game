let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScoreElement();

let result = JSON.parse(localStorage.getItem('result')) || ``;

updateResultElement();

let playerMove = JSON.parse(localStorage.getItem('playerMove')) || ``;
let computerMove = JSON.parse(localStorage.getItem('computerMove')) || ``;

updateMoveElement();

let isAutoPlaying=false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
    document.querySelector('.js-auto-play-button')
      .innerHTML='Stop Playing';
    intervalId=setInterval(()=>{
      const autoMove=pickComputerMove();
      playGame(autoMove);
    }, 1000);
    isAutoPlaying=true;
  }
  else{
    document.querySelector('.js-auto-play-button')
      .innerHTML='Auto Play';
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}

function resetScore(){
  score.wins=0;
    score.loses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();

    localStorage.removeItem('result');
    updateResultElement();

    localStorage.removeItem('playerMove');
    localStorage.removeItem('computerMove');
    updateMoveElement();

    document.querySelector('.js-result')
      .innerHTML='';

    document.querySelector('.js-moves')
      .innerHTML='';
}

document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', ()=>{
    document.querySelector('.js-confirm-reset')
      .innerHTML='Are you sure you want to reset the score? <button class="js-yes-button yes-button">Yes</button> <button class="js-no-button no-button">No</button>';
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', ()=>{
    autoPlay();
  });

document.body.addEventListener('keydown', (event)=>{
  if (event.key==='r'){
    playGame('rock');
  }
  else if (event.key==='p'){
    playGame('paper');
  }
  else if (event.key==='s'){
    playGame('scissors');
  }
  else if (event.key==='Backspace'){
    document.querySelector('.js-confirm-reset')
      .innerHTML='Are you sure you want to reset the score? <button class="js-yes-button yes-button">Yes</button> <button class="js-no-button no-button">No</button>';
  }
  else if (event.key==='a'){
    autoPlay();
  }
})

document.querySelector('.js-confirm-reset')
  .addEventListener('click', (event)=>{
    if (event.target.classList.contains('js-yes-button')){
      resetScore();
    }
    document.querySelector('.js-confirm-reset')
      .innerHTML='';
  });

function playGame(myMove){
  playerMove=myMove;
  computerMove = pickComputerMove();

  if (playerMove === `rock`){
    if(computerMove === `rock`){
      result = `Tie.`;
    }
    else if(computerMove === `paper`){
      result = `You lose.`;
    }
    else if(computerMove === `scissors`){
      result = `You win.`;
    }
  }

  else if (playerMove === `paper`){
    if(computerMove === `rock`){
      result = `You win.`;
    }
    else if(computerMove === `paper`){
      result = `Tie.`;
    }
    else if(computerMove === `scissors`){
      result = `You lose.`;
    }
  }

  else if (playerMove === `scissors`){
    if(computerMove === `rock`){
      result = `You lose.`;
    }
    else if(computerMove === `paper`){
      result = `You win.`;
    }
    else if(computerMove === `scissors`){
      result = `Tie.`;
    }
  }

  if (result === `You win.`){
    score.wins += 1;
  }
  else if (result === `You lose.`){
    score.loses += 1;
  }
  else if (result === `Tie.`){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  localStorage.setItem('result', JSON.stringify(result));

  updateResultElement();

  localStorage.setItem('playerMove', JSON.stringify(playerMove));
  localStorage.setItem('computerMove', JSON.stringify(computerMove));

  updateMoveElement();
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML=`Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

function updateResultElement(){
  document.querySelector('.js-result')
    .innerHTML=result;
}

function updateMoveElement(){
  if ((playerMove!='')||(computerMove!='')){
    document.querySelector('.js-moves')
      .innerHTML=`You <img src="jankenpon-img/${playerMove}-emoji.png" class="move-icon"> <img src="jankenpon-img/${computerMove}-emoji.png" class="move-icon"> Computer`;
  }
  else{
    document.querySelector('.js-moves')
      .innerHTML=``;
  }
}
  
function pickComputerMove(){
  let computerMove = ``;

  const randomNumber = Math.random();

  if((randomNumber>=0)&&(randomNumber<1/3)){
    computerMove = `rock`;
  }
  else if((randomNumber>=1/3)&&(randomNumber<2/3)){
    computerMove = `paper`;
  }
  else if((randomNumber>=2/3)&&(randomNumber<1)){
    computerMove = `scissors`;
  }

  return computerMove;
}