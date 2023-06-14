$(function () {
	var url = location.href;
	if (url.indexOf('/magazine/school-bag') > -1) {
		changePrice('magazine-school-bag');
	} else if (url.indexOf('/magazine/cabinet-stylish') > -1) {
		changePrice('cabinet-stylish');
	} else if (url.indexOf('/magazine/chest-stylish') > -1) {
		changePrice('chest-stylish');
	} else if (url.indexOf('/magazine/compact-tvboard') > -1) {
		changePrice('compact-tvboard');
	} else if (url.indexOf('/magazine/kitchen-strage-stylish') > -1) {
		changePrice('kitchen-strage-stylish');
	} else if (url.indexOf('/magazine/newLife') > -1) {
		changePrice('magazine-newLife');
	}
});

/* changePrice
========================================================================== */

function changePrice(contentsName) {
	$.getJSON('https://cdn.jsdelivr.net/gh/shiraistore/assets@v1.1.73/json/feature/' + contentsName + '_v1_0.json', function (data) {
		//console.log(data);
		$('.changePrice').each(function () {
			var product = $(this).data('products');
			var priceText;
			var result = data.find((u) => u.productUrl === product);
			if (result) {
				var sellingPrice = result.sellingPrice,
					normalPrice = result.normalPrice;

				if (sellingPrice < normalPrice) {
					priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice salePrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
				} else {
					priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
				}

				$(this).html(priceText);
			}
		});
	});
}
