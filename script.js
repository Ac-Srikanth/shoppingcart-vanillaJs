var shoppingCart = (function($) {
	var productsEl = document.querySelector('.products');
	var productQuantity = document.querySelector('.product-quantity');
	var totalPriceEl = document.querySelector('.total');
	var cartCheckoutEl = document.querySelector('.cart-checkout');

	var productsInCart = [];

	var products = [
		{
			id: 1,
			BrandName: 'Milkfood',
			ProductName: 'Milkfood Rich Desi Danedar Ghee (carton)',
			Quantity: 0,
			Price: 408,
			MRP: 498,
			ImageUrl: 'milkfood.jpg',
			OfferText: '18% OFF',
			Total: 0
		},
		{
			id: 2,
			BrandName: 'Britannia',
			ProductName: 'Britannia Ghee - High Aroma',
			Quantity: 0,
			Price: 110,
			MRP: 115,
			ImageUrl: 'britania.jpg',
			OfferText: '5% OFF',
			Total: 0
		},
		{
			id: 3,
			BrandName: 'Aavin',
			ProductName: 'Aavin Ghee',
			Quantity: 0,
			Price: 93.93,
			MRP: 110,
			ImageUrl: 'aavin.jpg',
			OfferText: '11% OFF',
			Total: 0
		},
		{
			id: 4,
			BrandName: 'GRB',
			ProductName: 'GRB Ghee',
			Quantity: 0,
			Price: 637,
			MRP: 650,
			ImageUrl: 'grb.jpg',
			OfferText: '13% OFF',
			Total: 0
		},
		{
			id: 5,
			BrandName: 'Amul',
			ProductName: 'Amul Pure Ghee',
			Quantity: 0,
			Price: 450,
			MRP: 480,
			ImageUrl: 'amul.jpg',
			OfferText: '30% OFF',
			Total: 0
		},
		{
			id: 6,
			BrandName: 'Aashirvaad Svasti',
			ProductName: 'Aashirvaad Svasti Cow Ghee',
			Quantity: 0,
			Price: 400,
			MRP: 640,
			ImageUrl: 'aasirvad.jpg',
			OfferText: '40% OFF',
			Total: 0
		},
		{
			id: 7,
			BrandName: 'Heritage',
			ProductName: 'Heritage Buffalo Ghee - Special Grade with Milk Fat',
			Quantity: 0,
			Price: 529.2,
			MRP: 540,
			ImageUrl: 'heritage.jpg',
			OfferText: '11% OFF',
			Total: 0
		},
		{
			id: 8,
			BrandName: '18 Herbs',
			ProductName: '18 Herbs Organics Desi Ghee - Rich In Probiotics',
			Quantity: 0,
			Price: 313.5,
			MRP: 330,
			ImageUrl: '18herbs.jpg',
			OfferText: '17% OFF',
			Total: 0
		},
		{
			id: 9,
			BrandName: 'Skc',
			ProductName: 'Skc A-1 Agmark Ghee',
			Quantity: 0,
			Price: 580.5,
			MRP: 650,
			ImageUrl: 'skc.jpg',
			OfferText: '10% OFF',
			Total: 0
		},
		{
			id: 10,
			BrandName: 'Jersey',
			ProductName: 'Jersey Ghee',
			Quantity: 0,
			Price: 517,
			MRP: 550,
			ImageUrl: 'jersey.jpg',
			OfferText: '33% OFF',
			Total: 0
		}
	];

	var generateProductList = function() {
		products.forEach(function(item) {
			var productEl = document.createElement('div');
			productEl.className = 'product';
			productEl.innerHTML = `<div class="row">
                              <div class="col-lg-4">  
                              <div class="product-image">
                              <img class="image" src="${item.ImageUrl}" alt="${item.ProductName}">
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

	var setupListeners = function() {
		var elId;

		productsEl.addEventListener('click', function(event) {
			var el = event.target;
			var number = productQuantity.innerHTML;
			console.log(el);
			if (el.classList.contains('add-to-cart') || el.classList.contains('add')) {
				elId = el.dataset.id;
				increaseQuantity(elId);
				addtoCart(elId);
				number++;
				cartCheckoutEl.classList.remove('disabled');
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
			alert(`Transaction done Successfully total price is ${totalPriceEl.innerHTML}`);
		});
	};

	var addtoCart = function(id) {
		var obj = products[id - 1];
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

	var removeFromCart = function(id) {
		var obj = products[id - 1];
		productsInCart.forEach(function(item) {
			if (item.product.id === obj.id) {
				item.Quantity--;
				console.log(productsInCart);
			}
		});
		generateCart();
	};

	var generateCart = function() {
		totalPriceEl.innerHTML = 'Rs' + calculateTotalPrice();
	};

	var productFound = function(productId) {
		return productsInCart.find(function(item) {
			return item.product.id === productId;
		});
	};

	var calculateTotalPrice = function() {
		return productsInCart.reduce(function(total, item) {
			console.log(item);
			return total + item.product.Price * item.Quantity;
		}, 0);
	};

	var increaseQuantity = function(elementId) {
		var elem = document.getElementById(`${elementId}`);
		var remove = document.querySelector('.dele');
		console.log(remove);
		remove.classList.remove('disabled');
		console.log(remove);
		var count = elem.innerHTML;
		count++;
		elem.innerHTML = count;
		console.log(count);
	};

	var decreaseQuantity = function(elementId) {
		var elem = document.getElementById(`${elementId}`);
		var cnt = elem.innerHTML;
		cnt--;
		elem.innerHTML = cnt;
	};

	var init = function() {
		generateProductList();
		setupListeners();
	};

	return {
		init: init
	};
})();

shoppingCart.init(); //starts from here
