// ========================
// Product Data
// ========================
const products = [
    {
        id: 1,
        name: 'Windsor Chair',
        price: 12,
        rating: 5,
        reviews: 284,
        category: 'chairs',
        emoji: '🪑'
    },
    {
        id: 2,
        name: 'Chiavari Chair',
        price: 8,
        rating: 4,
        reviews: 156,
        category: 'chairs',
        emoji: '🪑'
    },
    {
        id: 3,
        name: 'Ceramic Vase',
        price: 15,
        rating: 5,
        reviews: 98,
        category: 'vessels',
        emoji: '🏺'
    },
    {
        id: 4,
        name: 'Lounge Chair',
        price: 20,
        rating: 5,
        reviews: 212,
        category: 'chairs',
        emoji: '🪑'
    },
    {
        id: 5,
        name: 'Glass Vessel',
        price: 18,
        rating: 4,
        reviews: 87,
        category: 'vessels',
        emoji: '🏺'
    },
    {
        id: 6,
        name: 'Bar Stool',
        price: 10,
        rating: 5,
        reviews: 142,
        category: 'chairs',
        emoji: '🪑'
    }
];

// ========================
// Testimonials Data
// ========================
const testimonials = [
    {
        id: 1,
        text: 'FORMA made our wedding day perfect. The quality of the chairs and decor was exceptional, and the delivery was seamless.',
        author: 'Sarah Mitchell',
        rating: 5
    },
    {
        id: 2,
        text: 'Outstanding service for our corporate gala. The team was professional and everything arrived in pristine condition.',
        author: 'James Chen',
        rating: 5
    },
    {
        id: 3,
        text: 'Great selection and prices. Would definitely rent from them again for our next event.',
        author: 'Emma Rodriguez',
        rating: 4
    }
];

// ========================
// Render Functions
// ========================

/**
 * Render products to the product grid
 * @param {Array} productsToRender - Array of products to render
 */
function renderProducts(productsToRender = products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}/day</div>
                <div class="product-rating">${stars} (${product.reviews})</div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

/**
 * Render testimonials to the testimonial grid
 */
function renderTestimonials() {
    const testimonialGrid = document.getElementById('testimonialGrid');
    testimonialGrid.innerHTML = '';

    testimonials.forEach(testimonial => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="stars">${stars}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">— ${testimonial.author}</p>
        `;
        testimonialGrid.appendChild(testimonialCard);
    });
}

// ========================
// Event Listeners
// ========================

/**
 * Category filtering functionality
 */
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const filtered = products.filter(product => product.category === category);
        renderProducts(filtered);
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

/**
 * Hero button functionality
 */
document.getElementById('browseBtnHero')?.addEventListener('click', function() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

/**
 * Form submission handling
 */
document.getElementById('quoteForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        eventType: document.getElementById('event-type').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!validateForm(formData)) {
        return;
    }

    // Log form data (in real app, send to server)
    console.log('Form submitted:', formData);
    
    // Show success message
    showFormSuccess();
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(hideFormSuccess, 5000);
});

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
function validateForm(data) {
    if (!data.name.trim()) {
        alert('Please enter your name');
        return false;
    }
    if (!data.email.trim()) {
        alert('Please enter your email');
        return false;
    }
    if (!data.eventType) {
        alert('Please select an event type');
        return false;
    }
    if (!data.date) {
        alert('Please select an event date');
        return false;
    }
    return true;
}

/**
 * Show success message after form submission
 */
function showFormSuccess() {
    let successMsg = document.querySelector('.form-success');
    
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = '✓ Your quote request has been submitted successfully! We\'ll contact you soon.';
        document.getElementById('quoteForm').parentElement.insertBefore(successMsg, document.getElementById('quoteForm'));
    }
    
    successMsg.classList.add('show');
}

/**
 * Hide success message
 */
function hideFormSuccess() {
    const successMsg = document.querySelector('.form-success');
    if (successMsg) {
        successMsg.classList.remove('show');
    }
}

// ========================
// Smooth Scroll Enhancement
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// Animation on Scroll
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .testimonial-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================
// Price Filter (Optional Enhancement)
// ========================
function filterByPrice(minPrice, maxPrice) {
    const filtered = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    renderProducts(filtered);
}

// ========================
// Search Functionality (Optional Enhancement)
// ========================
function searchProducts(query) {
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filtered);
}

// ========================
// Initialize
// ========================
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderTestimonials();
});

// ========================
// Utility Functions
// ========================

/**
 * Format currency
 * @param {Number} value - Value to format
 * @returns {String} - Formatted currency string
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

/**
 * Get random testimonial
 * @returns {Object} - Random testimonial object
 */
function getRandomTestimonial() {
    return testimonials[Math.floor(Math.random() * testimonials.length)];
}

/**
 * Get average product rating
 * @returns {Number} - Average rating across all products
 */
function getAverageRating() {
    const sum = products.reduce((acc, product) => acc + product.rating, 0);
    return (sum / products.length).toFixed(1);
}

// ========================
// Mobile Menu Toggle (if needed)
// ========================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ========================
// Event Analytics (Optional)
// ========================
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // In a real application, send to analytics service
}

// Track page views
window.addEventListener('load', function() {
    trackEvent('page_load', {
        page: 'home',
        timestamp: new Date()
    });
});

// Track button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        trackEvent('button_click', {
            buttonText: this.textContent,
            timestamp: new Date()
        });
    });
});
