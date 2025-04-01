window.addEventListener('load', function() {
    const loaderContainer = document.querySelector('.loader-container');
    const content = document.querySelector('.content');
    
    const isFirstVisit = !sessionStorage.getItem('hasVisited');

    if (isFirstVisit) {
        sessionStorage.setItem('hasVisited', 'true');
        
        setTimeout(() => {
            loaderContainer.style.opacity = '0';
            content.style.display = 'block';
            
            setTimeout(() => {
                content.classList.add('visible');
                loaderContainer.style.display = 'none';
            }, 500);
        }, 2000);
    } else {
        // Hide loader and show content immediately
        loaderContainer.style.display = 'none';
        content.style.display = 'block';
        content.classList.add('visible');
    }
});
