// script.js

// Animated Canvas Background
function initBackgroundCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Floating hearts particles
    const hearts = [];
    const heartSymbols = ['💕', '💗', '💖', '💝', '❤️'];

    class Heart {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 20 + 15;
            this.speed = Math.random() * 1 + 0.5;
            this.symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            this.opacity = Math.random() * 0.3 + 0.2;
            this.swing = Math.random() * Math.PI * 2;
            this.swingSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.y -= this.speed;
            this.swing += this.swingSpeed;
            this.x += Math.sin(this.swing) * 0.8; // horizontal sway

            // Reset when off screen
            if (this.y < -50) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
            ctx.fillText(this.symbol, this.x, this.y);
            ctx.restore();
        }
    }

    // Create hearts
    for (let i = 0; i < 60; i++) {
        hearts.push(new Heart());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
}

// Initialize when page loads
window.addEventListener('load', initBackgroundCanvas);


// Login Attempts
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;

// Open Envelope Landing
function openEnvelope() {
    showPage('loginPage');
}

// Login Validation - Updated to accept both name formats
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim().toLowerCase();
    const color = document.getElementById('colorInput').value.trim().toLowerCase();
    const errorMsg = document.getElementById('errorMessage');
    const attemptsMsg = document.getElementById('attemptsLeft');
    
    // Accept both "kayla christine lopez" and "kayla "
    const validNames = ['alexis aira fruelda fetalvero', 'alexis aira', 'aira', 'alexis aira fetalvero'];
    const validColors = ['pink', 'black', 'white'];
    const isValidName = validNames.includes(name);
    // Accept one to three valid colors separated by spaces or commas.
    const enteredColors = color.split(/[\s,]+/).filter(Boolean);
    const isValidColor = enteredColors.length >= 1 &&
        enteredColors.length <= 3 &&
        enteredColors.every(enteredColor => validColors.includes(enteredColor));
    
    if (isValidName && isValidColor) {
        errorMsg.textContent = '';
        attemptsMsg.textContent = '';
        loginAttempts = 0;
        showWelcome();
    } else {
        loginAttempts++;
        const remaining = MAX_ATTEMPTS - loginAttempts;
        
        if (loginAttempts >= MAX_ATTEMPTS) {
            errorMsg.textContent = 'Too many failed attempts! Please refresh the page.';
            attemptsMsg.textContent = '';
            document.getElementById('loginForm').querySelector('button').disabled = true;
            document.getElementById('nameInput').disabled = true;
            document.getElementById('colorInput').disabled = true;
        } else {
            errorMsg.textContent = 'You are not Aira!';
            attemptsMsg.textContent = `${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`;
        }
    }
});

// Show Welcome with Typewriter Effect and Fireworks
function showWelcome() {
    showPage('welcomePage');
    const message = "Welcome Alexis Aira Fruelda fetalvero!🩷";
    const welcomeEl = document.getElementById('welcomeMessage');
    let i = 0;
    
    welcomeEl.textContent = '';
    
    const typewriter = setInterval(() => {
        if (i < message.length) {
            welcomeEl.textContent += message.charAt(i);
            i++;
        } else {
            clearInterval(typewriter);
            setTimeout(() => showPage('mainMenu'), 2000);
        }
    }, 100);
    
    startFireworks();
}

