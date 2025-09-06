document.addEventListener('DOMContentLoaded', function() {
    const prato = document.querySelector('.prato');
    let isRotating = false;
    
    prato.addEventListener('mouseenter', function() {
        if (!isRotating) {
            isRotating = true;
            this.style.transform = 'rotate(360deg) scale(1.05)';
            
            // Reseta a rotação após a animação terminar
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
                isRotating = false;
            }, 800);
        }
    });
});