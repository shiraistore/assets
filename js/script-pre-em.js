$(function () {
	pre_emfot_select();
});

$(window).on('load', function () {
	var initPhotoSwipeFromDOM = function (gallerySelector) {
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;

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
				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}

			if (index >= 0) openPhotoSwipe(index, clickedGallery);
			return false;
		};

		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1),
				params = {};
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
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			options = {
				index: index,
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			};

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

	// PhotoSwipeを起動する（既存）
	initPhotoSwipeFromDOM('#pre-em_selectedProductImageText');
});

function pre_emfot_select() {
	if ($('#pre-emfot').length) {
		// 初回とセレクト変更時に価格を書き換える
		pre_emfot_select_write();
		$('#pre-emfot select').change(function () {
			pre_emfot_select_write();
		});

		function pre_emfot_select_write() {
			var optionHeight = $('#pre-emfot [name=pre-emfot_optionHeight]').val(),
				optionDepth = $('#sep-emdesk [name=sep-emdesk_optionDepth]').val(), // 既存のまま（未使用）
				optionColor = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').val(), // 既存のまま（未使用）
				optionColorName = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').data('colorname'), // 既存のまま（未使用）
				optionHeightName,
				orderName,
				productIdNum;

			// 高さコード（既存の分岐を踏襲）
			if (optionHeight == '8') optionHeightName = '08';
			else if (optionHeight == '9') optionHeightName = '09';
			else if (optionHeight == '10') optionHeightName = '10';
			else if (optionHeight == '11') optionHeightName = '11';
			else if (optionHeight == '12') optionHeightName = '12';
			else if (optionHeight == '13') optionHeightName = '13';
			else if (optionHeight == '14') optionHeightName = '14';
			else if (optionHeight == '15') optionHeightName = '15';
			else if (optionHeight == '16') optionHeightName = '16';
			else if (optionHeight == '17') optionHeightName = '17';
			else if (optionHeight == '18') optionHeightName = '18';
			else if (optionHeight == '19') optionHeightName = '19';
			else if (optionHeight == '20') optionHeightName = '20';
			else if (optionHeight == '21') optionHeightName = '21';
			else if (optionHeight == '22') optionHeightName = '22';
			else if (optionHeight == '23') optionHeightName = '23';
			else if (optionHeight == '24') optionHeightName = '24';
			else if (optionHeight == '25') optionHeightName = '25';
			else if (optionHeight == '26') optionHeightName = '26';
			else if (optionHeight == '27') optionHeightName = '27';
			else if (optionHeight == '28') optionHeightName = '28';
			else if (optionHeight == '29') optionHeightName = '29';
			else if (optionHeight == '30') optionHeightName = '30';

			// 型番生成
			var productNumber = 'PRE-EM' + optionHeightName + 'FOT';

			// 価格をAPIから取得（参考JSの関数を使用）
			var price = get_selection_price(productNumber);

			// 表示の初期化（既存踏襲）
			$('#readyMadeMessage').text('');
			$('#pre_selectedProductButton').css('display', 'none');
			$('#pre-em_selectedProductButton').css('display', 'block');
			$('.fs-c-productOption.unusable').css('display', 'block');

			// 商品画像の切替（既存踏襲）
			$('#pre-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/pre-em/PRE-EM' + optionHeightName + 'FOT.jpg">');
			$('#pre-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/pre-em/pre-emfot_height' + optionHeightName + '.png">');
			$('#pre-em_selectedHeight').html(optionHeight + 'cm');

			// 型番表示
			$('#pre-em_selectedProduct').html(productNumber);

			// 価格・ポイント・送料の表示更新（APIレスポンスに合わせて差し替え）
			$('#productPriceBox .fs-c-price__value').text(formatNumberWithComma(Number(price.product_selection_selling_price)));
			$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(Number(price.product_selection_selling_price) / 100));
			$('.fs-c-productPostage .fs-c-price__value').text(formatNumberWithComma(Number(price.postage)));

			// カート部分の切替（既存踏襲）
			var productId = 'PRE-EMFOT';
			orderName = productNumber;
			var html =
				'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
				productId +
				'].productNo" value="' +
				productId +
				'"><input type="hidden" name="products[' +
				productId +
				'].productOptionsWithPrice[1].id" value="1"><select name="products[' +
				productId +
				'].productOptionsWithPrice[1].value"><option value="' +
				orderName +
				'"></option></select><input name="products[' +
				productId +
				'].quantity" type="text" value="1" size="1"><button type="submit">カートに入れる</button></form>';

			$('#pre-em_selectedProductButton').html(html);
		}
	}
}

/* ===== ここから参考JS流用の共通関数（最小限） ===== */
function get_selection_price(sku_no) {
	// APIへ {"selection_sku_no":"PRE-EM08FOT"} の形式でPOST
	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_size_order_made_prices';
	var params = { selection_sku_no: sku_no };
	var response = $.ajax({
		type: 'post',
		url: url,
		async: false,
		data: JSON.stringify(params),
		contentType: 'application/json',
		dataType: 'json',
		scriptCharset: 'utf-8',
		success: function (response) {},
		error: function (response) {}
	}).responseText;
	var price = JSON.parse(response);
	// 割引表示は呼び出し側で行う
	return price;
}

function formatNumberWithComma(number) {
	return Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
