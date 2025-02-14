$(function () {
    addCart();
});

function addCart() {
    $.getJSON('https://cdn.shirai-store.net/assets/json/feature/newLife_v1_0.json', function (data) {
        //console.log(data);
        $('.changePrice').each(function () {
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

                $(this).html(priceText);
            } else {
                // データが存在しなかった時の処理
            }
        });
    });
}