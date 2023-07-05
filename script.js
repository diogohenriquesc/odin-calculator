const btnNumbers = document.querySelectorAll('.btn-num');
const btnOperators = document.querySelectorAll('.btn-opr');
const btnEqual = document.querySelector('.btn-equal');
const btnClear = document.querySelector('.calc__btn[data-value="clear"]');
const btnDelete = document.querySelector('.calc__btn[data-value="delete"]');

let displayContent = '';
let number1 = null;
let number2 = null;
let operator = null;

btnNumbers.forEach((btn) => btn.addEventListener('click', (e) => numericClick(e)));
btnOperators.forEach((btn) => btn.addEventListener('click', (e) => operatorClick(e)));
btnEqual.addEventListener('click', equalClick);
btnClear.addEventListener('click', clear);
btnDelete.addEventListener('click', deleteEntry);

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
			return add(n1, n2);
		case '-':
			return subtract(n1, n2);
		case '*':
			return multiply(n1, n2);
		case '/':
			return divide(n1, n2);
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

