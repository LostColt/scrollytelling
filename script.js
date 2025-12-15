document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element enters the viewport
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
                // Stop observing once it has appeared
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup: ensure all sections start hidden and then start observing
    sections.forEach(section => {
        // Ensure the CSS class is present before observing
        section.classList.add('section-hidden');
        observer.observe(section);
    });
});
