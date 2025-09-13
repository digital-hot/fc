import { AppState, elements } from '../state/AppState.js';
import { createProductElement } from '../components/ProductCard.js';

function renderProducts() {
    const query = elements.searchInput.value.toLowerCase();
    const filteredProducts = AppState.products.filter(p =>
        p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );

    elements.productList.innerHTML = "";
    if (filteredProducts.length === 0) {
        elements.productList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem;"><h3>Товари не знайдено</h3></div>`;
        return;
    }
    filteredProducts.forEach(product => {
        elements.productList.appendChild(createProductElement(product));
    });
}

function updateCartControls() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const addBtn = card.querySelector('.add-to-cart-btn');
        const quantityControl = card.querySelector('.quantity-control');
        
        if (AppState.cart[id]) {
            addBtn.style.display = 'none';
            quantityControl.style.display = 'flex';
            quantityControl.querySelector('.quantity').textContent = AppState.cart[id].quantity;
        } else {
            addBtn.style.display = 'flex';
            quantityControl.style.display = 'none';
        }
    });
}

function updateMainButton() {
    const totalItems = Object.values(AppState.cart).reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        const buttonText = AppState.isFormVisible ? 'Надіслати замовлення' : `Переглянути кошик (${totalItems})`;
        AppState.tg.MainButton.setText(buttonText);
        AppState.tg.MainButton.setParams({
            color: '#D4935A',
            text_color: '#FFFFFF'
        });
        AppState.tg.MainButton.show();
    } else {
        AppState.tg.MainButton.hide();
        if (AppState.isFormVisible) closeOrderForm();
    }
}

export function updateUI() {
    renderProducts();
    updateCartControls();

    const totalItems = Object.values(AppState.cart).reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartCount.classList.toggle('hidden', totalItems === 0);
    
    if(AppState.tg) {
        updateMainButton();
    }
}