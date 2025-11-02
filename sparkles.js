/**
 * Sparkle Effect Module
 * A reusable sparkle effect system for canvas animations
 */

class SparkleEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sparkles = [];
        this.maxSparkles = 100;
    }

    /**
     * Creates a new sparkle particle
     */
    createSparkle(x, y) {
        const sparkle = {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.005,
            color: this.getRandomColor(),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        };
        return sparkle;
    }

    /**
     * Generates a random sparkle color
     */
    getRandomColor() {
        const colors = [
            { r: 255, g: 255, b: 255 }, // White
            { r: 255, g: 223, b: 0 },   // Gold
            { r: 135, g: 206, b: 250 }, // Sky Blue
            { r: 255, g: 182, b: 193 }, // Light Pink
            { r: 144, g: 238, b: 144 }, // Light Green
            { r: 255, g: 165, b: 0 }    // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Adds sparkles to the system
     */
    addSparkles(count = 1, x, y) {
        for (let i = 0; i < count; i++) {
            if (this.sparkles.length < this.maxSparkles) {
                this.sparkles.push(this.createSparkle(x, y));
            }
        }
    }

    /**
     * Updates all sparkles
     */
    update() {
        // Update existing sparkles
        for (let i = this.sparkles.length - 1; i >= 0; i--) {
            const sparkle = this.sparkles[i];
            
            // Update position
            sparkle.x += sparkle.speedX;
            sparkle.y += sparkle.speedY;
            
            // Update rotation
            sparkle.rotation += sparkle.rotationSpeed;
            
            // Update life
            sparkle.life -= sparkle.decay;
            
            // Remove dead sparkles
            if (sparkle.life <= 0) {
                this.sparkles.splice(i, 1);
            }
        }
    }

    /**
     * Renders all sparkles
     */
    render() {
        this.sparkles.forEach(sparkle => {
            this.ctx.save();
            
            // Set opacity based on life
            this.ctx.globalAlpha = sparkle.life;
            
            // Translate to sparkle position
            this.ctx.translate(sparkle.x, sparkle.y);
            this.ctx.rotate(sparkle.rotation);
            
            // Draw sparkle as a star shape
            const spikes = 4;
            const outerRadius = sparkle.size;
            const innerRadius = sparkle.size / 2;
            
            this.ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (Math.PI / spikes) * i;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            
            // Create gradient for sparkle
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
            gradient.addColorStop(0, `rgba(${sparkle.color.r}, ${sparkle.color.g}, ${sparkle.color.b}, 1)`);
            gradient.addColorStop(0.5, `rgba(${sparkle.color.r}, ${sparkle.color.g}, ${sparkle.color.b}, 0.5)`);
            gradient.addColorStop(1, `rgba(${sparkle.color.r}, ${sparkle.color.g}, ${sparkle.color.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    /**
     * Main draw method - updates and renders
     */
    draw() {
        this.update();
        this.render();
    }

    /**
     * Gets the current number of active sparkles
     */
    getSparkleCount() {
        return this.sparkles.length;
    }

    /**
     * Clears all sparkles
     */
    clear() {
        this.sparkles = [];
    }
}
