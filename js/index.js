const fieldElements = document.getElementsByClassName('field')[0];
const pieces = document.getElementsByTagName('img');
const rotateL = document.getElementById('rotateL');
const rotateR = document.getElementById('rotateR');
const rotatebtns = document.getElementsByClassName('rotate');
const displayOver = document.getElementsByClassName('game-over')[0];
var trunRed = true;
var turnBlue = false;
var rotateRico;
var bullet;
var ricoRotationRed = 0;
var ricoRotationBlue = 0;
var semiRicoRotationRed = 0;
var semiRicoRotationBlue = 0;

//set alloted time for each side in seconds
var allotedTime = 60;

//disabling the rotating buttons
rotateL.disabled = true;
rotateR.disabled = true;

//Listening for the mouseclick on the board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        fieldElements.children[i].children[j].addEventListener('click', (e) => {  

            rotateL.disabled = true;
            rotateR.disabled = true;

            if(trunRed && isPaused != true){
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
                    
                    rotateL.disabled = false;
                    rotateR.disabled = false;

                    //removing other eventListneres
                    rotateL.removeEventListener('click', rotateRicoBlueL);
                    rotateL.removeEventListener('click',rotateSemiRicoBlueL);
                    rotateL.removeEventListener('click', rotateSemiRicoRedL)
                    rotateR.removeEventListener('click', rotateRicoBlueR);
                    rotateR.removeEventListener('click', rotateSemiRicoBlueR);
                    rotateR.removeEventListener('click', rotateSemiRicoRedR);

                    //rotate left
                    const ricoRed = document.getElementById('ricochet2');
                    var rotateRicoRedL = rotateLeft.bind(null, ricoRed, "red", ricoRotationRed);
                    rotateL.addEventListener('click', rotateRicoRedL)

                    //rotateRight
                    var rotateRicoRedR = rotateRight.bind(null, ricoRed, "red", ricoRotationRed);
                    rotateR.addEventListener('click', rotateRicoRedR);
                }
                else if(e.target.id === 'semi-ricochet2' && isPaused !=true){

                    rotateL.disabled = false;
                    rotateR.disabled = false;

                    //removing other eventListneres
                    rotateL.removeEventListener('click', rotateRicoBlueL);
                    rotateL.removeEventListener('click',rotateSemiRicoBlueL);
                    rotateL.removeEventListener('click', rotateRicoRedL)
                    rotateR.removeEventListener('click', rotateRicoBlueR);
                    rotateR.removeEventListener('click', rotateSemiRicoBlueR);
                    rotateR.removeEventListener('click', rotateRicoRedR);

                    //rotateLeft
                    let semiRicoRed = document.getElementById('semi-ricochet2');
                    var rotateSemiRicoRedL = rotateLeft.bind(null, semiRicoRed, "red", semiRicoRotationRed);
                    rotateL.addEventListener('click', rotateSemiRicoRedL);

                    //rotateRight
                    var rotateSemiRicoRedR = rotateRight.bind(null, semiRicoRed, "red", semiRicoRotationRed);
                    rotateR.addEventListener('click', rotateSemiRicoRedR);
                }
                
                if(!rotateRico){
                    const marks = document.getElementsByClassName('dot');
                    Array.from(marks).forEach(mark=>{
                    mark.addEventListener('click', (evt)=>{
                        if(isPaused != true){
                            fieldElements.children[evt.target.dataset.row].children[evt.target.dataset.col].append(e.target);
                            shootBullet("red")
                            rotateL.disabled = true;
                            rotateR.disabled = true;
                            turnBlue = true;
                            trunRed = false;
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
                    e.stopPropagation();
                    if(e.target.id === 'ricochet1' && isPaused != true){
                        rotateL.disabled = false;
                        rotateR.disabled = false;

                        //removing other eventListneres
                        rotateL.removeEventListener('click', rotateRicoRedL);
                        rotateL.removeEventListener('click',rotateSemiRicoRedL);
                        rotateL.removeEventListener('click', rotateSemiRicoBlueL)
                        rotateR.removeEventListener('click', rotateRicoRedR);
                        rotateR.removeEventListener('click', rotateSemiRicoBlueR);
                        rotateR.removeEventListener('click', rotateSemiRicoRedR);

                        //RotateLeft
                        let ricoBlue = document.getElementById('ricochet1');
                        var rotateRicoBlueL = rotateLeft.bind(null, ricoBlue, "blue", ricoRotationBlue);
                        rotateL.addEventListener('click', rotateRicoBlueL);
                        //rotateRight

                        var rotateRicoBlueR = rotateRight.bind(null, ricoBlue, "blue", ricoRotationBlue);
                        rotateR.addEventListener('click', rotateRicoBlueR);
                    }
                    else if(e.target.id === 'semi-ricochet1' && isPaused != true){
                        rotateL.disabled = false;
                        rotateR.disabled = false;

                        //removing other eventListneres
                        rotateL.removeEventListener('click', rotateRicoRedL);
                        rotateL.removeEventListener('click',rotateRicoBlueL);
                        rotateL.removeEventListener('click', rotateSemiRicoRedL)
                        rotateR.removeEventListener('click', rotateRicoRedR);
                        rotateR.removeEventListener('click', rotateRicoBlueR);
                        rotateR.removeEventListener('click', rotateSemiRicoRedR);

                        //rotateLeft
                        let semiRicoBlue = document.getElementById('semi-ricochet1');
                        var rotateSemiRicoBlueL = rotateLeft.bind(null, semiRicoBlue, "blue", semiRicoRotationBlue);
                        rotateL.addEventListener('click', rotateSemiRicoBlueL)

                        //rotateRight
                        var rotateSemiRicoBlueR = rotateRight.bind(null, semiRicoBlue, "blue", semiRicoRotationBlue);
                        rotateR.addEventListener('click', rotateSemiRicoBlueR)
                    }
                    
                    if(!rotateRico){
    
                        const marks = document.getElementsByClassName('dot');
                        Array.from(marks).forEach(mark=>{
                        mark.addEventListener('click', (evt)=>{

                            if(isPaused != true){
                                fieldElements.children[evt.target.dataset.row].children[evt.target.dataset.col].append(e.target);
        
                                shootBullet("blue")
                                rotateL.disabled = true;
                                rotateR.disabled = true;
                                turnBlue = false;
                                trunRed = true;
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
                await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
    let semiRicoRed = checkPosition('semi-ricochet1');
    

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
            return { value: "reflection", direction : reflection, reflector: ricoRed}
        }
        else if(bulletPosition.x === ricoBlue.x && bulletPosition.y === ricoBlue.y){
            let reflection = document.getElementById('ricochet1').dataset.reflect;
            console.log(ricoBlue);
            bullet.remove();
            return { value: 'reflection', direction : reflection, reflector: ricoBlue}
        }
        else if(bulletPosition.x === semiRicoBLue.x && bulletPosition.y === semiRicoBLue.y){
            let reflection = document.getElementById('semi-ricochet1').dataset.reflect;
            bullet.remove();
            return { value: "reflection", direction : reflection, reflector: semiRicoBLue}
        }
        else if(bulletPosition.x === semiRicoRed.x && bulletPosition.y === semiRicoRed.y){
            let reflection = document.getElementById('semi-ricochet2').dataset.reflect;
            bullet.remove();
            return { value: "reflection", direction : reflection, reflector: semiRicoRed}
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
async function reflectBullet(bulletPosition, reflector, direction, tank){

    if(bulletPosition.direction === 'North'){
        if(direction === 'right'){
            for(let i = reflector.y + 1; i<8; i++){
                await sleep(100);
                fieldElements.children[reflector.x].children[i].append(bullet);
                let bulletPosition = {x: reflector.x, y : i, direction: 'West'};

                let hit= await checkHit(bulletPosition);
                // let hitBlue = await checkHit("blue",bulletPosition);
                
                if(hit.value === 'reflection'){
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                console.log(bulletPosition);
                let hit = await checkHit(bulletPosition);
                // let hitBlue = await checkHit("blue",bulletPosition);
                if(hit.value === 'reflection'){
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
                    await reflectBullet(bulletPosition, hit.reflector, hit.direction, tank);
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
    if(trunRed === true){
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



//Rotation Functions

function rotateLeft(elem, bullet, elemRotation){
    let ricoRed = document.getElementById('ricochet2');
    elemRotation += 90;
    elem.style.transform = `rotateZ(${elemRotation}deg)`;

    if(elem.dataset.reflect === 'right'){
        elem.dataset.reflect = 'left';
    }
    else if(elem.dataset.reflect === 'left'){
            elem.dataset.reflect = 'right';
    }
    rotateL.disabled = true;
    rotateR.disabled = true;
    shootBullet(bullet);
    rotateRico = true;
    turnBlue = true;
    trunRed = false;
    removeMoveOptions();
}

function rotateRight(elem, bullet, elemRotation){
    elemRotation -= 90;
    elem.style.transform = `rotateZ(${elemRotation}deg)`;

    if(elem.dataset.reflect === 'right'){
        elem.dataset.reflect = 'left';
    }
    else if(elem.dataset.reflect === 'left'){
            elem.dataset.reflect = 'right';
    }
    rotateL.disabled = true;
    rotateR.disabled = true;
    shootBullet(bullet);
    rotateRico = true;
    turnBlue = true;
    trunRed = false;
    removeMoveOptions();
}
