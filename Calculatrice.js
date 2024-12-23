



document.addEventListener('DOMContentLoaded', () => {
  const screen = document.getElementById('screen');
  let currentInput = '';
  let previousInput = '';
  let operator = '';

  const updateScreen = () => {
    screen.textContent = currentInput || '0';
  };

  const handleNumber = (num) => {
    currentInput += num;
    updateScreen();
  };

  const handleOperator = (op) => {
    if (currentInput === '') return;
    if (previousInput) calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
  };

  const calculate = () => {
    if (!previousInput || !currentInput || !operator) return;
    const result = eval('${previousInput} ${operator} ${currentInput}');
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateScreen();
  };

  const clearAll = () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen();
  };

  const deleteLast = () => {
    currentInput = currentInput.slice(0, -1);
    updateScreen();
  };

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      const action = btn.dataset.action;

      if (value) {
        handleNumber(value);
      } else if (action === 'clear') {
        clearAll();
      } else if (action === 'delete') {
        deleteLast();
      } else if (action === 'calculate') {
        calculate();
      } else {
        handleOperator(btn.dataset.value);
      }
    });
  });

  updateScreen();
})