$(function () {
    addCart();
    animation();
});

// img_slider
var img_slider_option = {
	infiniteLoop: true,
	pager: true,
	hideControlOnEnd: true,
	touchEnabled: true,
    auto: true,
	minSlides: 1,
	maxSlides: 1,
	slideWidth: 800,
	slideMargin: 0
};

var bxslider1 = $('.bxslider1').bxSlider(img_slider_option);
//var bxslider2 = $('.bxslider2').bxSlider(img_slider_option);

$(window).on('load resize', function () {
	var newWindowWidth = $(window).width();
	$('.bxslider').each(function () {
		if (newWindowWidth <= 960) {
			// console.log('destory');
			bxslider1.destroySlider();
            //bxslider2.destroySlider();
			$('.img_slider').each(function () {
				$(this).addClass('destroy');
			});
		} else {
			// console.log('reloadSlider');
			bxslider1.reloadSlider(img_slider_option);
            //bxslider2.reloadSlider(img_slider_option);
			$('.img_slider').each(function () {
				$(this).removeClass('destroy');
			});
		}
	});
});

function animation(){
    $(document).ready(function(){
        // 初期設定: .footprintクラスの画像を非表示（opacity:0）にして、下にずらす
        $('.footprints').css({
            opacity: 0,
            position: 'relative',
            
        });
        
        // スクロールイベントを監視
        $(window).on('scroll', function(){
            $('.footprints').each(function(){
                // ウィンドウのスクロール位置と高さ、対象要素の上部位置を取得
                var scrollPos = $(window).scrollTop();
                var windowHeight = $(window).height();
                var elemOffsetTop = $(this).offset().top;
                
                // 要素がウィンドウ内に入った場合にアニメーションを実行
                if (scrollPos + windowHeight > elemOffsetTop) {
                    $(this).animate({
                        opacity: 1,
                        
                    }, 1000); // 1000ミリ秒（1秒）のアニメーション
                }
            });
        });
      });
}

function addCart() {
    $.getJSON('https://cdn.shirai-store.net/assets/json/feature/nyacomo_series_v1_0.json', function (data) {
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

                //console.log('productUrl:', productUrl);
                // console.log('productNumber:', productNumber);
                // console.log('productId:', productId);
                //console.log('productName:', productName);
                // console.log('sellingPrice:', sellingPrice);
                // console.log('normalPrice:', normalPrice);
                //console.log('adis_ary:', adis_ary);

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
                    adis = '<h6>組立サービス</h6><input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/><select name="products[' + productNumber + '].productOptionsWithPrice[1].value"><option value="' + adis_ary[0][0] + '">' + adis_ary[0][1] + '(+' + adis_ary[0][2].toLocaleString() + '円 税込)</option><option value="' + adis_ary[1][0] + '">' + adis_ary[1][1] + '(+' + adis_ary[1][2].toLocaleString() + '円 税込)</option></select>';
                }

                var image = '<img src="' + imgSrc + '">';
                var inner = '<form action="https://shirai-store.net/p/cart/add" method="post" target="_blank"><h5 class="productName">' + productName + '</h5><p class="productPrice"><span>price</span>' + priceText + '</p><input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '">'+ adis + '<h6>数量</h6><div class="cartBlock"><select name="products[' + productNumber + '].quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><button type="submit">カートに入れる</button></div></form><div class=""><a target="_blank" href="' + url + '">商品詳細を見る</a></div>';

                $(this).find('.addToCartImage').prepend(image);
                $(this).find('.addToCartInner').prepend(inner);
                
                $('.modal_button_01').on('click', function () {
                    $('.modal_content_01').fadeIn(300);
                    $('#modal_content_overlay').fadeIn(300);
                    return false;
                });

                $('.modal_button_02').on('click', function () {
                    $('.modal_content_02').fadeIn(300);
                    $('#modal_content_overlay').fadeIn(300);
                    return false;
                });

                $('.modal_button_03').on('click', function () {
                    $('.modal_content_03').fadeIn(300);
                    $('#modal_content_overlay').fadeIn(300);
                    return false;
                });

                $('.modal_button_04').on('click', function () {
                    $('.modal_content_04').fadeIn(300);
                    $('#modal_content_overlay').fadeIn(300);
                    return false;
                });

                $('.modal_button_05').on('click', function () {
                    $('.modal_content_05').fadeIn(300);
                    $('#modal_content_overlay').fadeIn(300);
                    return false;
                });

                $('#modal_content_overlay, .modal_close span').on('click', function () {
                    $('.modal_content_01,.modal_content_02,.modal_content_03,.modal_content_04,.modal_content_05').fadeOut(300);
                    $('#modal_content_overlay').fadeOut(300);
                    return false;
                });
            } else {
                // データが存在しなかった時の処理
            }
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