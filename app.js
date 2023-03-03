const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');
const restartBtn = document.getElementById('restart');
const stopBtn = document.getElementById('hira-kata-switch');
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

startTimer();
addEventListeners();

function dragStart() {
    console.log(correctCounter)
    selectedID = this.id;
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
    if (checkForMatch(selectedID, dropID)) {
        document.getElementById(selectedID).style.display = 'none';
        document.getElementById(dropID).textContent = document.getElementById(selectedID).textContent;
        document.getElementById(dropID).style.backgroundColor = "#4cec3d";
        document.getElementById(dropID).style.borderBlockStyle = "outset";
        correctCounter ++;
    }

    if (correctCounter === 46) {
        timer = false;
    }
    this.classList.remove('over');
}

function checkForMatch(selectedID, dropTarget) {
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

// STOPCLOCK.
restartBtn.addEventListener('click', function() {
    timer = false;

    timerMinutes = 0;
    timerSeconds = 0;
    timerMiliseconds = 0;
    timerMs.innerHTML = "00";
    timerS.innerHTML = "00";
    timerM.innerHTML = "00";

    correctCounter = 0;
    timer = true;
    startTimer();
});

stopBtn.addEventListener('click', function() {
    timer = false;
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
            displayMiliseconds = "0" + timerMiliseconds;
        }

        if (timerSeconds < 10) {
            displaySeconds = "0" + timerSeconds;
        }

        if (timerMinutes < 10) {
            displayMinutes = "0" + timerMinutes;
        }

        timerMs.innerHTML = displayMiliseconds;
        timerS.innerHTML = displaySeconds;
        timerM.innerHTML = displayMinutes;

        setTimeout(startTimer, 10)
    } else {
        if (correctCounter === 46) {
            timerText.style.color = "green";
        } else {
            timerText.style.color = "red";
        }
    }
}