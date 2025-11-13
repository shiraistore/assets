$(function () {
    addCart();
    //instagramPostList();
});

/* タブ作成 */
jQuery(function ($) {
    $('.tab').click(function () {
        $('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $('.is-show').removeClass('is-show');
        // クリックしたタブからインデックス番号を取得
        const index = $(this).index();
        // クリックしたタブと同じインデックス番号をもつコンテンツを表示
        $('.panel').eq(index).addClass('is-show');
    });
});

/* addCart
========================================================================== */
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

    const items = Array.isArray(resp?.items) ? resp.items
                : Array.isArray(resp?.data)  ? resp.data
                : Array.isArray(resp?.result)? resp.result
                : [];

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
      const normalPrice  = Number(result.normal_price  || 0);
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
      const productId_Len3  = ('000' + Math.floor(productId / 100)).slice(-3);
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


function instagramPostList() {
	if ($('#momsStorageProblemsAndSolutions').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/instagramDisplayPhoto_v1_0.json', function (instagramPostData) {
			var listHtml = '';
			for (var i in instagramPostData.reverse()) {
				var postId = instagramPostData[i].postId,
					thumbnail_url = instagramPostData[i].thumbnail_url,
					sizeAdjustment = instagramPostData[i].sizeAdjustment;
					tag = instagramPostData[i].tag.split(',');
					//console.log(tag);
				
					$('.postByAge').each(function () {
						var tagName = $(this).data('tag').split(',');
						//console.log(tagName);
						
						listHtml = '<li class="modal-open" data-target="instagramPost-modal" data-postid="' + postId + '"><img src="' + thumbnail_url + '" style="width:' + sizeAdjustment + '%;height:' + sizeAdjustment + '%;" alt="instagramPost_' + postId + '"></li>';
                        
                        if (tag.some(function(value) { return tagName.indexOf(value) !== -1; })) {
                            $(this).append(listHtml);
                        }
						                     
					});
			}

            $('.modal-open').on('click', function () {
                modal_addContent_instagram(instagramPostData, thumbnail_url, $(this));
            });

            $('.modal-ctr-open').on('click', function () {
                if (!$(this).hasClass('disable')) {
                    $('.modal-content_inner').fadeOut(0);
                    modal_addContent_instagram(instagramPostData, thumbnail_url, $(this));
                    $('.modal-content_inner').fadeIn(300);
                }
            });
            modal();
		});
	}
}


