$(function () {
	addCart();
});

// producSlider
var productSlider_option = {
	infiniteLoop: false,
	pager: false,
	hideControlOnEnd: true,
	touchEnabled: false,
	minSlides: 5,
	maxSlides: 5,
	slideWidth: 203,
	slideMargin: 8,
};

var bxslider1 = $('.bxslider1').bxSlider(productSlider_option);
var bxslider2 = $('.bxslider2').bxSlider(productSlider_option);
var bxslider3 = $('.bxslider3').bxSlider(productSlider_option);
var bxslider4 = $('.bxslider4').bxSlider(productSlider_option);

$(window).on('load resize', function () {
	var newWindowWidth = $(window).width();
	$('.bxslider').each(function () {
		if (newWindowWidth <= 1200) {
			// console.log('destory');
			bxslider1.destroySlider();
			bxslider2.destroySlider();
			bxslider3.destroySlider();
			bxslider4.destroySlider();
			$('.productSlider').each(function () {
				$(this).addClass('destroy');
			});
		} else {
			// console.log('reloadSlider');
			bxslider1.reloadSlider(productSlider_option);
			bxslider2.reloadSlider(productSlider_option);
			bxslider3.reloadSlider(productSlider_option);
			bxslider4.reloadSlider(productSlider_option);
			$('.productSlider').each(function () {
				$(this).removeClass('destroy');
			});
		}
	});
});

/* addCart
========================================================================== */
function addCart() {
	$.getJSON('https://cdn.jsdelivr.net/gh/shiraistore/assets@v1.1.73/json/feature/book-shelf-capacity_v1_0.json', function (data) {
		//console.log(data);
		$('.addToCart').each(function () {
			var product = $(this).data('products');
			var specifiedName = $(this).data('specifiedname');
			var productImage = $(this).data('image');
			var productImageSize = $(this).data('imagesize');
			var priceText;
			var result = data.find((u) => u.productUrl === product);
			if (result) {
				// データが存在した時の処理

				//console.log(result);
				var productUrl = result.productUrl,
					productNumber = result.productUrl.toUpperCase(),
					productId = result.productId,
					productName = result.productName,
					sellingPrice = result.sellingPrice,
					normalPrice = result.normalPrice,
					adis_ary,
					imgSrc,
					url = '/c/series/' + productUrl.slice(0, 3) + '/' + productUrl;

				if (result.adis !== undefined) {
					adis_ary = result.adis.sort();
				}

				// console.log('productUrl:', productUrl);
				// console.log('productNumber:', productNumber);
				// console.log('productId:', productId);
				// console.log('productName:', productName);
				// console.log('sellingPrice:', sellingPrice);
				// console.log('normalPrice:', normalPrice);
				// console.log('adis_ary:', adis_ary);

				if (sellingPrice < normalPrice) {
					priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
				} else {
					priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
				}

				var productId_Len12 = ('000000000000' + productId).slice(-12);
				var productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
				var productImageNumber = ('00' + productImage).slice(-2);

				//console.log('specifiedName:',specifiedName);

				if (specifiedName !== undefined && specifiedName !== '') {
					productName = specifiedName;
				}
				//console.log('productName:',productName);

				imgSrc = 'https://shiraistore.itembox.design/product/' + productId_Len3 + '/' + productId_Len12 + '/' + productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg';

				var adis = '';
				// console.log(adis_ary);
				if (adis_ary != undefined) {
					adis = '<h6>組立サービス</h6><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><select name="products[' + productNumber + '].productOptionsWithPrice[1].value">';

					adis = adis + '<option value="' + adis_ary[0][0] + '">' + adis_ary[0][1] + '(+' + adis_ary[0][2].toLocaleString() + '円 税込)</option>';

					if (adis_ary.length == 2) {
						adis = adis + '<option value="' + adis_ary[1][0] + '">' + adis_ary[1][1] + '(+' + adis_ary[1][2].toLocaleString() + '円 税込)</option>';
					} else if (adis_ary.length == 3) {
						adis = adis + '<option value="' + adis_ary[1][0] + '">' + adis_ary[1][1] + '(+' + adis_ary[1][2].toLocaleString() + '円 税込)</option>';
						adis = adis + '<option value="' + adis_ary[2][0] + '">' + adis_ary[2][1] + '(+' + adis_ary[2][2].toLocaleString() + '円 税込)</option>';
					}
					adis = adis + '</select>';
				}

				$(this)
					.find('.addToCartImage')
					.prepend('<img src="' + imgSrc + '">');
				$(this)
					.find('.addToCartInner')
					.prepend(
						'<form action="https://shirai-store.net/p/cart/add" method="post"><h5 class="productName">' +
							productName +
							'</h5><p class="productPrice"><span>price</span>' +
							priceText +
							'</p><input type="hidden" name="products[' +
							productNumber +
							'].productNo" value="' +
							productNumber +
							'">' +
							adis +
							'<h6>数量</h6><div class="cartBlock"><select name="products[' +
							productNumber +
							'].quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><button type="submit">カートに入れる</button></div></form><div class=""><a href="' +
							url +
							'">商品詳細を見る</a></div>'
					);
			} else {
				// データが存在しなかった時の処理
			}
		});

		$('.adisSelect').change(function () {
			var val = $(this).val();
			//console.log(val);
			$(this)
				.parents()
				.find('.adisInput')
				.each(function () {
					$(this).val(val);
				});
		});
		$('.quantitySelect').change(function () {
			var val = $(this).val();
			//console.log(val);
			$(this)
				.parents()
				.find('.quantityInput')
				.each(function () {
					$(this).val(val);
				});
		});
	});
}
