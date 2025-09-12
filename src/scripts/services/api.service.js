import { AppState, elements } from '../state/AppState.js';
import { validateOrderForm } from '../utils/validators.js';

const API_URLS = {
    PRODUCTS: '../data/products.json', // Path relative to index.html
    USER_DATA: 'https://urfine.com.ua/fct/hs/bots/user/',
    SUBMIT_ORDER: 'https://urfine.com.ua/fct/hs/bots/order/'
};

// Mock data as a fallback (will be used if fetch fails)
function generateMockProducts() {
    console.warn("Using mock product data as a fallback.");
    return [
        { "id": 1, "name": "Гауда класична", "price": 245.5, "original_price": 290, "weight": "~ 300г", "description": "Класичний голландський сир з насиченим смаком та ароматом.", "images": ["https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400&h=300&fit=crop"] },
        { "id": 2, "name": "Бри французький", "price": 320, "original_price": null, "weight": "~ 200г", "description": "М'який французький сир з білою цвіллю.", "images": ["https://images.unsplash.com/photo-1571197919795-08c56b3bb84f?w=400&h=300&fit=crop"] },
    ];
}

export async function loadProducts() {
    elements.loading.style.display = 'flex';
    try {
        const response = await fetch(API_URLS.PRODUCTS);
        if (!response.ok) throw new Error('Network response was not ok');
        AppState.products = await response.json();
    } catch (error) {
        console.error('Failed to load products, using mock data:', error);
        AppState.products = generateMockProducts();
    } finally {
        elements.loading.style.display = 'none';
    }
}

export async function fetchUserData() {
    if (!AppState.tg || !AppState.tg.initData) return;
    try {
        const response = await fetch(API_URLS.USER_DATA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Telegram-Init-Data': AppState.tg.initData },
            body: JSON.stringify({ initData: AppState.tg.initData, userId: AppState.tg.initDataUnsafe.user.id })
        });
        if (!response.ok) throw new Error(`Помилка мережі: ${response.status}`);
        const data = await response.json();
        elements.userNameInput.value = elements.userNameInput.value || data.name || `${AppState.tg.initDataUnsafe.user.first_name} ${AppState.tg.initDataUnsafe.user.last_name || ''}`.trim();
        elements.userPhoneInput.value = elements.userPhoneInput.value || data.phone || '';
        elements.addressInput.value = elements.addressInput.value || data.address || '';
    } catch (error) {
        console.error('Не вдалося отримати дані користувача:', error.message);
        // Fallback for mock environment
        elements.userNameInput.value = `${AppState.tg.initDataUnsafe.user.first_name} ${AppState.tg.initDataUnsafe.user.last_name || ''}`.trim();
    }
}

async function postOrder(data) {
    console.log("Sending order data:", data);
    try {
        const response = await fetch(API_URLS.SUBMIT_ORDER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Помилка відправки замовлення: ${response.status}`);
        }
        console.log('Замовлення успішно відправлено!');
        AppState.tg.showAlert('Ваше замовлення прийнято!');
    } catch (error) {
        console.error(error.message);
        AppState.tg.showAlert(`Помилка: ${error.message}`);
    }
}

export function submitOrder() {
    const orderData = validateOrderForm();
    if (!orderData) return; // Validation failed

    postOrder(orderData).then(() => {
        AppState.tg.close();
    });
}