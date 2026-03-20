const numbersDiv = document.getElementById('numbers');
const generateBtn = document.getElementById('generate');
const lightBtn = document.getElementById('light-mode');
const darkBtn = document.getElementById('dark-mode');

lightBtn.addEventListener('click', () => {
    document.body.classList.remove('dark');
});

darkBtn.addEventListener('click', () => {
    document.body.classList.add('dark');
});

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    
    numbersDiv.innerHTML = '';
    for (const number of [...numbers].sort((a, b) => a - b)) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
    }
}

generateBtn.addEventListener('click', generateNumbers);

generateNumbers();
