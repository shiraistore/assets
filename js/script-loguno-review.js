$(function () {
    addCart();
});

/* addCart
========================================================================== */

/* タブ作成 */
jQuery(function ($) {
    $('.tab').click(function () {
        $('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $('.is-show').removeClass('is-show');
        // クリックしたタブからインデックス番号を取得
        const index = $(this).index();
        // クリックしたタブと同じインデックス番号をもつコンテンツを表示
        $('.panel').eq(index).addClass('is-show');
    });
});

function addCart() {
    $.getJSON('https://cdn.jsdelivr.net/gh/shiraistore/assets@v1.1.73/json/feature/loguno-review_v1_0.json', function (data) {
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
                console.log('productName:', productName);
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
                if (adis_ary != undefined) {
                    adis = '<h6>組立サービス</h6><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><select name="products[' + productNumber + '].productOptionsWithPrice[1].value"><option value="' + adis_ary[0][0] + '">' + adis_ary[0][1] + '(+' + adis_ary[0][2].toLocaleString() + '円 税込)</option><option value="' + adis_ary[1][0] + '">' + adis_ary[1][1] + '(+' + adis_ary[1][2].toLocaleString() + '円 税込)</option><option value="' + adis_ary[2][0] + '">' + adis_ary[2][1] + '(+' + adis_ary[2][2].toLocaleString() + '円 税込)</select>';
                }

                $(this).find('.addToCartImage').prepend('<img src="' + imgSrc + '">');
                $(this).find('.addToCartInner').prepend('<form action="https://shirai-store.net/p/cart/add" method="post"><h5 class="productName">' + productName + '</h5><p class="productPrice"><span>price</span>' + priceText + '</p><input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '">' + adis + '<h6>数量</h6><div class="cartBlock"><select name="products[' + productNumber + '].quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><button type="submit">カートに入れる</button></div></form><div class=""><a href="' + url + '">商品詳細を見る</a></div>');
            } else {
                // データが存在しなかった時の処理
            }
        });

        $('.addToCart-multiple').each(function () {
            var products = $(this).data('products');
            var productImage = $(this).data('image');
            var productImageSize = $(this).data('imagesize');
            products_ary = products.split(',');
            //console.log(products_ary);

            var html = '',
                totalSellingPrice = 0,
                totalNormalPrice = 0,
                adis01_totalPrice = 0,
                adis02_totalPrice = 0;

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
                        priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
                    } else {
                        priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
                    }

                    var productId_Len12 = ('000000000000' + productId).slice(-12);
                    var productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
                    var productImageNumber = ('00' + productImage).slice(-2);


                    imgSrc = 'https://shiraistore.itembox.design/product/' + productId_Len3 + '/' + productId_Len12 + '/' + productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg'

                    html += '<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '"><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><input class="adisInput" type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].value" value=' + adis_ary[0][0] + '><input class="quantityInput" type="hidden" name="products[' + productNumber + '].quantity" value="1" size="5"></select>';

                } else {
                    // データが存在しなかった時の処理
                }
            }

            if (totalSellingPrice < totalNormalPrice) {
                priceText = '<p class="productPrice"><span>price</span><span class="mark-sale">SALE</span><span class="normalPrice">¥' + totalNormalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '（税込）</span></p>';
            } else {
                priceText = '<p class="productPrice"><span>price</span><span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '（税込）</span></p>';
            }



            $(this).find('.addToCartImage').prepend('<img src="' + imgSrc + '">');
            $(this).find('.addToCartInner').prepend(priceText + '<h6>組立サービス</h6><select class="adisSelect"><option value="ADIS-00">なし(+0円 税込)</option><option value="ADIS-01">組立済+玄関渡し(+' + adis01_totalPrice.toLocaleString() + '円 税込)</option><option value="ADIS-02">組立済+搬入(+' + adis02_totalPrice.toLocaleString() + '円 税込)</select><h6>数量</h6><div class="cartBlock"><select class="quantitySelect"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select > <form action="https://shirai-store.net/p/cart/add" method="post">' + html + '<button type="submit">カートへ</button></div></form>');

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
            $(this).parents().find('.quantityInput').each(function () {
                $(this).val(val);
            });
        });
    });
}