// Fireworks Animation
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }
    
    let particles = [];
    const colors = ['#ff0080', '#00ffff', '#ffff00', '#ff00ff', '#00ff00'];
    
    function createFirework(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        
        if (Math.random() < 0.05) {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Initialize 360 panorama when gallery page is shown
    if (pageId === 'galleryPage') {
        setTimeout(init360Panorama, 100);
    }
    
    // Setup canvas when surprise page is shown
    if (pageId === 'surprisePage') {
        setTimeout(setupCanvas, 100);
    }
}

// Letters
const letters = [
    {
        title: "To Aira 💜",
        text: "I know your heart feels heavy and your spirit weary, but please remember that this moment is not the end of your story. Rest if you must — you are not falling behind by pausing to breathe. The world can wait while you gather your strength again. You are still worthy, still loved, and still growing in ways unseen. Even on the quiet days when your light feels dim, it has not gone out — it's only resting, waiting for the dawn that will come, just as surely as it always does. 🌤️"
    },
    {
        title: "To Aira 💜",
        text: "I've watched you move through your days with such quiet dignity and kindness that it's become one of my favorite sights in the world. There's a strength in your gentleness, a clarity in your compassion, and an elegance in how you simply are—no fanfare needed. I hope you know how deeply your presence matters, even when you believe you're going unseen. You inspire far more than you realise."
    }
];

function openLetter(num) {
    const modal = document.getElementById('letterModal');
    const letter = letters[num - 1];
    document.getElementById('letterTitle').textContent = letter.title;
    document.getElementById('letterText').textContent = letter.text;
    modal.classList.add('active');
}

function closeLetter() {
    document.getElementById('letterModal').classList.remove('active');
}

// 360 Panorama Viewer
let panoramaAngle = 0;
let isDragging = false;
let startX = 0;
let panoramaCtx;
let panoramaCanvas;

function init360Panorama() {
    panoramaCanvas = document.getElementById('panoramaCanvas');
    if (!panoramaCanvas) return;
    
    panoramaCtx = panoramaCanvas.getContext('2d');
    panoramaCanvas.width = panoramaCanvas.offsetWidth;
    panoramaCanvas.height = 400;
    
    // Draw initial panorama
    drawPanorama();
    
    // Mouse events
    panoramaCanvas.addEventListener('mousedown', startDrag);
    panoramaCanvas.addEventListener('mousemove', drag);
    panoramaCanvas.addEventListener('mouseup', stopDrag);
    panoramaCanvas.addEventListener('mouseleave', stopDrag);
    
    // Touch events
    panoramaCanvas.addEventListener('touchstart', handleTouchStart);
    panoramaCanvas.addEventListener('touchmove', handleTouchMove);
    panoramaCanvas.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
}

function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
}

function drag(e) {
    if (!isDragging) return;
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    panoramaAngle -= deltaX * 0.01;
    startX = currentX;
    drawPanorama();
}

function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    panoramaAngle -= deltaX * 0.01;
    startX = currentX;
    drawPanorama();
}

function stopDrag() {
    isDragging = false;
}

function drawPanorama() {
    if (!panoramaCtx) return;
    
    const w = panoramaCanvas.width;
    const h = panoramaCanvas.height;
    
    // Clear canvas
    panoramaCtx.clearRect(0, 0, w, h);
    
    // Sky gradient
    const skyGrad = panoramaCtx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E0F6FF');
    panoramaCtx.fillStyle = skyGrad;
    panoramaCtx.fillRect(0, 0, w, h * 0.6);
    
    // Ground
    const groundGrad = panoramaCtx.createLinearGradient(0, h * 0.6, 0, h);
    groundGrad.addColorStop(0, '#90EE90');
    groundGrad.addColorStop(1, '#228B22');
    panoramaCtx.fillStyle = groundGrad;
    panoramaCtx.fillRect(0, h * 0.6, w, h * 0.4);
    
    // Draw rotating elements
    const numElements = 12;
    for (let i = 0; i < numElements; i++) {
        const angle = (i / numElements) * Math.PI * 2 + panoramaAngle;
        const x = Math.cos(angle) * w * 0.8 + w / 2;
        const scale = Math.sin(angle) * 0.5 + 0.5;
        const size = 40 + scale * 40;
        const y = h * 0.55 - scale * 50;
        
        if (Math.cos(angle) > -0.5) { // Only draw visible elements
            // Flower or tree
            if (i % 2 === 0) {
                drawPanoramaFlower(x, y, size, scale);
            } else {
                drawPanoramaTree(x, y, size * 1.5, scale);
            }
        }
    }
    
    // Foreground flowers
    for (let i = 0; i < 20; i++) {
        const x = (i / 20) * w + (panoramaAngle * 50) % w;
        const adjustedX = ((x % w) + w) % w;
        const y = h * 0.75 + Math.sin(i * 0.5) * 20;
        drawSmallFlower(adjustedX, y, 15);
    }
}

