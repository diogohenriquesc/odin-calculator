const btnNumbers = document.querySelectorAll('.btn-num');
const btnOperators = document.querySelectorAll('.btn-opr');
const btnEqual = document.querySelector('.btn-equal');
const btnClear = document.querySelector('.calc__btn[data-value="clear"]');
const btnDelete = document.querySelector('.calc__btn[data-value="delete"]');
const btnDecimal = document.querySelector('.calc__btn[data-value="."]');

let displayContent = '';
let number1 = null;
let number2 = null;
let operator = null;

btnNumbers.forEach((btn) => btn.addEventListener('click', (e) => numericClick(e)));
btnOperators.forEach((btn) => btn.addEventListener('click', (e) => operatorClick(e)));
btnEqual.addEventListener('click', equalClick);
btnClear.addEventListener('click', clear);
btnDelete.addEventListener('click', deleteEntry);
btnDecimal.addEventListener('click', decimalClick);

function numericClick(e) {
	displayContent += `${e.target.dataset.value}`;
	updateDisplay(displayContent);
}

function operatorClick(e) {
	const clickedOperator = e.target.dataset.value;

	if (number1 === null) {
		number1 = Number(displayContent);
		operator = clickedOperator;
		displayContent = '';
	} else {
		number2 = Number(displayContent);
		const operationResult = operate(operator, number1, number2);
		updateDisplay(operationResult);
		number1 = operationResult;
		number2 = null;
		operator = clickedOperator;
		displayContent = '';
	}
}

function equalClick() {
	number2 = Number(displayContent);
	const operationResult = operate(operator, number1, number2);
	updateDisplay(operationResult);
	number1 = null;
	number2 = null;
	operator = null;
	displayContent = operationResult;
}

function decimalClick() {
	if (!displayContent.includes('.')) displayContent += '.';
	updateDisplay(displayContent);
}

function updateDisplay(value) {
	document.querySelector('.calculator__display-value').textContent = value;
}

function clear() {
	number1 = null;
	number2 = null;
	operator = null;
	displayContent = '';
	updateDisplay(displayContent);
}

function deleteEntry() {
	displayContent = displayContent.slice(0, -1);
	updateDisplay(displayContent);
}

function operate(operator, n1, n2) {
	switch (operator) {
		case '+':
			return Math.round(add(n1, n2) * 10000) / 10000;
		case '-':
			return Math.round(subtract(n1, n2) * 10000) / 10000;
		case '*':
			return Math.round(multiply(n1, n2) * 10000) / 10000;
		case '/':
			return Math.round(divide(n1, n2) * 10000) / 10000;
	}
}

function add(n1, n2) {
	return n1 + n2;
}

function subtract(n1, n2) {
	return n1 - n2;
}

function multiply(n1, n2) {
	return n1 * n2;
}

function divide(n1, n2) {
	return n1 / n2;
}

document.addEventListener('keydown', (e) => {
	e.preventDefault();

	switch (e.key) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		case '.':
		case '+':
		case '-':
		case '/':
		case '*':
			document.querySelector(`.calc__btn[data-value="${e.key}"]`).click();
			break;
		case 'Backspace':
			document.querySelector('.calc__btn[data-value="delete"]').click();
			break;
		case 'c':
		case 'C':
			document.querySelector('.calc__btn[data-value="clear"]').click();
			break;
		case 'Enter':
		case '=':
			document.querySelector('.calc__btn[data-value="equal"]').click();
			break;
	}
})