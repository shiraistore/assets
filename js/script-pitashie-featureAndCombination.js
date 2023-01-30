$(function () {
    featurePts();
});

$(window).on('load', function () {

});

$(window).on('resize', function () {

});

$(window).on('load scroll', function () {

});

/* featurePts
========================================================================== */

/* タブ作成 */
jQuery(function($){
	$('.tab').click(function(){
		$('.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		$('.is-show').removeClass('is-show');
        // クリックしたタブからインデックス番号を取得
		const index = $(this).index();
        // クリックしたタブと同じインデックス番号をもつコンテンツを表示
		$('.panel').eq(index).addClass('is-show');
	});
});

function featurePts() {
    $.getJSON('https://shirai-store.net/assets/assets/json/feature/pitashie-featureAndCombinatio_v1_0.json', function (data) {
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
                    adis_ary = result.adis.sort(),
                    imgSrc,
                    url = '/c/series/' + productUrl.slice(0, 3) + '/' + productUrl;

                // console.log('productUrl:', productUrl);
                // console.log('productNumber:', productNumber);
                // console.log('productId:', productId);
                // console.log('productName:', productName);
                // console.log('sellingPrice:', sellingPrice);
                // console.log('normalPrice:', normalPrice);
                // console.log('adis_ary:', adis_ary);

                if (sellingPrice < normalPrice) {
                    priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
                } else {
                    priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
                }

                var productId_Len12 = ('000000000000' + productId).slice(-12);
                var productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
                var productImageNumber = ('00' + productImage).slice(-2);

                if(specifiedName != undefined){
                    productName = specifiedName;
                }

                imgSrc = 'https://shiraistore.itembox.design/product/' + productId_Len3 + '/' + productId_Len12 + '/' + productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg'

                $(this).find('.addToCartImage').prepend('<img src="' + imgSrc + '">');
                $(this).find('.addToCartInner').prepend('<form action="https://shirai-store.net/p/cart/add" method="post"><h5 class="productName">' + productName + '</h5><p class="productPrice"><span>price</span>' + priceText + '</p><input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '"><h6>組立サービス</h6><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><select name="products[' + productNumber + '].productOptionsWithPrice[1].value"><option value="' + adis_ary[0][0] + '">' + adis_ary[0][1] + '(+' + adis_ary[0][2].toLocaleString() + '円 税込)</option><option value="' + adis_ary[1][0] + '">' + adis_ary[1][1] + '(+' + adis_ary[1][2].toLocaleString() + '円 税込)</option><option value="' + adis_ary[2][0] + '">' + adis_ary[2][1] + '(+' + adis_ary[2][2].toLocaleString() + '円 税込)</select><h6>数量</h6><div class="cartBlock"><select name="products[' + productNumber + '].quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><button type="submit">カートに入れる</button></div></form><div class=""><a href="' + url + '">商品詳細を見る</a></div>');
            } else {
                // データが存在しなかった時の処理
            }
        });

        $('.addToCart-multiple').each(function () {
            var products = $(this).data('products');
            var quantity = $(this).data('quantity');
            var productImage = $(this).data('image');
            var productImageSize = $(this).data('imagesize');
            products_ary = products.split(',');
            quantity_ary = quantity.split(',');
            //console.log(products_ary);

            var html = '',
                totalSellingPrice = 0,
                totalNormalPrice = 0,
                adis01_totalPrice = 0,
                adis02_totalPrice = 0;

			var index = 0;
            for (product of products_ary) {
                //console.log(product);

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
                        adis_ary = result.adis.sort(),
                        priceText,
                        imgSrc;

                    // console.log('productUrl:', productUrl);
                    // console.log('productNumber:', productNumber);
                    // console.log('productId:', productId);
                    // console.log('productName:', productName);
                    // console.log('sellingPrice:', sellingPrice);
                    // console.log('normalPrice:', normalPrice);

                    totalSellingPrice += sellingPrice;
                    totalNormalPrice += normalPrice;

                    //console.log('adis_ary:', adis_ary);
                    adis01_totalPrice += adis_ary[1][2];
                    adis02_totalPrice += adis_ary[2][2];

                    //console.log('adis01_totalPrice:', adis01_totalPrice);
                    //console.log('adis02_totalPrice:', adis02_totalPrice);

                    if (sellingPrice < normalPrice) {
                        priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '<span class="tax">（税込）</span></span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
                    } else {
                        priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
                    }

                    var productId_Len12 = ('000000000000' + productId).slice(-12);
                    var productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
                    var productImageNumber = ('00' + productImage).slice(-2);


                    imgSrc = 'https://shiraistore.itembox.design/product/' + productId_Len3 + '/' + productId_Len12 + '/' + productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg'

                    html += '<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '"><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><input class="adisInput" type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].value" value=' + adis_ary[0][0] + '><input class="quantityInput" type="hidden" name="products[' + productNumber + '].quantity" value="'+quantity_ary[index]+'" size="5"></select>';

					index++;
                } else {
                    // データが存在しなかった時の処理
                }
            }

            if (totalSellingPrice < totalNormalPrice) {
                priceText = '<p class="productPrice"><span>price</span><span class="mark-sale">SALE</span><span class="normalPrice">¥' + totalNormalPrice.toLocaleString() + '<span class="tax">（税込）</span></span><span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span></p>';
            } else {
                priceText = '<p class="productPrice"><span>price</span><span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span></p>';
            }



            $(this).find('.addToCartImage').prepend('<img src="' + imgSrc + '">');
            $(this).find('.addToCartInner').prepend(priceText + '<h6>組立サービス</h6><select class="adisSelect"><option value="ADIS-00">なし(+0円 税込)</option><option value="ADIS-01">組立宅配(+' + adis01_totalPrice.toLocaleString() + '円 税込)</option><option value="ADIS-02">組立宅配(+' + adis02_totalPrice.toLocaleString() + '円 税込)</select><h6>数量</h6><div class="cartBlock"><select class="quantitySelect"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select > <form action="https://shirai-store.net/p/cart/add" method="post">' + html + '<button type="submit">カートへ</button></div></form>');

        });
        $('.adisSelect').change(function () {
            var val = $(this).val();
            //console.log(val);
            $(this).parents().find('.adisInput').each(function () {
                $(this).val(val);
            });
        });
        $('.quantitySelect').change(function () {
            var val = $(this).val();
            //console.log(val);
			var index = 0;
			var quantity = $(this).parents('.addToCart-multiple').data('quantity');
			quantity_ary = quantity.split(',');
			//console.log(quantity_ary);
            $(this).parents('.addToCart-multiple').find('.quantityInput').each(function () {
				//console.log(quantity_ary[index]);
				quantityValue = quantity_ary[index];
                $(this).val(val * quantityValue);
				index++;
            });
        });
    });
}
