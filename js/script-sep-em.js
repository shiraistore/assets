$(function () {
	sep_emrack_select();
	sep_emdesk_select();
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
	initPhotoSwipeFromDOM('#sep-em_selectedProductImageText');
});

$(window).on('resize', function () {});

$(window).on('load scroll', function () {});

function sep_emrack_select() {
	if ($('#sep-emrack').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/sepSizeOrderPrice_v1_1.json', function (priceArray) {
			sep_emrack_selectWrite(priceArray);
			$('#sep-emrack input[type="radio"],#sep-emrack select').change(function () {
				sep_emrack_selectWrite(priceArray);
			});

			$('#introductionTable td').click(function () {
				var model = String($(this).find('img').data('model'));
				// console.log(model.charAt(0));
				// console.log(model.charAt(1));
				$('select[name="sep-emrack_optionHeight"]').val(model.charAt(0));
				$('select[name="sep-emrack_optionWidth"]').val(model.charAt(1));
				sep_emrack_selectWrite(priceArray);
			});

			function sep_emrack_selectWrite(priceArray) {
				var optionHeight = $('#sep-emrack [name=sep-emrack_optionHeight]').val(),
					optionHeightName = '',
					optionWidth = $('#sep-emrack [name=sep-emrack_optionWidth]').val(),
					optionWidthName = '',
					optionColor = $('#sep-emrack [name=sep-emrack_optionColor]:checked').val(),
					optionColorName = $('#sep-emrack [name=sep-emrack_optionColor]:checked').data('colorname'),
					optionHeightSize,
					optionWidthSize,
					optionSize,
					orderName,
					readyMade = 0;

				switch (optionHeight) {
					case '1':
						optionHeightSize = '40';
						optionHeightName = '41.4';
						break;
					case '2':
						optionHeightSize = '75';
						optionHeightName = '77.4';
						break;
					case '3':
						optionHeightSize = '11';
						optionHeightName = '113.4';
						break;
					case '4':
						optionHeightSize = '15';
						optionHeightName = '149.4';
						break;
					case '5':
						optionHeightSize = '19';
						optionHeightName = '185.4';
						break;
					case '6':
						optionHeightSize = '23';
						optionHeightName = '231.1<span class="displayBlock_pc">~</span>250.1';
						break;
				}

				switch (optionWidth) {
					case '1':
						optionWidthSize = '40';
						optionWidthName = '40.5';
						break;
					case '2':
						optionWidthSize = '75';
						optionWidthName = '75.2';
						break;
					case '3':
						optionWidthSize = '11';
						optionWidthName = '100.0';
						break;
					case '4':
						optionWidthSize = '14';
						optionWidthName = '144.7';
						break;
					case '5':
						optionWidthSize = '18';
						optionWidthName = '179.5';
						break;
				}

				optionSize = optionHeightSize + optionWidthSize;
				switch (optionSize) {
					// case '1175':
					// 	readyMade = 1;
					// 	break;
					case '1111':
						readyMade = 1;
						break;
					// case '1975':
					//     readyMade = 1;
					//     break;
					case '1911':
						readyMade = 1;
						break;
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

				//console.log(productNumber);
				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				$('#sep-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/' + optionWidth + '-' + optionHeight + '-' + optionColor.toLowerCase() + '.jpg">');
				$('#sep-em_selectedProductHeightImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/' + 'height' + optionHeight + '.png">');
				$('#sep-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/rack/' + 'width' + optionWidth + '.png">');
				$('#sep-em_selectedProductImageText a').attr('href', '/assets/img/product/sizeOrder/sep-em/rack/modelIllustration/' + optionSize + '.png');
				$('#sep-em_selectedHeight').html(optionHeightName + 'cm');
				$('#sep-em_selectedWidth').html(optionWidthName + 'cm');
				$('#sep-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/sep-em/thum/sep-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
				$('#sep-em_selectedProduct').html(productNumber);
				$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

				var html;

				if (readyMade == 0) {
					orderName = 'SEP-EM' + optionSize;
					html =
						'<form action="/p/cart/add" method="post"><input type="hidden" name="products[' +
						orderName +
						'].productNo" value="' +
						orderName +
						'"><input type="hidden" name="products[' +
						orderName +
						'].productOptionsWithPrice[1].id" value="1" /><select name="products[' +
						orderName +
						'].productOptionsWithPrice[1].value"><option value="' +
						orderName +
						'"></option></select><input type="hidden" name="products[' +
						orderName +
						'].productOptionsWithPrice[2].id" value="2"><select name="products[' +
						orderName +
						'].productOptionsWithPrice[2].value"><option value="' +
						optionColor +
						'"></option></select><input type="hidden" name="products[' +
						orderName +
						'].productOptionsWithPrice[3].id" value="3"><select name="products[' +
						orderName +
						'].productOptionsWithPrice[3].value"><option value="ADIS-00"></option></select><input name="products[' +
						orderName +
						'].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
				} else {
					var productId = 'SEP-' + optionSize + '-' + optionColor;
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
				}

				$('#sep-em_selectedProductButton').html(html);
			}
		});
	}
}

