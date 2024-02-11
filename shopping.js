document.addEventListener('DOMContentLoaded', function() {
    const cart = document.querySelector('.cart');
    const cartItems = document.querySelector('.cart-items');
    const clearCartButton = document.querySelector('.clear-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Function to update the cart
    function updateCart() {
        let cartTotal = 0;
        cartItems.innerHTML = '';

        // Get the items from local storage
        const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

        // Display the items in the cart
        cartItemsFromLocalStorage.forEach(function(item) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            // Update the cart total
            cartTotal += item.price;
        });

        // Display the cart total
        cart.querySelector('h2').textContent = `Shopping Cart (${cartItemsFromLocalStorage.length} items)`;
    }

    // Function to add an item to the cart
    function addToCart(id) {
        // Get the product from local storage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(function(item) {
            return item.id === id;
        });

        // Add the product to the cart in local storage
        let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cartItemsFromLocalStorage.find(function(item) {
            return item.id === id;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItemsFromLocalStorage.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItemsFromLocalStorage));

        // Update the cart
        updateCart();
    }

    // Function to remove an item from the cart
    function removeFromCart(id) {
        // Get the cart items from local storage
        let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove the item from the cart
        cartItemsFromLocalStorage = cartItemsFromLocalStorage.filter(function(item) {
            return item.id !== id;
        });

        // Update the cart in local storage
        localStorage.setItem('cart',