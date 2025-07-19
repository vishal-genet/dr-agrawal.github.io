// page-counter.js - Minimalist text counter

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addPageCounter, 100);
});

function addPageCounter() {
    const counterSection = document.createElement('div');
    counterSection.style.cssText = `
        text-align: center;
        margin: 40px 0 20px 0;
        padding: 15px;
        color: #666;
        font-size: 14px;
    `;
    
    counterSection.innerHTML = `
        <div style="display: inline-block; padding: 8px 20px; background: #f5f5f5; border-radius: 20px;">
            <span id="view-count">👁️ Loading views...</span>
        </div>
    `;
    
    document.body.appendChild(counterSection);
    
    // Update with actual count
    fetch(`https://api.countapi.xyz/hit/${window.location.hostname}/${window.location.pathname.replace(/\//g, '-')}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('view-count').innerHTML = `👁️ ${data.value.toLocaleString()} views`;
        })
        .catch(() => {
            document.getElementById('view-count').innerHTML = `👁️ Thanks for visiting`;
        });
}
