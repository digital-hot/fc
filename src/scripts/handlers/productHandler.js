import { updateCart } from '../components/Cart.js';

export function handleProductClick(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const productId = card.dataset.id;
    if (e.target.closest('.add-to-cart-btn')) {
        updateCart(productId, 'add');
    } else if (e.target.closest('.quantity-btn')) {
        const action = e.target.closest('.quantity-btn').dataset.action;
        updateCart(productId, action);
    }
}