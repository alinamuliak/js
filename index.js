const box = document.getElementsByClassName('box')[0];

const colors = ['purple', 'red', 'orange', 'green', 'pink', 'black', 'yellow', 'sky', 'blue'];
let leftKeyPressed = false;
let x = 0;
let y = 0;

// але тут має бути click походу((
box.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        console.log('left click');
        leftKeyPressed = true;
        x = e.offsetX;
        y = e.offsetY;
    }
})

box.addEventListener('mouseup', () => {
    console.log('not click');
    if (leftKeyPressed) {
        leftKeyPressed = false;
    }
})

// todo: додати, щоб мишка була посередині квадрату!!
document.body.addEventListener('mousemove', (e) => {
    if (leftKeyPressed) {
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        x = e.clientX;
        y = e.clientY;
    }
})

box.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('right click', box.style.backgroundColor);
    let changedColor = colors[~~(Math.random() * colors.length)];
    // todo: this while-loop is not working((
    while (changedColor === box.style.backgroundColor) {
        changedColor = colors[~~(Math.random() * colors.length)];
    }
    box.style.backgroundColor = changedColor;
})

