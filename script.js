let buttonWithText = document.querySelector('.buttonWithText');
let input = document.querySelector('div.input input');


let theHiddenNumber;
let enteredNumber;
let counter;

buttonWithText.addEventListener('click', theBeginningOfTheGame);
input.addEventListener('keydown', enteringANumber);


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function showAnimationAndChangeText(text) {
    buttonWithText.classList.toggle('startOfAnimation');
    setTimeout(function() {
        buttonWithText.textContent = text;
        buttonWithText.classList.toggle('startOfAnimation');
    },300);
};

function theBeginningOfTheGame() {
    counter = 0;
    theHiddenNumber = getRandomInt(1, 100);
    showAnimationAndChangeText('компьютер загадал число от 1 до 100 (введите его и нажмите Enter)');
    buttonWithText.removeEventListener('click', theBeginningOfTheGame);
    input.disabled = false;
};

function enteringANumber(event) {
    if (event.code === 'Enter') {
        enteredNumber = Number(input.value);
        input.value = '';
        validation();
    }
};

function processingNumbers(theHiddenNumber, enteredNumber) {
    let result = Number(theHiddenNumber) - Number(enteredNumber);
    if (result <= 100 && result >= 80) {
        counter++;
        showAnimationAndChangeText('вы очень далеко от разгадки, попробуйте больше');
    } else if (result < 80 && result >= 60) {
        counter++;
        showAnimationAndChangeText('вы далековато, попробуйте больше');
    } else if (result < 60 && result >= 20) {
        counter++;
        showAnimationAndChangeText('не угадали, попробуйте больше');
    } else if (result < 20 && result > 0) {
        counter++;
        showAnimationAndChangeText('вы близко, попробуйте больше');
    } else if (result === 0) {
        counter++;
        endOfTheGame();
    } else if (result < 0 && result > -20) {
        counter++;
        showAnimationAndChangeText('вы близко, попробуйте меньше');
    } else if (result <= -20 && result > -60) {
        counter++;
        showAnimationAndChangeText('не угадали, попробуйте меньше');
    } else if (result <= -60 && result > -80) {
        counter++;
        showAnimationAndChangeText('вы далековато, попробуйте меньше');
    } else if (result <= -80 && result >= -100) {
        counter++;
        showAnimationAndChangeText('вы очень далеко от разгадки, попробуйте меньше');
    }
};

function endOfTheGame() {
    showAnimationAndChangeText(`поздравляем, вы угадали, нажмите, чтобы сыграть ещё раз (ваши попытки: ${counter})`);
    buttonWithText.addEventListener('click', theBeginningOfTheGame);
    input.disabled = true;
};

function validation() {
    if (enteredNumber < 0 || enteredNumber > 100 || (Boolean(enteredNumber) === false && enteredNumber !== 0)) {
        showAnimationAndChangeText('вводить можно только число от 1 до 100');
    } else {
        processingNumbers(theHiddenNumber, enteredNumber);
    }
};
