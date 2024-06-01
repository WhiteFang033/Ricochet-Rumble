async function sleep(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("wait is over!")
        }, time)
    })
}

//Function of dropdown menu
const dots =document.getElementById('dropdown');
const options = document.getElementsByClassName('options')[0];
var isPaused = false;

dots.addEventListener('click', async ()=>{
    if(dots.dataset.state === 'off'){
        options.style.height = '150px';
        dots.style.transform = 'rotateZ(90deg)';
        Array.from(options.children).forEach(async elem=>{
            if(elem.children.length != 0){
                await sleep(200)
                elem.children[0].style.display = 'block';
            }
        })
        dots.dataset.state = 'on';
    }
    else if(dots.dataset.state === 'on'){
        options.style.height = '30px';
        dots.style.transform = 'rotateZ(0deg)';
        Array.from(options.children).forEach(async elem=>{
            if(elem.children.length != 0){
                await sleep(200)
                elem.children[0].style.display = 'none';
            }
        })
        dots.dataset.state = 'off';
    }
})

document.getElementById('reset').addEventListener('click', ()=>{
    location.reload();
})