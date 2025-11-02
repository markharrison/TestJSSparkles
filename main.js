/**
 * Main Animation Loop
 */

// Get canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Initialize sparkle effect
const sparkleEffect = new SparkleEffect(canvas);

// Animation state
let animationId;
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

/**
 * Animation loop
 */
function animate(currentTime) {
    animationId = requestAnimationFrame(animate);
    
    // Calculate delta time
    const deltaTime = currentTime - lastTime;
    
    // Limit frame rate
    if (deltaTime < frameInterval) {
        return;
    }
    
    lastTime = currentTime - (deltaTime % frameInterval);
    
    // Clear canvas
    ctx.fillStyle = 'rgba(15, 15, 30, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add new sparkles randomly
    if (Math.random() < 0.3) {
        sparkleEffect.addSparkles(3);
    }
    
    // Update and draw sparkles
    sparkleEffect.draw();
    
    // Display sparkle count (optional debug info)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '14px Arial';
    ctx.fillText(`Sparkles: ${sparkleEffect.getSparkleCount()}`, 10, 20);
}

// Mouse interaction - create sparkles on click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sparkleEffect.addSparkles(10, x, y);
});

// Mouse move interaction - create sparkles on mouse move
let isMouseDown = false;
let canvasRect = canvas.getBoundingClientRect();

// Update canvas rect on window resize
window.addEventListener('resize', () => {
    canvasRect = canvas.getBoundingClientRect();
});

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
    canvasRect = canvas.getBoundingClientRect();
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        sparkleEffect.addSparkles(5, x, y);
    }
});

// Start animation
animate(0);

console.log('Sparkle animation started!');
