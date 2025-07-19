// page-counter.js - Alternative counter service

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addPageCounter, 100);
});

function addPageCounter() {
    const counterSection = document.createElement('div');
    counterSection.id = 'page-counter';
    counterSection.style.cssText = `
        text-align: center;
        margin: 50px 0 30px 0;
        padding: 20px;
        border-top: 1px solid #eee;
    `;
    
    // Using visitor-badge service instead
    counterSection.innerHTML = `
        <img src="https://visitor-badge.laobi.icu/badge?page_id=${window.location.hostname}.publications" 
             alt="Visitors"
             style="margin-top: 10px;">
        <p style="margin-top: 10px; color: #666; font-size: 14px;">
            Thank you for visiting
        </p>
    `;
    
    document.body.appendChild(counterSection);
}
