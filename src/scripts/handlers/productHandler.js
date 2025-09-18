import { updateCart } from '../components/Cart.js';
import { showProductDetailsModal } from '../ui/uiManager.js'; // Додано

export function handleProductClick(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const productId = card.dataset.id;
    if (e.target.closest('.add-to-cart-btn')) {
        updateCart(productId, 'add');
    } else if (e.target.closest('.quantity-btn')) {
        const action = e.target.closest('.quantity-btn').dataset.action;
        updateCart(productId, action);
    } else if (e.target.closest('.details-btn')) { // Додано
        const detailsBtn = e.target.closest('.details-btn');
        const title = detailsBtn.dataset.title;
        const description = detailsBtn.dataset.description;
        showProductDetailsModal(title, description);
    }
}