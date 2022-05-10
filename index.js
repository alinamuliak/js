const boxContainer = document.getElementsByClassName('box-container')[0];

const colors = ['purple', 'red', 'orange', 'green', 'pink', 'black', 'yellow', 'sky', 'blue'];
let currentBoxId = 1;
let leftKeyPressed = false;
let currentTarget;

document.addEventListener('mousedown', (e) => {
    if (e.target && e.target.parentElement.className === 'box-container' && e.button === 0) {
        console.log('left click');
        leftKeyPressed = true;
        currentTarget = e.target;
    }
});


document.addEventListener('mouseup', (e) => {
    if (e.target && e.target.parentElement.className === 'box-container') {
        console.log('not click');
        if (leftKeyPressed) {
            leftKeyPressed = false;
            currentTarget = null;
        }
    }
});


document.addEventListener('mousemove', (e) => {
    if (e.target && e.target.parentElement.className === 'box-container' && leftKeyPressed) {
        currentTarget.style.transform = 'translate(-50%,-50%)';
        currentTarget.style.left = e.pageX + 'px';
        currentTarget.style.top = e.pageY + 'px';
    }
});


document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    if (e.target && e.target.parentElement.className === 'box-container') {
        let box = e.target;
        console.log('right click', box.style.backgroundColor);
        let changedColor = colors[~~(Math.random() * colors.length)];
        while (changedColor === box.style.backgroundColor) {
            changedColor = colors[~~(Math.random() * colors.length)];
        }
        box.style.backgroundColor = changedColor;
    }
});


document.addEventListener('click', (e) => {
    if (e.target && e.target.parentElement.className === 'box-container' && e.shiftKey) {
        console.log('shift+left click');
        let box = e.target;
        // if (box.classList.contains('box-large')) {
        //     box.classList.remove('box-large');
        // } else {
        //     box.classList.add('box-large');
        // }
        box.classList.toggle('box-large');
    }
});


document.addEventListener('dblclick', (e) => {
    if (e.target && e.target.parentElement.className === 'box-container' && !e.altKey) {
        console.log('double click');
        ++currentBoxId;
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.textContent = currentBoxId.toString();
        boxContainer.appendChild(newBox);
    }
});


document.addEventListener('dblclick', (e) => {
        console.log('alt+double click');
    if (e.target && e.target.parentElement.className === 'box-container' && e.altKey) {
        let box = e.target;
        if (box.textContent !== '1') {
            box.remove();
        }
    }
});
