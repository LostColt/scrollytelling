document.addEventListener("DOMContentLoaded", (event) => {
    
    // Register the ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Select all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    // --- CINEMATIC ZOOM EFFECT IMPLEMENTATION ---
    timelineItems.forEach((item) => {
        
        // 1. Set initial state immediately
        gsap.set(item, {
            scale: 0.85, 
            opacity: 0.4
        });

        // 2. Create the ScrollTrigger
        ScrollTrigger.create({
            trigger: item,
            start: "top bottom", // Start when item enters bottom of screen
            end: "bottom top",   // End when item leaves top of screen
            scrub: true,         // Link to scrollbar
            // markers: true,    // Uncomment this line to debug (shows start/end lines on screen)
            
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Calculate sine wave for peak center effect
                // Peak (1.0) is at progress 0.5 (center of viewport)
                let scaleValue = 0.85 + (0.15 * Math.sin(progress * Math.PI));
                let opacityValue = 0.4 + (0.6 * Math.sin(progress * Math.PI));

                // FIX: Use gsap.set instead of gsap.to inside onUpdate for instant, glitch-free updates
                gsap.set(item, {
                    scale: scaleValue,
                    opacity: opacityValue
                });

                // Add active class for CSS glow
                if (progress > 0.25 && progress < 0.75) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    });

    // Optional: Fade-in for other sections
    document.querySelectorAll('section:not(#hero-section):not(.timeline-section)').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Force refresh to ensure positions are calculated after layout settles
    ScrollTrigger.refresh();
});
