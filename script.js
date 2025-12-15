// script.js

// --- Color Utility Functions ---

// Converts a hex color string (e.g., "#FFC107") to an RGB object
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Mixes two RGB colors based on a factor (0.0 to 1.0)
function mixColors(color1, color2, factor) {
    const r = Math.round(color1.r + (color2.r - color1.r) * factor);
    const g = Math.round(color1.g + (color2.g - color1.g) * factor);
    const b = Math.round(color1.b + (color2.b - color1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
}

// --- Dynamic Scroll Function ---

const scrollArea = document.getElementById('content-scroll-area');
const sections = document.querySelectorAll('#content-scroll-area section');

function updateBackgroundColor() {
    const currentScroll = scrollArea.scrollTop;
    const viewportHeight = scrollArea.clientHeight;
    // Transition starts when the section reaches 50% of the viewport height (activeThreshold)
    const activeThreshold = viewportHeight * 0.5; 

    let activeSection = null;

    // 1. Find the currently active section
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        
        // A section is "active" if its start point is above the transition threshold
        if (currentScroll + activeThreshold >= sectionTop) {
            activeSection = section;
        } else {
            break; 
        }
    }
    
    // 2. Calculate the color transition factor (0.0 to 1.0)
    if (activeSection) {
        const startColorHex = activeSection.getAttribute('data-color-start');
        const endColorHex = activeSection.getAttribute('data-color-end');
        
        const sectionTop = activeSection.offsetTop;
        const sectionHeight = activeSection.offsetHeight;

        // Calculate scroll progress relative to the section's start
        const scrollInSection = (currentScroll + activeThreshold) - sectionTop;

        // The factor determines how much to blend the start and end colors
        let factor = scrollInSection / sectionHeight;
        
        // Clamp factor between 0 and 1 for smooth mixing
        factor = Math.max(0, Math.min(1, factor)); 

        const startColor = hexToRgb(startColorHex);
        const endColor = hexToRgb(endColorHex);
        
        const newColor = mixColors(startColor, endColor, factor);
        
        // Apply the new color to the scroll area
        scrollArea.style.backgroundColor = newColor;
    }
}

// Attach the function to the scroll event
scrollArea.addEventListener('scroll', updateBackgroundColor);

// Run once on load to set the initial color
document.addEventListener('DOMContentLoaded', updateBackgroundColor);
