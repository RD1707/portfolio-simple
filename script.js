document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DO DOM ---
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

    // --- MÓDULO: PRELOADER ---
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
        setTimeout(hidePreloader, 4000); // Failsafe para esconder o preloader
    }

    // --- MÓDULO: NAVBAR & NAVEGAÇÃO ---
    function initNavbar() {
        if (!navbar) return;
        
        // Efeito de "scrolled"
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Indicador de navegação no hover
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
        
        // Menu Mobile
        if(mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                body.classList.toggle('no-scroll'); // Opcional: para travar o scroll do body
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

    // --- MÓDULO: EFEITOS DE TEXTO E CURSOR ---
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

    // --- MÓDULO: CARROSSEL DE SKILLS ---
    function initSkillsCarousel() {
        if (!skillsList || !skillsCarousel) return;

        const skillItemsHTML = skills.map(skill => `
            <li class="skill-item">
                <i class="${skill.iconClass}"></i>
                <span>${skill.name}</span>
            </li>
        `).join('');

        skillsList.innerHTML = skillItemsHTML.repeat(2); // Duplicar para o efeito infinito
        
        if(skillControls) {
            skillControls.addEventListener('click', (e) => {
                const button = e.target.closest('.skill-control');
                if(!button) return;

                skillsList.style.animationPlayState = 'paused'; // Pausa a animação CSS ao interagir

                const skillItemWidth = skillsList.querySelector('.skill-item').offsetWidth;
                const gap = parseInt(window.getComputedStyle(skillsList).gap);
                const scrollAmount = skillItemWidth + gap;

                if(button.classList.contains('next')) {
                    skillsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else if(button.classList.contains('prev')) {
                    skillsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }

                // Retoma a animação após um tempo
                setTimeout(() => {
                    skillsList.style.animationPlayState = 'running';
                }, 3000);
            });
        }
    }

    // --- MÓDULO: FILTRO DE PROJETOS ---
    function initProjectsFilter() {
        if (!projectsFilter || projectCards.length === 0) return;

        projectsFilter.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.classList.contains('filter-btn')) return;

            // Atualiza o botão ativo
            projectsFilter.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            const filter = target.dataset.filter;

            // Filtra os cards
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || filter === category;
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        });
    }

    // --- MÓDULO: ANIMAÇÕES DE SCROLL ---
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
                el.style.setProperty('--card-index', index % 3); // Para reiniciar a animação por linha
            }
            observer.observe(el);
        });
    }

    // --- MÓDULO: FORMULÁRIO DE CONTATO ---
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            
            // Simulação de envio
            btnText.textContent = 'sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                btnText.textContent = 'message send!';
                contactForm.reset();
                setTimeout(() => {
                    btnText.textContent = 'send message';
                    submitButton.disabled = false;
                }, 2500);
            }, 1500);
        });
    }
    
    // --- MÓDULO: UTILITÁRIOS ---
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

    // --- INICIALIZAÇÃO GERAL ---
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