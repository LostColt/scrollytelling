// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Select all timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

// --- CINEMATIC ZOOM EFFECT IMPLEMENTATION ---
timelineItems.forEach((item) => {
    
    // 1. Set the initial state (before the animation starts)
    gsap.set(item, {
        scale: 0.85, // Starts slightly scaled down
        opacity: 0.4
    });

    // 2. Create the ScrollTrigger
    ScrollTrigger.create({
        trigger: item,
        start: "top bottom", // Start when item enters from the bottom
        end: "bottom top", // End when item leaves at the top
        scrub: true, // Link animation directly to scroll position
        
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Use a sine wave function (Math.sin) to make the animation peak (scale: 1.0, opacity: 1.0) 
            // when the item is in the center of the viewport (progress ≈ 0.5), and drop off 
            // smoothly at the start (progress = 0) and end (progress = 1).
            
            // Calculate scale and opacity based on the sine wave of the progress (0 to 1)
            let scaleValue = 0.85 + (1.0 - 0.85) * (Math.sin(progress * Math.PI));
            let opacityValue = 0.4 + (1.0 - 0.4) * (Math.sin(progress * Math.PI));

            // Apply the calculated scale and opacity smoothly
            gsap.to(item, {
                scale: scaleValue,
                opacity: opacityValue,
                duration: 0.1, 
                ease: "none"
            });

            // Add the 'active' class (for CSS glow) when it's clearly visible
            if (progress > 0.25 && progress < 0.75) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
});


// Optional: Add a subtle fade-in effect for the main sections when they enter the viewport
document.querySelectorAll('section:not(#hero-section)').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%", // Starts animating when the section is 20% down from the top
            toggleActions: "play none none none" // Play only once
        }
    });
});
