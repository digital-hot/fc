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

// function updateCartControls() {
//     document.querySelectorAll('.product-card').forEach(card => {
//         const id = card.dataset.id;
//         const addBtn = card.querySelector('.add-to-cart-btn');
//         const quantityControl = card.querySelector('.quantity-control');
        
//         if (AppState.cart[id]) {
//             addBtn.style.display = 'none';
//             quantityControl.style.display = 'flex';
//             quantityControl.querySelector('.quantity').textContent = AppState.cart[id].quantity;
//         } else {
//             addBtn.style.display = 'flex';
//             quantityControl.style.display = 'none';
//         }
//     });
// }
function updateCartControls() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const addBtn = card.querySelector('.add-to-cart-btn');
        const quantityControl = card.querySelector('.quantity-control');
        
        // Перевіряємо, чи є товар у кошику
        if (AppState.cart[id]) {
            // Використовуємо setTimeout, щоб дати анімації час відпрацювати
            setTimeout(() => {
                addBtn.style.display = 'none';
                quantityControl.style.display = 'flex';
                quantityControl.querySelector('.quantity').textContent = AppState.cart[id].quantity;
            }, 100); // Затримка 100 мс для плавного переходу
        } else {
            // Якщо товару немає, повертаємо початковий стан
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
        //AppState.tg.MainButton.has_shine_effect = true; // Додано для ефекту блиску
        AppState.tg.MainButton.setParams({
            color: '#D4935A',
            has_shine_effect: true,
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

// Додано: функція для показу вікна з описом продукту
export function showProductDetailsModal(title, description) {
    elements.modalTitle.textContent = title;
    elements.modalBody.innerHTML = description.replace(/\n/g, '<br><br>');
    elements.modal.classList.add('visible');
    try { // Додано блок try...catch для безпечного доступу до API Telegram
        if (AppState.tg && AppState.tg.BackButton) {
            AppState.tg.BackButton.show();
        }
    } catch (e) {
        console.error("Failed to show Telegram BackButton:", e);
    }
}

export function closeProductDetailsModal() {
    elements.modal.classList.remove('visible');
    try { // Додано блок try...catch для безпечного доступу до API Telegram
        if (AppState.tg && AppState.tg.BackButton) {
            AppState.tg.BackButton.hide();
        }
    } catch (e) {
        console.error("Failed to hide Telegram BackButton:", e);
    }
}