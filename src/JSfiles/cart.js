const setupListeners = function(products) {
	let addCartBtn = document.querySelectorAll('.add-to-cart');
	let addBtn = document.querySelectorAll('.add');
	let subBtn = document.querySelectorAll('.delete');
	let cartCheckoutEl = document.querySelector('.cart-checkout');
	let span = document.getElementsByClassName('close')[0];
	let modal = document.getElementById('myModal');
	addCartBtn.forEach(function(item, index) {
		item.addEventListener('click', function(event) {
			console.log(event);
			increase(products[index]);
		});
	});
	addBtn.forEach(function(item, index) {
		item.addEventListener('click', function(event) {
			console.log(event);
			increase(products[index]);
		});
	});
	subBtn.forEach(function(item, index) {
		item.addEventListener('click', function(event) {
			decrease(products[index]);
		});
	});
	cartCheckoutEl.addEventListener('click', function(event) {
		checkoutDisplay();
	});
	span.addEventListener('click', function(event) {
		modal.style.display = 'none';
	});
};

const increase = function(item) {
	let qty = document.querySelector(`.product-quantity-${item.id}`);
	let productQuantityEl = document.querySelector('.total-quantity');
	let totalPriceEl = document.querySelector('.total-price');
	let count = qty.innerHTML;
	count++;
	qty.innerHTML = count;
	obj.total = obj.total + parseInt(item['Price']);
	obj.totalqty++;
	productQuantityEl.innerHTML = obj.totalqty;
	totalPriceEl.innerHTML = obj.total;
	console.log(obj.total);
	console.log(obj.totalqty);
};

const decrease = function(item) {
	console.log(item);
	let qty = document.querySelector(`.product-quantity-${item.id}`);
	let productQuantityEl = document.querySelector('.total-quantity');
	let totalPriceEl = document.querySelector('.total-price');
	let count = qty.innerHTML;
	if (count > 0) {
		count--;
		qty.innerHTML = count;
		obj.total = obj.total - parseInt(item['Price']);
		obj.totalqty--;
	}
	productQuantityEl.innerHTML = obj.totalqty;
	totalPriceEl.innerHTML = obj.total;
	console.log(obj.total);
	console.log(obj.totalqty);
};

const checkoutDisplay = function() {
	let checkoutText = document.getElementsByClassName('checkout-text');
	let totalPriceEl = document.querySelector('.total-price');
	let modal = document.getElementById('myModal');
	modal.style.display = 'block';
	checkoutText[0].textContent = `Transaction done successfully total price is ${totalPriceEl.innerHTML}`;
};
