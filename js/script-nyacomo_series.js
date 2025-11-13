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

function animation() {
	$(document).ready(function () {
		// 初期設定: .footprintクラスの画像を非表示（opacity:0）にして、下にずらす
		$('.footprints').css({
			opacity: 0,
			position: 'relative',

		});

		// スクロールイベントを監視
		$(window).on('scroll', function () {
			$('.footprints').each(function () {
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

function parseApiJson(raw) {
	if (typeof raw !== 'string') return raw;
	let s = raw.trim();
	// BOM除去
	if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
	// JSコメント除去（//... と /* ... */）
	s = s.replace(/\/\/[^\n\r]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
	// 末尾カンマ除去 ,]}
	s = s.replace(/,\s*(?=[}\]])/g, '');
	return JSON.parse(s);
}

function addCart() {
	const skuListRaw = Array.from(new Set(
		$('.addToCart').map(function () {
			const v = $(this).data('products');
			return (v == null) ? null : String(v).trim();
		}).get().filter(Boolean)
	));
	if (skuListRaw.length === 0) return;

	const skuListForApi = skuListRaw.map(s => s.toUpperCase());

	$.ajax({
		url: 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_list_add_data',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'text',
		processData: false,
		headers: { 'Accept': 'application/json' },
		data: JSON.stringify({ skus: skuListForApi })
	}).done(function (raw) {
		let resp;
		try {
			resp = parseApiJson(raw);
		} catch (e) {
			console.error('API response JSON parse failed:', e, raw);
			return;
		}

		var items = [];
		if (resp && Array.isArray(resp.items)) {
			items = resp.items;
		} else if (resp && Array.isArray(resp.data)) {
			items = resp.data;
		} else if (resp && Array.isArray(resp.result)) {
			items = resp.result;
		}

		const bySku = {};
		items.forEach(it => {
			if (it && it.sku_no) bySku[String(it.sku_no).toLowerCase()] = it;
		});

		$('.addToCart').each(function () {
			const $wrap = $(this);
			const skuRaw = $wrap.data('products');
			const specifiedName = $wrap.data('specifiedname');
			const productImage = Number($wrap.data('image')) || 1;
			const productImageSize = String($wrap.data('imagesize') || 's');
			if (!skuRaw) return;

			const result = bySku[String(skuRaw).toLowerCase()];
			if (!result) return;

			const sku_no = String(result.sku_no);
			const productNumber = sku_no.toUpperCase();
			const productId = Number(result.id);
			let productName = String(result.name || '');
			const sellingPrice = Number(result.selling_price || 0);
			const normalPrice = Number(result.normal_price || 0);
			const thumbnail = Number(result.thumbnail_number || productImage);
			const seriesCode = sku_no.slice(0, 3);
			// 👇 リンクURLを小文字SKUに変更
			const url = '/c/series/' + seriesCode.toLowerCase() + '/' + sku_no.toLowerCase();

			if (specifiedName && String(specifiedName).trim() !== '') {
				productName = String(specifiedName);
			}

			let priceText = '';
			if (sellingPrice > 0 && normalPrice > 0 && sellingPrice < normalPrice) {
				priceText = '<span class="mark-sale">SALE</span>' +
					'<span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span>' +
					'<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
			} else if (sellingPrice > 0) {
				priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
			}

			if (!Number.isFinite(productId)) return;
			const productId_Len12 = ('000000000000' + productId).slice(-12);
			const productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
			const productImageNumber = ('00' + (thumbnail || productImage)).slice(-2);
			const imgSrc = 'https://shiraistore.itembox.design/product/' +
				productId_Len3 + '/' + productId_Len12 + '/' +
				productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg';

			const image = '<img src="' + imgSrc + '">';
			const inner =
				'<form action="https://shirai-store.net/p/cart/add" method="post" target="_blank">' +
				'<h5 class="productName">' + productName + '</h5>' +
				'<p class="productPrice"><span>price</span>' + priceText + '</p>' +
				'<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '"/>' +
				'<h6>数量</h6>' +
				'<div class="cartBlock">' +
				'<select name="products[' + productNumber + '].quantity" class="quantitySelect">' +
				'<option value="1">1</option><option value="2">2</option><option value="3">3</option>' +
				'<option value="4">4</option><option value="5">5</option><option value="6">6</option>' +
				'<option value="7">7</option><option value="8">8</option><option value="9">9</option>' +
				'<option value="10">10</option>' +
				'</select>' +
				'<button type="submit">カートに入れる</button>' +
				'</div>' +
				'</form>' +
				// 👇 小文字SKUのリンク
				'<div class=""><a target="_blank" href="' + url + '">商品詳細を見る</a></div>';

			$wrap.find('.addToCartImage').empty().prepend(image);
			$wrap.find('.addToCartInner').empty().prepend(inner);
		});

		$('.quantitySelect').on('change', function () {
			const val = $(this).val();
			$(this).closest('.cartBlock').find('.quantityInput').val(val);
		});

	}).fail(function (xhr, status, err) {
		console.error('get_product_list_add_data API error:', status, err, xhr && xhr.responseText);
	});
}

function initModals() {

	// 汎用的に全番号対応
	$('[class^="modal_content_"]').filter(function () {
		return /\d+$/.test(this.className);
	}).hide();

	// --- 開く処理 ---
	$(document).on('click', '[class*="modal_button_"]', function (e) {
		e.preventDefault();
		const btnClass = (this.className || '').split(/\s+/).find(c => /^modal_button_\d+$/.test(c));
		if (!btnClass) return;
		const num = btnClass.split('_').pop();
		const target = '.modal_content_' + num;

		$('#modal_content_overlay').stop(true, true).fadeIn(200);
		$(target).stop(true, true).fadeIn(200);
		$('body').addClass('no-scroll');
	});

	// --- 閉じる処理 ---
	$(document).on('click', '#modal_content_overlay, .modal_close span', function (e) {
		e.preventDefault();
		$('[class^="modal_content_"]').filter(function () {
			return /\d+$/.test(this.className);
		}).stop(true, true).fadeOut(200);
		$('#modal_content_overlay').stop(true, true).fadeOut(200);
		$('body').removeClass('no-scroll');
	});

	// --- ESCで閉じる ---
	$(document).on('keyup', function (e) {
		if (e.key === 'Escape') {
			$('[class^="modal_content_"]').filter(function () {
				return /\d+$/.test(this.className);
			}).stop(true, true).fadeOut(200);
			$('#modal_content_overlay').stop(true, true).fadeOut(200);
			$('body').removeClass('no-scroll');
		}
	});
}


$(function () {
	initModals();
});


// 既存の $(function(){ ... }) に追加
$(function () {
	initModals();
});
