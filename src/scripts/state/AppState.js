// Глобальний стан програми
export const AppState = {
    products: [],
    cart: {},
    isFormVisible: false,
    //theme: localStorage.getItem('theme') || 'light',
    tg: null, // Ініціалізується при запуску
};

// Колекція основних елементів DOM
export const elements = {
    // General
    loading: document.getElementById('loading'),
    productList: document.getElementById('product-list'),
    searchInput: document.getElementById('search-input'),
    
    // Header
    //themeToggle: document.getElementById('theme-toggle'),
    cartBadge: document.getElementById('cart-badge'),
    cartCount: document.getElementById('cart-count'),
    
    // Order Form
    orderForm: document.getElementById('order-form'),
    orderFormCloseBtn: document.getElementById('order-form-close-btn'),
    changeOrderBtn: document.querySelector('.change-order-btn'),
    deliveryOptions: document.querySelectorAll('input[name="delivery"]'),
    addressContainer: document.getElementById('address-field-container'),
    orderSummary: document.getElementById('order-summary'),

    // Form inputs
    userNameInput: document.getElementById("user-name"),
    userPhoneInput: document.getElementById("user-phone"),
    addressInput: document.getElementById("address-input"),
    formError: document.getElementById("form-error"),

    // Modal
    modal: document.getElementById('description-modal'),
};