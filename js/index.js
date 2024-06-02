const fieldElements = document.getElementsByClassName('field')[0];
const pieces = document.getElementsByTagName('img');
const rotatebtns = document.getElementsByClassName('rotate');
const displayOver = document.getElementsByClassName('game-over')[0];
const rotationOptions = document.getElementById('rotationOptions');
var turnRed = true;
var turnBlue = false;
var rotateRico;
var bullet;
var ricoRotationRed = 0;
var ricoRotationBlue = 0;
var semiRicoRotationRed = 90;
var semiRicoRotationBlue = 180;



//set alloted time for each side in seconds
var allotedTime = 60;

//Listening for the mouseclick on the board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        fieldElements.children[i].children[j].addEventListener('click', (e) => {  

            if(rotationOptions.children.length !=0){
                Array.from(rotationOptions.children).forEach(child=>{
                    child.remove();
                })
            }

            rotateRico = false;

            if(turnRed && isPaused != true){
                if ((e.target.id != 'tank1' && e.target.id != 'tank2') && ((e.target.matches('img') || (e.target.matches('.dot')))) && (e.target.matches('.red'))){
                    
                    //disabling the rotating buttons
                    removeMoveOptions();
                    
                    rotateRico = false;

                    //adding move options on left and right sides
                    if (!e.target.matches('.dot') && e.target.parentElement.previousElementSibling.children.length === 0) {
                        e.target.parentElement.previousElementSibling.innerHTML = `<div class ='dot' data-row = ${i} data-col = ${j-1}></div>`;
                    }
                    if (!e.target.matches('.dot') && e.target.parentElement.nextElementSibling.children.length === 0) {
                        e.target.parentElement.nextElementSibling.innerHTML = `<div class ='dot' data-row = ${i} data-col = ${j+1}></div>`;
                    }
                    
                    console.log(i, j)
                    //adding move options in the above and below rows
                    if(i===7){
                        for(k = i ; k>i-2 && k<8 && k>=0; k--){
                            for(l = j-1; l<j+2 && l<8 && l>=0; l++){
                                if(!e.target.matches('.dot') && e.target.parentElement.parentElement.parentElement.children[k].children[l].children.length === 0)
                                    {
                                        e.target.parentElement.parentElement.parentElement.children[k].children[l].innerHTML = `<div class ='dot' data-row = ${k} data-col = ${l}></div>`;
                                    }
                            }
                        }
                    }else{
                        for(k = i+1 ; k>i-2 && k<8 && k>=0; k--){
                            for(l = j-1; l<j+2 && l<8 && l>=0; l++){
                                if(!e.target.matches('.dot') && e.target.parentElement.parentElement.parentElement.children[k].children[l].children.length === 0)
                                    {
                                        e.target.parentElement.parentElement.parentElement.children[k].children[l].innerHTML = `<div class ='dot' data-row = ${k} data-col = ${l}></div>`;
                                    }
                            }
                        }
                    }

                if(e.target.id === 'ricochet2' && isPaused !=true){
                    //Rotation Buttons

                    const rotateL = document.createElement('button');
                    rotateL.classList.add('rotate');
                    rotateL.id = "rotateL";
                    rotateL.innerHTML = 'Left';

                    const rotateR = document.createElement('button');
                    rotateR.classList.add('rotate');
                    rotateR.id = "rotateL";
                    rotateR.innerHTML = 'Right';

                    rotationOptions.append(rotateL);
                    rotationOptions.append(rotateR);

                    //rotate left
                    rotateL.addEventListener('click', (evt)=>{
                            console.log('yes')
                            let ricoRed = document.getElementById('ricochet2');
                            ricoRotationRed += 90;
                            ricoRed.style.transform = `rotateZ(${ricoRotationRed}deg)`;

                            if(ricoRed.dataset.reflect === 'right'){
                                ricoRed.dataset.reflect = 'left';
                            }
                            else if(ricoRed.dataset.reflect === 'left'){
                                ricoRed.dataset.reflect = 'right';
                            }
                            shootBullet("red");
                            rotateRico = true;
                            turnBlue = true;
                            turnRed = false;
                            removeMoveOptions();
                            rotateL.remove();
                            rotateR.remove();
                        
                    })
                    //rotateRight
                    rotateR.addEventListener('click', ()=>{
                        let ricoRed = document.getElementById('ricochet2');

                        ricoRotationRed -= 90;
                        ricoRed.style.transform = `rotateZ(${ricoRotationRed}deg)`;

                        if(ricoRed.dataset.reflect === 'right'){
                            ricoRed.dataset.reflect = 'left';
                        }
                        else if(ricoRed.dataset.reflect === 'left'){
                                ricoRed.dataset.reflect = 'right';
                        }

                        rotateL.remove();
                        rotateR.remove();
                        shootBullet("red");
                        rotateRico = true;
                        turnBlue = true;
                        turnRed = false;
                        removeMoveOptions();
                    })
                }
                else if(e.target.id === 'semi-ricochet2' && isPaused !=true){

                    const rotateL = document.createElement('button');
                    rotateL.classList.add('rotate');
                    rotateL.id = "rotateL";
                    rotateL.innerHTML = 'Left';

                    const rotateR = document.createElement('button');
                    rotateR.classList.add('rotate');
                    rotateR.id = "rotateL";
                    rotateR.innerHTML = 'Right';

                    rotationOptions.append(rotateL);
                    rotationOptions.append(rotateR);

                    rotateL.addEventListener('click', (evt)=>{
                        let semiRicoRed = document.getElementById('semi-ricochet2');

                        semiRicoRotationRed -= 90;
                        semiRicoRed.style.transform = `rotateZ(${semiRicoRotationRed}deg)`;

                        if(semiRicoRed.dataset.reflect === 'right'){
                            semiRicoRed.dataset.reflect = 'left';
                        }
                        else if(semiRicoRed.dataset.reflect === 'left'){
                                semiRicoRed.dataset.reflect = 'right';
                        }

                        if(semiRicoRed.dataset.orientation === 'South-East'){
                            semiRicoRed.dataset.orientation = 'North-East';
                        }
                        else if(semiRicoRed.dataset.orientation === 'North-East'){
                            semiRicoRed.dataset.orientation = 'North-West';
                        }
                        else if(semiRicoRed.dataset.orientation === 'North-West'){
                            semiRicoRed.dataset.orientation = 'South-West';
                        }
                        else if(semiRicoRed.dataset.orientation === 'North-West'){
                            semiRicoRed.dataset.orientation = 'South-East';
                        }


                        shootBullet("red")
                        rotateRico = true;
                        turnBlue = true;
                        turnRed = false;
                        rotateL.remove();
                        rotateR.remove();
                        removeMoveOptions();
                    })
                    //rotateRight
                    rotateR.addEventListener('click', (evt)=>{
                        let semiRicoRed = document.getElementById('semi-ricochet2');

                        semiRicoRotationRed+= 90;
                        semiRicoRed.style.transform = `rotateZ(${semiRicoRotationRed}deg)`;

                        if(semiRicoRed.dataset.reflect === 'right'){
                            semiRicoRed.dataset.reflect = 'left';
                        }
                        else if(semiRicoRed.dataset.reflect === 'left'){
                                semiRicoRed.dataset.reflect = 'right';
                        }

                        if(semiRicoRed.dataset.orientation === 'South-East'){
                            semiRicoRed.dataset.orientation = 'South-West';
                        }
                        else if(semiRicoRed.dataset.orientation === 'South-West'){
                            semiRicoRed.dataset.orientation = 'North-West';
                        }
                        else if(semiRicoRed.dataset.orientation === 'North-West'){
                            semiRicoRed.dataset.orientation = 'North-East';
                        }
                        else if(semiRicoRed.dataset.orientation === 'North-East'){
                            semiRicoRed.dataset.orientation = 'South-East';
                        }

                        rotateL.remove();
                        rotateR.remove();
                        shootBullet("red")
                        rotateRico = true;
                        turnBlue = true;
                        turnRed = false;
                        removeMoveOptions();
                    })
                }
                
                if(!rotateRico){
                    const marks = document.getElementsByClassName('dot');
                    Array.from(marks).forEach(mark=>{
                    mark.addEventListener('click', (evt)=>{
                        if(isPaused != true){
                            fieldElements.children[evt.target.dataset.row].children[evt.target.dataset.col].append(e.target);
                            shootBullet("red");

                            if(rotationOptions.children.length !=0){
                                Array.from(rotationOptions.children).forEach(child=>{
                                    child.remove();
                                })
                            }
                            
                            
                            turnBlue = true;
                            turnRed = false;
                        }
                        
    
                    })
                })
            }
                }
                else{
                    removeMoveOptions();
                }
            }
            else if(turnBlue && isPaused != true){
                if ((e.target.id != 'tank1' && e.target.id != 'tank2') && ((e.target.matches('img') || (e.target.matches('.dot')))) && (e.target.matches('.blue'))){
                    removeMoveOptions();
    
                    if (!e.target.matches('.dot') && e.target.parentElement.previousElementSibling.children.length === 0) {
                        e.target.parentElement.previousElementSibling.innerHTML = `<div class ='dot' data-row = ${i} data-col = ${j-1}></div>`;
                    }
                    if (!e.target.matches('.dot') && e.target.parentElement.nextElementSibling.children.length === 0) {
                        e.target.parentElement.nextElementSibling.innerHTML = `<div class ='dot' data-row = ${i} data-col = ${j+1}></div>`;
                    }
                    if(i==0){
                        for(k = i ; k<i+2 && k<8 && k>=0; k++){
                            for(l = j-1; l<j+2 && l<8 && l>=0; l++){
                                if(!e.target.matches('.dot') && e.target.parentElement.parentElement.parentElement.children[k].children[l].children.length === 0)
                                    {
                                        e.target.parentElement.parentElement.parentElement.children[k].children[l].innerHTML = `<div class ='dot' data-row = ${k} data-col = ${l}></div>`;
                                    }
                            }
                        }
                    }
                    else{
                        for(k = i-1 ; k<i+2 && k<8 && k>=0; k++){
                            for(l = j-1; l<j+2 && l<8 && l>=0; l++){
                                if(!e.target.matches('.dot') && e.target.parentElement.parentElement.parentElement.children[k].children[l].children.length === 0)
                                    {
                                        e.target.parentElement.parentElement.parentElement.children[k].children[l].innerHTML = `<div class ='dot' data-row = ${k} data-col = ${l}></div>`;
                                    }
                            }
                        }
                    }


                    if(e.target.id === 'ricochet1' && isPaused != true){

                        const rotateL = document.createElement('button');
                        rotateL.classList.add('rotate');
                        rotateL.id = "rotateL";
                        rotateL.innerHTML = 'Left';

                        const rotateR = document.createElement('button');
                        rotateR.classList.add('rotate');
                        rotateR.id = "rotateL";
                        rotateR.innerHTML = 'Right';

                        rotationOptions.append(rotateL);
                        rotationOptions.append(rotateR);

                        //RotateLeft
                        rotateL.addEventListener('click', ()=>{
                            let ricoBlue = document.getElementById('ricochet1');

                            ricoRotationBlue += 90;
                            ricoBlue.style.transform = `rotateZ(${ricoRotationBlue}deg)`;

                            if(ricoBlue.dataset.reflect === 'right'){
                                ricoBlue.dataset.reflect = 'left';
                            }
                            else if(ricoBlue.dataset.reflect === 'left'){
                                ricoBlue.dataset.reflect = 'right';
                            }

                            rotateL.remove();
                            rotateR.remove();
                            shootBullet("blue");
                            rotateRico = true;
                            turnBlue = false;
                            turnRed = true;
                            removeMoveOptions();
                        });
                        //rotateRight
                        rotateR.addEventListener('click', ()=>{
                            let ricoBlue = document.getElementById('ricochet1');

                            ricoRotationBlue -= 90;
                            ricoBlue.style.transform = `rotateZ(${ricoRotationBlue}deg)`;

                            if(ricoBlue.dataset.reflect === 'right'){
                                ricoBlue.dataset.reflect = 'left';
                            }
                            else if(ricoBlue.dataset.reflect === 'left'){
                                ricoBlue.dataset.reflect = 'right';
                            }

                            turnBlue = false;
                            turnRed = true;
                            rotateL.remove();
                            rotateR.remove();
                            shootBullet("blue");
                            rotateRico = true;
                            removeMoveOptions();
                        })
                    }
                    else if(e.target.id === 'semi-ricochet1' && isPaused != true){


                        const rotateL = document.createElement('button');
                        rotateL.classList.add('rotate');
                        rotateL.id = "rotateL";
                        rotateL.innerHTML = 'Left';

                        const rotateR = document.createElement('button');
                        rotateR.classList.add('rotate');
                        rotateR.id = "rotateL";
                        rotateR.innerHTML = 'Right';

                        rotationOptions.append(rotateL);
                        rotationOptions.append(rotateR);

                        //rotateLeft
                        rotateL.addEventListener('click', (evt)=>{
                            let semiRicoBlue = document.getElementById('semi-ricochet1');

                            semiRicoRotationBlue -= 90;
                            semiRicoBlue.style.transform = `rotateZ(${semiRicoRotationBlue}deg)`;
                            // if(semiRicoBlue.classList.contains('rotate90')){
                            //     semiRicoBlue.classList.remove('rotate90');
                            // }
                            // else{
                            //     semiRicoBlue.classList.add('rotate90');
                            // }
                            
                            if(semiRicoBlue.dataset.reflect === 'right'){
                                semiRicoBlue.dataset.reflect = 'left';
                            }
                            else if(semiRicoBlue.dataset.reflect === 'left'){
                                semiRicoBlue.dataset.reflect = 'right';
                            }

                            if(semiRicoBlue.dataset.orientation === 'South-East'){
                                semiRicoBlue.dataset.orientation = 'North-East';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'North-East'){
                                semiRicoBlue.dataset.orientation = 'North-West';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'North-West'){
                                semiRicoBlue.dataset.orientation = 'South-West';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'North-West'){
                                semiRicoBlue.dataset.orientation = 'South-East';
                            }

                            rotateL.remove();
                            rotateR.remove();
                            shootBullet("blue")
                            rotateRico = true;
                            turnBlue = false;
                            turnRed = true;
                            removeMoveOptions();
                        })

                        //rotateRight
                        rotateR.addEventListener('click', (evt)=>{
                            let semiRicoBlue = document.getElementById('semi-ricochet1');

                            semiRicoRotationBlue += 90;
                            semiRicoBlue.style.transform = `rotateZ(${semiRicoRotationBlue}deg)`;
                            // if(semiRicoBlue.classList.contains('rotate90')){
                            //     semiRicoBlue.classList.remove('rotate90');
                            // }
                            // else{
                            //     semiRicoBlue.classList.add('rotate90');
                            // }
                            
                            if(semiRicoBlue.dataset.reflect === 'right'){
                                semiRicoBlue.dataset.reflect = 'left';
                            }
                            else if(semiRicoBlue.dataset.reflect === 'left'){
                                semiRicoBlue.dataset.reflect = 'right';
                            }

                            if(semiRicoBlue.dataset.orientation === 'South-East'){
                                semiRicoBlue.dataset.orientation = 'South-West';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'South-West'){
                                semiRicoBlue.dataset.orientation = 'North-West';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'North-West'){
                                semiRicoBlue.dataset.orientation = 'North-East';
                            }
                            else if(semiRicoBlue.dataset.orientation === 'North-East'){
                                semiRicoBlue.dataset.orientation = 'South-East';
                            }

                            rotateL.remove();
                            rotateR.remove();
                            shootBullet("blue")
                            rotateRico = true;
                            turnBlue = false;
                            turnRed = true;
                            removeMoveOptions();
                        })
                    }
                    
                    if(!rotateRico){
    
                        const marks = document.getElementsByClassName('dot');
                        Array.from(marks).forEach(mark=>{
                        mark.addEventListener('click', (evt)=>{

                            if(isPaused != true){
                                fieldElements.children[evt.target.dataset.row].children[evt.target.dataset.col].append(e.target);
        
                                shootBullet("blue");

                                if(rotationOptions.children.length !=0){
                                    Array.from(rotationOptions.children).forEach(child=>{
                                        child.remove();
                                    })
                                }

                                turnBlue = false;
                                turnRed = true;
                            }
        
                        })
                    })
                }
                }
                else{
                    removeMoveOptions();
                }
            }
        })
    }
}

