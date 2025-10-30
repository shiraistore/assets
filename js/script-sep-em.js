$(function () {
	sep_emrack_select();
	sep_emdesk_select();
});

$(window).on('load', function () {
	var initPhotoSwipeFromDOM = function (gallerySelector) {
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes, numNodes = thumbElements.length, items = [], figureEl, linkEl, size, item;
			for (var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i];
				if (figureEl.nodeType !== 1) continue;
				linkEl = figureEl.children[0];
				size = linkEl.getAttribute('data-size').split('x');
				item = { src: linkEl.getAttribute('href'), w: parseInt(size[0], 10), h: parseInt(size[1], 10) };
				if (figureEl.children.length > 1) item.title = figureEl.children[1].innerHTML;
				if (linkEl.children.length > 0) item.msrc = linkEl.children[0].getAttribute('src');
				item.el = figureEl;
				items.push(item);
			}
			return items;
		};
		var closest = function closest(el, fn) { return el && (fn(el) ? el : closest(el.parentNode, fn)); };
		var onThumbnailsClick = function (e) {
			e = e || window.event; e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			var eTarget = e.target || e.srcElement;
			var clickedListItem = closest(eTarget, function (el) { return el.tagName && el.tagName.toUpperCase() === 'P'; });
			if (!clickedListItem) return;
			var clickedGallery = clickedListItem.parentNode, childNodes = clickedListItem.parentNode.childNodes, numChildNodes = childNodes.length, nodeIndex = 0, index;
			for (var i = 0; i < numChildNodes; i++) { if (childNodes[i].nodeType !== 1) continue; if (childNodes[i] === clickedListItem) { index = nodeIndex; break; } nodeIndex++; }
			if (index >= 0) openPhotoSwipe(index, clickedGallery);
			return false;
		};
		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1), params = {};
			if (hash.length < 5) return params;
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) { if (!vars[i]) continue; var pair = vars[i].split('='); if (pair.length < 2) continue; params[pair[0]] = pair[1]; }
			if (params.gid) params.gid = parseInt(params.gid, 10);
			if (!params.hasOwnProperty('pid')) return params;
			params.pid = parseInt(params.pid, 10);
			return params;
		};
		var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
			var pswpElement = document.querySelectorAll('.pswp')[0], gallery, options, items;
			items = parseThumbnailElements(galleryElement);
			options = { index: index, galleryUID: galleryElement.getAttribute('data-pswp-uid') };
			if (disableAnimation) options.showAnimationDuration = 0;
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		var galleryElements = document.querySelectorAll(gallerySelector);
		for (var i = 0, l = galleryElements.length; i < l; i++) { galleryElements[i].setAttribute('data-pswp-uid', i + 1); galleryElements[i].onclick = onThumbnailsClick; }

		var hashData = photoswipeParseHash();
		if (hashData.pid > 0 && hashData.gid > 0) { openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true); }
	};
	initPhotoSwipeFromDOM('#sep-em_selectedProductImageText');
});

$(window).on('resize', function () {});
$(window).on('load scroll', function () {});

/* ====== 簡易キャッシュ ====== */
var __sep_em_price_cache = {}; // key: "product:SKU" / "selection:SKU"
function _cacheGet(key){ return __sep_em_price_cache[key]; }
function _cacheSet(key,val){ __sep_em_price_cache[key]=val; }

