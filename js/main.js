/**
 * main.js
 *
 * Lógica principal para interatividade e animações do site Pamela Fernandes.
 * Inclui:
 * - Loader
 * - Menu Móvel
 * - Cabeçalho Fixo (Sticky Header)
 * - Botão Voltar ao Topo
 * - Animações com ScrollReveal
 * - Filtro para Portfólio
 * - Filtro para Blog
 * - Rolagem Suave para Links Âncora
 * - Destaque do Link de Navegação Ativo por Scroll (ScrollSpy)
 * - Submissão de Formulários (Contato, Newsletter)
 * - Slider de Depoimentos
 */
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('fade-out');
        }, 1000);
        
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1500);
    }

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav-link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navList && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
            // A lógica de definir link ativo ao clicar é gerenciada pelo ScrollSpy e pelo smooth scroll
        });
    });

    // Sticky Header & Back to Top Button visibility
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');

    if (header && backToTop) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
            backToTop.classList.toggle('active', window.scrollY > 300);
        });
    }

    // Back to Top click action
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Reveal Animation (Verifique se a biblioteca ScrollReveal está carregada)
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.animate__animated', {
            delay: 200,
            distance: '20px',
            duration: 1000,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 200,
            origin: 'bottom' // Adicionado uma origem padrão
        });
    } else {
        console.warn('ScrollReveal library not loaded.');
    }

    // Portfolio Filter
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter .filter-btn'); // Mais específico
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item'); // Mais específico
    
    if (portfolioFilterBtns.length > 0 && portfolioItems.length > 0) {
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                portfolioFilterBtns.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Blog Filter (similar to Portfolio Filter)
    const blogFilterBtns = document.querySelectorAll('.blog-filters .filter-btn');
    const blogItems = document.querySelectorAll('.blog-grid .blog-card');

    if (blogFilterBtns.length > 0 && blogItems.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                blogFilterBtns.forEach(item => item.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                blogItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") { // Evita que links href="#" causem erro ou scroll para o topo inesperado
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80; // Ajusta offset dinamicamente ou usa fallback
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active nav link based on scroll position (ScrollSpy for # links)
    const sections = document.querySelectorAll('section[id]'); // Garante que apenas seções com ID sejam consideradas
    const navLinks = document.querySelectorAll('.nav-list .nav-link[href^="#"]'); // Apenas links de navegação para âncoras

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let currentSectionId = '';
            const headerHeight = header ? header.offsetHeight : 80;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - headerHeight - 50) { // Ajuste o "-50" para sensibilidade
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Form Submission Handlers
    function handleFormSubmission(form, nameFieldId, emailFieldId, messagePrefix, isNewsletter = false) {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let userNameOrEmail = '';
                if (isNewsletter) {
                    const emailInput = form.querySelector('input[type="email"]');
                    if (emailInput) userNameOrEmail = emailInput.value;
                } else {
                    const nameInput = form.querySelector(nameFieldId ? `#${nameFieldId}` : 'input[name="name"]'); // Tenta por ID ou nome
                    if (nameInput) userNameOrEmail = nameInput.value;
                    else { // Fallback para email se nome não encontrado no form de contato
                         const emailInput = form.querySelector(emailFieldId ? `#${emailFieldId}` : 'input[name="email"]');
                         if (emailInput) userNameOrEmail = emailInput.value;
                    }
                }
                
                alert(`${messagePrefix}, ${userNameOrEmail}! Sua mensagem foi processada.`);
                form.reset();
            });
        }
    }

    // Contact Form (index.html e contato.html - certifique-se que o ID é 'contactForm')
    const contactForm = document.getElementById('contactForm');
    handleFormSubmission(contactForm, 'name', 'email', 'Obrigada');

    // Newsletter Form (seção de newsletter em index.html)
    const newsletterForm = document.getElementById('newsletterForm');
    handleFormSubmission(newsletterForm, null, 'newsletterEmail', 'Obrigada por assinar nossa newsletter', true);

    // Footer Newsletter Form (em todas as páginas - certifique-se que o ID é 'footerNewsletter')
    const footerNewsletter = document.getElementById('footerNewsletter');
    handleFormSubmission(footerNewsletter, null, null, 'Obrigada por assinar nossa newsletter', true); // Em footer, o input de email é o único esperado


    // Initialize Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-slider .testimonial-item'); // Mais específico
    if (testimonialItems.length > 0) {
        let testimonialIndex = 0;
        
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.style.display = (i === index) ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
            showTestimonial(testimonialIndex);
        }
        
        showTestimonial(testimonialIndex); // Show first testimonial
        setInterval(nextTestimonial, 5000); // Auto-rotate testimonials
    }
});