document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const preloader = document.getElementById('preloader');
    const splineViewer = document.querySelector('spline-viewer');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const typingElement = document.querySelector('.typing-effect');
    const customCursor = document.querySelector('.custom-cursor');
    const skillsList = document.querySelector('.skills-list');
    const skillsCarousel = document.querySelector('.skills-carousel');
    const skillControls = document.querySelector('.skills-controls');
    const projectsFilter = document.querySelector('.projects-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const yearSpan = document.getElementById('current-year');

    // --- DADOS ---
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

    function initPreloader() {
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

    function initNavbar() {
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        if (navLinksContainer && navIndicator) {
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const { left, width } = link.getBoundingClientRect();
                    const containerLeft = navLinksContainer.getBoundingClientRect().left;
                    navIndicator.style.width = `${width}px`;
                    navIndicator.style.left = `${left - containerLeft}px`;
                });
            });

            navLinksContainer.addEventListener('mouseleave', () => {
                navIndicator.style.width = '0';
            });
        }

        if(mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                body.classList.toggle('no-scroll'); 
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        body.classList.remove('no-scroll');
                    }
                });
            });
        }
    }

    function initTypingEffect() {
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
        if (!customCursor || window.matchMedia("(max-width: 768px)").matches) return;

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            });
        });

        const clickableElements = 'a, button, .cta-button, .project-card, .filter-btn, .skill-control, .social-link';
        document.querySelectorAll(clickableElements).forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });
    }

    function initSkillsCarousel() {
        if (!skillsList || !skillsCarousel) return;

        const skillItemsHTML = skills.map(skill => `
            <li class="skill-item">
                <i class="${skill.iconClass}"></i>
                <span>${skill.name}</span>
            </li>
        `).join('');

        skillsList.innerHTML = skillItemsHTML.repeat(2); 
        
        if(skillControls) {
            skillControls.addEventListener('click', (e) => {
                const button = e.target.closest('.skill-control');
                if(!button) return;

                skillsList.style.animationPlayState = 'paused'; 

                const skillItemWidth = skillsList.querySelector('.skill-item').offsetWidth;
                const gap = parseInt(window.getComputedStyle(skillsList).gap);
                const scrollAmount = skillItemWidth + gap;

                if(button.classList.contains('next')) {
                    skillsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else if(button.classList.contains('prev')) {
                    skillsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }

                setTimeout(() => {
                    skillsList.style.animationPlayState = 'running';
                }, 3000);
            });
        }
    }

    function initProjectsFilter() {
        if (!projectsFilter || projectCards.length === 0) return;

        projectsFilter.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.classList.contains('filter-btn')) return;

            projectsFilter.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            const filter = target.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || filter === category;
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        });
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

        document.querySelectorAll('.fade-in-on-scroll').forEach((el, index) => {
            if (el.classList.contains('project-card')) {
                el.style.setProperty('--card-index', index % 3); 
            }
            observer.observe(el);
        });
    }

function initContactForm() {
    if (!contactForm) return;

    async function handleSubmit(event) {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const btnText = submitButton.querySelector('.btn-text');
        const formData = new FormData(event.target);

        btnText.textContent = 'sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                btnText.textContent = 'message sent!';
                contactForm.reset();
                setTimeout(() => {
                    btnText.textContent = 'send message';
                    submitButton.disabled = false;
                }, 3000);
            } else {
                btnText.textContent = 'error!';
                submitButton.style.backgroundColor = '#ff4d4d'; 
                 setTimeout(() => {
                    btnText.textContent = 'send message';
                    submitButton.disabled = false;
                }, 3000);
            }
        } catch (error) {
            btnText.textContent = 'error!';
            console.error('Form submission error:', error);
            setTimeout(() => {
                btnText.textContent = 'send message';
                submitButton.disabled = false;
            }, 3000);
        }
    }

    contactForm.addEventListener("submit", handleSubmit);
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
    
    function initFooterYear() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    function init() {
        initPreloader();
        initNavbar();
        initTypingEffect();
        initCustomCursor();
        initSkillsCarousel();
        initProjectsFilter();
        initScrollAnimations();
        initContactForm();
        initSmoothScroll();
        initFooterYear();
    }

    init();
});