/* ====== ユーティリティ ====== */
function formatNumberWithComma(number){ return Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function toNumberSafe(v){ var n = Number(v); return isFinite(n) && !isNaN(n) ? n : 0; }
// ADIS告知挿入（ADISセレクト付近→価格ボックス→ボタン上の順で探す）
function insertAdisHtml(adisSaleHtml) {
	$('#adisSale').remove();
	var $targets = $(
		'select[name="sep_em_optionADIS"],select[name="sep_emu_optionADIS"],' +
		'select[name="por_em_optionADIS"],select[name="por_emu_optionADIS"],' +
		'select[name="tnl_em_optionADIS"],select[name="tnl_emu_optionADIS"]'
	);
	if ($targets.length) {
		$targets.eq(0).closest('.selectBlock').prev('h2').after(adisSaleHtml);
	} else if ($('#productPriceBox').length) {
		$('#productPriceBox').after(adisSaleHtml);
	} else if ($('#sep-em_selectedProductButton').length) {
		$('#sep-em_selectedProductButton').before(adisSaleHtml);
	} else {
		$('body').append(adisSaleHtml);
	}
}

/* ====== ADIS割引表示（既製品） ====== */
function adis_discount_campaign_display_price(price){
	let adisSaleHtml = '', is_adisSale = 0;
	let n1 = toNumberSafe(price.adis01_normal_price), s1 = toNumberSafe(price.adis01_selling_price);
	let n2 = toNumberSafe(price.adis02_normal_price), s2 = toNumberSafe(price.adis02_selling_price);
	if (n1 > 0 && s1 > 0 && n1 > s1){
		adisSaleHtml += `<li>組立済+玄関渡し：¥<span style="text-decoration:line-through">${formatNumberWithComma(n1)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s1)}</span><span class="differencePrice">¥${formatNumberWithComma(n1 - s1)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (n2 > 0 && s2 > 0 && n2 > s2){
		adisSaleHtml += `<li>組立済+搬入：¥<span style="text-decoration:line-through">${formatNumberWithComma(n2)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s2)}</span><span class="differencePrice">¥${formatNumberWithComma(n2 - s2)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (is_adisSale == 1){ insertAdisHtml(`<div id="adisSale"><h4>組立サービス割引キャンペーン</h4><ul>${adisSaleHtml}</ul></div>`); } else { $('#adisSale').remove(); }
}

/* ====== ADIS割引表示（サイズオーダー） ====== */
function adis_discount_campaign_display_price_size_order(price){
	let adisSaleHtml = '', is_adisSale = 0;
	let n1 = toNumberSafe(price.adis01_selection_normal_price), s1 = toNumberSafe(price.adis01_selection_selling_price);
	let n2 = toNumberSafe(price.adis02_selection_normal_price), s2 = toNumberSafe(price.adis02_selection_selling_price);
	if (n1 > 0 && s1 > 0 && n1 > s1){
		adisSaleHtml += `<li>組立済+玄関渡し：¥<span style="text-decoration:line-through">${formatNumberWithComma(n1)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s1)}</span><span class="differencePrice">¥${formatNumberWithComma(n1 - s1)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (n2 > 0 && s2 > 0 && n2 > s2){
		adisSaleHtml += `<li>組立済+搬入：¥<span style="text-decoration:line-through">${formatNumberWithComma(n2)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s2)}</span><span class="differencePrice">¥${formatNumberWithComma(n2 - s2)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (is_adisSale == 1){ insertAdisHtml(`<div id="adisSale"><h4>組立サービス割引キャンペーン</h4><ul>${adisSaleHtml}</ul></div>`); } else { $('#adisSale').remove(); }
}

/* ====== API（既製品） ====== */
function get_price(sku_no) {
	var cacheKey = 'product:' + sku_no, cached = _cacheGet(cacheKey);
	if (cached) return cached;
	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_prices';
	var params = { sku_no: sku_no };
	try {
		var responseText = $.ajax({
			type: 'post', url: url, async: false,
			data: JSON.stringify(params), contentType: 'application/json',
			dataType: 'json', scriptCharset: 'utf-8'
		}).responseText;
		var raw = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
		var normalized = {
			sku_no: sku_no,
			product_selling_price: toNumberSafe(raw && raw.product_selling_price),
			postage: toNumberSafe(raw && raw.postage),
			adis01_normal_price: toNumberSafe(raw && raw.adis01_normal_price),
			adis01_selling_price: toNumberSafe(raw && raw.adis01_selling_price),
			adis02_normal_price: toNumberSafe(raw && raw.adis02_normal_price),
			adis02_selling_price: toNumberSafe(raw && raw.adis02_selling_price),
		};
		_cacheSet(cacheKey, normalized);
		return normalized;
	} catch (e) {
		return { sku_no: sku_no, product_selling_price: 0, postage: 0, adis01_normal_price:0, adis01_selling_price:0, adis02_normal_price:0, adis02_selling_price:0 };
	}
}

/* ====== API（サイズオーダー） ====== */
function get_selection_price(selection_sku_no) {
	var cacheKey = 'selection:' + selection_sku_no, cached = _cacheGet(cacheKey);
	if (cached) return cached;
	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_size_order_made_prices';
	var params = { selection_sku_no: selection_sku_no };
	try {
		var responseText = $.ajax({
			type: 'post', url: url, async: false,
			data: JSON.stringify(params), contentType: 'application/json',
			dataType: 'json', scriptCharset: 'utf-8'
		}).responseText;
		var raw = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
		var normalized = {
			selection_sku_no: selection_sku_no,
			product_selection_selling_price: toNumberSafe(raw && raw.product_selection_selling_price),
			product_selection_normal_price: toNumberSafe(raw && raw.product_selection_normal_price),
			postage: toNumberSafe(raw && raw.postage),
			adis01_selection_normal_price: toNumberSafe(raw && raw.adis01_selection_normal_price),
			adis01_selection_selling_price: toNumberSafe(raw && raw.adis01_selection_selling_price),
			adis02_selection_normal_price: toNumberSafe(raw && raw.adis02_selection_normal_price),
			adis02_selection_selling_price: toNumberSafe(raw && raw.adis02_selection_selling_price),
		};
		_cacheSet(cacheKey, normalized);
		return normalized;
	} catch (e) {
		return { selection_sku_no: selection_sku_no, product_selection_selling_price: 0, product_selection_normal_price: 0, postage: 0,
			adis01_selection_normal_price:0, adis01_selection_selling_price:0, adis02_selection_normal_price:0, adis02_selection_selling_price:0 };
	}
}

/* =========================
   ラック（sep_emrack_select）
   ========================= */
function sep_emrack_select() {
	if (!$('#sep-emrack').length) return;

	function sep_emrack_selectWrite() {
		var optionHeight = $('#sep-emrack [name=sep-emrack_optionHeight]').val(),
			optionHeightName = '',
			optionWidth = $('#sep-emrack [name=sep-emrack_optionWidth]').val(),
			optionWidthName = '',
			optionColor = $('#sep-emrack [name=sep-emrack_optionColor]:checked').val(),
			optionColorName = $('#sep-emrack [name=sep-emrack_optionColor]:checked').data('colorname'),
			optionHeightSize, optionWidthSize, optionSize, orderName, readyMade = 0;

		switch (optionHeight) {
			case '1': optionHeightSize = '40'; optionHeightName = '41.4'; break;
			case '2': optionHeightSize = '75'; optionHeightName = '77.4'; break;
			case '3': optionHeightSize = '11'; optionHeightName = '113.4'; break;
			case '4': optionHeightSize = '15'; optionHeightName = '149.4'; break;
			case '5': optionHeightSize = '19'; optionHeightName = '185.4'; break;
			case '6': optionHeightSize = '23'; optionHeightName = '231.1<span class="displayBlock_pc">~</span>250.1'; break;
		}
		switch (optionWidth) {
			case '1': optionWidthSize = '40'; optionWidthName = '40.5'; break;
			case '2': optionWidthSize = '75'; optionWidthName = '75.2'; break;
			case '3': optionWidthSize = '11'; optionWidthName = '100.0'; break;
			case '4': optionWidthSize = '14'; optionWidthName = '144.7'; break;
			case '5': optionWidthSize = '18'; optionWidthName = '179.5'; break;
		}
		optionSize = optionHeightSize + optionWidthSize;
		switch (optionSize) {
			case '1111': readyMade = 1; break;
			case '1911': readyMade = 1; break;
		}

		var productNumber;
		if (readyMade == 1) {
			productNumber = 'SEP-' + optionSize + '-' + optionColor;
			$('#readyMadeMessage').text('お選びのサイズは既製品です。');
			$('#sep_selectedProductButton').html('<a href="/c/series/sep/' + productNumber.toLowerCase() + '">既製品のご注文はこちら</a>');
			$('#sep_selectedProductButton').css('display', 'block');
			$('#sep-em_selectedProductButton').css('display', 'none');
			$('.fs-c-productOption.unusable').css('display', 'none');
		} else {
			productNumber = 'SEP-EM' + optionSize;
			$('#readyMadeMessage').text('');
			$('#sep_selectedProductButton').css('display', 'none');
			$('#sep-em_selectedProductButton').css('display', 'block');
			$('.fs-c-productOption.unusable').css('display', 'block');
		}

		// 画像・表示
		$('#sep-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/' + optionWidth + '-' + optionHeight + '-' + optionColor.toLowerCase() + '.jpg">');
		$('#sep-em_selectedProductHeightImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/height' + optionHeight + '.png">');
		$('#sep-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/width' + optionWidth + '.png">');
		$('#sep-em_selectedProductImageText a').attr('href', '/assets/img/product/sizeOrder/sep-em/rack/modelIllustration/' + optionSize + '.png');
		$('#sep-em_selectedHeight').html(optionHeightName + 'cm');
		$('#sep-em_selectedWidth').html(optionWidthName + 'cm');
		$('#sep-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/sep-em/thum/sep-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
		$('#sep-em_selectedProduct').html(productNumber);

		// 価格取得＆表示 + ADIS
		if (readyMade == 1) {
			var price = get_price(productNumber);
			$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(price.product_selling_price));
			$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.product_selling_price / 100));
			$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(price.postage));
			// adis_discount_campaign_display_price(price);
		} else {
			var priceSel = get_selection_price(productNumber);
			$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(priceSel.product_selection_selling_price));
			$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(priceSel.product_selection_selling_price / 100));
			$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(priceSel.postage));
			// adis_discount_campaign_display_price_size_order(priceSel);
		}

		// カート
		var html;
		if (readyMade == 0) {
			orderName = 'SEP-EM' + optionSize;
			html =
				'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
				orderName + '].productNo" value="' + orderName +
				'"><input type="hidden" name="products[' + orderName + '].productOptionsWithPrice[1].id" value="1" />' +
				'<select name="products[' + orderName + '].productOptionsWithPrice[1].value"><option value="' + orderName +
				'"></option></select><input type="hidden" name="products[' + orderName + '].productOptionsWithPrice[2].id" value="2">' +
				'<select name="products[' + orderName + '].productOptionsWithPrice[2].value"><option value="' + optionColor +
				'"></option></select><input type="hidden" name="products[' + orderName + '].productOptionsWithPrice[3].id" value="3">' +
				'<select name="products[' + orderName + '].productOptionsWithPrice[3].value"><option value="ADIS-00"></option></select>' +
				'<input name="products[' + orderName + '].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
		} else {
			var productId = 'SEP-' + optionSize + '-' + optionColor;
			html =
				'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' + productId +
				'].productNo" value="' + productId +
				'" ><input type="hidden" name="products[' + productId + '].productOptionsWithPrice[1].id" value="1"/>' +
				'<select name="products[' + productId + '].productOptionsWithPrice[1].value"><option value="ADIS-00"></option></select>' +
				'<input name="products[' + productId + '].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
		}
		$('#sep-em_selectedProductButton').html(html);
	}

	sep_emrack_selectWrite();
	$('#sep-emrack input[type="radio"],#sep-emrack select').change(function () { sep_emrack_selectWrite(); });
	$('#introductionTable td').click(function () {
		var model = String($(this).find('img').data('model'));
		$('select[name="sep-emrack_optionHeight"]').val(model.charAt(0));
		$('select[name="sep-emrack_optionWidth"]').val(model.charAt(1));
		sep_emrack_selectWrite();
	});
}