//Removes move markings
function removeMoveOptions(){
    const moveMarks = document.getElementsByClassName('dot');
    Array.from(moveMarks).forEach((mark)=>{
        mark.remove();
    });
}

//Shoots a bullet
async function shootBullet(tank){

    //Fetching Position of tanks
    let blueTankPosition = checkPosition('tank1');
    let redTankPosition = checkPosition('tank2');

    bullet = document.createElement('div');
    bullet.classList.add('bullet');

    if(tank === 'red'){
        countdown(allotedTime, 'Blue');
        for(let i = redTankPosition.x + 1; i<8; i++){
            await sleep(100);
            fieldElements.children[i].children[redTankPosition.y].append(bullet);
            let bulletPosition = {x: i, y : redTankPosition.y, direction: 'South'};
            let hit = await checkHit(bulletPosition);
            // let hitBlue = await checkHit("blue",bulletPosition);
            if(hit.value === 'gameOver'){
                break;
            }
            else if(hit.value === 'reflection'){
                await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                break;
            }
            // else if(hit.value === 'reflection'){
            //     await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
            //     break;
            // } 
            else if(hit.value === "obstacle"){
                break;
            }
        }
    }
    else if(tank === 'blue'){
        countdown(allotedTime, 'Red');
        for(let i = blueTankPosition.x - 1; i>=0; i--){
            await sleep(100);
            fieldElements.children[i].children[blueTankPosition.y].append(bullet);
            let bulletPosition = {x: i, y : blueTankPosition.y, direction: 'North'};
            
            let hit = await checkHit(bulletPosition);
            // let hitBlue = await checkHit("blue", bulletPosition);
            if(hit.value === 'gameOver'){
                break;
            }
            else if(hit.value === 'reflection'){
                await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                break;
            }
            // else if(hitBlue.value === 'reflection'){
            //     await reflectBullet(bulletPosition, hitBlue.reflector, hitBlue.direction, tank);
            //     break;
            // }
            else if(hit.value === "obstacle"){
                break;
            }
        }
    }
    displayTurn();
}

