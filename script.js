let currentValue = "";
let previousValue = "";

document.addEventListener("DOMContentLoaded", () => {
  let numberButtons = document.querySelectorAll("[data-number]");
  let operationButtons = document.querySelectorAll("[data-operation]");
  let allClearButton = document.querySelector("[data-all-clear]");
  let equalsButton = document.querySelector("[data-equals]");
  let deleteButton = document.querySelector("[data-delete]");
  let previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  );
  let currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
  );

  numberButtons.forEach((number) =>
    number.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
        currentOperandTextElement.textContent = currentValue;
    }));

  operationButtons.forEach((op) => 
    op.addEventListener("click", (e) => {
      handleOperation(e.target.textContent);
      currentOperandTextElement.textContent = currentValue;
      previousOperandTextElement.textContent = `${previousValue} ${operator}`;
    }))

  equalsButton.addEventListener("click", () => {
      calculate();
      currentOperandTextElement.textContent = currentValue;
      previousOperandTextElement.textContent = previousValue;
  })

   allClearButton.addEventListener("click", () => {
      currentValue = '';
      previousValue = '';
      operator = undefined;
      currentOperandTextElement.textContent = currentValue;
      previousOperandTextElement.textContent = previousValue;
   });

    deleteButton.addEventListener("click", () => {
        handleDelete()
        currentOperandTextElement.textContent = currentValue;
        previousOperandTextElement.textContent = previousValue;
    })

  });

  function handleNumber(number) {
     if (number === '.' && currentValue.includes('.')) return;
     currentValue = currentValue.toString() + number.toString();
  }

  function handleOperation(op) {
    if (currentValue === '') return;
    if (previousValue !== '') {
       calculate()
    }
      operator = op;
      previousValue = currentValue
      currentValue = ''
  }

  function calculate() {
     let computation;
     currentValue = parseFloat(currentValue);
     previousValue = parseFloat(previousValue);
     if(isNaN(currentValue) || isNaN(previousValue)) return;

     switch (operator) {
       case "➕":
         computation = previousValue + currentValue;
         break;
       case "➖":
         computation = previousValue - currentValue;
         break;
       case "✖️":
         computation = previousValue * currentValue;
         break;
       case "➗":
         computation = previousValue / currentValue;
         break;
       default:
         return;
     }
     currentValue = computation;
     operator = undefined;
     previousValue = ''
  }

  function handleDelete() {
     currentValue = currentValue.toString().slice(0, -1);
  }

