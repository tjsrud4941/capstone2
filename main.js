const numbersDiv = document.getElementById('numbers');
const generateBtn = document.getElementById('generate');
const lightBtn = document.getElementById('light-mode');
const darkBtn = document.getElementById('dark-mode');

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

lightBtn.addEventListener('click', () => applyTheme('light'));
darkBtn.addEventListener('click', () => applyTheme('dark'));

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
    } else {
        document.body.classList.remove('dark');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
    }
    localStorage.setItem('theme', theme);
}

function getBallClass(number) {
    if (number <= 10) return 'range-1';
    if (number <= 20) return 'range-2';
    if (number <= 30) return 'range-3';
    if (number <= 40) return 'range-4';
    return 'range-5';
}

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    numbersDiv.innerHTML = '';
    for (const number of [...numbers].sort((a, b) => a - b)) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number', getBallClass(number));
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
    }
}

generateBtn.addEventListener('click', generateNumbers);
generateNumbers();
