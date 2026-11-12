const firstInput = document.getElementById('first-number');
const secondInput = document.getElementById('second-number');
const operationButtons = document.querySelectorAll('.op-btn');
const resultBox = document.getElementById('result-box');
const resultOutput = document.getElementById('result-output');
const clearButton = document.getElementById('clear-btn');

function showMessage(text, isError = false) {
  resultOutput.textContent = text;
  if (isError) {
    resultBox.classList.add('error');
  } else {
    resultBox.classList.remove('error');
  }
}

function formatResult(value) {
  if (Number.isInteger(value)) {
    return value;
  }
  return Math.round(value * 100) / 100;
}

function calculate(operation) {
  const rawFirst = firstInput.value.trim().replace(',', '.');
  const rawSecond = secondInput.value.trim().replace(',', '.');

  if (rawFirst === '' || rawSecond === '') {
    showMessage('Введено неправильні дані: заповніть обидва поля', true);
    return;
  }

  const num1 = Number(rawFirst);
  const num2 = Number(rawSecond);

  if (Number.isNaN(num1) || Number.isNaN(num2) || !Number.isFinite(num1) || !Number.isFinite(num2)) {
    showMessage('Введено неправильні дані: введіть коректні числа', true);
    return;
  }

  let result;

  if (operation === 'add') {
    result = num1 + num2;
  } else if (operation === 'subtract') {
    result = num1 - num2;
  } else if (operation === 'multiply') {
    result = num1 * num2;
  } else if (operation === 'divide') {
    if (num2 === 0) {
      showMessage('Помилка: ділення на нуль неможливе', true);
      return;
    }
    result = num1 / num2;
  }

  showMessage(formatResult(result), false);
}

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operation = button.dataset.operation;
    calculate(operation);
  });
});

clearButton.addEventListener('click', () => {
  firstInput.value = '';
  secondInput.value = '';
  showMessage('—', false);
});