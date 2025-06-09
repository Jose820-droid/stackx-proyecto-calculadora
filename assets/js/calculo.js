let currentInput = '';
const display = document.getElementById('display');
const historyBody = document.getElementById('history-body');

const clearButton = document.querySelector("[data-id='clear']");

const operators =document.querySelectorAll("[data-operators]");
const numbers =document.querySelectorAll("[data-numbers]");
const calculateButton =document.querySelector("[data-calculate]");

calculateButton.addEventListener(
  "click", calculate
);

numbers.forEach(
  (number)=>{
    number.addEventListener(
      "click", appendNumber
    )
  }
)

operators.forEach(
  (button) => { 
    button.addEventListener(
      "click", appendOperator
    );
  }
);

clearButton.addEventListener(
    "click", clearDisplay
  
    
  );
function appendNumber(num) {
  const target = num.target
  currentInput += target.textContent;
  updateDisplay();
}

function appendOperator(op) {
  const target = op.target

  

  if (currentInput === '' || "+-*/".includes(currentInput.slice(-1))) return;
  currentInput += target.textContent;
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || '0';
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    addToHistory(currentInput, result);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    display.innerText = 'Erro';
    currentInput = '';
  }
}

function addToHistory(expr, res) {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${expr}</td><td>${res}</td>`;
  row.addEventListener('click', () => {
    currentInput = expr;
    updateDisplay();
  });
  historyBody.prepend(row);
}
