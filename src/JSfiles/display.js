const display = function(products) {
	console.log(products);
	let qty = [];
	for (let i = 0; i < products.length; i++) {
		qty[i] = products[i]['Quantity'];
	}
	let productsEl = document.querySelector('.products');
	products.forEach(function(item, index) {
		let productEl = document.createElement('div');
		productEl.className = 'product';
		productEl.innerHTML = ` <div class='row'>
                                <div class="col-lg-4">
                                <div class='product-image'>
                                <img  class="image" src = "src/assets/images/${item.ImageUrl}" alt="${item.ProductName}">
                                </div>
                                </div>
                                <div class="col-lg-6">                                
                                <div class="product-name">${item.BrandName}</div>
                                <div class="product-description">${item.ProductName}</div>
                                <div class="volume">1L</div>
                                <div class="product-mrp">${item.MRP}</div>
                                <div class="product-price">RS ${item.Price}</div>
                                <div class="product-add-to-cart">
                                <button class='add-to-cart ${item.id}' id=${item.id}>Add To Cart</button>
                                <button class='add' id=${item.id}>+</button>
                                <div class="product-quantity product-quantity-${item.id}" id=${item.id}>0</div>
                                <button class='delete' id=${item.id}>-</button>
                                </div>
                                </div>
                                </div>

                                <hr/>
                                `;
		productsEl.appendChild(productEl);
	});

	setupListeners(products);
};
