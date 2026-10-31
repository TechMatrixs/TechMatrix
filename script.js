// 1. Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Form Submit Custom Notification Box
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const alertBox = document.getElementById('custom-alert');
    alertBox.classList.remove('hidden');
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 4000);
    e.target.reset();
});

// 2. Multilingual Matrix Rain Animation & ON/OFF Controls
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let isMatrixActive = true;
let matrixInterval;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'abcdefghijklmnopquestwxyz'+
              '011001010101∑∫λπ∞=-+!@#$%^&*()_+{}|:"<>?[]\;';

const fontSize = 20;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#006742';
    ctx.font = `${fontSize}px sans-serif`;

    columns = Math.floor(canvas.width / fontSize);
    if(drops.length < columns) {
        while(drops.length < columns) drops.push(Math.floor(Math.random() * -100));
    }

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function startMatrix() {
    if(!matrixInterval) {
        matrixInterval = setInterval(drawMatrix, 45);
    }
    canvas.style.opacity = "0.25";
}

function stopMatrix() {
    clearInterval(matrixInterval);
    matrixInterval = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.opacity = "0";
}

startMatrix();

// Matrix Toggle Logic
const toggleBtn = document.getElementById('matrix-toggle-btn');
const dot = document.getElementById('matrix-dot');
const statusText = document.getElementById('matrix-status-text');
const mobileToggle = document.getElementById('mobile-matrix-toggle');
const mobileStatus = document.getElementById('mobile-matrix-status');

function toggleMatrixState() {
    isMatrixActive = !isMatrixActive;
    if (isMatrixActive) {
        startMatrix();
        dot.className = "w-2 h-2 rounded-full bg-cyan-400 animate-ping";
        statusText.innerText = "MATRIX: ON";
        mobileStatus.innerText = "MATRIX: ON";
    } else {
        stopMatrix();
        dot.className = "w-2 h-2 rounded-full bg-slate-600";
        statusText.innerText = "MATRIX: OFF";
        mobileStatus.innerText = "MATRIX: OFF";
    }
}

toggleBtn.addEventListener('click', toggleMatrixState);
mobileToggle.addEventListener('click', toggleMatrixState);

// 3. Anime.js Animations
document.addEventListener('DOMContentLoaded', () => {
    anime({
        targets: '.hero-anime-el',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 200}),
        easing: 'easeOutQuad',
        duration: 1000
    });

    anime({
        targets: '.service-card',
        translateY: [60, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 800}),
        easing: 'easeOutCubic',
        duration: 1000
    });
});

// 4. Cursor Particle Trail
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.25) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        document.body.appendChild(particle);

        anime({
            targets: particle,
            scale: [1, 0],
            opacity: [1, 0],
            translateY: anime.random(-30, 30),
            translateX: anime.random(-30, 30),
            duration: 800,
            easing: 'easeOutExpo',
            complete: () => particle.remove()
        });
    }
});