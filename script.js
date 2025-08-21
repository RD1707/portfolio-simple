document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const preloader = document.getElementById('preloader');
    const splineViewer = document.querySelector('spline-viewer');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const typingElement = document.querySelector('.typing-effect');
    const skillsList = document.querySelector('.skills-list');
    const projectsContainer = document.querySelector('#projects');
    const projectsFilter = document.querySelector('.projects-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const projectTags = document.querySelectorAll('.project-tags .tag');
    const contactForm = document.getElementById('contactForm');
    const yearSpan = document.getElementById('current-year');

    let typedInstance = null; 

    const typingStrings = [
        'software developer.', 
        'front-end specialist.', 
        'back-end engineer.', 
        'freelancer.', 
        'problem solver.'
    ];

    const skills = [
        { name: 'html5', iconClass: 'devicon-html5-plain', tooltip: '3+ anos de experiência' },
        { name: 'css3', iconClass: 'devicon-css3-plain', tooltip: '3+ anos de experiência' },
        { name: 'javascript', iconClass: 'devicon-javascript-plain', tooltip: '3+ anos de experiência' },
        { name: 'python', iconClass: 'devicon-python-plain', tooltip: '2+ anos de experiência' },
        { name: 'node.js', iconClass: 'devicon-nodejs-plain', tooltip: '2 anos de experiência' },
        { name: 'lua', iconClass: 'devicon-lua-plain', tooltip: '1+ ano de experiência' },
        { name: 'react', iconClass: 'devicon-react-original', tooltip: '2 anos de experiência' },
        { name: 'vue.js', iconClass: 'devicon-vuejs-plain', tooltip: '1 ano de experiência' },
        { name: 'postgresql', iconClass: 'devicon-postgresql-plain', tooltip: '2+ anos de experiência' },
        { name: 'git', iconClass: 'devicon-git-plain', tooltip: '3+ anos de experiência' },
        { name: 'php', iconClass: 'devicon-php-plain', tooltip: '1 ano de experiência' },
        { name: 'c++', iconClass: 'devicon-cplusplus-plain', tooltip: '1 ano de experiência' }
    ];

    const splineBlocker = document.querySelector('.spline-blocker');
    if (splineBlocker) {
        splineBlocker.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
        splineBlocker.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        splineBlocker.addEventListener('pointerdown', (e) => e.preventDefault(), { passive: false });
    }

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

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active', isActive);
                body.classList.toggle('no-scroll', isActive);
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

    function initTypingEffect(stringsArray) {
        if (typingElement && typeof Typed !== 'undefined') {
            if (typedInstance) {
                typedInstance.destroy();
            }
            typedInstance = new Typed(typingElement, {
                strings: stringsArray,
                typeSpeed: 40,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 500,
                loop: true,
                smartBackspace: true
            });
        }
    }
    
    function initSkillsCarousel() {
        if (!skillsList) return;
        const skillItemsHTML = skills.map(skill => `
            <li class="skill-item" data-tooltip="${skill.tooltip}">
                <i class="${skill.iconClass}"></i>
                <span>${skill.name}</span>
            </li>
        `).join('');
        skillsList.innerHTML = skillItemsHTML.repeat(2);
    }

    function initProjectsFilter() {
        if (!projectsFilter || projectCards.length === 0) return;

        const filterProjects = (filterValue) => {
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filterValue === 'all' || category.includes(filterValue);
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        };

        projectsFilter.addEventListener('click', (e) => {
            const target = e.target.closest('.filter-btn');
            if (!target) return;

            projectsFilter.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            filterProjects(target.dataset.filter);
        });

        projectTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const filterValue = tag.dataset.filterTag;
                const correspondingButton = projectsFilter.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
                
                if (correspondingButton) {
                    projectsFilter.querySelector('.active').classList.remove('active');
                    correspondingButton.classList.add('active');
                    filterProjects(filterValue);
                    projectsContainer.scrollIntoView({ behavior: 'smooth' });
                }
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

        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    function initContactForm() {
        if (!contactForm) return;

        const emailInput = contactForm.querySelector('#email');
        
        emailInput.addEventListener('input', () => {
            emailInput.style.borderColor = emailInput.checkValidity() ? 'var(--border-primary)' : '#ff4d4d';
        });

        async function handleSubmit(event) {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = new FormData(event.target);
            btnText.textContent = 'enviando...';
            submitButton.disabled = true;

            try {
                const response = await fetch(event.target.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btnText.textContent = 'mensagem enviada!';
                    submitButton.style.backgroundColor = '#34D399'; 
                    contactForm.reset();
                } else {
                    throw new Error('Falha no envio');
                }
            } catch (error) {
                btnText.textContent = 'erro ao enviar';
                submitButton.style.backgroundColor = '#ff4d4d'; 
                console.error('Erro no envio do formulário:', error);
            } finally {
                setTimeout(() => {
                    btnText.textContent = 'enviar mensagem';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = ''; 
                }, 4000);
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
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        initTypingEffect(typingStrings);
        initSkillsCarousel();
        initProjectsFilter();
        initScrollAnimations();
        initContactForm();
        initSmoothScroll();
        initFooterYear();
    }

    init();
});