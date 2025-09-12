import { AppState } from '../state/AppState.js';
import { updateUI } from '../ui/uiManager.js';

export function updateCart(productId, action) {
    const product = AppState.products.find(p => p.id == productId);
    if (!product) return;

    if (action === 'add' && !AppState.cart[productId]) {
        AppState.cart[productId] = { name: product.name, price: product.price, quantity: 1 };
    } else if (action === 'increase' && AppState.cart[productId]) {
        AppState.cart[productId].quantity++;
    } else if (action === 'decrease' && AppState.cart[productId]) {
        AppState.cart[productId].quantity--;
        if (AppState.cart[productId].quantity <= 0) {
            delete AppState.cart[productId];
        }
    }
    
    updateUI();
}