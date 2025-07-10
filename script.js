// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight active navbar item based on current page
    const navItems = document.querySelectorAll('.main-navbar .nav-item');
    const currentPath = window.location.pathname.split('/').pop();

    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPath || (currentPath === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Read More / Show Less functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        const description = button.previousElementSibling; // The description paragraph
        const fullText = description.getAttribute('data-full-text');
        const snippetLength = 200; // Adjust snippet length as needed

        // Initialize description to snippet if it's long
        if (fullText.length > snippetLength) {
            description.textContent = fullText.substring(0, snippetLength) + '...';
            button.style.display = 'block'; // Show button
        } else {
            button.style.display = 'none'; // Hide button if text is short
            description.textContent = fullText; // Show full text if short
        }

        // Event listener for button click
        button.addEventListener('click', () => {
            if (description.classList.contains('show')) {
                // Currently showing full text, collapse to snippet
                description.style.maxHeight = '0';
                description.style.opacity = '0';
                setTimeout(() => {
                    description.textContent = fullText.substring(0, snippetLength) + '...';
                    description.classList.remove('show');
                    button.textContent = 'Read More';
                }, 300); // Match CSS transition duration
            } else {
                // Currently showing snippet, expand to full text
                description.textContent = fullText;
                description.style.maxHeight = description.scrollHeight + 'px'; // Set max-height to actual scroll height
                description.style.opacity = '1';
                description.classList.add('show');
                button.textContent = 'Show Less';
            }
        });
    });

    // Skill Bar Animation (on intersection)
    const skillBars = document.querySelectorAll('.skill-bar');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
                observer.unobserve(skillBar); // Stop observing once animated
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});
