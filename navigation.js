// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to navigation buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            // Highlight active button
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Smooth scroll to section
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL hash without scrolling
            history.pushState(null, null, `#${sectionId}`);
        });
    });

    // Highlight current section while scrolling
    let isScrolling;
    window.addEventListener('scroll', () => {
        // Clear previous timeout
        window.clearTimeout(isScrolling);

        // Set new timeout
        isScrolling = setTimeout(() => {
            const sections = document.querySelectorAll('.subject-section');
            const navButtons = document.querySelectorAll('.nav-btn');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight/3)) {
                    currentSection = section.getAttribute('id');
                }
            });

            navButtons.forEach(button => {
                button.classList.remove('active');
                if(button.getAttribute('data-section') === currentSection) {
                    button.classList.add('active');
                    // Update URL hash without scrolling
                    history.replaceState(null, null, `#${currentSection}`);
                }
            });
        }, 100);
    });

    // Handle initial page load with hash
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the correct button
            const button = document.querySelector(`[data-section="${sectionId}"]`);
            if (button) {
                button.classList.add('active');
            }
        }
    }
});
