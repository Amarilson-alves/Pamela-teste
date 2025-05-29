document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').classList.add('fade-out');
    }, 1000);
    
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
    }, 1500);

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            
            // Set active link
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('active', window.scrollY > 300);
    });

    // Back to Top
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Reveal Animation
    ScrollReveal().reveal('.animate__animated', {
        delay: 200,
        distance: '20px',
        duration: 1000,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 200
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked button
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

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Obrigada, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            
            alert(`Obrigada por assinar nossa newsletter, ${email}! Você receberá nossas atualizações em breve.`);
            
            newsletterForm.reset();
        });
    }

    const footerNewsletter = document.getElementById('footerNewsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            alert(`Obrigada por assinar nossa newsletter, ${email}! Você receberá nossas atualizações em breve.`);
            
            this.reset();
        });
    }

    // Initialize Testimonial Slider
    let testimonialIndex = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
        });
        
        testimonialItems[index].style.display = 'block';
    }
    
    function nextTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
        showTestimonial(testimonialIndex);
    }
    
    // Show first testimonial
    showTestimonial(testimonialIndex);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
});