//Checks if bullet hit the titan or reflectors
async function checkHit(bulletPosition){
    
    //Fetching Position of titans
    let blueTitanPosition = checkPosition('titan1');
    let redTitanPosition = checkPosition('titan2');

    //fectching position of reflectors
    let ricoBlue = checkPosition('ricochet1');
    let ricoRed = checkPosition('ricochet2');
    let semiRicoBLue = checkPosition('semi-ricochet1');
    let semiRicoRed = checkPosition('semi-ricochet2');
    

    // if(tank === "blue"){
        if(bulletPosition.x === redTitanPosition.x && bulletPosition.y === redTitanPosition.y){
            console.log("Game Over, Blue Wins!");
            gameOver("Blue");
            bullet.remove();
            return {value: "gameOver"};
        }
        else if(bulletPosition.x === blueTitanPosition.x && bulletPosition.y === blueTitanPosition.y){
            console.log("Game Over, Red Wins!");
            gameOver("Red");
            bullet.remove();
            return {value: "gameOver"};
        }
        else if(bulletPosition.x === ricoRed.x && bulletPosition.y === ricoRed.y){
            let reflection = document.getElementById('ricochet2').dataset.reflect;
            bullet.remove();
            return { value: "reflection", direction : reflection, orientation: null, reflector: ricoRed}
        }
        else if(bulletPosition.x === ricoBlue.x && bulletPosition.y === ricoBlue.y){
            let reflection = document.getElementById('ricochet1').dataset.reflect;
            bullet.remove();
            return { value: 'reflection', direction : reflection, orientation: null, reflector: ricoBlue}
        }
        else if(bulletPosition.x === semiRicoBLue.x && bulletPosition.y === semiRicoBLue.y){
            let reflection = document.getElementById('semi-ricochet1').dataset.reflect;
            let orientation = document.getElementById('semi-ricochet1').dataset.orientation;
            bullet.remove();
            if(orientation === 'South-East'){
                if(bulletPosition.direction === 'North' || bulletPosition.direction === 'West'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoBLue}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'South-West'){
                if(bulletPosition.direction === 'North' || bulletPosition.direction === 'East'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoBLue}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'North-East'){
                if(bulletPosition.direction === 'South' || bulletPosition.direction === 'West'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoBLue}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'North-West'){
                if(bulletPosition.direction === 'South' || bulletPosition.direction === 'East'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoBLue}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            
        }
        else if(bulletPosition.x === semiRicoRed.x && bulletPosition.y === semiRicoRed.y){
            let reflection = document.getElementById('semi-ricochet2').dataset.reflect;
            let orientation = document.getElementById('semi-ricochet2').dataset.orientation;
            bullet.remove();
            console.log(bulletPosition.direction);
            if(orientation === 'South-East'){
                if(bulletPosition.direction === 'North' || bulletPosition.direction === 'West'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoRed}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'South-West'){
                if(bulletPosition.direction === 'North' || bulletPosition.direction === 'East'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoRed}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'North-East'){
                if(bulletPosition.direction === 'South' || bulletPosition.direction === 'West'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoRed}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
            else if(orientation === 'North-West'){
                if(bulletPosition.direction === 'South' || bulletPosition.direction === 'East'){
                    return { value: "reflection", direction : reflection, orientation: orientation, reflector: semiRicoRed}
                }
                else{
                    return {value: 'obstacle'}
                }
            }
        }
        else if(fieldElements.children[bulletPosition.x].children[bulletPosition.y].children.length > 1){
            bullet.remove();

            return {value: "obstacle"}
        }
        else if(fieldElements.children[bulletPosition.x].children[bulletPosition.y].children.length == 1 && (bulletPosition.x == "0" || bulletPosition.x >= "7" || bulletPosition.y >= '7' || bulletPosition.y == '0')){
            await sleep(100);
            bullet.remove();
            return {value : null};
        }
        else{
            return {value: null}
        }
    // }
//     else if(tank === "red"){
//         if(bulletPosition.x === blueTitanPosition.x && bulletPosition.y === blueTitanPosition.y){
//             bullet.remove();
//             console.log("Game Over, Red Wins!");
//             return {value: null};
//         }
//         else if(bulletPosition.x === ricoRed.x && bulletPosition.y === ricoRed.y){
//             let reflection = document.getElementById('ricochet2').dataset.reflect;
//             bullet.remove();
//             return { value: "reflection", direction : reflection, reflector: ricoRed}
//         }
//         else if(bulletPosition.x === semiRicoRed.x && bulletPosition.y === semiRicoRed.y){
//             let reflection = document.getElementById('semi-ricochet2').dataset.reflect;
//             bullet.remove();
//             return { value: "reflection", direction : reflection, reflector: semiRicoRed}
//         }
//         else if(fieldElements.children[bulletPosition.x].children[bulletPosition.y].children.length > 1){
//             bullet.remove();

//             return {value: "obstacle"}
//         }
//         else if(fieldElements.children[bulletPosition.x].children[bulletPosition.y].children.length == 1 && (bulletPosition.x == "0" || bulletPosition.x >= "7" || bulletPosition.y >= '7' || bulletPosition.y == '0')){
//             await sleep(100);
//             bullet.remove();
//             return {value : null};
//         }
//         else{
//             return {value: null}
//         }
        
//     }
}

//reflects the bullets on impact with ricochets or semi-richochets
function checkReflection(bulletPosition){
    let ricoBlue = checkPosition('ricochet1');
    let ricoRed = checkPosition('ricochet2');
    let semiRicoBLue = checkPosition('semi-ricochet1');
    let semiRicoRed = checkPosition('semi-ricochet1');
    
    if(bulletPosition.x === ricoBlue.x && bulletPosition.y === ricoBlue.y){
        let reflection = document.getElementById('ricochet1').dataset.reflect;
        return { value: true, direction : reflection, reflector: ricoBlue}
    }
    else if(bulletPosition.x === ricoRed.x && bulletPosition.y === ricoRed.y){
        let reflection = document.getElementById('ricochet2').dataset.reflect;
        return { value: true, direction : reflection, reflector: ricoRed}
    }
    else if(bulletPosition.x === semiRicoRed.x && bulletPosition.y === semiRicoRed.y){
        let reflection = document.getElementById('semi-ricochet2').dataset.reflect;
        return { value: true, direction : reflection, reflector: semiRicoRed}
    }
    else if(bulletPosition.x === semiRicoBLue.x && bulletPosition.y === semiRicoBLue.y){
        let reflection = document.getElementById('semi-ricochet1').dataset.reflect;
        return { value: true, direction : reflection, reflector: semiRicoBLue}
    }
    else{
        return {value : false, direction : null}
    }

}

//reflects the bullet
async function reflectBullet(bulletPosition, reflector, direction, orientation, tank){

    if(orientation === null){
        if(bulletPosition.direction === 'North'){
            if(direction === 'right'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
    
                    let hit= await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'South'){
            if(direction === 'right'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'East'){
            if(direction === 'right'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hit.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'West'){
            if(direction === 'right'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
    }
    else if( orientation === 'South-East'){
        if(bulletPosition.direction === 'North'){
            if(direction === 'right'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
    
                    let hit= await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'West'){
            if(direction === 'right'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
    }
    else if(orientation === 'South-West'){
        if(bulletPosition.direction === 'North'){
            if(direction === 'right'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
    
                    let hit= await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'East'){
            if(direction === 'right'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hit.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
    }
    else if(orientation === 'North-East'){
        if(bulletPosition.direction === 'South'){
            if(direction === 'right'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'West'){
            if(direction === 'right'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
    }
    else if(orientation === 'North-West'){
        if(bulletPosition.direction === 'South'){
            if(direction === 'right'){
                for(let i = reflector.y-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y: i, direction : 'East'};
    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.y + 1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[reflector.x].children[i].append(bullet);
                    let bulletPosition = {x: reflector.x, y : i, direction: 'West'};
                    
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
        else if(bulletPosition.direction === 'East'){
            if(direction === 'right'){
                for(let i = reflector.x+1; i<8; i++){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'South'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hit.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
            else if(direction === 'left'){
                for(let i = reflector.x-1; i>=0; i--){
                    await sleep(100);
                    fieldElements.children[i].children[reflector.y].append(bullet);
                    let bulletPosition = {x: i, y: reflector.y, direction : 'North'};
                    let hit = await checkHit(bulletPosition);
                    // let hitBlue = await checkHit("blue",bulletPosition);
                
                    if(hit.value === 'reflection'){
                        await reflectBullet(bulletPosition, hit.reflector, hit.direction, hit.orientation, tank);
                        break;
                    }
                    // else if(hitRed.value === 'reflection'){
                    //     await reflectBullet(bulletPosition, hitRed.reflector, hitRed.direction, tank);
                    //     break;
                    // } 
                    else if(hit.value === "obstacle"){
                        break;
                    }
                }
            }
        }
    }
    
    
    
    
}

//return the position of given element on board
function checkPosition(id){
    let position;
    for(let i = 0; i<8; i++)
        {
            for(let j = 0; j< 8; j++)
                {
                    if(fieldElements.children[i].children[j].firstElementChild != null && fieldElements.children[i].children[j].firstElementChild.id === id){
                        position = {x: i, y: j};
                    }
                }
        }
    return position;
}

function displayTurn(){
    let banner = document.getElementById('heading');
    if(turnRed === true){
        banner.innerHTML = `Red's Turn`;
        banner.classList.remove('blueText');
        banner.classList.add('redText');
    }
    else if(turnBlue === true){
        banner.innerHTML = `Blue's Turn`;
        banner.classList.remove('redText');
        banner.classList.add('blueText');
    }
}

function gameOver(side){
    displayOver.style.display = 'flex';
    displayOver.children[0].children[0].innerHTML = `${side} Wins`;

    displayOver.children[0].children[1].addEventListener('click', ()=>{
        location.reload();
    })
}