function sep_emdesk_select() {
	if ($('#sep-emdesk').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/sepSizeOrderPrice_v1_1.json', function (priceArray) {
			sep_emrack_selectWrite(priceArray);
			$('#sep-emdesk input[type="radio"],#sep-emdesk select').change(function () {
				sep_emrack_selectWrite(priceArray);
			});

			function sep_emrack_selectWrite(priceArray) {
				var optionWidth = $('#sep-emdesk [name=sep-emdesk_optionWidth]').val(),
					optionDepth = $('#sep-emdesk [name=sep-emdesk_optionDepth]').val(),
					optionColor = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').val(),
					optionColorName = $('#sep-emdesk [name=sep-emdesk_optionColor]:checked').data('colorname'),
					optionWidthSize,
					optionDepthName,
					optionSize,
					orderName,
					productIdNum;

				if (optionDepth == 'A') {
					optionDepthName = '浅型';
					if (optionWidth >= 60 && optionWidth <= 75) {
						productIdNum = '0600-0750';
					} else if (optionWidth >= 76 && optionWidth <= 99) {
						productIdNum = '0760-0990';
					} else if (optionWidth >= 100 && optionWidth <= 119) {
						productIdNum = '1000-1190';
					} else if (optionWidth >= 121 && optionWidth <= 140) {
						productIdNum = '1210-1400';
					} else if (optionWidth >= 141 && optionWidth <= 160) {
						productIdNum = '1410-1600';
					} else if (optionWidth >= 161 && optionWidth <= 192) {
						productIdNum = '1610-1920';
					} else if (optionWidth >= 193 && optionWidth <= 210) {
						productIdNum = '1930-2100';
					}
				} else if (optionDepth == 'F') {
					optionDepthName = '深型';
					if (optionWidth >= 60 && optionWidth <= 75) {
						productIdNum = '0600-0750';
					} else if (optionWidth >= 76 && optionWidth <= 90) {
						productIdNum = '0760-0900';
					} else if (optionWidth >= 91 && optionWidth <= 100) {
						productIdNum = '0910-1000';
					} else if (optionWidth >= 101 && optionWidth <= 140) {
						productIdNum = '1010-1400';
					} else if (optionWidth >= 141 && optionWidth <= 160) {
						productIdNum = '1410-1600';
					} else if (optionWidth >= 161 && optionWidth <= 192) {
						productIdNum = '1610-1920';
					} else if (optionWidth >= 193 && optionWidth <= 210) {
						productIdNum = '1930-2100';
					}
				}

				//console.log(productIdNum);

				optionWidthSize = ('0000' + optionWidth * 10).slice(-4);

				//console.log(productNumber);
				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				var optionWidthImageRange;
				var optionWidthRangeNum;
				if (optionWidth <= 69) {
					optionWidthImageRange = 60;
					optionWidthRangeNum = 1;
				} else if (optionWidth <= 79) {
					optionWidthImageRange = 70;
					optionWidthRangeNum = 2;
				} else if (optionWidth <= 89) {
					optionWidthImageRange = 80;
					optionWidthRangeNum = 3;
				} else if (optionWidth <= 99) {
					optionWidthImageRange = 90;
					optionWidthRangeNum = 4;
				} else if (optionWidth <= 109) {
					optionWidthImageRange = 100;
					optionWidthRangeNum = 5;
				} else if (optionWidth <= 119) {
					optionWidthImageRange = 110;
					optionWidthRangeNum = 6;
				} else if (optionWidth <= 129) {
					optionWidthImageRange = 120;
					optionWidthRangeNum = 7;
				} else if (optionWidth <= 139) {
					optionWidthImageRange = 130;
					optionWidthRangeNum = 8;
				} else if (optionWidth <= 149) {
					optionWidthImageRange = 140;
					optionWidthRangeNum = 9;
				} else if (optionWidth <= 159) {
					optionWidthImageRange = 150;
					optionWidthRangeNum = 10;
				} else if (optionWidth <= 169) {
					optionWidthImageRange = 160;
					optionWidthRangeNum = 11;
				} else if (optionWidth <= 179) {
					optionWidthImageRange = 170;
					optionWidthRangeNum = 12;
				} else if (optionWidth <= 189) {
					optionWidthImageRange = 180;
					optionWidthRangeNum = 13;
				} else if (optionWidth <= 199) {
					optionWidthImageRange = 190;
					optionWidthRangeNum = 14;
				} else if (optionWidth <= 209) {
					optionWidthImageRange = 200;
					optionWidthRangeNum = 15;
				} else if (optionWidth <= 210) {
					optionWidthImageRange = 210;
					optionWidthRangeNum = 16;
				}

				var productNumber;

				if (optionWidthSize == '1200') {
					productNumber = 'SEP-7512DESK' + optionDepth + '-' + optionColor;
					$('#readyMadeMessage').text('お選びのサイズは既製品です。');
					$('#sep_selectedProductButton').html('<a href="/c/series/sep/' + productNumber.toLowerCase() + '">既製品のご注文はこちら</a>');
					$('#sep_selectedProductButton').css('display', 'block');
					$('#sep-em_selectedProductButton').css('display', 'none');
					$('.fs-c-productOption.unusable').css('display', 'none');
				} else {
					productNumber = 'SEP-EM' + optionWidthSize + 'DESK' + optionDepth;
					$('#readyMadeMessage').text('');
					$('#sep_selectedProductButton').css('display', 'none');
					$('#sep-em_selectedProductButton').css('display', 'block');
					$('.fs-c-productOption.unusable').css('display', 'block');
				}

				//console.log(productNumber);
				//console.log(optionWidthRangeNum);

				var price = priceArray.find((v) => v.productNumber === productNumber);

				//console.log(price);

				$('#sep-em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/' + optionWidthImageRange + optionDepth.toLowerCase() + '-' + optionColor.toLowerCase() + '.jpg">');
				//$('#sep-em_selectedProductDepthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/' + 'depth' + optionDepth + '.png">');
				$('#sep-em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/sep-em/desk/' + 'width' + optionWidthRangeNum + '.png">');
				//$('#sep-em_selectedHeight').html(optionHeightName + 'cm');
				$('#sep-em_selectedWidth').html(optionWidth + '.0cm');
				$('#sep-em_selectedDepth').html(optionDepthName);
				$('#sep-em_selectedColor').html('<img src="/assets/img/product/sizeOrder/sep-em/thum/sep-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName">' + optionColorName + '</span>');
				$('#sep-em_selectedProduct').html(productNumber);
				$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
				$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
				$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

				var html;

				var productId;
				if (optionWidthSize == '1200') {
					var productId = 'SEP-7512DESK' + optionDepth + '-' + optionColor;
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
					var productId = 'SEP-EMDESK' + productIdNum + optionDepth;
					orderName = 'SEP-EM' + optionWidthSize + 'DESK' + optionDepth;
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
						'].quantity" type="text" value="1" size="5"><button type="submit">カートに入れる</button></form>';
				}

				//console.log(html);

				$('#sep-em_selectedProductButton').html(html);
			}
		});
	}
}