function modal_addContent_instagram(instagramPostData, thumbnail_url, element) {
	var id = element.data('postid');

	var target = instagramPostData
		.filter(function (object) {
			return object.postId == id;
		})
		.shift();

	var thumbnail_url = target.thumbnail_url;
	var author_name = target.author_name;
	var modalHtml =
		'<div id="imageBox"><a href="https://www.instagram.com/p/' +
		id +
		'/" target="_blank"><img width="320" data-src="' +
		thumbnail_url +
		'" src="https://shiraistore.itembox.design/item/src/loading.svg" id="thumbnail" class="lazyload" alt="instagramPost_' +
		id +
		'"></a><span id="author"><img src="https://shiraistore.itembox.design/item/src/icon-instagram-gr.svg" width="16"><span>Photo by</span><a href=https://www.instagram.com/' +
		author_name +
		' target="_blank">' +
		author_name +
		'</a></span></div>';

	var modalProductHtml = '';
	for (var i = 0; target.relatedProduct.length > i; i++) {
		//console.log('i:',i)
		var productUrl = target.relatedProduct[i].productUrl;
		var productId = target.relatedProduct[i].productId;
		var productId_12Len = zeroPadding(target.relatedProduct[i].productId, 12);
		var item_image_group = Math.floor(productId / 100);
		var productName = target.relatedProduct[i].productName;
		var categoryName = target.relatedProduct[i].categoryLv1;
		var averageRating = parseFloat(target.relatedProduct[i].averageRating);
		var reviewCount = target.relatedProduct[i].reviewCount;
		var sellingPrice = target.relatedProduct[i].sellingPrice;
		var normalPrice = target.relatedProduct[i].normalPrice;
		var thumbNumber = ('00' + target.relatedProduct[i].thumbNumber).slice(-2);
		var icon = target.relatedProduct[i].icon;
		var seriesCode = target.relatedProduct[i].seriesCode.toLowerCase();

		//('icon:', icon)

		if (icon != null) var icon_ary = icon.split(',');
		var icon_html = '';
		if (icon_ary != '') {
			for (var j = 0; icon_ary.length > j; j++) {
				icon_splitAry = icon_ary[j].split(':');
				if (icon_splitAry[0] == 'mark-sale' && sellingPrice < normalPrice) {
					icon_html += '<span class="mark-sale">SALE</span>';
				}
				if (icon_splitAry[0] == 'mark-limitedProduct') {
					icon_html += '<span class="mark-limitedProduct">当店限定商品</span>';
				}
				if (icon_splitAry[0] == 'mark-categoryRank' && icon_splitAry[1] <= 3) {
					icon_html += '<span class="mark-catRank">' + categoryName + ' ' + icon_splitAry[1] + '位</span>';
				}
			}
		}
		icon_html = '<span class="itemIcon">' + icon_html + '</span>';

		//レビュースコアの閾値を設定
		if (averageRating < 0.5) {
			averageRating = '0';
			//console.log(averageRating)
		} else if (averageRating < 1.0) {
			averageRating = '0.5';
		} else if (averageRating < 1.5) {
			averageRating = '1.0';
		} else if (averageRating < 2.0) {
			averageRating = '1.5';
		} else if (averageRating < 2.5) {
			averageRating = '2.0';
		} else if (averageRating < 3.0) {
			averageRating = '2.5';
		} else if (averageRating < 3.5) {
			averageRating = '3.0';
		} else if (averageRating < 4.0) {
			averageRating = '3.5';
		} else if (averageRating < 4.5) {
			averageRating = '4.0';
		} else if (averageRating < 5) {
			averageRating = '4.5';
		} else if (averageRating == 5) {
			averageRating = '5.0';
		}

		var averageRating_html = '';
		if (reviewCount != 0) {
			averageRating_html = '<span class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + averageRating + '"><a target="_blank" href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '" class="itemReviewCount">（' + reviewCount + '）</a></span>';
		}

		sellingPrice = String(sellingPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		normalPrice = String(normalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

		if (sellingPrice < normalPrice) {
			var price_html = '<span class="itemNormalPrice itemPrice">¥ ' + normalPrice + '<span class="tax">(税込)</span></span><span class="itemSalePrice itemPrice"><span class="sale">特別価格</span> ¥ ' + sellingPrice + '<span class="tax">(税込)</span></span>';
		} else {
			var price_html = '<span class="itemPrice">¥ ' + sellingPrice + '<span class="tax">(税込)</span></span>';
		}

		modalProductHtml =
			modalProductHtml +
			'<li class="relatedProductItem"><a target="_blank" href="https://shirai-store.net/c/series/' +
			seriesCode +
			'/' +
			productUrl +
			'"><img data-src="' +
			'https://shiraistore.itembox.design/product/' +
			zeroPadding(item_image_group, 3) +
			'/' +
			productId_12Len +
			'/' +
			productId_12Len +
			'-' +
			thumbNumber +
			'-s.jpg" alt="instagramPost_' +
			id +
			' ' +
			productName +
			'" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazyload"></a><p><a target="_blank" href="https://shirai-store.net/c/series/' +
			seriesCode +
			'/' +
			productUrl +
			'" class="itemName">' +
			productName +
			'</a>' +
			icon_html +
			averageRating_html +
			price_html +
			'</li>';
	}

	modalHtml = modalHtml + '<ul id="relatedProductList">' + modalProductHtml + '</ul>';

	$('.modal-content_inner').html(modalHtml);
	$('.modal-content_inner').fadeIn(300);

	var prevPost = $('.postedList')
		.children('[data-postid=' + id + ']')
		.prev('li')
		.data('postid');
	var nextPost = $('.postedList')
		.children('[data-postid=' + id + ']')
		.next('li')
		.data('postid');

	// console.log('prevPost:', prevPost);
	// console.log('nextPost:', nextPost);

        if (prevPost != undefined) {
            $('#modal-control').find('.prev').data('postid', prevPost);
            $('#modal-control').find('.prev').removeClass('disable');
            $('#modal-control').find('.prev').addClass('modal-ctr-open');
        } else {
            $('#modal-control').find('.prev').addClass('disable');
            $('#modal-control').find('.prev').removeClass('modal-ctr-open');
        }
    
        if (nextPost != undefined) {
            $('#modal-control').find('.next').data('postid', nextPost);
            $('#modal-control').find('.next').removeClass('disable');
            $('#modal-control').find('.next').addClass('modal-ctr-open');
        } else {
            $('#modal-control').find('.next').addClass('disable');
            $('#modal-control').find('.next').removeClass('modal-ctr-open');
        }
}
