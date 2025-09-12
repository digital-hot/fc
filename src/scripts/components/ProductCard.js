export function createProductElement(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;

    const priceHTML = product.original_price
        ? `<span class="current-price">${product.price.toFixed(2)} грн</span><span class="original-price">${product.original_price.toFixed(2)} грн</span>`
        : `<span class="current-price">${product.price.toFixed(2)} грн</span>`;

    card.innerHTML = `
        <div class="gallery"><img src="${product.images[0]}" alt="${product.name}" class="gallery-image"></div>
        <div class="product-info">
            <div class="title">${product.name}</div>
            <div class="weight"><i class="fas fa-weight"></i> ${product.weight}</div>
            <div class="price-container">${priceHTML}</div>
            <div class="card-footer">
                <button class="add-to-cart-btn" title="Додати в кошик"><i class="fas fa-plus"></i></button>
                <div class="quantity-control" style="display: none;">
                    <button class="quantity-btn" data-action="decrease"><i class="fas fa-minus"></i></button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn" data-action="increase"><i class="fas fa-plus"></i></button>
                </div>
                <button class="details-btn" data-title="${product.name}" data-description="${product.description}">
                    <i class="fas fa-info-circle"></i> Детальніше
                </button>
            </div>
        </div>`;
    return card;
}