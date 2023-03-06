// let draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');
const restartBtn = document.getElementById('restart');
const switchBtn = document.getElementById('hira-kata-switch');
const timerText = document.getElementById('timer');
const timerMs = document.getElementById('timerMiliseconds');
const timerS = document.getElementById('timerSeconds');
const timerM = document.getElementById('timerMinutes');

let selectedID;
let dropID;
let correctCounter = 0;
let timer = true;
let timerMinutes = 00;
let timerSeconds = 00;
let timerMiliseconds = 00;

let hiraganaOn = true;
const hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'];
const katakana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン'];
const english = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n']


createOptions();
startTimer();
addEventListeners();


// MAKE LIST FOR OPTIONS:
function createOptions() {
    let array = hiragana
    if (hiraganaOn == true) {
        array = hiragana;
    } else {
        array = katakana;
    }
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'draggable-options')
    ul.classList.add('draggable-list');
    let li = document.createElement('li');
    document.querySelector('#options').appendChild(ul);

    let x = 1;

    array.forEach((item) => {
        li.innerHTML += item;
        li.setAttribute('draggable', true);
        li.setAttribute('id', ('j' + x));
        ul.appendChild(li);
        li = document.createElement('li');

        console.log(li.id);
        
        x++;
    });

    draggableListItems = document.querySelectorAll('.draggable-list li');
}


// DRAG AND DROP:
function dragStart() {
    console.log(correctCounter)
    selectedID = this.id;
    console.log(this.id)
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragDrop() {
    dropID = this.id;
    if (checkForMatch(selectedID, dropID) && timer) {
        document.getElementById(selectedID).style.display = 'none';
        document.getElementById(dropID).textContent = document.getElementById(selectedID).textContent;
        document.getElementById(dropID).style.backgroundColor = '#4cec3d';
        document.getElementById(dropID).style.borderBlockStyle = 'outset';
        correctCounter ++;
    }

    if (correctCounter === 46) {
        timer = false;
    }
    this.classList.remove('over');
}

function checkForMatch(selectedID, dropTarget) {
    console.log(selectedID + " " + dropTarget)
    if (selectedID.slice(1) === dropTarget.slice(1)) {
        return true;
    } else {
        return false;
    }
}

function addEventListeners() {
    draggableListItems.forEach (item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
    })
}


// STOPCLOCK:
function restartGame() {
    timer = false;

    timerMinutes = 0;
    timerSeconds = 0;
    timerMiliseconds = 0;
    timerMs.innerHTML = '00';
    timerS.innerHTML = '00';
    timerM.innerHTML = '00';

    correctCounter = 0;
    timer = true;

    for (let i = 1; i < 47; i++) {
        document.getElementById('e' + i).textContent = english[i-1];
        document.getElementById('e' + i).style.backgroundColor = '#f0ffff';
        document.getElementById('e' + i).style.borderBlockStyle = 'inset';
    }

    let ul = document.getElementById("draggable-options");
    ul.remove();
    createOptions();
    startTimer();
    addEventListeners();
}

restartBtn.addEventListener('click', function() {
    restartGame();
});

switchBtn.addEventListener('click', function() {
    let value = switchBtn.value;
    if (value === "hiragana") {
        switchBtn.value = 'katakana';
        hiraganaOn = false;
    } else {
        switchBtn.value = 'hiragana';
        hiraganaOn = true;
    }
    restartGame();
});

function startTimer() {

    
    if (timer) {
        timerText.style.color = '#000000';

        timerMiliseconds++;
        if (timerMiliseconds > 99) {
            timerSeconds++;
            timerMiliseconds = 0;
        }

        if (timerSeconds > 59) {
            timerMinutes++;
            timerSeconds = 0;
        }

        if (timerMinutes > 59) {
            timerMiliseconds = 0;
            timerSeconds = 0;
            timerMinutes =0;
        }

        let displayMiliseconds = timerMiliseconds;
        let displaySeconds = timerSeconds;
        let displayMinutes = timerMinutes;

        if (timerMiliseconds < 10) {
            displayMiliseconds = '0' + timerMiliseconds;
        }

        if (timerSeconds < 10) {
            displaySeconds = '0' + timerSeconds;
        }

        if (timerMinutes < 10) {
            displayMinutes = '0' + timerMinutes;
        }

        timerMs.innerHTML = displayMiliseconds;
        timerS.innerHTML = displaySeconds;
        timerM.innerHTML = displayMinutes;

        setTimeout(startTimer, 10)
    } else {
        if (correctCounter === 46) {
            timerText.style.color = 'green';
        } else {
            timerText.style.color = 'red';
        }
    }
}