// Esencia & Tiempo - JavaScript Functions

// Navigation functionality
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add click event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionName = link.getAttribute('data-section');
            showSection(sectionName);
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Validate form
            const errors = validateContactForm(formData);
            
            if (errors.length > 0) {
                alert('Por favor corrige los siguientes errores:\n\n• ' + errors.join('\n• '));
                return;
            }
            
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const asunto = formData.get('asunto');
            
            // Show success message
            alert(`¡Gracias ${nombre}! Tu mensaje sobre "${asunto}" ha sido enviado. Te contactaremos pronto a ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Buy buttons functionality
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Add to cart
            addToCart(productTitle, productPrice);
        });
    });

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const action = button.getAttribute('data-action');
            if (action) {
                showSection(action);
            }
        });
    });
});

// Product alert function
function showProductAlert(productTitle, productPrice) {
    const message = `
🛍️ ¡Producto agregado al carrito!

📦 Producto: ${productTitle}
💰 Precio: ${productPrice}

¿Deseas continuar comprando o ir al checkout?
    `;
    
    const continueshopping = confirm(message + "\n\nPresiona 'Aceptar' para continuar comprando o 'Cancelar' para ir al checkout.");
    
    if (!continueshopping) {
        // Simulate redirect to checkout
        alert('Redirigiendo al proceso de pago...\n\n💳 En una tienda real, aquí se abriría el sistema de pagos.');
    }
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Cart functionality (basic simulation)
let cart = [];

function addToCart(productTitle, productPrice) {
    const product = {
        id: Date.now(),
        title: productTitle,
        price: productPrice,
        quantity: 1
    };
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.title === productTitle);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCartDisplay();
    showProductAlert(productTitle, productPrice);
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    console.log(`Productos en carrito: ${cartCount}`);
    
    // You could update a cart counter in the UI here
    // Example: document.querySelector('.cart-counter').textContent = cartCount;
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', ''));
        return total + (price * item.quantity);
    }, 0);
}

// Search functionality (for future implementation)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter products by category (for future implementation)
function filterProducts(category) {
    const sections = document.querySelectorAll('.section');
    
    if (category === 'all') {
        // Show all products
        showSection('inicio');
    } else {
        showSection(category);
    }
}

// Theme toggle (for future dark/light mode)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(price);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation
function validateContactForm(formData) {
    const errors = [];
    
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const mensaje = formData.get('mensaje');
    
    if (!nombre || nombre.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!email || !validateEmail(email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    if (telefono && !validatePhone(telefono)) {
        errors.push('Por favor ingresa un teléfono válido');
    }
    
    if (!mensaje || mensaje.length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Animations and effects
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });
    
    document.querySelectorAll('.product-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Console welcome message
console.log(`
🌟 ¡Bienvenido a Esencia & Tiempo! 🌟
⌚ Relojes de lujo y fragancias exclusivas
💎 Donde la elegancia se encuentra con el tiempo

Desarrollado con ❤️ para una experiencia premium
`);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        addToCart,
        searchProducts,
        filterProducts,
        validateEmail,
        validatePhone,
        formatPrice
    };
}