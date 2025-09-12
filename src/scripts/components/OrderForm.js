import { AppState, elements } from 'src/scripts/state/AppState.js';
import { updateUI } from 'src/scripts/ui/uiManager.js';

export function openOrderForm() {
    AppState.isFormVisible = true;
    renderOrderSummary();
    toggleAddressField();
    elements.orderForm.classList.add("visible");
    AppState.tg.BackButton.show();
    updateUI();
}

export function closeOrderForm() {
    AppState.isFormVisible = false;
    elements.orderForm.classList.remove("visible");
    AppState.tg.BackButton.hide();
    updateUI();
}

export function renderOrderSummary() {
    if (!elements.orderSummary) return;

    let itemsHTML = "";
    let productsTotal = 0;
    let totalDiscount = 0;

    for (const id in AppState.cart) {
        const product = AppState.products.find(p => p.id == id);
        const item = AppState.cart[id];
        if (!product) continue;

        const itemTotalPrice = item.price * item.quantity;
        productsTotal += itemTotalPrice;

        if (product.original_price) {
            totalDiscount += (product.original_price - item.price) * item.quantity;
        }

        itemsHTML += `
            <div class="summary-item">
                <img src="${product.images[0]}" alt="${item.name}" class="summary-item-img">
                <div class="summary-item-details">
                    <div class="summary-item-name">${item.name}</div>
                    <div class="summary-item-quantity">${item.quantity} x ${item.price.toFixed(2)} грн</div>
                </div>
                <div class="summary-item-price">${itemTotalPrice.toFixed(2)} грн</div>
            </div>`;
    }

    const deliveryCost = parseInt(document.querySelector('input[name="delivery"]:checked').value, 10) || 0;
    const finalTotal = productsTotal + deliveryCost;

    const totalsHTML = `
        <div class="summary-totals">
            ${totalDiscount > 0 ? `<div class="total-discount"><span><i class="fas fa-tags"></i> Ваша знижка:</span><span>-${totalDiscount.toFixed(2)} грн</span></div>` : ""}
            ${deliveryCost > 0 ? `<div><span><i class="fas fa-truck"></i> Доставка:</span><span>${deliveryCost.toFixed(2)} грн</span></div>` : ""}
            <div class="total-price">
                <span><i class="fas fa-receipt"></i> Всього до сплати:</span>
                <span>${finalTotal.toFixed(2)} грн</span>
            </div>
        </div>`;

    elements.orderSummary.innerHTML = itemsHTML + totalsHTML;
}

export function toggleAddressField() {
    const selectedDeliveryId = document.querySelector('input[name="delivery"]:checked').id;
    const isAddressNeeded = selectedDeliveryId === "obukhiv-delivery" || selectedDeliveryId === "nova-poshta";
    elements.addressContainer.classList.toggle("visible", isAddressNeeded);
}