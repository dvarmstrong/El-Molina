// Modern JS features for El Molina website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('mobile-menu-open');
            navMenu.classList.toggle('active');
        });
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only apply animation if it's an add to cart button
            if (this.innerHTML.includes('Cart')) {
                // Create a circle element
                const circle = document.createElement('span');
                circle.classList.add('cart-animation');
                
                // Position it at the button
                const buttonRect = this.getBoundingClientRect();
                circle.style.top = `${buttonRect.top + buttonRect.height/2}px`;
                circle.style.left = `${buttonRect.left + buttonRect.width/2}px`;
                
                // Add it to the DOM
                document.body.appendChild(circle);
                
                // Find the cart icon in the navigation
                const cartIcon = document.querySelector('.nav a[href="cart.html"] i');
                if (cartIcon) {
                    const cartRect = cartIcon.getBoundingClientRect();
                    
                    // Animate the circle to the cart
                    circle.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                    setTimeout(() => {
                        circle.style.top = `${cartRect.top + cartRect.height/2}px`;
                        circle.style.left = `${cartRect.left + cartRect.width/2}px`;
                        circle.style.opacity = '0';
                        circle.style.transform = 'scale(0.2)';
                        
                        // Remove the circle after animation
                        setTimeout(() => {
                            document.body.removeChild(circle);
                        }, 800);
                    }, 10);
                }
            }
        });
    });
    
    // Sticky navigation
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
});

// Add styles for cart animation
const style = document.createElement('style');
style.textContent = `
.cart-animation {
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: var(--accent);
    border-radius: 50%;
    z-index: 9999;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.nav-scrolled {
    background-color: rgba(45, 58, 58, 0.95);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
`;
document.head.appendChild(style);
