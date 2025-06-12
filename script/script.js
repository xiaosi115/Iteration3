document.addEventListener('DOMContentLoaded', () => {
    console.log('C.A.R.S website initialized');

    // Mobile menu toggle
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simple Animation on scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-fade-in-down, .animate-slide-in-left');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('start-animation');
                    // Optional: unobserve after animation to prevent re-triggering
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('start-animation'); 
        });
        console.warn('IntersectionObserver not supported, animations on scroll might not work as intended.');
    }
});