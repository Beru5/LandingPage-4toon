document.addEventListener("DOMContentLoaded", function() {
    
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll < 0) {
            currentScroll = 0;
        }

        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollTop = currentScroll;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

});