function drawPanoramaFlower(x, y, size, scale) {
    // Stem
    panoramaCtx.strokeStyle = '#228B22';
    panoramaCtx.lineWidth = 3 * scale;
    panoramaCtx.beginPath();
    panoramaCtx.moveTo(x, y);
    panoramaCtx.lineTo(x, y + size * 0.8);
    panoramaCtx.stroke();
    
    // Petals
    const petals = 6;
    for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2;
        const px = x + Math.cos(angle) * size * 0.3;
        const py = y + Math.sin(angle) * size * 0.3;
        
        panoramaCtx.fillStyle = `rgba(255, ${100 + scale * 100}, 180, ${0.7 + scale * 0.3})`;
        panoramaCtx.beginPath();
        panoramaCtx.arc(px, py, size * 0.2, 0, Math.PI * 2);
        panoramaCtx.fill();
    }
    
    // Center
    panoramaCtx.fillStyle = '#FFD700';
    panoramaCtx.beginPath();
    panoramaCtx.arc(x, y, size * 0.15, 0, Math.PI * 2);
    panoramaCtx.fill();
}

function drawPanoramaTree(x, y, size, scale) {
    // Trunk
    panoramaCtx.fillStyle = '#8B4513';
    panoramaCtx.fillRect(x - size * 0.1, y, size * 0.2, size * 0.6);
    
    // Foliage
    panoramaCtx.fillStyle = `rgba(34, 139, 34, ${0.6 + scale * 0.4})`;
    panoramaCtx.beginPath();
    panoramaCtx.moveTo(x, y - size * 0.3);
    panoramaCtx.lineTo(x - size * 0.4, y + size * 0.2);
    panoramaCtx.lineTo(x + size * 0.4, y + size * 0.2);
    panoramaCtx.closePath();
    panoramaCtx.fill();
}

function drawSmallFlower(x, y, size) {
    panoramaCtx.fillStyle = '#FFD700';
    panoramaCtx.beginPath();
    panoramaCtx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    panoramaCtx.fill();
    
    panoramaCtx.fillStyle = '#FFF';
    const petals = 5;
    for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2;
        panoramaCtx.beginPath();
        panoramaCtx.arc(
            x + Math.cos(angle) * size * 0.4,
            y + Math.sin(angle) * size * 0.4,
            size * 0.3,
            0,
            Math.PI * 2
        );
        panoramaCtx.fill();
    }
}

// Show Surprise Page
function showSurprise() {
    showPage('surprisePage');
}

