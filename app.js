const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage')

let selectedID;
let dropID;
let correctCounter = 0;

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
        correctCounter ++;
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