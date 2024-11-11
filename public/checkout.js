class CheckoutHandler {
    constructor(cart) {
        this.cart = cart;
        this.checkoutForm = document.getElementById('checkout-form');
        this.setupEventListeners();
        this.populateOrderSummary();
    }

    setupEventListeners() {
        this.checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processCheckout();
        });
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.numberOfUnits), 0);
    }

    populateOrderSummary() {
        const orderItemsContainer = document.getElementById('order-items');
        const orderTotalElement = document.getElementById('order-total');

        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.innerHTML = `
                <div class="item-details">
                    <span class="item-name">${item.heading}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="item-quantity">
                    <span class = "order-capacity">Qty: ${item.numberOfUnits}</span>
                </div>
            `;
            orderItemsContainer.appendChild(itemElement);
        });

        const total = this.calculateTotal();
        orderTotalElement.textContent = total.toFixed(2);
    }

    async processCheckout() {
        const formData = new FormData(this.checkoutForm);
        
        const orderData = {
            customerName: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            totalAmount: this.calculateTotal(),
            items: this.cart.map(item => ({
                productId: item.id,
                quantity: item.numberOfUnits,
                price: item.price
            }))
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                // Clear cart
                localStorage.removeItem('CART');
                // Show success message
                alert('Order placed successfully!');
                window.location.href = '/order-confirmation.html';
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            alert('Error processing order: ' + error.message);
        }
    }
}