'use strict';

let rows = 5;
let columns = 6;
let table = document.getElementById('kek');
let clr1 = "red";
let clr2 = "green";

function changeColor(color) {
	color = (color == clr1 ? clr2 : clr1);
	return color;
}

function changeCellColor(cell) {
	cell.style.background = changeColor(cell.style.background)
}

function getBadCellsCount() {
	let res = 0;
	for (let i = 0; i < rows; ++i) {
		for (let j = 0; j < columns; ++j) {
			res += (table.rows[i].cells[j].style.background != clr2);
		}
	}
	return res;
}

let winText = 'Вы приняты в интеллектуальный клуб';

function blockCells() {
	for (let i = 0; i < rows; ++i) {
		for (let j = 0; j < columns; ++j) {
			table.rows[i].cells[j].onmousedown = null;
		}
	}
}

function showWinMessage() {
	/*let winTextElement = document.createElement("div");
	winTextElement.innerHTML = `<p>${winText}</p>`;
	document.body.append(winTextElement);*/
	let messageElement = document.getElementById("message")
	messageElement.innerHTML = winText;
	messageElement.style.color = "red";
}

function win() {
	blockCells();
	showWinMessage();
}

function flip(cell) {
	let row = cell.parentNode.rowIndex;
	let column = cell.cellIndex;
	for (let i = row; i < rows; ++i) {
		for (let j = column; j < columns; ++j) {
			if (Math.random() > 0.5) {
				changeCellColor(table.rows[i].cells[j]);
			}
		}
	}
	if (getBadCellsCount() == 0) {
		win();
	}
}

for (let i = 0; i < rows; ++i) {
	let curRow = table.insertRow(-1);
	for (let j = 0; j < columns; ++j) {
		let curCell = curRow.insertCell(-1);
		curCell.style.background = clr1;
		// curCell.onmousedown = () => changeCellColor(curCell);
		curCell.onmousedown = () => flip(curCell);
	}
}
