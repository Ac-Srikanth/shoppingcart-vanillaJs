const getData = function() {
	let myRequest = new Request('src/assets/JSON/productList.json');
	fetch(myRequest)
		.then(function(resp) {
			return resp.json();
		})
		.then(function(data) {
			display(data);
		});
};

getData();
