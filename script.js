document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores de Elementos DOM ---
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
    const themeToggleButton = document.getElementById('theme-toggle');
    const langSwitcher = document.querySelector('.lang-switcher');

    let typedInstance = null; // Guarda a instância do Typed.js

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

    // --- Dicionário de Traduções Completo ---
    const translations = {
        'pt-BR': {
            typingStrings: ['desenvolvedor de software.', 'especialista front-end.', 'engenheiro back-end.', 'freelancer.', 'solucionador de problemas.'],
            navAbout: 'sobre',
            navProjects: 'projetos',
            navContact: 'contato',
            heroDescription: 'olá, sou o simple. um desenvolvedor de software com 3+ anos de experiência, transformando ideias em aplicações de alta performance com precisão.',
            heroBtnProjects: 'ver projetos',
            heroBtnContact: 'entrar em contato',
            aboutTitle: 'sobre mim',
            aboutSubtitle: 'Um desenvolvedor dedicado a criar experiências digitais memoráveis.',
            aboutLeadText: 'Sou apaixonado por criar soluções inovadoras e eficientes. Com mais de 3 anos de experiência, tenho me dedicado a dominar tecnologias para construir aplicações web modernas e automações poderosas.',
            aboutParagraph1: 'Minha especialidade é transformar problemas complexos em código limpo, manutenível e escalável. Acredito no poder de um software bem construído para fazer a diferença na vida das pessoas.',
            aboutParagraph2: 'Fora do mundo do código, tenho interesse em design, música e fotografia — hobbies que aprimoram minha criatividade e atenção aos detalhes em cada projeto que desenvolvo.',
            highlight1: 'Código limpo e eficiente',
            highlight2: 'Otimização de performance',
            highlight3: 'Abordagem focada no design',
            timelineTitle: 'minha jornada',
            timeline1Title: 'Início dos Estudos',
            timeline1Desc: 'Comecei a explorar o mundo da programação, focando em lógica e algoritmos.',
            timeline2Title: 'Primeiro Projeto Freelance',
            timeline2Desc: 'Desenvolvi um sistema de automação para um pequeno negócio, otimizando seu fluxo de trabalho.',
            timeline3Title: 'Foco em Desenvolvimento Web',
            timeline3Desc: 'Aprofundei meus conhecimentos em JavaScript, React e Node.js para criar aplicações completas.',
            timeline4Title: 'Especialização em Backend',
            timeline4Desc: 'Explorei arquiteturas de microsserviços e otimização de bancos de dados para sistemas escaláveis.',
            skillsTitle: 'habilidades',
            skillsSubtitle: 'Ferramentas e tecnologias com as quais trabalho diariamente.',
            projectsTitle: 'projetos em destaque',
            projectsSubtitle: 'Uma coleção dos meus trabalhos mais impactantes.',
            filterAll: 'todos',
            filterFrontend: 'frontend',
            filterBackend: 'backend',
            filterFullstack: 'fullstack',
            filterRoblox: 'roblox',
            project1Category: 'Backend / Banco de Dados',
            project1Title: 'Sistema de Gerenciamento de Biblioteca',
            project1Desc: 'Banco de dados relacional com PostgreSQL para gerenciar livros, autores e empréstimos, com triggers e views para relatórios avançados.',
            statusCompleted: 'concluído',
            project2Category: 'Fullstack',
            project2Title: 'Gerenciador de Tarefas Colaborativo',
            project2Desc: 'Aplicação web com React e Node.js que permite a criação e gerenciamento de tarefas em tempo real para equipes.',
            statusInProgress: 'em desenvolvimento',
            project3Category: 'Frontend / Freelance',
            project3Title: 'Landing Page para E-commerce',
            project3Desc: 'Interface de usuário moderna e responsiva para uma loja virtual, focada na experiência do usuário e otimização de conversão.',
            statusRealClient: 'cliente real',
            projectsBtnGithub: 'ver todos os projetos no github',
            testimonialsTitle: 'o que dizem os clientes',
            testimonialsSubtitle: 'Feedback de pessoas com quem já colaborei.',
            testimonial1Text: '"O Simple entregou exatamente o que precisávamos. Um desenvolvedor profissional, eficiente e incrivelmente talentoso."',
            testimonial1Author: 'Sarah Martinez',
            testimonial1Role: 'Fundadora de Startup',
            testimonial2Text: '"A comunicação foi transparente e o produto final excedeu todas as nossas expectativas. Um verdadeiro solucionador de problemas."',
            testimonial2Author: 'Alex Lee',
            testimonial2Role: 'Gerente de Projetos, Roblox',
            contactTitle: 'entre em contato',
            contactSubtitle: 'Pronto para começar seu próximo projeto?',
            contactLeadText: 'Estou disponível para novas oportunidades e colaborações. Se você tem um projeto em mente ou apenas quer se conectar, sinta-se à vontade para me procurar.',
            contactEmailLabel: 'email',
            contactFollowMe: 'siga-me',
            formNameLabel: 'nome',
            formEmailLabel: 'email',
            formMessageLabel: 'mensagem',
            formSubmitBtn: 'enviar mensagem',
            footerTagline: 'Criando experiências digitais com código.',
            footerLocation: 'Salvador, Brasil',
            footerNavHeading: 'navegação',
            footerConnectHeading: 'conecte-se',
            footerCopyright: 'simple. todos os direitos reservados.',
        },
        'en': {
            typingStrings: ['software developer.', 'front-end specialist.', 'back-end engineer.', 'freelancer.', 'problem solver.'],
            navAbout: 'about',
            navProjects: 'projects',
            navContact: 'contact',
            heroDescription: 'hello, i\'m simple. a software developer with 3+ years of experience, turning ideas into high-performance applications with precision.',
            heroBtnProjects: 'view projects',
            heroBtnContact: 'get in touch',
            aboutTitle: 'about me',
            aboutSubtitle: 'A developer dedicated to creating memorable digital experiences.',
            aboutLeadText: 'I am passionate about creating innovative and efficient solutions. With over 3 years of experience, I have dedicated myself to mastering technologies to build modern web applications and powerful automations.',
            aboutParagraph1: 'My specialty is transforming complex problems into clean, maintainable, and scalable code. I believe in the power of well-built software to make a difference in people\'s lives.',
            aboutParagraph2: 'Outside the world of code, I am interested in design, music, and photography—hobbies that enhance my creativity and attention to detail in every project I develop.',
            highlight1: 'Clean and efficient code',
            highlight2: 'Performance optimization',
            highlight3: 'Design-focused approach',
            timelineTitle: 'my journey',
            timeline1Title: 'Start of Studies',
            timeline1Desc: 'I began exploring the world of programming, focusing on logic and algorithms.',
            timeline2Title: 'First Freelance Project',
            timeline2Desc: 'I developed an automation system for a small business, optimizing its workflow.',
            timeline3Title: 'Focus on Web Development',
            timeline3Desc: 'I deepened my knowledge in JavaScript, React, and Node.js to create complete applications.',
            timeline4Title: 'Backend Specialization',
            timeline4Desc: 'I explored microservices architectures and database optimization for scalable systems.',
            skillsTitle: 'skills',
            skillsSubtitle: 'Tools and technologies I work with daily.',
            projectsTitle: 'featured projects',
            projectsSubtitle: 'A collection of my most impactful works.',
            filterAll: 'all',
            filterFrontend: 'frontend',
            filterBackend: 'backend',
            filterFullstack: 'fullstack',
            filterRoblox: 'roblox',
            project1Category: 'Backend / Database',
            project1Title: 'Library Management System',
            project1Desc: 'Relational database with PostgreSQL to manage books, authors, and loans, with triggers and views for advanced reporting.',
            statusCompleted: 'completed',
            project2Category: 'Fullstack',
            project2Title: 'Collaborative Task Manager',
            project2Desc: 'Web application with React and Node.js that allows for the creation and management of tasks in real-time for teams.',
            statusInProgress: 'in development',
            project3Category: 'Frontend / Freelance',
            project3Title: 'E-commerce Landing Page',
            project3Desc: 'Modern and responsive user interface for an online store, focused on user experience and conversion optimization.',
            statusRealClient: 'real client',
            projectsBtnGithub: 'see all projects on github',
            testimonialsTitle: 'what clients say',
            testimonialsSubtitle: 'Feedback from people I\'ve collaborated with.',
            testimonial1Text: '"Simple delivered exactly what we needed. A professional, efficient, and incredibly talented developer."',
            testimonial1Author: 'Sarah Martinez',
            testimonial1Role: 'Startup Founder',
            testimonial2Text: '"The communication was transparent, and the final product exceeded all our expectations. A true problem-solver."',
            testimonial2Author: 'Alex Lee',
            testimonial2Role: 'Project Manager, Roblox',
            contactTitle: 'get in touch',
            contactSubtitle: 'Ready to start your next project?',
            contactLeadText: 'I am available for new opportunities and collaborations. If you have a project in mind or just want to connect, feel free to reach out.',
            contactEmailLabel: 'email',
            contactFollowMe: 'follow me',
            formNameLabel: 'name',
            formEmailLabel: 'email',
            formMessageLabel: 'message',
            formSubmitBtn: 'send message',
            footerTagline: 'Creating digital experiences with code.',
            footerLocation: 'Salvador, Brazil',
            footerNavHeading: 'navigation',
            footerConnectHeading: 'connect',
            footerCopyright: 'simple. all rights reserved.',
        }
    };

    // pega o spline viewer (mude o seletor se necessário)
        const spline = document.querySelector('spline-viewer') || document.querySelector('.spline-embed');
        if (spline) {
        let overSpline = false;

        // marca quando o ponteiro entra/sai do viewer
        spline.addEventListener('pointerenter', () => { overSpline = true; });
        spline.addEventListener('pointerleave', () => { overSpline = false; });

        // previne roda do mouse quando estiver sobre o viewer
        window.addEventListener('wheel', (e) => {
            if (overSpline) {
            e.preventDefault();
            }
        }, { passive: false, capture: true });

        // previne scroll por toque (mobile)
        window.addEventListener('touchmove', (e) => {
            if (overSpline) {
            e.preventDefault();
            }
        }, { passive: false, capture: true });

        // pra Firefox antigo (opcional)
        window.addEventListener('DOMMouseScroll', (e) => {
            if (overSpline) e.preventDefault();
        }, { passive: false, capture: true });
        }


        // BLOQUEADOR DE SCROLL NO SPLINE
        const splineBlocker = document.querySelector('.spline-blocker');
        if (splineBlocker) {
        // previne roda do mouse sobre o viewer
        splineBlocker.addEventListener('wheel', function(e){
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        // previne toque/arrastar em mobile
        splineBlocker.addEventListener('touchmove', function(e){
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        // opcional: previne clicks/drag/pointerdown
        splineBlocker.addEventListener('pointerdown', function(e){
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        } else {
        // fallback: se não existir overlay, restaure a lógica por flag (remova pointer-events:none do viewer)
        let overSpline = false;
        const splineEl = document.querySelector('spline-viewer') || document.querySelector('.spline-embed');
        if (splineEl) {
            splineEl.addEventListener('pointerenter', ()=> overSpline = true);
            splineEl.addEventListener('pointerleave', ()=> overSpline = false);
            window.addEventListener('wheel', (e)=> { if (overSpline) { e.preventDefault(); } }, { passive:false, capture:true });
            window.addEventListener('touchmove', (e)=> { if (overSpline) { e.preventDefault(); } }, { passive:false, capture:true });
        }
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

    /**
     * Inicializa o efeito de digitação, recriando-o se já existir.
     * @param {string[]} stringsArray - Um array de frases para o efeito.
     */
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
            const isValid = emailInput.checkValidity();
            emailInput.style.borderColor = isValid ? 'var(--border-primary)' : '#ff4d4d';
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
    /**
     * Configura a lógica para o seletor de idioma, com animação.
     */
    function initLanguageSwitcher() {
        if (!langSwitcher) return;

        const translatePage = (language) => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                const translation = translations[language]?.[key];

                if (translation) {
                    element.classList.add('language-fade');
                    setTimeout(() => {
                        element.innerText = translation;
                        if (element.classList.contains('nav-link')) {
                            element.setAttribute('data-text', translation);
                        }
                    }, 250);
                    setTimeout(() => {
                        element.classList.remove('language-fade');
                    }, 500);
                }
            });
            document.documentElement.lang = language;
        };

        langSwitcher.addEventListener('click', (e) => {
            const target = e.target.closest('.lang-option');
            if (!target || target.classList.contains('active')) return;

            e.preventDefault();
            
            langSwitcher.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            const selectedLang = target.getAttribute('lang');
            // Chama a tradução dos textos com data-key
            translatePage(selectedLang);
            // Chama a reinicialização do efeito de digitação
            if (translations[selectedLang]?.typingStrings) {
                initTypingEffect(translations[selectedLang].typingStrings);
            }
        });
    }

    function init() {
        initPreloader();
        initNavbar();
        initTypingEffect(translations['en'].typingStrings);
        initSkillsCarousel();
        initProjectsFilter();
        initScrollAnimations();
        initContactForm();
        initSmoothScroll();
        initFooterYear();
        initThemeSwitcher(); 
        initLanguageSwitcher(); 
    }

    init();
});