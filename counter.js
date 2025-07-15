// counter.js - View counter script for GitHub Pages

// Configuration
const COUNTER_CONFIG = {
    position: 'bottom-center', // Options: 'bottom-center', 'bottom-right', 'bottom-left', 'top'
    style: 'badge' // Options: 'badge', 'text', 'retro'
};

// Initialize counter when page loads
document.addEventListener('DOMContentLoaded', function() {
    addViewCounter();
});

function addViewCounter() {
    // Create counter container
    const counterDiv = document.createElement('div');
    counterDiv.id = 'view-counter-container';
    
    // Apply positioning
    setCounterPosition(counterDiv);
    
    // Get current page URL
    const pageUrl = encodeURIComponent(window.location.href);
    
    // Choose counter style
    switch(COUNTER_CONFIG.style) {
        case 'badge':
            addBadgeCounter(counterDiv, pageUrl);
            break;
        case 'text':
            addTextCounter(counterDiv);
            break;
        case 'retro':
            addRetroCounter(counterDiv);
            break;
        default:
            addBadgeCounter(counterDiv, pageUrl);
    }
    
    // Add to page
    document.body.appendChild(counterDiv);
}

function setCounterPosition(element) {
    const positions = {
        'bottom-center': `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
        `,
        'bottom-right': `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        `,
        'bottom-left': `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
        `,
        'top': `
            text-align: center;
            margin: 20px 0;
        `
    };
    
    element.style.cssText = positions[COUNTER_CONFIG.position] || positions['bottom-center'];
}

// Style 1: Badge Counter
function addBadgeCounter(container, pageUrl) {
    container.innerHTML = `
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${pageUrl}&count_bg=%2379C83D&title_bg=%23555555&icon=eye&icon_color=%23E7E7E7&title=Page+Views&edge_flat=false" 
             alt="Page Views"
             style="border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    `;
}

// Style 2: Text Counter with CountAPI
function addTextCounter(container) {
    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.9); padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
            <span style="color: #666;">👁️ Views: </span>
            <span id="visit-count" style="font-weight: bold; color: #333;">Loading...</span>
        </div>
    `;
    
    // Fetch count from CountAPI
    const namespace = window.location.hostname || 'github-pages';
    const key = window.location.pathname.replace(/\//g, '-') || 'home';
    
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('visit-count').innerText = data.value.toLocaleString();
        })
        .catch(error => {
            console.error('Counter error:', error);
            document.getElementById('visit-count').innerText = 'N/A';
        });
}

// Style 3: Retro Counter
function addRetroCounter(container) {
    container.innerHTML = `
        <div style="background: #000; padding: 5px 10px; border-radius: 3px; font-family: 'Courier New', monospace;">
            <span style="color: #0f0; font-size: 14px;">VISITORS: </span>
            <span id="retro-count" style="color: #0f0; font-size: 14px; letter-spacing: 2px;">000000</span>
        </div>
    `;
    
    // Animated counting effect
    let count = localStorage.getItem('page-views') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('page-views', count);
    
    const countElement = document.getElementById('retro-count');
    const targetCount = count;
    let currentCount = 0;
    
    const interval = setInterval(() => {
        currentCount += Math.ceil((targetCount - currentCount) / 10);
        countElement.textContent = currentCount.toString().padStart(6, '0');
        
        if (currentCount >= targetCount) {
            clearInterval(interval);
        }
    }, 50);
}

// Optional: Add custom styling
const style = document.createElement('style');
style.textContent = `
    #view-counter-container {
        transition: opacity 0.3s ease;
    }
    
    #view-counter-container:hover {
        opacity: 0.8;
    }
    
    /* Hide on print */
    @media print {
        #view-counter-container {
            display: none !important;
        }
    }
    
    /* Responsive */
    @media (max-width: 600px) {
        #view-counter-container {
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Export for use in other scripts if needed
window.ViewCounter = {
    refresh: addViewCounter,
    hide: () => {
        const counter = document.getElementById('view-counter-container');
        if (counter) counter.style.display = 'none';
    },
    show: () => {
        const counter = document.getElementById('view-counter-container');
        if (counter) counter.style.display = 'block';
    }
};
