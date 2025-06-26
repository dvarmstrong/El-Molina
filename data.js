// Cart data management using localStorage
class CartManager {
    constructor() {
        this.storageKey = 'elMolinaCart';
    }

    // Get cart items from localStorage
    getCartItems() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Save cart items to localStorage
    saveCartItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    // Add item to cart
    addToCart(name, price, quantity = 1) {
        const cartItems = this.getCartItems();
        const existingItemIndex = cartItems.findIndex(item => item.name === name);
        
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({
                id: Date.now() + Math.random(),
                name: name,
                price: parseFloat(price.replace('$', '')),
                quantity: quantity
            });
        }
        
        this.saveCartItems(cartItems);
        this.updateCartDisplay();
        return cartItems;
    }

    // Remove item from cart
    removeFromCart(itemId) {
        let cartItems = this.getCartItems();
        cartItems = cartItems.filter(item => item.id !== itemId);
        this.saveCartItems(cartItems);
        this.updateCartDisplay();
    }

    // Update item quantity
    updateQuantity(itemId, newQuantity) {
        const cartItems = this.getCartItems();
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                cartItems[itemIndex].quantity = newQuantity;
                this.saveCartItems(cartItems);
                this.updateCartDisplay();
            }
        }
    }

    // Calculate total price
    getTotal() {
        const cartItems = this.getCartItems();
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    // Update cart display (if on cart page)
    updateCartDisplay() {
        if (window.location.pathname.includes('cart.html')) {
            displayCartItems();
        }
    }

    // Clear cart
    clearCart() {
        localStorage.removeItem(this.storageKey);
        this.updateCartDisplay();
    }
}

// Create global cart manager instance
const cartManager = new CartManager();

// Menu items data
const menuItems = [
    { name: 'BirraTacos', price: 2.99, image: 'images/BirraTacos.png' },
    { name: 'Tacos', price: 2.99, image: 'images/Tacos.jpg' },
    { name: 'Burritos', price: 5.99, image: 'images/Burrito.jpg' },
    { name: 'Torta', price: 4.99, image: 'images/Torta.jpg' },
    { name: 'Churro', price: 1.99, image: 'images/Desert.jpg' },
    { name: 'Ice Cream', price: 3.99, image: 'images/IceCream.jpg' },
    { name: 'Taco Box', price: 30.99, image: 'images/TacoBox.png' }
];

// Grocery items data
const groceryItems = [
    { name: 'Fresh Avocados', price: 3.99, image: 'grocery_images/daniel-lerman-Mjw-dIbFl-w-unsplash.jpg' },
    { name: 'Organic Tomatoes', price: 4.50, image: 'grocery_images/falaq-lazuardi-laiA0BlQt8A-unsplash.jpg' },
    { name: 'Bell Peppers', price: 2.75, image: 'grocery_images/jacopo-maia--gOUx23DNks-unsplash.jpg' },
    { name: 'Fresh Cilantro', price: 1.25, image: 'grocery_images/miranda-garside-nCmdKJVhHvw-unsplash.jpg' }
];
