import { AppState, elements } from 'src/scripts/state/AppState.js';
import { initializeTelegramWebApp } from 'src/scripts/services/telegram.service.js';
import { loadProducts, submitOrder, fetchUserData } from 'src/scripts/services/api.service.js';
import { updateUI } from 'src/scripts/ui/uiManager.js';
import { handleProductClick } from 'src/scripts/handlers/productHandler.js';
import { openOrderForm, closeOrderForm, renderOrderSummary, toggleAddressField } from 'src/scripts/components/OrderForm.js';
import { toggleTheme } from 'src/scripts/components/ThemeToggle.js';

function initEventListeners() {
    // Theme
    elements.themeToggle.addEventListener('click', () => toggleTheme());

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

    // Telegram Events
    if (AppState.tg) {
        AppState.tg.onEvent('backButtonClicked', closeOrderForm);
        AppState.tg.onEvent('mainButtonClicked', () => {
            if (!AppState.isFormVisible) {
                openOrderForm();
            } else {
                submitOrder();
            }
        });
    }
}

function initApp() {
    console.log('🚀 Initializing Family Cheese app...');
    initializeTelegramWebApp();
    toggleTheme(true); // Initialize theme without toggling
    initEventListeners();
    fetchUserData();
    
    loadProducts().then(() => {
        updateUI();
        console.log('✅ App initialized successfully');
    });
}

document.addEventListener('DOMContentLoaded', initApp);