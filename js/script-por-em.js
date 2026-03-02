$(function () {
	por_emdu_select();
	displayEstimatedDeliveryDate();
});

$(window).on('load', function () {
	var initPhotoSwipeFromDOM = function (gallerySelector) {
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl, linkEl, size, item;

			for (var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i];
				if (figureEl.nodeType !== 1) continue;

				linkEl = figureEl.children[0];
				size = linkEl.getAttribute('data-size').split('x');

				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10),
				};

				if (figureEl.children.length > 1) item.title = figureEl.children[1].innerHTML;
				if (linkEl.children.length > 0) item.msrc = linkEl.children[0].getAttribute('src');

				item.el = figureEl;
				items.push(item);
			}
			return items;
		};

		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};

		var onThumbnailsClick = function (e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);

			var eTarget = e.target || e.srcElement;

			var clickedListItem = closest(eTarget, function (el) {
				return el.tagName && el.tagName.toUpperCase() === 'P';
			});

			if (!clickedListItem) return;

			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if (childNodes[i].nodeType !== 1) continue;
				if (childNodes[i] === clickedListItem) { index = nodeIndex; break; }
				nodeIndex++;
			}

			if (index >= 0) openPhotoSwipe(index, clickedGallery);
			return false;
		};

		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1), params = {};
			if (hash.length < 5) return params;

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if (!vars[i]) continue;
				var pair = vars[i].split('=');
				if (pair.length < 2) continue;
				params[pair[0]] = pair[1];
			}

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
		for (var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		var hashData = photoswipeParseHash();
		if (hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
		}
	};

	// PhotoSwipeを起動する
	initPhotoSwipeFromDOM('#por-em_selectedProductImageText');
});

$(window).on('resize', function () {});
$(window).on('load scroll', function () {});

/* ====== 簡易キャッシュ ====== */
var __por_emdu_price_cache = {}; // key: "product:SKU" / "selection:SKU"
function _cacheGet(key) { return __por_emdu_price_cache[key]; }
function _cacheSet(key, val) { __por_emdu_price_cache[key] = val; }

