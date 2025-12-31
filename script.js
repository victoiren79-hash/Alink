// Alink Restaurant - Professional Script with Image Handling
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all components
    initNavigation();
    initImageLoading();
    initAnimations();
    initContactActions();
    initNewsletter();
    initSmoothScroll();
    initGallery();
});

// Navigation Management
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Image Loading Optimization
function initImageLoading() {
    // Create image observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add loading states for images
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.3s ease';
            });
        }
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on Scroll
function initAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    const slideInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-visible');
            }
        });
    }, {
        ...observerOptions,
        threshold: 0.05
    });
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.dish-card, .service-card, .testimonial-card, .gallery-item').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });
    
    // Observe elements for slide-in animation
    document.querySelectorAll('.hero-content, .about-text, .experience-content').forEach(el => {
        el.classList.add('slide-in');
        slideInObserver.observe(el);
    });
    
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .slide-in {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-in-visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Staggered animations for cards */
        .dish-card:nth-child(1) { transition-delay: 0.1s; }
        .dish-card:nth-child(2) { transition-delay: 0.2s; }
        .dish-card:nth-child(3) { transition-delay: 0.3s; }
        .dish-card:nth-child(4) { transition-delay: 0.4s; }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        
        .gallery-item:nth-child(1) { transition-delay: 0.1s; }
        .gallery-item:nth-child(2) { transition-delay: 0.2s; }
        .gallery-item:nth-child(3) { transition-delay: 0.3s; }
        .gallery-item:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(animationStyles);
}

// Gallery Functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create modal for enlarged view
            createImageModal(this.querySelector('img').src, this.querySelector('img').alt);
        });
    });
    
    function createImageModal(src, alt) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.image-modal');
        if (existingModal) existingModal.remove();
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = src;
        modalImg.alt = alt;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Trigger animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        }, 10);
        
        // Close on ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.removeEventListener('keydown', closeOnEsc);
                }, 300);
            }
        });
    }
}

// Contact Actions
function initContactActions() {
    // Phone call tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            // In production, you would track this as a conversion
            console.log('Phone call initiated to:', this.getAttribute('href'));
            // Analytics tracking would go here
        });
    });
    
    // Map/directions button
    const directionsBtn = document.querySelector('a[href*="maps.google.com"]');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            console.log('Directions requested to restaurant');
            // Add analytics tracking here
        });
    }
}

// Newsletter Form
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormMessage(this, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage(this, 'Thank you for subscribing!', 'success');
            emailInput.value = '';
            
            // In production, you would send this to your backend
            console.log('Newsletter subscription:', email);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFormMessage(form, message, type) {
        // Remove existing messages
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        // Create new message
        const msgElement = document.createElement('div');
        msgElement.className = `form-message form-message-${type}`;
        msgElement.textContent = message;
        msgElement.style.cssText = `
            margin-top: 12px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.875rem;
            background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;
        
        form.appendChild(msgElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            msgElement.style.opacity = '0';
            msgElement.style.transition = 'opacity 0.3s ease';
            setTimeout(() => msgElement.remove(), 300);
        }, 5000);
    }
}

// Add loading state for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body:not(.loaded) .hero,
        body:not(.loaded) .about,
        body:not(.loaded) .signature,
        body:not(.loaded) .experience,
        body:not(.loaded) .services,
        body:not(.loaded) .contact,
        body:not(.loaded) .gallery {
            opacity: 0;
        }
        
        body.loaded .hero,
        body.loaded .about,
        body.loaded .signature,
        body.loaded .experience,
        body.loaded .services,
        body.loaded .contact,
        body.loaded .gallery {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        /* Add image hover effects */
        .dish-image img,
        .service-image img,
        .gallery-item img {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(loadStyle);
    
    // Remove loading spinner if present
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.opacity = '0';
        setTimeout(() => loadingSpinner.remove(), 500);
    }
});

// Add scroll-based header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        header.style.padding = '12px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    }
});

// Add image preloading for critical images
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
setTimeout(preloadCriticalImages, 1000);