// page-counter.js - Working page view counter

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure main content is loaded
    setTimeout(addPageCounter, 100);
});

function addPageCounter() {
    // Create counter container
    const counterSection = document.createElement('div');
    counterSection.id = 'page-counter';
    counterSection.style.cssText = `
        text-align: center;
        margin: 50px 0 30px 0;
        padding: 20px;
        border-top: 1px solid #eee;
    `;
    
    // Get your GitHub username from the URL
    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    
    // Add counter with working image counter
    counterSection.innerHTML = `
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodedUrl}&count_bg=%2379C83D&title_bg=%23555555&icon=eye&icon_color=%23E7E7E7&title=Page+Views&edge_flat=false" 
             alt="Page Views"
             style="margin-top: 10px;">
        <p style="margin-top: 10px; color: #666; font-size: 14px;">
            Thank you for visiting my research portfolio
        </p>
    `;
    
    // Add to the end of body content
    document.body.appendChild(counterSection);
}
