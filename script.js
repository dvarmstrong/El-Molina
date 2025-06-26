// Global functions for cart operations
function addToCart(name, price, quantity = 1) {
    cartManager.addToCart(name, price, quantity);
    
    // Show success message
    showNotification(`${name} added to cart!`);
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            display: none;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Display cart items (for cart.html page)
function displayCartItems() {
    const cartItems = cartManager.getCartItems();
    const tbody = document.querySelector('table tbody');
    const totalElement = document.getElementById('cart-total');
    
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (cartItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">Your cart is empty</td>
            </tr>
        `;
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }
    
    // Add cart items to table
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `            <th scope="row" class="fw-bold">${index + 1}</th>
            <td class="fw-semibold">${item.name}</td>
            <td class="fw-semibold">$${item.price.toFixed(2)}</td>
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-3 fw-bold">${item.quantity}</span>
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </td>
            <td>
                <button class="btn btn-warning" onclick="editItem(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
      // Update total
    const total = cartManager.getTotal();
    if (totalElement) {
        totalElement.textContent = `$${total}`;
        totalElement.classList.add('text-success', 'fs-4');
    }
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    cartManager.updateQuantity(itemId, newQuantity);
}

// Remove item from cart
function removeFromCart(itemId) {
    if (confirm('Are you sure you want to remove this item?')) {
        cartManager.removeFromCart(itemId);
    }
}

// Edit item (placeholder function)
function editItem(itemId) {
    const cartItems = cartManager.getCartItems();
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const newQuantity = prompt(`Enter new quantity for ${item.name}:`, item.quantity);
        if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
            updateQuantity(itemId, parseInt(newQuantity));
        }
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        cartManager.clearCart();
    }
}

// Initialize page based on current location
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});



