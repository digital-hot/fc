import { AppState, elements } from './state/AppState.js';
import { initializeTelegramWebApp } from './services/telegram.service.js';
import { loadProducts, submitOrder, fetchUserData } from './services/api.service.js';
//import { updateUI } from './ui/uiManager.js';
import { updateUI, closeProductDetailsModal } from './ui/uiManager.js';
import { handleProductClick } from './handlers/productHandler.js';
import { openOrderForm, closeOrderForm, renderOrderSummary, toggleAddressField } from './components/OrderForm.js';
// import { toggleTheme } from './components/ThemeToggle.js';

function initEventListeners() {
    // Theme
    //elements.themeToggle.addEventListener('click', () => toggleTheme());

    // Cart & Order Form
    elements.cartBadge.addEventListener('click', () => {
        if (Object.keys(AppState.cart).length > 0) openOrderForm();
    });
    elements.changeOrderBtn?.addEventListener('click', closeOrderForm);
    elements.orderFormCloseBtn?.addEventListener('click', closeOrderForm);

    // Search
    elements.searchInput.addEventListener('input', () => updateUI());

    // Products
    elements.productList.addEventListener('click', handleProductClick);

    // Delivery Options
    elements.deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            renderOrderSummary();
            toggleAddressField();
        });
    });

    // Додано: обробники для модального вікна
    elements.modalCloseBtn.addEventListener('click', closeProductDetailsModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeProductDetailsModal();
        }
    });

    // Оновлено: обробник для кнопки "Назад"
    if (AppState.tg) {
        AppState.tg.onEvent('backButtonClicked', () => {
            if (elements.modal.classList.contains('visible')) {
                closeProductDetailsModal();
            } else {
                closeOrderForm();
            }
        });
        AppState.tg.onEvent('mainButtonClicked', () => {
            if (!AppState.isFormVisible) {
                openOrderForm();
            } else {
                submitOrder();
            }
        });
    }
    function closePromo() {
    const promo = document.getElementById("promo-section");
    if (!promo) return;
    promo.classList.add("promo-hide");
    setTimeout(() => promo.style.display = "none", 400);
    }

    document.getElementById("promo-section")
            ?.addEventListener("click", closePromo);
    
}

function initApp() {
    console.log('🚀 Initializing Family Cheese app...');
    initializeTelegramWebApp();
    //toggleTheme(true); // Initialize theme without toggling
    initEventListeners();
    fetchUserData();
    
    loadProducts().then(() => {
        updateUI();
        console.log('✅ App initialized successfully');
    });


}


document.addEventListener('DOMContentLoaded', initApp);