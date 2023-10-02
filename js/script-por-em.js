$(function () {
	por_emdu_select();
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
	initPhotoSwipeFromDOM('#por-em_selectedProductImageText');
});

$(window).on('resize', function () {});

$(window).on('load scroll', function () {});


function por_emdu_select() {
	if ($('#por-emdu').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/porSizeOrderPrice_v1_1.json', function (priceArray) {
			por_emdu_select(priceArray);
			$('#por-emdu input[type="radio"], #por-emdu select').change(function () {
				por_emdu_select(priceArray);
			});

			function por_emdu_select(priceArray) {
				var optionWidth = $('#por-emdu [name=por-emdu_optionWidth]').val(),
					optionHeight = $('#por-emdu [name=por-emdu_optionHeight]').val(),
					optionColor = $('#por-emdu [name=por-emdu_optionColor]:checked').val(),
					optionColorName = $('#por-emdu [name=por-emdu_optionColor]:checked').data('colorname'),
					orderName

				//console.log(productIdNum);

				//optionWidthSize = ('0000' + optionWidth * 10).slice(-4);

				var widthMap = {
                    '30': '30',
                    '60': '60',
                    '120': '12',
                    '150': '15'
                };

				var heightMap = {
                    '40': '40',
                    '45': '45',
                    '50': '50',
                    '55': '55',
                    '60': '60',
                    '65': '65',
                    '70': '70'
                };

                var optionWidthNum = widthMap[optionWidth];
                var optionHeightNum = heightMap[optionHeight];

				//console.log(productNumber);
				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				//JSON内の型番
				var productNumber;

				if (optionHeight == '55') {
					productNumber = 'POR-55' + optionWidthNum + 'DU-' + optionColor;
					//console.log(productNumber);
					$('#readyMadeMessage').text('お選びのサイズは既製品です。');
					$('#por_selectedProductButton').html('<a href="/c/series/por/' + productNumber.toLowerCase() + '">既製品のご注文はこちら</a>');
					$('#por_selectedProductButton').css('display', 'block');
					$('#por-em_selectedProductButton').css('display', 'none');
					$('.fs-c-productOption.unusable').css('display', 'none');
				} else {
					productNumber = 'POR-EM' + optionHeightNum + optionWidthNum  + 'DU';
					$('#readyMadeMessage').text('');
					$('#por_selectedProductButton').css('display', 'none');
					$('#por-em_selectedProductButton').css('display', 'block');
					$('.fs-c-productOption.unusable').css('display', 'block');
				}

				//console.log(productNumber);

				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				

				if (optionHeight == '55') {
					$('#por-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/por-em/POR-55' + optionWidthNum + 'DU-' + optionColor + '.jpg">');
				} else {
					$('#por-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/por-em/POR-EM'  + optionHeight + optionWidthNum + 'DU-' + optionColor + '.jpg">');
				};

				$('#por-em_selectedProductHeightImage').html('<img src="/assets/img/product/sizeOrder/por-em/por-emdu_height' + optionHeightNum + '.png">');
				$('#por-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/por-em/por-emdu_width' + optionWidthNum + '.png">');

				if (optionHeight == '40') {
					$('#por-em_selectedHeight').html('40~50cm');
				} else if(optionHeight == '45'){
					$('#por-em_selectedHeight').html('45~55cm');
				} else if(optionHeight == '50'){
					$('#por-em_selectedHeight').html('50~60cm');
				} else if(optionHeight == '55'){
					$('#por-em_selectedHeight').html('55~65cm');
				} else if(optionHeight == '60'){
					$('#por-em_selectedHeight').html('60~70cm');
				} else if(optionHeight == '65'){
					$('#por-em_selectedHeight').html('65~75cm');
				} else if(optionHeight == '70'){
					$('#por-em_selectedHeight').html('70~80cm');
				}

				$('#por-em_selectedWidth').html(optionWidth + 'cm');
				$('#por-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/por-em/por-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
				$('#por-em_selectedProduct').html(productNumber);
				$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

				var html;

				var productId;
				if (optionHeight == '55') {
					var productId = 'POR-55' + optionWidthNum + 'DU-' + optionColor;
					//console.log(productId);
					html =
						'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
						productId +
						'].productNo" value="' +
						productId +
						'" ><input type="hidden" name="products[' +
						productId +
						'].productOptionsWithPrice[1].id" value="1"/><select name="products[' +
						productId +
						'].productOptionsWithPrice[1].value"><option value="ADIS-00"></option></select><input name="products[' +
						productId +
						'].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
				} else {
					orderName = 'POR-EM' + optionHeight + optionWidthNum + 'DU';
					//console.log(orderName);
					if (optionWidth == '30') {					
						optionWidthNum = '030';
					} else if (optionWidth == '60') {
						optionWidthNum = '060';
					} else if (optionWidth == '120') {
						optionWidthNum = '120';
					} else if (optionWidth == '150') {
						optionWidthNum = '150';
					}
					var productId = 'POR-EMDU' + optionWidthNum + '0' + optionHeight;
					//console.log(productId);
					
					html =
						'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
						productId +
						'].productNo" value="' +
						productId +
						'"><input type="hidden" name="products[' +
						productId +
						'].productOptionsWithPrice[1].id" value="1" /><select name="products[' +
						productId +
						'].productOptionsWithPrice[1].value"><option value="' +
						orderName +
						'"></option></select><input type="hidden" name="products[' +
						productId +
						'].productOptionsWithPrice[2].id" value="2"><select name="products[' +
						productId +
						'].productOptionsWithPrice[2].value"><option value="' +
						optionColor +
						'"></option></select><input type="hidden" name="products[' +
						productId +
						'].productOptionsWithPrice[3].id" value="3"><select name="products[' +
						productId +
						'].productOptionsWithPrice[3].value"><option value="ADIS-00"></option></select><input name="products[' +
						productId +
						'].quantity" type="text" value="1" size="1"><button type="submit">カートに入れる</button></form>';
				}

				//console.log(html);

				$('#por-em_selectedProductButton').html(html);

				var innerWidth;
				var innerHeight;
				var innerDepth = '37.9';

				//内寸高さ
				if (optionHeight == '40') {
					innerHeight = '30.4'
				} else if (optionHeight == '45') {
					innerHeight = '35.4'
				} else if (optionHeight == '50') {
					innerHeight = '40.4'
				} else if (optionHeight == '55') {
					innerHeight = '45.4'
				} else if (optionHeight == '60') {
					innerHeight = '50.4'
				} else if (optionHeight == '65') {
					innerHeight = '55.4'
				} else if (optionHeight == '70') {
					innerHeight = '60.4'
				}


				//内寸幅
				if (optionWidth == '30') {
					innerWidth = '26.5'
					var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
				} else if (optionWidth == '60') {
					innerWidth = '56.5'
					var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
				} else if (optionWidth == '120') {
					innerWidth = '56.5'
					var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
				} else if (optionWidth == '150') {
					innerWidth = '71.4'
					var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
				}

				$('#por_em_selectedProduct-innerSize').html(innerSizeHTML);
			}
		});
	}
}