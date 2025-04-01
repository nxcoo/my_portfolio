document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Projects data
    const projects = [
        {
            title: "Optometry Clinic Management",
            description: "Sistema gestionale avanzato per cliniche ottiche con gestione pazienti e prescrizioni",
            category: "Optical",
            tech: ["Database", "CRM", "Medical Records"],
            image: "./images/projects/placeholder.jpg", // Rimosso temporaneamente il percorso dell'immagine
            url: "#"
        },
        {
            title: "Lenti Progressive Analysis",
            description: "Software per l'analisi e la personalizzazione di lenti progressive",
            category: "optical",
            tech: ["Zeiss", "Essilor", "Hoya"],
            image: "./images/projects/placeholder.jpg",
            url: "#"
        },
        {
            title: "Visual Training App",
            description: "Applicazione per esercizi di training visivo e riabilitazione",
            category: "Development",
            tech: ["React Native", "Vision Therapy", "UX Design"],
            image: "images/projects/visual-training.jpg",
            url: "#"
        },
        {
            title: "Optical Shop Design",
            description: "Progettazione e design di negozi di ottica moderni",
            category: "Design",
            tech: ["Interior Design", "Lighting", "Display"],
            image: "images/projects/shop-design.jpg",
            url: "#"
        },
        {
            title: "Optical Shop Management",
            description: "Sistema gestionale completo per negozi di ottica",
            category: "Development",
            tech: ["React", "Node.js", "MongoDB"],
            image: "images/projects/optical-shop.jpg",
            url: "#"
        },
        {
            title: "Brand Identity Design",
            description: "Design dell'identità visiva per aziende di ottica",
            category: "Design",
            tech: ["Photoshop", "Illustrator", "Figma"],
            image: "images/projects/brand-design.jpg",
            url: "#"
        },
        {
            title: "E-commerce Eyewear",
            description: "Piattaforma e-commerce per la vendita di occhiali",
            category: "Development",
            tech: ["WordPress", "WooCommerce", "CSS"],
            image: "images/projects/ecommerce.jpg",
            url: "#"
        },
        {
            title: "Digital Marketing Campaign",
            description: "Campagna marketing per prodotti ottici",
            category: "Marketing",
            tech: ["Social Media", "SEO", "Analytics"],
            image: "images/projects/marketing.jpg",
            url: "#"
        }
    ];

    // Initialize project grid only if it exists
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        projectGrid.innerHTML = ''; // Pulisce il contenuto esistente
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-card');
            projectElement.setAttribute('data-category', project.category.toLowerCase());
            projectElement.innerHTML = `
                <div class="project-image">
                    <div class="project-overlay"></div>
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;
            projectGrid.appendChild(projectElement);
            setTimeout(() => {
                projectElement.classList.add('show');
            }, 100);
        });

        // Add filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Toggle active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                document.querySelectorAll('.project-card').forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').toLowerCase() === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Handle contact form - solo se esiste
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
        });
    }

    // Smooth scroll solo per link che puntano a ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (document.querySelector(anchor.getAttribute('href'))) { // verifica che l'elemento target esista
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // Common functionality for all pages
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn');
    const menuLinks = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMenu);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', toggleMenu);
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
});