/* =========================
   デスク（sep_emdesk_select）
   ========================= */
function sep_emdesk_select() {
	if (!$('#sep-emdesk').length) return;

	function sep_emrack_selectWrite() {
		var optionWidth = $('#sep-emdesk [name=sep-emdesk_optionWidth]').val(),
			optionDepth = $('#sep-emdesk [name=sep-emdesk_optionDepth]').val(),
			optionColor = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').val(),
			optionColorName = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').data('colorname'),
			optionWidthSize, optionDepthName, optionSize, orderName, productIdNum;

		if (optionDepth == 'A') {
			optionDepthName = '浅型';
			if (optionWidth >= 60 && optionWidth <= 75) { productIdNum = '0600-0750';
			} else if (optionWidth >= 76 && optionWidth <= 99) { productIdNum = '0760-0990';
			} else if (optionWidth >= 100 && optionWidth <= 119) { productIdNum = '1000-1190';
			} else if (optionWidth >= 121 && optionWidth <= 140) { productIdNum = '1210-1400';
			} else if (optionWidth >= 141 && optionWidth <= 160) { productIdNum = '1410-1600';
			} else if (optionWidth >= 161 && optionWidth <= 192) { productIdNum = '1610-1920';
			} else if (optionWidth >= 193 && optionWidth <= 210) { productIdNum = '1930-2100'; }
		} else if (optionDepth == 'F') {
			optionDepthName = '深型';
			if (optionWidth >= 60 && optionWidth <= 75) { productIdNum = '0600-0750';
			} else if (optionWidth >= 76 && optionWidth <= 90) { productIdNum = '0760-0900';
			} else if (optionWidth >= 91 && optionWidth <= 100) { productIdNum = '0910-1000';
			} else if (optionWidth >= 101 && optionWidth <= 140) { productIdNum = '1010-1400';
			} else if (optionWidth >= 141 && optionWidth <= 160) { productIdNum = '1410-1600';
			} else if (optionWidth >= 161 && optionWidth <= 192) { productIdNum = '1610-1920';
			} else if (optionWidth >= 193 && optionWidth <= 210) { productIdNum = '1930-2100'; }
		}

		optionWidthSize = ('0000' + optionWidth * 10).slice(-4);

		var optionWidthImageRange, optionWidthRangeNum;
		if (optionWidth <= 69) { optionWidthImageRange = 60; optionWidthRangeNum = 1;
		} else if (optionWidth <= 79) { optionWidthImageRange = 70; optionWidthRangeNum = 2;
		} else if (optionWidth <= 89) { optionWidthImageRange = 80; optionWidthRangeNum = 3;
		} else if (optionWidth <= 99) { optionWidthImageRange = 90; optionWidthRangeNum = 4;
		} else if (optionWidth <= 109) { optionWidthImageRange = 100; optionWidthRangeNum = 5;
		} else if (optionWidth <= 119) { optionWidthImageRange = 110; optionWidthRangeNum = 6;
		} else if (optionWidth <= 129) { optionWidthImageRange = 120; optionWidthRangeNum = 7;
		} else if (optionWidth <= 139) { optionWidthImageRange = 130; optionWidthRangeNum = 8;
		} else if (optionWidth <= 149) { optionWidthImageRange = 140; optionWidthRangeNum = 9;
		} else if (optionWidth <= 159) { optionWidthImageRange = 150; optionWidthRangeNum = 10;
		} else if (optionWidth <= 169) { optionWidthImageRange = 160; optionWidthRangeNum = 11;
		} else if (optionWidth <= 179) { optionWidthImageRange = 170; optionWidthRangeNum = 12;
		} else if (optionWidth <= 189) { optionWidthImageRange = 180; optionWidthRangeNum = 13;
		} else if (optionWidth <= 199) { optionWidthImageRange = 190; optionWidthRangeNum = 14;
		} else if (optionWidth <= 209) { optionWidthImageRange = 200; optionWidthRangeNum = 15;
		} else if (optionWidth <= 210) { optionWidthImageRange = 210; optionWidthRangeNum = 16; }

		var productNumber, readyMadeDesk = 0;
		if (optionWidthSize == '1200') {
			productNumber = 'SEP-7512DESK' + optionDepth + '-' + optionColor; // 既製品
			readyMadeDesk = 1;
			$('#readyMadeMessage').text('お選びのサイズは既製品です。');
			$('#sep_selectedProductButton').html('<a href="/c/series/sep/' + productNumber.toLowerCase() + '">既製品のご注文はこちら</a>');
			$('#sep_selectedProductButton').css('display', 'block');
			$('#sep-em_selectedProductButton').css('display', 'none');
			$('.fs-c-productOption.unusable').css('display', 'none');
		} else {
			productNumber = 'SEP-EM' + optionWidthSize + 'DESK' + optionDepth; // セレクションSKU
			$('#readyMadeMessage').text('');
			$('#sep_selectedProductButton').css('display', 'none');
			$('#sep-em_selectedProductButton').css('display', 'block');
			$('.fs-c-productOption.unusable').css('display', 'block');
		}

		// 画像・表示
		$('#sep-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/' + optionWidthImageRange + optionDepth.toLowerCase() + '-' + optionColor.toLowerCase() + '.jpg">');
		$('#sep-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/width' + optionWidthRangeNum + '.png">');
		$('#sep-em_selectedWidth').html(optionWidth + '.0cm');
		$('#sep-em_selectedDepth').html(optionDepthName);
		$('#sep-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/sep-em/thum/sep-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
		$('#sep-em_selectedProduct').html(productNumber);

		// 価格取得＆表示 + ADIS
		if (readyMadeDesk == 1) {
			var price = get_price(productNumber);
			$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(price.product_selling_price));
			$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.product_selling_price / 100));
			$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(price.postage));
			// adis_discount_campaign_display_price(price);
		} else {
			var priceSel = get_selection_price(productNumber);
			$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(priceSel.product_selection_selling_price));
			$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(priceSel.product_selection_selling_price / 100));
			$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(priceSel.postage));
			// adis_discount_campaign_display_price_size_order(priceSel);
		}

		// カート（ADIS付き）
		var html, productId;
		if (readyMadeDesk == 1) {
			productId = 'SEP-7512DESK' + optionDepth + '-' + optionColor;
			html =
				'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
				productId + '].productNo" value="' + productId +
				'" ><input type="hidden" name="products[' + productId + '].productOptionsWithPrice[1].id" value="1"/>' +
				'<select name="products[' + productId + '].productOptionsWithPrice[1].value"><option value="ADIS-00"></option></select>' +
				'<input name="products[' + productId + '].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
		} else {
			productId = 'SEP-EMDESK' + productIdNum + optionDepth;
			orderName = 'SEP-EM' + optionWidthSize + 'DESK' + optionDepth;
			html =
				'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
				productId + '].productNo" value="' + productId +
				'"><input type="hidden" name="products[' + productId + '].productOptionsWithPrice[1].id" value="1" />' +
				'<select name="products[' + productId + '].productOptionsWithPrice[1].value"><option value="' + orderName +
				'"></option></select><input type="hidden" name="products[' + productId + '].productOptionsWithPrice[2].id" value="2">' +
				'<select name="products[' + productId + '].productOptionsWithPrice[2].value"><option value="' + optionColor +
				'"></option></select><input type="hidden" name="products[' + productId + '].productOptionsWithPrice[3].id" value="3">' +
				'<select name="products[' + productId + '].productOptionsWithPrice[3].value"><option value="ADIS-00"></option></select>' +
				'<input name="products[' + productId + '].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
		}
		$('#sep-em_selectedProductButton').html(html);
	}

	sep_emrack_selectWrite();
	$('#sep-emdesk input[type="radio"],#sep-emdesk select').change(function () { sep_emrack_selectWrite(); });
}