/* ====== ユーティリティ ====== */
function formatNumberWithComma(number) {
	return Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function toNumberSafe(v) {
	var n = Number(v);
	return isFinite(n) && !isNaN(n) ? n : 0;
}
// ADISキャンペーン挿入先を賢く探す（なければ価格ボックス直後）
function insertAdisHtml(adisSaleHtml) {
	$('#adisSale').remove();
	var $targets = $(
		'select[name="por_em_optionADIS"],select[name="por_emu_optionADIS"],' +
		'select[name="tnl_em_optionADIS"],select[name="tnl_emu_optionADIS"]'
	);
	if ($targets.length) {
		$targets.eq(0).closest('.selectBlock').prev('h2').after(adisSaleHtml);
	} else if ($('#por-em_selectedProductButton').length) {
		$('#por-em_selectedProductButton').before(adisSaleHtml);
	} else if ($('#productPriceBox').length) {
		$('#productPriceBox').after(adisSaleHtml);
	} else {
		$('body').append(adisSaleHtml);
	}
}

/* ====== ADIS割引表示（既製品） ====== */
function adis_discount_campaign_display_price(price) {
	let adisSaleHtml = '';
	let is_adisSale = 0;

	let n1 = toNumberSafe(price.adis01_normal_price);
	let s1 = toNumberSafe(price.adis01_selling_price);
	let n2 = toNumberSafe(price.adis02_normal_price);
	let s2 = toNumberSafe(price.adis02_selling_price);

	if (n1 > 0 && s1 > 0 && n1 > s1) {
		adisSaleHtml += `<li>組立済+玄関渡し：¥<span style="text-decoration:line-through">${formatNumberWithComma(n1)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s1)}</span><span class="differencePrice">¥${formatNumberWithComma(n1 - s1)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (n2 > 0 && s2 > 0 && n2 > s2) {
		adisSaleHtml += `<li>組立済+搬入：¥<span style="text-decoration:line-through">${formatNumberWithComma(n2)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s2)}</span><span class="differencePrice">¥${formatNumberWithComma(n2 - s2)} OFF</span></li>`;
		is_adisSale = 1;
	}

	if (is_adisSale == 1) {
		adisSaleHtml = `<div id="adisSale"><h4>組立サービス割引キャンペーン</h4><ul>${adisSaleHtml}</ul></div>`;
		insertAdisHtml(adisSaleHtml);
	} else {
		$('#adisSale').remove();
	}
}

/* ====== ADIS割引表示（サイズオーダー） ====== */
function adis_discount_campaign_display_price_size_order(price) {
	let adisSaleHtml = '';
	let is_adisSale = 0;

	let n1 = toNumberSafe(price.adis01_selection_normal_price);
	let s1 = toNumberSafe(price.adis01_selection_selling_price);
	let n2 = toNumberSafe(price.adis02_selection_normal_price);
	let s2 = toNumberSafe(price.adis02_selection_selling_price);

	if (n1 > 0 && s1 > 0 && n1 > s1) {
		adisSaleHtml += `<li>組立済+玄関渡し：¥<span style="text-decoration:line-through">${formatNumberWithComma(n1)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s1)}</span><span class="differencePrice">¥${formatNumberWithComma(n1 - s1)} OFF</span></li>`;
		is_adisSale = 1;
	}
	if (n2 > 0 && s2 > 0 && n2 > s2) {
		adisSaleHtml += `<li>組立済+搬入：¥<span style="text-decoration:line-through">${formatNumberWithComma(n2)}</span> → <span class="adisSalePrice">¥${formatNumberWithComma(s2)}</span><span class="differencePrice">¥${formatNumberWithComma(n2 - s2)} OFF</span></li>`;
		is_adisSale = 1;
	}

	if (is_adisSale == 1) {
		adisSaleHtml = `<div id="adisSale"><h4>組立サービス割引キャンペーン</h4><ul>${adisSaleHtml}</ul></div>`;
		insertAdisHtml(adisSaleHtml);
	} else {
		$('#adisSale').remove();
	}
}

/* ====== API（既製品） ======
   期待レスポンス:
   {
     product_selling_price, postage,
     adis01_normal_price, adis01_selling_price,
     adis02_normal_price, adis02_selling_price
   } */
function get_price(sku_no) {
	var cacheKey = 'product:' + sku_no;
	var cached = _cacheGet(cacheKey);
	if (cached) return cached;

	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_prices';
	var params = { sku_no: sku_no };
	try {
		var responseText = $.ajax({
			type: 'post',
			url: url,
			async: false, // 既存仕様踏襲
			data: JSON.stringify(params),
			contentType: 'application/json',
			dataType: 'json',
			scriptCharset: 'utf-8'
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
		return {
			sku_no: sku_no, product_selling_price: 0, postage: 0,
			adis01_normal_price: 0, adis01_selling_price: 0,
			adis02_normal_price: 0, adis02_selling_price: 0
		};
	}
}

/* ====== API（サイズオーダー） ======
   期待レスポンス（例）:
   {
     selection_sku_no,
     product_selection_selling_price, product_selection_normal_price, postage,
     adis01_selection_normal_price, adis01_selection_selling_price,
     adis02_selection_normal_price, adis02_selection_selling_price
   } */
function get_selection_price(selection_sku_no) {
	var cacheKey = 'selection:' + selection_sku_no;
	var cached = _cacheGet(cacheKey);
	if (cached) return cached;

	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_size_order_made_prices';
	var params = { selection_sku_no: selection_sku_no };
	try {
		var responseText = $.ajax({
			type: 'post',
			url: url,
			async: false, // 既存仕様踏襲
			data: JSON.stringify(params),
			contentType: 'application/json',
			dataType: 'json',
			scriptCharset: 'utf-8'
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
		return {
			selection_sku_no: selection_sku_no,
			product_selection_selling_price: 0,
			product_selection_normal_price: 0,
			postage: 0,
			adis01_selection_normal_price: 0,
			adis01_selection_selling_price: 0,
			adis02_selection_normal_price: 0,
			adis02_selection_selling_price: 0
		};
	}
}

function por_emdu_select() {
	if ($('#por-emdu').length) {
		por_emdu_select_write();
		$('#por-emdu input[type="radio"], #por-emdu select').change(function () {
			por_emdu_select_write();
		});

		function por_emdu_select_write() {
			var optionWidth = $('#por-emdu [name=por-emdu_optionWidth]').val(),
				optionHeight = $('#por-emdu [name=por-emdu_optionHeight]').val(),
				optionColor = $('#por-emdu [name=por-emdu_optionColor]:checked').val(),
				optionColorName = $('#por-emdu [name=por-emdu_optionColor]:checked').data('colorname'),
				orderName;

			var widthMap  = { '30': '30', '60': '60', '120': '12', '150': '15' };
			var heightMap = { '40': '40', '45': '45', '50': '50', '55': '55', '60': '60', '65': '65', '70': '70' };

			var optionWidthNum  = widthMap[optionWidth];
			var optionHeightNum = heightMap[optionHeight];

			// 型番決定
			var productNumber, isReadyMade = (optionHeight == '55');
			if (isReadyMade) {
				productNumber = 'POR-55' + optionWidthNum + 'DU-' + optionColor; // 既製品SKU
				$('#readyMadeMessage').text('お選びのサイズは既製品です。');
				$('#por_selectedProductButton').html('<a href="/c/series/por/' + productNumber.toLowerCase() + '">既製品のご注文はこちら</a>');
				$('#por_selectedProductButton').css('display', 'block');
				$('#por-em_selectedProductButton').css('display', 'none');
				$('.fs-c-productOption.unusable').css('display', 'none');
			} else {
				productNumber = 'POR-EM' + optionHeightNum + optionWidthNum + 'DU'; // サイズオーダーSKU
				$('#readyMadeMessage').text('');
				$('#por_selectedProductButton').css('display', 'none');
				$('#por-em_selectedProductButton').css('display', 'block');
				$('.fs-c-productOption.unusable').css('display', 'block');
			}

			// 画像など表示
			if (isReadyMade) {
				$('#por-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/por-em/POR-55' + optionWidthNum + 'DU-' + optionColor + '.jpg">');
			} else {
				$('#por-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/por-em/POR-EM' + optionHeight + optionWidthNum + 'DU-' + optionColor + '.jpg">');
			}
			$('#por-em_selectedProductHeightImage').html('<img src="/assets/img/product/sizeOrder/por-em/por-emdu_height' + optionHeightNum + '.png">');
			$('#por-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/por-em/por-emdu_width' + optionWidthNum + '.png">');

			if (optionHeight == '40') $('#por-em_selectedHeight').html('40~50cm');
			else if (optionHeight == '45') $('#por-em_selectedHeight').html('45~55cm');
			else if (optionHeight == '50') $('#por-em_selectedHeight').html('50~60cm');
			else if (optionHeight == '55') $('#por-em_selectedHeight').html('55~65cm');
			else if (optionHeight == '60') $('#por-em_selectedHeight').html('60~70cm');
			else if (optionHeight == '65') $('#por-em_selectedHeight').html('65~75cm');
			else if (optionHeight == '70') $('#por-em_selectedHeight').html('70~80cm');

			$('#por-em_selectedWidth').html(optionWidth + 'cm');
			$('#por-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/por-em/por-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
			$('#por-em_selectedProduct').html(productNumber);

			// 価格取得＆表示 + ADISキャンペーン
			if (isReadyMade) {
				var price = get_price(productNumber); // 既製品
				$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(price.product_selling_price));
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.product_selling_price / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(price.postage));
				// adis_discount_campaign_display_price(price);
			} else {
				var priceSel = get_selection_price(productNumber); // サイズオーダー
				$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(priceSel.product_selection_selling_price));
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(priceSel.product_selection_selling_price / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(priceSel.postage));
				// adis_discount_campaign_display_price_size_order(priceSel);
			}

			// カートHTML（ADIS項目を復活）
			var html, productId;
			if (isReadyMade) {
				productId = 'POR-55' + optionWidthNum + 'DU-' + optionColor;
				html =
					'<form action="/p/cart/add" method="post">' +
					'<input type="hidden" name="products[' + productId + '].productNo" value="' + productId + '">' +
					// ADIS（既製品は最初のオプションIDが 1 としてADISを付与していた仕様を踏襲）
					'<input type="hidden" name="products[' + productId + '].productOptionsWithPrice[1].id" value="1"/>' +
					'<select name="products[' + productId + '].productOptionsWithPrice[1].value"><option value="ADIS-00"></option></select>' +
					'<input name="products[' + productId + '].quantity" type="text" value="1" size="5">' +
					'<button type="submit">カートに入れる</button></form>';
				// 既製品はリンクボタンを優先表示しているため、ここでのフォームは必要に応じて使用
				// $('#por-em_selectedProductButton').html(html);
			} else {
				// サイズオーダー
				var orderName = 'POR-EM' + optionHeight + optionWidthNum + 'DU';
				if (optionWidth == '30') optionWidthNum = '030';
				else if (optionWidth == '60') optionWidthNum = '060';
				else if (optionWidth == '120') optionWidthNum = '120';
				else if (optionWidth == '150') optionWidthNum = '150';

				productId = 'POR-EMDU' + optionWidthNum + '0' + optionHeight;
				html =
					'<form action="/p/cart/add" method="post">' +
					'<input type="hidden" name="products[' + productId + '].productNo" value="' + productId + '">' +
					// 1: 本体選択, 2: カラー, 3: ADIS（既存仕様を踏襲）
					'<input type="hidden" name="products[' + productId + '].productOptionsWithPrice[1].id" value="1" />' +
					'<select name="products[' + productId + '].productOptionsWithPrice[1].value"><option value="' + orderName + '"></option></select>' +
					'<input type="hidden" name="products[' + productId + '].productOptionsWithPrice[2].id" value="2">' +
					'<select name="products[' + productId + '].productOptionsWithPrice[2].value"><option value="' + optionColor + '"></option></select>' +
					'<input type="hidden" name="products[' + productId + '].productOptionsWithPrice[3].id" value="3">' +
					'<select name="products[' + productId + '].productOptionsWithPrice[3].value"><option value="ADIS-00"></option></select>' +
					'<input name="products[' + productId + '].quantity" type="text" value="1" size="1">' +
					'<button type="submit">カートに入れる</button></form>';
				$('#por-em_selectedProductButton').html(html);
			}

			// 内寸表示
			var innerWidth, innerHeight, innerDepth = '37.9';
			if (optionHeight == '40') innerHeight = '30.4';
			else if (optionHeight == '45') innerHeight = '35.4';
			else if (optionHeight == '50') innerHeight = '40.4';
			else if (optionHeight == '55') innerHeight = '45.4';
			else if (optionHeight == '60') innerHeight = '50.4';
			else if (optionHeight == '65') innerHeight = '55.4';
			else if (optionHeight == '70') innerHeight = '60.4';

			var innerSizeHTML = '';
			if (optionWidth == '30') {
				innerWidth = '26.5';
				innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
			} else if (optionWidth == '60') {
				innerWidth = '56.5';
				innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
			} else if (optionWidth == '120') {
				innerWidth = '56.5';
				innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
			} else if (optionWidth == '150') {
				innerWidth = '71.4';
				innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
			}
			$('#por_em_selectedProduct-innerSize').html(innerSizeHTML);
		}
	}
}

/* displayEstimatedDeliveryDate
// 郵便番号と組立オプションから最短お届け予定日を計算・表示する関数
========================================================================== */
function displayEstimatedDeliveryDate() {
	// 商品詳細ページ、またはフリーページ（サイズオーダー）以外では実行しない
	if (!($('#fs_ProductDetails').length || $('#fs_CustomPage').length)) return;
	if ($('#estimatedDeliveryBox').length > 0) return;

	// UIの挿入（郵便番号のみ）
	const uiHtml = `
	<dl class="fs-c-productOption" id="estimatedDeliveryBox" style="display: flex !important; flex-wrap: wrap;">
		<dt class="fs-c-productOption__name">
			<label class="fs-c-productOption__label">最短お届け予定日 <span style="font-size: 12px; font-weight: normal; color: #666;">(目安)</span></label>
		</dt>
		<dd style="width: 100%;">
			<div style="margin-bottom: 8px;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="font-size: 14px; font-weight: bold; color: #333;">〒</span>
					<input type="text" id="zipInput" placeholder="例: 123-4567" style="padding: 6px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; width: 140px;">
					<button type="button" id="zipCalcBtn" style="padding: 6px 12px; font-size: 14px; border: 1px solid #ccc; background: #eee; border-radius: 4px; cursor: pointer;">予定日を確認</button>
				</div>
				<p id="zipErrorMsg" style="color: #d9534f; font-size: 12px; margin: 4px 0 0; display: none;"></p>
			</div>

			<div style="margin-bottom: 8px; font-size: 14px; color: #333;">
				予定日: <strong id="estimatedDeliveryDate" style="color: #e87909; font-size: 18px;">---</strong>
			</div>
			<div>
				<p id="remoteIslandCaution" style="display: none; margin: 0 0 4px 0; font-size: 12px; color: #d9534f; line-height: 1.4; text-align: left;">
					※沖縄・離島は組立サービス対象外のため表示できません。
				</p>
				<p style="margin: 0; font-size: 12px; color: #777; line-height: 1.4; text-align: left;">
					※実際の詳細な住所により変動する場合がございます。<br>
					※正確なお届け予定日はご注文手続き画面にてご確認ください。
				</p>
			</div>
		</dd>
	</dl>
	`;
	$('.fs-c-productPostage').after(uiHtml);

	// localStorageから復元
	const savedZip = localStorage.getItem('shirai_input_zip') || "";
	$('#zipInput').val(savedZip);

	// 郵便番号の正規化 (全角数字を半角に、ハイフン・スペースを削除)
	function normalizeZipCode(zip) {
		let normalized = zip.replace(/[０-９]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		normalized = normalized.replace(/[-－ー\s]/g, '');
		return normalized;
	}

	// キャッシュ用変数
	let operationHolyDay = [];
	let factoryHolyDay = [];
	let isHolydayLoaded = false;

	// 休日データの取得
	async function loadHolydayAsync() {
		if (isHolydayLoaded) return;
		try {
			const response = await fetch('https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_add_data_v2', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items: 'holyday' })
			});
			if (!response.ok) throw new Error('Holyday API Error');
			const res = await response.json();
			let data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
			operationHolyDay = Array.isArray(data.operation) ? data.operation : [];
			factoryHolyDay = Array.isArray(data.factory) ? data.factory : [];
			isHolydayLoaded = true;
		} catch (e) {
			console.error(e);
			isHolydayLoaded = true;
		}
	}

	// 配送情報の取得
	async function fetchZipCodeDeliveryInfo(zipCode) {
		try {
			const response = await fetch('https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_zip_code_delivery/20260201', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ zip_code: zipCode })
			});
			if (!response.ok) throw new Error('ZipCode API Error');
			return await response.json();
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	// 休業日をスキップしながらリードタイム日数を進める
	function consumeLeadTime(dateArray, leadTime, holyDays) {
		for (let i = 0; i < leadTime; i++) {
			if ($.inArray(dateArray[i], holyDays) > -1) {
				dateArray[i] = ''; 
				leadTime++;
			} else {
				dateArray[i] = '';
			}
		}
		return dateArray.filter(Boolean);
	}

	// 商品状態・オプション状態の取得
	function getOptionCode() {
		const productName = $('.fs-c-productNameHeading__name').length > 0 ? $('.fs-c-productNameHeading__name').text() : $('h1').text();
		const currentUrl = window.location.pathname;
		
		// 商品名に「受注生産」「サイズオーダー」が含まれるか、またはURLに特定のシリーズコードが含まれるか
		const isSizeOrder = /(サイズオーダー|受注生産)/.test(productName) || /(tnl-em|sep-em|pre-em|por-em)/.test(currentUrl);

		let isAssemblyGenkan = false;
		let isAssemblyHannyu = false;
		
		// 商品詳細ページのプルダウン、またはサイズオーダーページのプルダウンの両方に対応
		const $assemblySelect = $('select[name^="productOptionsWithPrice"] option:selected, select[name$="_optionADIS"] option:selected');
		if ($assemblySelect.length > 0) {
			$assemblySelect.each(function() {
				const optText = $(this).text();
				if (optText.includes('組立済+玄関渡し')) isAssemblyGenkan = true;
				if (optText.includes('組立済+搬入')) isAssemblyHannyu = true;
			});
		}

		if (isSizeOrder) {
			if (isAssemblyGenkan) return 21;
			if (isAssemblyHannyu) return 22;
			return 20; // オーダー品 + オプションなし
		} else {
			if (isAssemblyGenkan) return 11;
			if (isAssemblyHannyu) return 12;
			return 10; // 通常品 + オプションなし
		}
	}

	// 再計算＆描画
	async function updateEstimatedDelivery() {
		const $dateDisplay = $('#estimatedDeliveryDate');
		const $caution = $('#remoteIslandCaution');
		const $zipError = $('#zipErrorMsg');
		
		$caution.hide();
		$zipError.hide();

		const rawZip = $('#zipInput').val();
		if (!rawZip) {
			$dateDisplay.text('---');
			return;
		}

		localStorage.setItem('shirai_input_zip', rawZip);
		
		const normalizedZip = normalizeZipCode(rawZip);
		if (!normalizedZip) {
			$dateDisplay.text('---');
			return;
		}
		
		// 7桁の数字チェック
		if (!/^\d{7}$/.test(normalizedZip)) {
			$zipError.text('郵便番号はハイフンなしの7桁の数字で入力してください。').show();
			$dateDisplay.text('---');
			return;
		}

		$dateDisplay.text('計算中...');

		const [_, zipCodeInfo] = await Promise.all([
			loadHolydayAsync(),
			fetchZipCodeDeliveryInfo(normalizedZip)
		]);

		// DBに郵便番号が存在しない場合などのエラーハンドリング
		if (!zipCodeInfo || typeof zipCodeInfo.sgw_prefectures_delivery_lead_time === 'undefined') {
			$zipError.text('入力された郵便番号の配送情報が見つかりません。').show();
			$dateDisplay.text('算出できませんでした');
			return;
		}

		const optionCode = getOptionCode();

		// 沖縄県(郵便番号が90から始まる)・離島での組立サービス利用不可判定
		const isOkinawa = normalizedZip.startsWith('90');
		const isAssemblySelected = [11, 12, 21, 22].includes(optionCode);
		if ((isOkinawa || zipCodeInfo.is_remote_island == 1) && isAssemblySelected) {
			$dateDisplay.text('組立サービス利用不可');
			$caution.show();
			return;
		}
		
		// クライアントの環境に依存せず、強制的に日本時間(JST)の現在時刻を起点とする
		const now = new Date();
		const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
		const jstTime = new Date(utc + (9 * 60 * 60 * 1000));

		// FutureShopのプルダウンと同じ構造にするため、先頭にダミー要素 'none' を追加
		let arrivalDateArray = ['none']; 
		for (let i = 1; i <= 60; i++) {
			let d = new Date(jstTime);
			d.setDate(jstTime.getDate() + i);
			let yyyy = d.getFullYear();
			let mm = String(d.getMonth() + 1).padStart(2, '0');
			let dd = String(d.getDate()).padStart(2, '0');
			arrivalDateArray.push(`${yyyy}-${mm}-${dd}`);
		}

		// 注文手続き画面(script-se.js)と完全に同期させるため、SGWの場合でも yhc_additional_delivery_lead_time を加算する
		const sgwLeadTime = Number(zipCodeInfo.sgw_prefectures_delivery_lead_time || 1) + Number(zipCodeInfo.yhc_additional_delivery_lead_time || 0);
		const yhcBaseLeadTime = zipCodeInfo.yhc_prefectures_delivery_lead_time !== undefined ? Number(zipCodeInfo.yhc_prefectures_delivery_lead_time) : Number(zipCodeInfo.sgw_prefectures_delivery_lead_time || 1);
		const yhcLeadTime = yhcBaseLeadTime + Number(zipCodeInfo.yhc_additional_delivery_lead_time || 0);

		let deliveryLeadTime = 0;

		// リードタイム消化ロジック
		if (optionCode === 10) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 2, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = sgwLeadTime;
		} else if (optionCode === 11) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 5, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = sgwLeadTime;
		} else if (optionCode === 12) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 5, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = yhcLeadTime;
		} else if (optionCode === 20) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 5, factoryHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = sgwLeadTime;
		} else if (optionCode === 21) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 5, factoryHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 2, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = sgwLeadTime;
		} else if (optionCode === 22) { 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 5, factoryHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 2, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			arrivalDateArray = consumeLeadTime(arrivalDateArray, 1, operationHolyDay); 
			deliveryLeadTime = yhcLeadTime;
		}

		// 配送のリードタイム分を無条件に削る
		arrivalDateArray.splice(0, deliveryLeadTime);

		// YHC (組立済+搬入) の場合の曜日・年末年始除外処理
		if (optionCode === 12 || optionCode === 22) {
			const unavailableDaysStr = zipCodeInfo.yhc_delivery_unavailable_days || "";
			const dayMap = { "日":0, "月":1, "火":2, "水":3, "木":4, "金":5, "土":6 };
			const unavailableSet = {};
			unavailableDaysStr.split("").forEach(ch => {
				if (dayMap.hasOwnProperty(ch)) unavailableSet[dayMap[ch]] = true;
			});

			const blockedMonthDays = ["12-30","12-31","01-01","01-02","01-03"];

			arrivalDateArray = arrivalDateArray.filter(dateStr => {
				const parts = dateStr.split("-");
				// JSTとしてパースして曜日を確実にとる
				const d = new Date(`${parts[0]}-${parts[1]}-${parts[2]}T00:00:00+09:00`);
				if (unavailableSet[d.getDay()]) return false; 
				
				const monthDay = parts[1] + "-" + parts[2];
				if (blockedMonthDays.includes(monthDay)) return false;

				return true;
			});
		}

		// 最終表示
		if (arrivalDateArray.length > 0) {
			const resultDateStr = arrivalDateArray[0];
			const parts = resultDateStr.split('-');
			const dObj = new Date(`${parts[0]}-${parts[1]}-${parts[2]}T00:00:00+09:00`);
			const dayStr = ['日', '月', '火', '水', '木', '金', '土'][dObj.getDay()];
			$dateDisplay.text(`${parts[0]}年${parts[1]}月${parts[2]}日(${dayStr}) 以降`);
		} else {
			$dateDisplay.text('算出できませんでした');
		}
	}

	// ===== イベントリスナーの登録 =====

	// オプション（組立サービスなど）変更時 (商品詳細ページ / サイズオーダーページ両対応)
	$(document).on('change', 'select[name^="productOptionsWithPrice"], select[name$="_optionADIS"]', updateEstimatedDelivery);

	// 郵便番号 計算ボタンクリック時
	$('#zipCalcBtn').on('click', updateEstimatedDelivery);

	// 郵便番号 Enterキー押下時
	$('#zipInput').on('keypress', function(e) {
		if (e.which === 13) {
			e.preventDefault(); 
			updateEstimatedDelivery();
		}
	});

	// 初期描画処理 (郵便番号が保存されていれば計算)
	if ($('#zipInput').val()) {
		updateEstimatedDelivery();
	}
}