// Enhanced Canvas Flower Animation with Grass
let canvas, ctx;
let animationId;
let flowers = [];
let grassBlades = [];

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30 + 40;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.color = {
            r: Math.floor(Math.random() * 100 + 155),
            g: Math.floor(Math.random() * 150 + 50),
            b: Math.floor(Math.random() * 150 + 100)
        };
        this.bloomProgress = 0;
        this.blooming = false;
    }
    
    startBloom() {
        this.blooming = true;
    }
    
    update() {
        this.rotation += this.rotationSpeed;
        this.swayOffset += this.swaySpeed;
        
        if (this.blooming && this.bloomProgress < 1) {
            this.bloomProgress += 0.02;
        }
    }
    
    draw() {
        ctx.save();
        
        const sway = Math.sin(this.swayOffset) * 5;
        ctx.translate(this.x + sway, this.y);
        
        // Stem
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 60);
        ctx.stroke();
        
        // Only draw flower if blooming
        if (this.bloomProgress > 0) {
            ctx.rotate(this.rotation);
            
            // Petals
            const petalCount = 8;
            const currentSize = this.size * this.bloomProgress;
            for (let i = 0; i < petalCount; i++) {
                const angle = (i * Math.PI * 2) / petalCount;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, -currentSize * 0.4, currentSize * 0.3, currentSize * 0.6, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
                ctx.fill();
                ctx.strokeStyle = `rgb(${this.color.r - 30}, ${this.color.g - 30}, ${this.color.b - 30})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }
            
            // Center
            ctx.beginPath();
            ctx.arc(0, 0, currentSize * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700';
            ctx.fill();
            ctx.strokeStyle = '#ffa500';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class GrassBlade {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = Math.random() * 30 + 20;
        this.width = Math.random() * 3 + 2;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.03 + 0.01;
        this.color = `rgb(${Math.floor(Math.random() * 50 + 34)}, ${Math.floor(Math.random() * 50 + 139)}, ${Math.floor(Math.random() * 50 + 34)})`;
    }
    
    update() {
        this.swayOffset += this.swaySpeed;
    }
    
    draw() {
        const sway = Math.sin(this.swayOffset) * 10;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(sway / 2, -this.height / 2, sway, -this.height);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        ctx.restore();
    }
}

function setupCanvas() {
    canvas = document.getElementById('flowerCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    
    flowers = [];
    grassBlades = [];
    
    // Create grass
    for (let i = 0; i < 100; i++) {
        grassBlades.push(new GrassBlade(
            Math.random() * canvas.width,
            canvas.height - Math.random() * 100
        ));
    }
    
    // Create initial flowers
    addMoreFlowers();
    
    // Start animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    animate();
}

function bloomAllFlowers() {
    // Bloom all flowers with a cascading effect
    flowers.forEach((flower, index) => {
        setTimeout(() => {
            flower.startBloom();
        }, index * 100);
    });
    
    // Show poem after all flowers bloom
    setTimeout(() => {
        showPoem();
    }, flowers.length * 100 + 1000);
}

function showPoem() {
    const poemEl = document.getElementById('poemMessage');
    const poem = "Like flowers in a field,\nyou bloom in your own time.\nEach petal a reminder—\nyou are beautifully divine.\n\n🌸💜🌸";
    poemEl.textContent = poem;
    poemEl.classList.add('visible');
}

function addMoreFlowers() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * (canvas.width - 100) + 50;
        const y = Math.random() * (canvas.height - 200) + 100;
        flowers.push(new Flower(x, y));
    }
}

function clearGarden() {
    flowers = [];
    grassBlades = [];
    
    // Recreate grass
    for (let i = 0; i < 100; i++) {
        grassBlades.push(new GrassBlade(
            Math.random() * canvas.width,
            canvas.height - Math.random() * 100
        ));
    }
    
    // Hide poem
    const poemEl = document.getElementById('poemMessage');
    poemEl.classList.remove('visible');
    poemEl.textContent = '';
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update grass
    grassBlades.forEach(blade => {
        blade.update();
        blade.draw();
    });
    
    // Draw and update flowers
    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });
    
    animationId = requestAnimationFrame(animate);
}

// Heart Puzzle Game
const puzzleSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentStep = 0;
const secretMessages = [
    "Keep",
    "Going",
    "You're",
    "Doing",
    "An",
    "Amazing",
    "Job",
    ".",
    "💜"
];

function initPuzzle() {
    const grid = document.getElementById('heartsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    currentStep = 0;
    
    puzzleSequence.forEach((num, index) => {
        const button = document.createElement('button');
        button.className = 'heart-button';
        button.innerHTML = `<span class="number">${num}</span>❤️`;
        button.onclick = () => checkHeart(num, button, index);
        grid.appendChild(button);
    });
}

function checkHeart(num, button, index) {
    if (button.classList.contains('revealed')) return;
    
    if (num === puzzleSequence[currentStep]) {
        button.classList.add('revealed');
        currentStep++;
        
        // Update message progressively
        const messageEl = document.getElementById('secretMessage');
        const revealedWords = secretMessages.slice(0, currentStep);
        messageEl.textContent = revealedWords.join(' ');
        messageEl.classList.add('visible');
        
        if (currentStep === puzzleSequence.length) {
            setTimeout(() => {
                messageEl.textContent = '💜 You\'re worth every bit of love and care you give to others. 💜';
                celebratePuzzleComplete();
            }, 500);
        }
    } else {
        // Wrong heart clicked
        button.style.animation = 'shake 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
}

function celebratePuzzleComplete() {
    // Create falling hearts animation
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createFallingHeart(), i * 100);
    }
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💜';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 3s ease-in';
    heart.style.pointerEvents = 'none';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = '100vh';
        heart.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 3100);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('letterModal');
    if (event.target === modal) {
        closeLetter();
    }
}

// Initialize puzzle when page loads
document.addEventListener('DOMContentLoaded', function() {
    initPuzzle();
});
