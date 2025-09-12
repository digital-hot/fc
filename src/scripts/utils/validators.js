import { AppState, elements } from "/src/scripts/state/AppState.js";

export function validateOrderForm() {
    elements.formError.textContent = "";

    // 1. Валідація імені
    if (elements.userNameInput.value.trim().length < 3) {
        elements.formError.textContent = "Введіть коректне ім'я та прізвище.";
        elements.userNameInput.focus();
        return null;
    }

    // 2. Валідація телефону
    if (!/^\+?3?8?(0\d{9})$/.test(elements.userPhoneInput.value.replace(/\s/g, ""))) {
        elements.formError.textContent = "Введіть телефон у форматі 0XXXXXXXXX.";
        elements.userPhoneInput.focus();
        return null;
    }

    // 3. Валідація адреси
    if (elements.addressContainer.classList.contains("visible") && elements.addressInput.value.trim().length < 5) {
        elements.formError.textContent = "Будь ласка, введіть адресу або № відділення.";
        elements.addressInput.focus();
        return null;
    }

    // --- Якщо валідація пройдена, формуємо об'єкт замовлення ---
    let rawTotalPrice = 0;
    let rawTotalDiscount = 0;
    const cartAsArray = Object.keys(AppState.cart).map(id => {
        const product = AppState.products.find(p => p.id == id);
        const item = AppState.cart[id];
        rawTotalPrice += item.price * item.quantity;
        if (product && product.original_price) {
            rawTotalDiscount += (product.original_price - item.price) * item.quantity;
        }
        return { id, ...item };
    });

    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    const deliveryData = {
        id: selectedDelivery.id,
        title: selectedDelivery.dataset.title,
        cost: parseInt(selectedDelivery.value, 10) || 0,
        address: elements.addressInput.value
    };

    return {
        userId: AppState.tg.initDataUnsafe.user.id,
        user: { name: elements.userNameInput.value, phone: elements.userPhoneInput.value },
        initData: AppState.tg.initData,
        cart: cartAsArray,
        totalPrice: (rawTotalPrice + deliveryData.cost).toFixed(2),
        totalDiscount: rawTotalDiscount.toFixed(2),
        delivery: deliveryData
    };
}