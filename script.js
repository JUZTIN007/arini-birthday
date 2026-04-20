// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2026-04-25T00:00:00').getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Falling Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-10px';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.zIndex = '-1';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'float-down 6s ease-in forwards';
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 1000);

// Click to create hearts
document.addEventListener('click', (e) => {
    for(let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'burst 1.5s ease-out forwards';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
    }
});

// Quiz Data
const quizData = [
    {
        question: "What's your favorite time we spend together?",
        options: ["Midnight bike rides", "Dinners", "Just being together", "Everything"],
        correct: 3
    },
    {
        question: "You love me because:",
        options: ["I'm handsome", "I care for you", "We have fun", "All of above"],
        correct: 3
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;

function startQuiz() {
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('memoryGameContainer').classList.add('hidden');
    document.getElementById('romanticGameContainer').classList.add('hidden');
    currentQuizQuestion = 0;
    quizScore = 0;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuizQuestion >= quizData.length) {
        alert(`Quiz Complete! Score: ${quizScore}/${quizData.length}`);
        closeQuiz();
        return;
    }

    const current = quizData[currentQuizQuestion];
    let html = `<p>${current.question}</p><div style="display:flex;flex-direction:column;gap:1rem;">`;
    
    current.options.forEach((option, index) => {
        html += `<button onclick="selectAnswer(${index}, ${current.correct})" style="padding:0.8rem;background:#d4af37;border:none;border-radius:8px;cursor:pointer;color:#000;font-weight:bold;">${option}</button>`;
    });
    
    html += `</div>`;
    document.getElementById('quizContent').innerHTML = html;
}

function selectAnswer(selected, correct) {
    if (selected === correct) {
        quizScore++;
        alert('✨ Correct! 💕');
    } else {
        alert('Try again! 😊');
    }
    currentQuizQuestion++;
    displayQuestion();
}

function closeQuiz() {
    document.getElementById('quizContainer').classList.add('hidden');
}

function nextQuestion() {
    displayQuestion();
}

// Memory Game
let memoryCards = ['🏍️', '🍽️', '💕', '🌙', '🏍️', '🍽️', '💕', '🌙', '✈️', '💝', '🖤', '😊', '✈️', '💝', '🖤', '😊'];
let flipped = [];
let matched = [];

function startMemoryGame() {
    document.getElementById('memoryGameContainer').classList.remove('hidden');
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('romanticGameContainer').classList.add('hidden');
    
    memoryCards = memoryCards.sort(() => Math.random() - 0.5);
    flipped = [];
    matched = [];
    renderMemoryGame();
}

function renderMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    memoryCards.forEach((card, index) => {
        const button = document.createElement('button');
        button.className = 'memory-card-game';
        button.textContent = matched.includes(index) ? card : '?';
        button.onclick = () => flipCard(index);
        
        if (matched.includes(index)) {
            button.style.opacity = '0.3';
        }
        
        grid.appendChild(button);
    });
}

function flipCard(index) {
    if (flipped.includes(index) || matched.includes(index)) return;
    
    flipped.push(index);
    renderMemoryGame();
    
    if (flipped.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flipped;
    
    if (memoryCards[first] === memoryCards[second]) {
        matched.push(first, second);
        flipped = [];
        
        if (matched.length === memoryCards.length) {
            alert('🎉 You won! 💝');
        }
    } else {
        setTimeout(() => {
            flipped = [];
            renderMemoryGame();
        }, 1000);
    }
    
    renderMemoryGame();
}

function closeMemoryGame() {
    document.getElementById('memoryGameContainer').classList.add('hidden');
}

// Romantic Spinner
let isSpinning = false;

function startRomanticGame() {
    document.getElementById('romanticGameContainer').classList.remove('hidden');
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('memoryGameContainer').classList.add('hidden');
    document.getElementById('spinResult').textContent = '';
}

function spinWheel() {
    if(isSpinning) return;
    
    isSpinning = true;
    const spinner = document.getElementById('spinner');
    const result = Math.floor(Math.random() * 6);
    const rotation = result * 60 + 360 * 5;
    
    spinner.style.transition = 'transform 3s ease-out';
    spinner.style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(() => {
        const items = ['💋 Kiss Me', '🌹 Roses', '🎵 Dance', '🏍️ Ride', '🍽️ Dinner', '🌙 Night'];
        document.getElementById('spinResult').textContent = '🎁 ' + items[result] + ' 💕';
        isSpinning = false;
    }, 3000);
}

function closeRomanticGame() {
    document.getElementById('romanticGameContainer').classList.add('hidden');
}

// Initialize
window.addEventListener('load', () => {
    updateCountdown();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
