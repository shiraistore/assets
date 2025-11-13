$(function () {
	addCart();
});

/* タブ作成（既存のまま） */
jQuery(function ($) {
	$('.tab').click(function () {
		$('.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		$('.is-show').removeClass('is-show');
		const index = $(this).index();
		$('.panel').eq(index).addClass('is-show');
	});
});

/* 安全パーサ：BOM/コメント/末尾カンマ対応 */
function parseApiJson(raw) {
	if (typeof raw !== 'string') return raw;
	let s = raw.trim();
	if (s && s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
	s = s.replace(/\/\/[^\n\r]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
	s = s.replace(/,\s*(?=[}\]])/g, '');
	return JSON.parse(s);
}

function addCart() {
	// 1) ページ内のSKUを収集（重複除去）※大文字でAPI送信し、小文字キーで突合
	const skuSet = new Set();

	$('.addToCart').each(function () {
		const v = $(this).data('products');
		if (v != null && String(v).trim() !== '') skuSet.add(String(v).trim().toUpperCase());
	});

	$('.addToCart-multiple').each(function () {
		String($(this).data('products') || '')
			.split(',')
			.map(s => String(s || '').trim())
			.filter(Boolean)
			.forEach(sku => skuSet.add(sku.toUpperCase()));
	});

	$('.lineup_item_price').each(function () {
		const v = $(this).data('product');
		if (v != null && String(v).trim() !== '') skuSet.add(String(v).trim().toUpperCase());
	});

	const skuList = Array.from(skuSet);
	if (skuList.length === 0) return;

	// 2) API呼び出し（POST）
	$.ajax({
		url: 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_list_add_data',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'text',
		processData: false,
		headers: { 'Accept': 'application/json' },
		data: JSON.stringify({ skus: skuList })
	}).done(function (raw) {
		let resp;
		try {
			resp = parseApiJson(raw);
		} catch (e) {
			console.error('API response JSON parse failed:', e, raw);
			return;
		}

		// 3) レスポンス配列を正規化
		var items = [];
		if (resp && Array.isArray(resp.items)) {
			items = resp.items;
		} else if (resp && Array.isArray(resp.data)) {
			items = resp.data;
		} else if (resp && Array.isArray(resp.result)) {
			items = resp.result;
		}

		// sku_no(小文字) → item のマップ
		const bySku = {};
		items.forEach(it => {
			if (it && it.sku_no) bySku[String(it.sku_no).toLowerCase()] = it;
		});

		/* 4) 単品カートブロックの描画 */
		$('.addToCart').each(function () {
			const $wrap = $(this);
			const skuRaw = $wrap.data('products');
			if (!skuRaw) return;

			const specifiedName = $wrap.data('specifiedname');
			const productImage = Number($wrap.data('image')) || 1;
			const productImageSize = String($wrap.data('imagesize') || 's');

			const it = bySku[String(skuRaw).toLowerCase()];
			if (!it) return;

			const sku_no = String(it.sku_no || skuRaw);
			const productNumber = sku_no.toUpperCase();
			const productId = Number(it.id);
			let productName = String(it.name || '');
			const sellingPrice = Number(it.selling_price || 0);
			const normalPrice = Number(it.normal_price || 0);
			const thumbnail = Number(it.thumbnail_number || productImage);
			const seriesCode = sku_no.slice(0, 3);
			const url = '/c/series/' + seriesCode.toLowerCase() + '/' + sku_no.toLowerCase();

			if (specifiedName && String(specifiedName).trim() !== '') {
				productName = String(specifiedName);
			}

			let priceText = '';
			if (sellingPrice > 0 && normalPrice > 0 && sellingPrice < normalPrice) {
				priceText = '<span class="mark-sale">SALE</span><span class="normalPrice">¥' +
					normalPrice.toLocaleString() + '（税込）</span><span class="sellingPrice">¥' +
					sellingPrice.toLocaleString() + '（税込）</span>';
			} else if (sellingPrice > 0) {
				priceText = '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '（税込）</span>';
			}

			if (!Number.isFinite(productId)) return;
			const pid12 = ('000000000000' + productId).slice(-12);
			const pid3 = ('000' + Math.floor(productId / 100)).slice(-3);
			const imgNo = ('00' + (thumbnail || productImage)).slice(-2);
			const imgSrc = 'https://shiraistore.itembox.design/product/' + pid3 + '/' + pid12 + '/' + pid12 + '-' + imgNo + '-' + productImageSize + '.jpg';

			// ADIS（任意）
			let adisHtml = '';
			const adis = Array.isArray(it.adis) ? it.adis.slice().sort() : null;
			if (adis && adis.length >= 3) {
				adisHtml =
					'<h6>組立サービス</h6>' +
					'<input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/>' +
					'<select name="products[' + productNumber + '].productOptionsWithPrice[1].value">' +
					'<option value="' + adis[0][0] + '">' + adis[0][1] + '(+' + Number(adis[0][2] || 0).toLocaleString() + '円 税込)</option>' +
					'<option value="' + adis[1][0] + '">' + adis[1][1] + '(+' + Number(adis[1][2] || 0).toLocaleString() + '円 税込)</option>' +
					'<option value="' + adis[2][0] + '">' + adis[2][1] + '(+' + Number(adis[2][2] || 0).toLocaleString() + '円 税込)</option>' +
					'</select>';
			}

			$wrap.find('.addToCartImage').empty().prepend('<img src="' + imgSrc + '">');
			$wrap.find('.addToCartInner').empty().prepend(
				'<form action="https://shirai-store.net/p/cart/add" method="post">' +
				'<h5 class="productName">' + productName + '</h5>' +
				'<p class="productPrice"><span>price</span>' + priceText + '</p>' +
				'<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '">' +
				adisHtml +
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
				'<div class=""><a target="_blank" href="' + url + '">商品詳細を見る</a></div>'
			);
		});

		/* 5) 複数カートブロック（合計金額・ADIS合算・代表画像） */
		$('.addToCart-multiple').each(function () {
			const $wrap = $(this);
			const productsStr = String($wrap.data('products') || '');
			const productImage = Number($wrap.data('image')) || 1;
			const productImageSize = String($wrap.data('imagesize') || 's');
			const products_ary = productsStr.split(',').map(s => String(s || '').trim()).filter(Boolean);

			let totalSellingPrice = 0;
			let totalNormalPrice = 0;
			let adis01_totalPrice = 0;
			let adis02_totalPrice = 0;
			let htmlHiddenInputs = '';
			let lastImgSrc = '';

			products_ary.forEach(product => {
				const it = bySku[String(product).toLowerCase()];
				if (!it) return;

				const sku_no = String(it.sku_no || product);
				const productNumber = sku_no.toUpperCase();
				const productId = Number(it.id);
				const sellingPrice = Number(it.selling_price || 0);
				const normalPrice = Number(it.normal_price || 0);
				const adis = Array.isArray(it.adis) ? it.adis.slice().sort() : null;

				totalSellingPrice += sellingPrice;
				totalNormalPrice += normalPrice;

				if (adis && adis.length >= 3) {
					adis01_totalPrice += Number(adis[1][2] || 0);
					adis02_totalPrice += Number(adis[2][2] || 0);
				}

				if (Number.isFinite(productId)) {
					const pid12 = ('000000000000' + productId).slice(-12);
					const pid3 = ('000' + Math.floor(productId / 100)).slice(-3);
					const imgNo = ('00' + (Number(it.thumbnail_number || productImage) || 1)).slice(-2);
					lastImgSrc = 'https://shiraistore.itembox.design/product/' + pid3 + '/' + pid12 + '/' + pid12 + '-' + imgNo + '-' + productImageSize + '.jpg';
				}

				// まとめてカート投入用 hidden
				htmlHiddenInputs +=
					'<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '">' +
					'<input type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].id" value="1"/>' +
					'<input class="adisInput" type="hidden" name="products[' + productNumber + '].productOptionsWithPrice[1].value" value="' + (adis ? adis[0][0] : 'ADIS-00') + '">' +
					'<input class="quantityInput" type="hidden" name="products[' + productNumber + '].quantity" value="1" size="5">';
			});

			let priceText = '';
			if (totalSellingPrice > 0 && totalNormalPrice > 0 && totalSellingPrice < totalNormalPrice) {
				priceText = '<p class="productPrice"><span>price</span><span class="mark-sale">SALE</span>' +
					'<span class="normalPrice">¥' + totalNormalPrice.toLocaleString() + '（税込）</span>' +
					'<span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '（税込）</span></p>';
			} else if (totalSellingPrice > 0) {
				priceText = '<p class="productPrice"><span>price</span>' +
					'<span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '（税込）</span></p>';
			}

			if (lastImgSrc) {
				$wrap.find('.addToCartImage').empty().prepend('<img src="' + lastImgSrc + '">');
			}

			// ADISセレクト（レスポンスに1つでもadisがない可能性を考慮し、金額が0なら「なし」のみ）
			let adisSelectHtml = '';
			if (adis01_totalPrice > 0 || adis02_totalPrice > 0) {
				adisSelectHtml =
					'<h6>組立サービス</h6>' +
					'<select class="adisSelect">' +
					'<option value="ADIS-00">なし(+0円 税込)</option>' +
					'<option value="ADIS-01">組立済+玄関渡し(+' + adis01_totalPrice.toLocaleString() + '円 税込)</option>' +
					'<option value="ADIS-02">組立済+搬入(+' + adis02_totalPrice.toLocaleString() + '円 税込)</option>' +
					'</select>';
			}

			$wrap.find('.addToCartInner').prepend(
				priceText +
				adisSelectHtml +
				'<h6>数量</h6>' +
				'<div class="cartBlock">' +
				'<select class="quantitySelect">' +
				'<option value="1">1</option><option value="2">2</option><option value="3">3</option>' +
				'<option value="4">4</option><option value="5">5</option><option value="6">6</option>' +
				'<option value="7">7</option><option value="8">8</option><option value="9">9</option>' +
				'<option value="10">10</option>' +
				'</select> ' +
				'<form action="https://shirai-store.net/p/cart/add" method="post">' + htmlHiddenInputs +
				'<button type="submit">カートへ</button>' +
				'</form>' +
				'</div>'
			);
		});

		// 6) 価格表示（lineup）
		$('.lineup_item_price').each(function () {
			const $wrap = $(this);
			const skuRaw = $wrap.data('product');
			if (!skuRaw) return;

			const it = bySku[String(skuRaw).toLowerCase()];
			if (!it) return;

			const sellingPrice = Number(it.selling_price || 0);
			const normalPrice = Number(it.normal_price || 0);
			const coupon_price = Math.floor(sellingPrice * 0.9); // 10%OFF

			let price_text = '';
			if (sellingPrice > 0 && normalPrice > 0 && sellingPrice < normalPrice) {
				price_text =
					'<span class="mark-sale">SALE</span>' +
					'<span class="normalPrice">¥' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span>' +
					'<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span>';
			} else if (sellingPrice > 0) {
				price_text =
					'<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span>';
			}

			const coupon_price_text =
				'<span class="coupon_price">¥' + coupon_price.toLocaleString() + '<span class="tax">(税込)</span></span>';

			$wrap.find('.lineup_item_price_inner').prepend(
				'<div><span class="price_section">price</span>' + price_text + '</div>' +
				'<div><span class="mark-coupon price_section">クーポン利用で10%OFF</span>' + coupon_price_text + '</div>'
			);
		});

		// 7) イベント
		$(document)
			.off('change.addis', '.adisSelect')
			.on('change.addis', '.adisSelect', function () {
				const val = $(this).val();
				$(this).closest('.addToCart-multiple, .addToCart')
					.find('.adisInput').val(val);
			});

		$(document)
			.off('change.qty', '.quantitySelect')
			.on('change.qty', '.quantitySelect', function () {
				const val = $(this).val();
				$(this).closest('.addToCart-multiple, .addToCart')
					.find('.quantityInput').val(val);
			});

	}).fail(function (xhr, status, err) {
		console.error('get_product_list_add_data API error:', status, err, xhr && xhr.responseText);
	});
}
