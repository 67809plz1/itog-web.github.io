// particles.js - новый файл
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные свойства
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 15;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${posY}%;
            left: ${posX}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            background: ${i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)'};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', createParticles);