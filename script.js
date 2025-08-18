document.addEventListener('DOMContentLoaded', () => {

    function initPreloader() {
    const splineViewer = document.querySelector('spline-viewer');
    const preloader = document.getElementById('preloader');
    const body = document.body;

    if (!splineViewer || !preloader) return;

    let isLoaded = false;

    const hidePreloader = () => {
        if (isLoaded) return;
        isLoaded = true;

        preloader.classList.add('loaded');
        body.classList.remove('loading-active');
    };

    splineViewer.addEventListener('load', hidePreloader);

    setTimeout(hidePreloader, 4000);
}

    const skills = [
        { name: 'html5', iconClass: 'devicon-html5-plain' },
        { name: 'css3', iconClass: 'devicon-css3-plain' },
        { name: 'javascript', iconClass: 'devicon-javascript-plain' },
        { name: 'python', iconClass: 'devicon-python-plain' },
        { name: 'node.js', iconClass: 'devicon-nodejs-plain' },
        { name: 'lua', iconClass: 'devicon-lua-plain' },
        { name: 'react', iconClass: 'devicon-react-original' },
        { name: 'vue.js', iconClass: 'devicon-vuejs-plain' },
        { name: 'postgresql', iconClass: 'devicon-postgresql-plain' },
        { name: 'git', iconClass: 'devicon-git-plain' },
        { name: 'php', iconClass: 'devicon-php-plain' },
        { name: 'c++', iconClass: 'devicon-cplusplus-plain' }
    ];

    function initTypingEffect() {
        const typingElement = document.querySelector('.typing-effect');
        if (typingElement) {
            new Typed(typingElement, {
                strings: ['software developer.', 'front-end specialist.', 'back-end engineer.', 'creative coder.', 'freelancer.', 'problem solver.'],
                typeSpeed: 30,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 700,
                loop: true,
                smartBackspace: true
            });
        }
    }

    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });

        const clickableElements = 'a, button, .cta-button, .project-card, .cta-button-secondary';
        document.querySelectorAll(clickableElements).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function initSkillsCarousel() {
        const skillsList = document.querySelector('.skills-list');
        if (!skillsList) return;

        const skillItemsHTML = skills.map(skill => `
            <li class="skill-item">
                <i class="${skill.iconClass}"></i>
                <span>${skill.name}</span>
            </li>
        `).join('');

        skillsList.innerHTML = skillItemsHTML.repeat(2);
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
    }

    function initFooterYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    initPreloader();
    initTypingEffect();
    initCustomCursor();
    initSmoothScroll();
    initSkillsCarousel();
    initScrollAnimations();
    initFooterYear();
});