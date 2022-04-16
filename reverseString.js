function reverseString1(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

function reverseString2(str) {
    return str.split('').reverse().join('');
}

function reverseString3(str) {
    return str.split('').sort(() => -1).join('');
}

function reverseString4(str) {
    let reversed = '';
    for (let character of str) {
        reversed = character.concat(reversed);
    }
    return reversed;
}

function reverseString5(str) {
    let reversed = '';
    let i = 0;
    while (str[i]) {
        reversed += str[str.length - i - 1];
        i++;
    }
    return reversed;
}

console.log(reverseString5("i love david хіхі"));
