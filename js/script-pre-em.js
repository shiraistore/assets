$(function () {
	pre_emfot_select();
});

$(window).on('load', function () {
	var initPhotoSwipeFromDOM = function (gallerySelector) {
		// parse slide data (url, title, size ...) from DOM elements
		// (children of gallerySelector)
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;

			for (var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes
				if (figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0]; // <a> element

				size = linkEl.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10),
				};

				if (figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML;
				}

				if (linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				}

				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function (e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);

			var eTarget = e.target || e.srcElement;

			// find root element of slide
			var clickedListItem = closest(eTarget, function (el) {
				return el.tagName && el.tagName.toUpperCase() === 'P';
			});

			if (!clickedListItem) {
				return;
			}

			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if (childNodes[i].nodeType !== 1) {
					continue;
				}

				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}

			if (index >= 0) {
				// open PhotoSwipe if valid index found
				openPhotoSwipe(index, clickedGallery);
			}
			return false;
		};

		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1),
				params = {};

			if (hash.length < 5) {
				return params;
			}

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if (!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if (pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}

			if (params.gid) {
				params.gid = parseInt(params.gid, 10);
			}

			if (!params.hasOwnProperty('pid')) {
				return params;
			}
			params.pid = parseInt(params.pid, 10);
			return params;
		};

		var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {
				index: index,

				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				// getThumbBoundsFn: function (index) {
				//     // See Options -> getThumbBoundsFn section of documentation for more info
				//     var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
				//         pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
				//         rect = thumbnail.getBoundingClientRect();

				//     return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
				// }
			};

			if (disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll(gallerySelector);

		for (var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if (hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
		}
	};

	// PhotoSwipeを起動する
	initPhotoSwipeFromDOM('#pre-em_selectedProductImageText');
});

$(window).on('resize', function () {});

$(window).on('load scroll', function () {});


function pre_emfot_select() {
	if ($('#pre-emfot').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/preSizeOrderPrice_v1_1.json', function (priceArray) {
			pre_emfot_select(priceArray);
			//selectなどの要素の中身が変更された際に処理を実行
			$('#pre-emfot select').change(function () {
				pre_emfot_select(priceArray);
			});

			function pre_emfot_select(priceArray) {
				var optionHeight = $('#pre-emfot [name=pre-emfot_optionHeight]').val(),
					optionDepth = $('#sep-emdesk [name=sep-emdesk_optionDepth]').val(),
					optionColor = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').val(),
					optionColorName = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').data('colorname'),
					optionSize,
					orderName,
					productIdNum;

				//選択された高さが〇〇cmだった場合
				if (optionHeight == '8') {					
					optionHeightName = '08';
				} else if (optionHeight == '9') {
					optionHeightName = '09';
				} else if (optionHeight == '10') {
					optionHeightName = '10';
				} else if (optionHeight == '11') {
					optionHeightName = '11';
				} else if (optionHeight == '12') {
					optionHeightName = '12';
				} else if (optionHeight == '13') {
					optionHeightName = '13';
				} else if (optionHeight == '14') {
					optionHeightName = '14';
				} else if (optionHeight == '15') {
					optionHeightName = '15';
				} else if (optionHeight == '16') {
					optionHeightName = '16';
				} else if (optionHeight == '17') {
					optionHeightName = '17';
				} else if (optionHeight == '18') {
					optionHeightName = '18';
				} else if (optionHeight == '19') {
					optionHeightName = '19';
				} else if (optionHeight == '20') {
					optionHeightName = '20';
				} else if (optionHeight == '21') {
					optionHeightName = '21';
				} else if (optionHeight == '22') {
					optionHeightName = '22';
				} else if (optionHeight == '23') {
					optionHeightName = '23';
				} else if (optionHeight == '24') {
					optionHeightName = '24';
				} else if (optionHeight == '25') {
					optionHeightName = '25';
				} else if (optionHeight == '26') {
					optionHeightName = '26';
				} else if (optionHeight == '27') {
					optionHeightName = '27';
				} else if (optionHeight == '28') {
					optionHeightName = '28';
				} else if (optionHeight == '29') {
					optionHeightName = '29';
				} else if (optionHeight == '30') {
					optionHeightName = '30';
				};

				console.log(optionHeightName);

				//console.log(productIdNum);

				//optionWidthSize = ('0000' + optionWidth * 10).slice(-4);

				console.log(productNumber);
				var price = priceArray.find((v) => v.productNumber === productNumber);

				console.log(price);

				//JSON内の型番
				var productNumber;
				productNumber = 'PRE-EM' + optionHeightName + 'FOT';
				$('#readyMadeMessage').text('');
				$('#pre_selectedProductButton').css('display', 'none');
				$('#pre-em_selectedProductButton').css('display', 'block');
				$('.fs-c-productOption.unusable').css('display', 'block');

				console.log(productNumber);
				//console.log(optionWidthRangeNum);

				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				// 商品画像の切替
				$('#pre-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/pre-em/PRE-EM' + optionHeightName + 'FOT.jpg">');
				
				//$('#sep-em_selectedProductDepthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/' + 'depth' + optionDepth + '.png">');

				// 寸法画像の切替
				$('#pre-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/pre-em/pre-emfot_height' + optionHeightName + '.png">');

				$('#pre-em_selectedHeight').html(optionHeight + 'cm');

				//$('#sep-em_selectedDepth').html(optionDepthName);
				// $('#sep-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/sep-em/thum/sep-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');

				$('#pre-em_selectedProduct').html(productNumber);
				$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

				var html;

				//カート部分の切替
				var productId;
					var productId = 'PRE-EMFOT';
					console.log(productId);
					orderName = 'PRE-EM' + optionHeightName + 'FOT';
					console.log(orderName);
					html =
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

				console.log(html);

				$('#pre-em_selectedProductButton').html(html);
			}
		});
	}
}