const shoppingCart = (function($) {
	let productsEl = document.querySelector('.products');
	let productQuantity = document.querySelector('.product-quantity');
	let totalPriceEl = document.querySelector('.total');
	let cartCheckoutEl = document.querySelector('.cart-checkout');
	let modal = document.getElementById('myModal');
	let span = document.getElementsByClassName('close')[0];
	let checkoutText = document.getElementsByClassName('checkout-text');
	let productsInCart = [];
	let products = [];

	const getdata = function() {
		let myRequest = new Request('./assets/productList.json');
		fetch(myRequest)
			.then(function(resp) {
				return resp.json();
			})
			.then(function(data) {
				console.log(data);
				products = data;
				generateProductList();
			});
	};

	const generateProductList = function() {
		products.forEach(function(item) {
			let productEl = document.createElement('div');
			productEl.className = 'product';
			productEl.innerHTML = `<div class="row">
                              <div class="col-lg-4">  
                              <div class="product-image">
                              <img class="image" src="./assets/images/${item.ImageUrl}" alt="${item.ProductName}">
                              </div>
                              </div>
                              <div class="col-lg-6">
                              <div class="product-name">${item.BrandName}</div>
                              <div class="product-description">${item.ProductName}</div>
                              <div class="volume">1L</div>
                              <div class="product-mrp">${item.MRP}</div>
                              <div class="product-price">RS ${item.Price}</div>
                              <div class="product-add-to-cart">
                              <button class="add-to-cart" data-id=${item.id}>Add To Cart</button>
                              <button class='add' data-id=${item.id}>+</button>
                              <div class="product-quantity" id=${item.id}>0</div>
                              <button class= 'disabled dele' data-id=${item.id}>-</button>
                              </div>
                              </div>
                              </div>
                              <hr>
                              `;

			productsEl.appendChild(productEl);
		});
	};

	const setupListeners = function() {
		let elId;
		productsEl.addEventListener('click', function(event) {
			let el = event.target;
			let number = productQuantity.innerHTML;
			console.log(el);
			if (el.classList.contains('add-to-cart') || el.classList.contains('add')) {
				elId = el.dataset.id;
				increaseQuantity(elId);
				addtoCart(elId);
				number++;
				cartCheckoutEl.removeAttribute('disabled');
				productQuantity.innerHTML = number;
			}
			else if (el.classList.contains('dele')) {
				elId = el.dataset.id;
				if (number > 0) {
					number--;
					productQuantity.innerHTML = number;
					decreaseQuantity(elId);
					removeFromCart(elId);
				}
			}
		});

		cartCheckoutEl.addEventListener('click', function(event) {
			//alert(`Transaction done Successfully total price is ${totalPriceEl.innerHTML}`);
			modal.style.display = 'block';
			checkoutText[0].textContent = `Transaction done successfully total price is ${totalPriceEl.innerHTML}`;
		});

		span.addEventListener('click', function(event) {
			modal.style.display = 'none';
		});
	};

	const addtoCart = function(id) {
		const obj = products[id - 1];
		if (productsInCart.length === 0 || productFound(obj.id) === undefined) {
			productsInCart.push({ product: obj, Quantity: 1 });
		}
		else {
			productsInCart.forEach(function(item) {
				if (item.product.id == obj.id) {
					item.Quantity++;
				}
			});
		}
		generateCart();
	};

	const removeFromCart = function(id) {
		const obj = products[id - 1];
		productsInCart.forEach(function(item) {
			if (item.product.id === obj.id) {
				item.Quantity--;
				console.log(productsInCart);
			}
		});
		generateCart();
	};

	const generateCart = function() {
		totalPriceEl.innerHTML = 'Rs' + calculateTotalPrice();
	};

	const productFound = function(productId) {
		return productsInCart.find(function(item) {
			return item.product.id === productId;
		});
	};

	const calculateTotalPrice = function() {
		return productsInCart.reduce(function(total, item) {
			console.log(item);
			return Math.round(total + item.product.Price * item.Quantity);
		}, 0);
	};

	const increaseQuantity = function(elementId) {
		let elem = document.getElementById(`${elementId}`);
		let remove = document.querySelector('.dele');
		console.log(remove);
		remove.classList.remove('disabled');
		console.log(remove);
		let count = elem.innerHTML;
		count++;
		elem.innerHTML = count;
		console.log(count);
	};

	const decreaseQuantity = function(elementId) {
		let elem = document.getElementById(`${elementId}`);
		let cnt = elem.innerHTML;
		cnt--;
		elem.innerHTML = cnt;
	};

	const init = function() {
		getdata();
		setupListeners();
	};

	return {
		init: init
	};
})();

shoppingCart.init(); //starts from here

// const shoppingCar = {
// 	init: init;
// };
