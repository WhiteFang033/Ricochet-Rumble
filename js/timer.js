const timeDisplay = document.getElementById('timer');
const pauseBtn = document.getElementById('pause');



var timerId;
var isPaused = false;


function countdown(time, side){
    clearInterval(timerId);
        timerId = setInterval(()=>{
            if(isPaused != true){
                if(time != -1){
                    timeDisplay.innerHTML = `${side}'s Time Left: ${time--}s`;
                    return time;
                }
                else{
                    clearInterval(timerId);
                    console.log('Times Up!');
                    gameOver((side === 'Red')? 'Blue' : 'Red');
                    return (side === 'Red')? 'Blue' : 'Red';
                    }
            }
            
        }
            , 1000);
}
        


// function pause(){
//     clearInterval(timerId);
// }

// function resume(){
//     if(turnBlue === true){
//         countdown('Blue');
//     }
// }

pauseBtn.addEventListener('click', (e)=>{
    if(isPaused === true){
        pauseBtn.children[0].src = 'assets/images/pause.png';
        pauseBtn.children[0].title = 'Pause';
        isPaused = false;
    }
    else{
        pauseBtn.children[0].src = 'assets/images/resume.png';
        pauseBtn.children[0].title = 'Resume';
        isPaused = true;
    }
})