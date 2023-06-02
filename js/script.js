$(function () {
	previewModeDecision(); //OK
	getUrlRedirect();
	rewriteDOM(); //OK
	globalNavi(); //javaScriptParts
	smoothScroll(); //javaScriptParts
	slideToggleButton(); //javaScriptParts
	birthdayYearDefaultSelected(); //javaScriptParts
	calendar(); //javaScriptParts
	topMainVisualSlider_imageChange(); //javaScriptParts
	imageChange(); //javaScriptParts
	cartRegistBranch(); //javaScriptParts
	cartADISCaution();
	ADIS_discriptionOpenClose(); //OK
	magazineImageChange(); //OK
	faqAnswerOpen(); //OK
	timeSale(); //OK
	product_tagsLink(); //OK
	searchWordSave('keyword'); //OK
	searchTagTitle(); //OK
	productSortSelect(); //OK
	productCategoryRankingDisplayNone(); //OK
	productCategorySubCategoryMenu(); //OK
	productVariation(); //OK
	productSizeVariation(); //OK
	productCompatibleList();
	productDetailSeriesLink(); //OK
	productDetail_tnlListTableLink();
	productDetail_mhpContentsBanner();
	productDetail_ptsContentsBanner();
	productDetail_bookShelfContentsBanner();
	productDetail_tlfContentsBanner();
	productDetail_logContentsBanner();
	productDetail_porContentsBanner();
	searchTagsTitleDescriptionChange();

	reviewSlideDown('#fs_ProductDetails', '240'); //OK
	instagramPostList(); //OK
	soldOut(); //OK
	transfer();
	preSale_displayPassWordForm();
	featureMamihapiSeries_slider(); //OK
	featureMamihapiSeries_cart(); //OK
	featureMamihapibyage_slider(); //OK
	featureMamihapiByage_cart(); //OK
	productListAddData(); //OK
	productDetailAddData(); //OK
	orderChangeCancelForm();
	multipleReviewList(); //OK
	recommendTop10(); //OK
	searchFilterTnl(); //OK
	reviewsDisplayForSearchResults();
	instagramPostDisplayForSearchResults();

	var global_rakingTop10Type = $('.productTop10Slider.ranking').data('ranking');
	if (global_rakingTop10Type) {
		var global_page = getParam('page');
		//console.log('global_page:',global_page);
		if (global_page == 1 || global_page == null) {
			if ($('#fs_CustomPage').length) {
				rankingTop10(); //OK
			} else {
				rankingTop10(global_rakingTop10Type); //OK
			}
		} else {
			$('.productTop10Slider').remove();
		}
	}
	var global_recommendRankingPathName = location.pathname;
	if (global_recommendRankingPathName.indexOf('recommend') > 0) {
		recommendList(); //OK
	}
	if (global_recommendRankingPathName.match(/ranking/g)) {
		rankingList(global_recommendRankingPathName.split('/').pop()); //OK
	}
	var global_selectRankingHTML =
		'<select name="ranking"><option value="ranking">総合ランキング</option><option value="ranking-rack">本棚・フリーラック</option><option value="ranking-tv-stand">テレビ台・ローボード</option><option value="ranking-kitchen">キッチン収納</option><option value="ranking-clothing">衣類収納</option><option value="ranking-entrance">玄関収納</option><option value="ranking-cabinet">キャビネット・収納庫</option><option value="ranking-wall-unit-storage">壁面収納・システム収納</option><option value="ranking-table">テーブル</option><option value="ranking-desk">デスク</option><option value="ranking-kids">キッズ収納</option><option value="ranking-office-furniture">オフィス家具</option></select>';
	$('.selectRanking').each(function () {
		$(this).html(global_selectRankingHTML);
	});
	var global_recommendRankingPathName = location.pathname;
	$('.selectRanking').each(function () {
		$(this).find('select').val(global_recommendRankingPathName.split('/').pop());
	});
	$('.selectRanking select[name=ranking]').change(function () {
		if ($(this).val() != '') {
			window.location.href = $(this).val();
		}
	});

	topMainVisualSlider(); //OK
	rewriteDOMLoad(); //OK
	reviewAssistText(); //OK
	ie11_compulsionScroll(); //javaScriptParts
	searchOpen(); //javaScriptParts

	windowWidthprocessingChange(); //javaScriptParts
	windowWidthDOMChange(); //javaScriptParts

	advancedSearchFormSelected();
	advancedSearchForm();
	cartInPopUp();

	multipleRankingTop10(); //汎用的に使えるランキング
});

$(window).on('load', function () {
	pinterestTagWrite(); //OK
});

global_lastInnerWidth = document.body.clientWidth;

var delayStart;
var delayTime = 200;

$(window).on('resize', function () {
	if (global_lastInnerWidth != document.body.clientWidth) {
		global_lastInnerWidth = document.body.clientWidth;
		windowWidthDOMChange(); //javaScriptParts
		searchOpen(); //javaScriptParts
	}

	clearTimeout(delayStart);
	delayStart = setTimeout(function () {
		topMainVisualSlider_imageChange(); //javaScriptParts
		imageChange(); //javaScriptParts
	}, delayTime);

	checkScreenSize(); //OK
});

$(window).on('load scroll', function () {
	slideNaviResizeHeight(); //javaScriptParts
});

/* ========== OK end ========== */

/* previewMode
========================================================================== */
function previewModeDecision() {
	if ($('#fs_preview_header').length) {
		$('body').addClass('previewMode');
	}
}

/* preSale_displayPassWordForm
========================================================================== */
function preSale_displayPassWordForm() {
	if ($('#fs_ProductAuth').length) {
		var productPathName = location.pathname;
		// console.log(productPathName);
		if (productPathName.indexOf('/p/auth/preSale') === 0) {
			$('#fs_ProductAuth .fs-l-pageMain').css('display', 'block');
		}
	}
}

/* cartInPopUp
========================================================================== */

function cartInPopUp() {
	if ($('#fs_ProductDetails').length) {
		setTimeout(function () {
			var cartIn = $('#header-utility .fs-p-cartItemNumber').text();
			setInterval(function () {
				var cartItemNumber = $('#header-utility .fs-p-cartItemNumber').text();
				// console.log('cartItemNumber:', cartItemNumber);
				// console.log('cartIn:', cartIn);
				if (cartItemNumber != cartIn) {
					// console.log('カート投入');
					cartIn = cartItemNumber;
					$('#header-utility').after('<div class="goToCart"><a href="/p/cart">ご注文はこちら</a></div>');
					$('.goToCart').fadeIn();
					$('.goToCart').delay(5000).fadeOut();
				}
			}, 1000);
		}, 3000);
	}
}

/* ransfer
========================================================================== */
function transfer() {
	if ($('#fs_PageNotFound').length) {
		var productURL = location.href;

		if (productURL == 'https://shirai-store.net/c/series/mhp/mhp-8090p-na') {
			window.location.href = 'https://shirai-store.net/c/preSale/mhp-8090p-na';
		} else if (productURL == 'https://shirai-store.net/c/series/mhp/mhp-8090p-iv') {
			window.location.href = 'https://shirai-store.net/c/preSale/mhp-8090p-iv';
		}
	}
}

/* getUrlRedirect
========================================================================== */

function getUrlRedirect() {
	var url = location.href;
	if (url.indexOf('https://shirai-store.net/f/feature/magazine/newLife2022') > -1) {
		window.location.href = 'https://shirai-store.net/f/feature/magazine/newLife';
	} else if (url == 'https://shirai-store.net/f/shirai_fan') {
		window.location.href = 'https://shirai-store.net/f/shirai-fan';
	} else if (url == 'https://shirai-store.net/f/terms_use') {
		window.location.href = 'https://shirai-store.net/f/terms-use';
	} else if (url == 'https://shirai-store.net/f/ranking_rack') {
		window.location.href = 'https://shirai-store.net/f/ranking-rack';
	} else if (url == 'https://shirai-store.net/f/ranking_tv-stand') {
		window.location.href = 'https://shirai-store.net/f/ranking-tv-stand';
	} else if (url == 'https://shirai-store.net/f/ranking_kitchen') {
		window.location.href = 'https://shirai-store.net/f/ranking-kitchen';
	} else if (url == 'https://shirai-store.net/f/ranking_clothing') {
		window.location.href = 'https://shirai-store.net/f/ranking-clothing';
	} else if (url == 'https://shirai-store.net/f/ranking_entrance') {
		window.location.href = 'https://shirai-store.net/f/ranking-entrance';
	} else if (url == 'https://shirai-store.net/f/ranking_cabinet') {
		window.location.href = 'https://shirai-store.net/f/ranking-cabinet';
	} else if (url == 'https://shirai-store.net/f/ranking_wall-unit-storage') {
		window.location.href = 'https://shirai-store.net/f/ranking-wall-unit-storage';
	} else if (url == 'https://shirai-store.net/f/ranking_table') {
		window.location.href = 'https://shirai-store.net/f/ranking-table';
	} else if (url == 'https://shirai-store.net/f/ranking_desk') {
		window.location.href = 'https://shirai-store.net/f/ranking-desk';
	} else if (url == 'https://shirai-store.net/f/ranking_kids') {
		window.location.href = 'https://shirai-store.net/f/ranking-kids';
	} else if (url == 'https://shirai-store.net/f/ranking_office-furniture') {
		window.location.href = 'https://shirai-store.net/f/ranking-office-furniture';
	}
}

function reviewsDisplayForSearchResults() {
	if ($('#fs_ProductSearch').length || $('#fs_ProductCategory').length) {
		if (!$('.fs-body-category-preSale').length) {
			var url = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/getReviewsForProductsList';
			var request = [];
			var productUrls = [];
			$('.fs-c-productListItem').each(function () {
				var productHref = $(this).find('a').attr('href');
				var productNumbers = productHref.split('/');
				var productNumber = productNumbers.slice(-1)[0];
				for (let i = 1; i < 4; i++) {
					request.push({ product_number: productNumber, review_number: i });
				}
				productUrls.push(productHref);
			});

			var resutls = $.ajax({
				type: 'post',
				url: url,
				async: false,
				data: JSON.stringify(request),
				contentType: 'application/json',
				dataType: 'json',
				scriptCharset: 'utf-8',
				success: function (resutls) {
					// Success
					//console.log(JSON.stringify(response));
				},
				error: function (resutls) {
					// Error
					//console.log(JSON.stringify(response));
				},
			}).responseText;

			if (resutls != '[]') {
				resutls = resutls.replace(/\r?\n/g, '<br>');

				resutls = JSON.parse(resutls);

				var reviewsHtml = '';
				for (const review of resutls) {
					const productId12Length = zeroPadding(review.product_id, 12);
					const productGroup = Math.floor(review.product_id / 100);
					const productGroup3Length = zeroPadding(productGroup, 3);
					const productThumbnailNumber2Length = zeroPadding(review.product_thumbnail_number, 2);

					//console.log(review.product_number);
					const productNumber = review.product_number;
					let productUrl;

					for (let i = 0; i < productUrls.length; i++) {
						if (productUrls[i].indexOf(productNumber) != -1) {
							//console.log(productUrl.indexOf(productNumber));
							//console.log(productUrls[i]);
							productUrl = productUrls[i];
						}
					}

					let upDate = review.created_at.split('T');
					upDate = upDate[0].replace(/-/g, '/');

					// console.log('productThumbnailNumber2Length:',productThumbnailNumber2Length);
					// console.log('productId12Length:',productId12Length);
					// console.log('productGroup3Length:',productGroup3Length);
					// console.log('productUrl:',productUrl);

					reviewsHtml += `<li class="fs-c-reviewList__item reviewScore-${review.rating}"><div class="reviewImage"><a href="${productUrl}"><img src="https://shiraistore.itembox.design/product/${productGroup3Length}/${productId12Length}/${productId12Length}-${productThumbnailNumber2Length}-xs.jpg" alt=""></a></div><h3 class="productName">${review.product_name}</h3><div class="reviewContent"><div class="fs-c-reviewList__item__info fs-c-reviewInfo"><div class="fs-c-reviewInfo__reviewer fs-c-reviewer"><div class="fs-c-reviewer__name"><span class="fs-c-reviewer__name__nickname">${review.nickname}</span></div><div class="fs-c-reviewer__status"><span class="fs-c-reviewerStatus">購入者</span></div><div class="fs-c-reviewer__profile"></div></div><dl class="fs-c-reviewInfo__date"><dt>投稿日</dt><dd><time datetime="${review.created_at}" class="fs-c-time">${upDate}</time></dd></dl><div class="fs-c-reviewRating"><div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="${review.rating}.0"></div></div></div><div class="color">${review.product_color}</div><div class="fs-c-reviewList__item__body fs-c-reviewBody">${review.body}</div><div class="text-right"><a href="${productUrl}" class="text-link-color">商品詳細を見る</a></div></div></li>`;
				}

				if ($('.advanceSearchTag').length) {
					searchTagsCanonicalChange();
					const tagName = $('.advanceSearchTag').html().replace('#', '');
					$('.fs-c-productList').after(`<div id="multipleReviewList" class="productList"><h2>${tagName}のレビュー</h2><ul>${reviewsHtml}</ul></div>`);
				} else {
					const titleName = $('h1').html();
					$('.fs-c-productList').after(`<div id="multipleReviewList" class="productList"><h2>${titleName}のレビュー</h2><ul>${reviewsHtml}</ul></div>`);
				}
			}
		} else {
			$('h1').after('<p class="red text-center">*このページからのみ先行販売商品をご覧いただけます。<br>再度ご覧いただくにはメルマガ、もしくはLINEのリンクからアクセスしてください。</p>');
			$('.category-subCategory-menu').remove();
		}
	}
}

function instagramPostDisplayForSearchResults() {
	if ($('#fs_ProductSearch').length || $('#fs_ProductCategory').length) {
		if (!$('.fs-body-category-preSale').length) {
			$.getJSON('https://cdn.shirai-store.net/assets/json/common/instagramDisplayPhoto_v1_0.json', function (instagramPostData) {
				//console.log(instagramPostData);
				var productNumbers;
				var listHtml = '';
				$('.fs-c-productListItem').each(function () {
					var productHref = $(this).find('a').attr('href');
					var productNumber = productHref.split('/');
					var productNumber = productNumber.slice(-1)[0];
					productNumbers += productNumber;
				});

				//console.log(productNumbers);

				var count = 0;
				instagramPostData = instagramPostData.reverse();

				for (var i in instagramPostData) {
					for (var j in instagramPostData[i].relatedProduct) {
						var checkProductNumber = instagramPostData[i].relatedProduct[j].productUrl;
						//console.log('checkProductNumber:' + productNumber);
						//console.log('checkProductNumber:' + checkProductNumber);
						if (count >= 10) {
							break;
						}

						if (productNumbers.indexOf(checkProductNumber) > -1) {
							var postId = instagramPostData[i].postId,
								thumbnail_url = instagramPostData[i].thumbnail_url,
								sizeAdjustment = instagramPostData[i].sizeAdjustment;

							listHtml += '<li class="modal-open" data-target="instagramPost-modal" data-postid="' + postId + '"><img src="' + thumbnail_url + '" style="width:' + sizeAdjustment + '%;height:' + sizeAdjustment + '%;" alt="instagramPost_' + postId + '"></li>';
							// $('#postedList').append(listHtml);
							//console.log(listHtml);
							count++;
							break;
						}
					}
				}

				if (listHtml != '') {
					$('.fs-c-productList').after(
						'<div id="shirai_fan"><h2>#shirai_fan<span>みんなのInstagram投稿写真集</span></h2><p class="text-center">Instagramで投稿していただいた写真をご紹介しています。<br>紹介時にはSHIRAI STOREスタッフからご連絡後、みなさんの写真を掲載します。#shirai_fanをつけてお気に入りのアイテムをぜひ投稿してください！</p><ul id="postedList">' +
							listHtml +
							'</ul><div class="fs-c-buttonContainer more-button"><a href="/f/shirai-fan" class="fs-c-button--standard">その他の投稿を見る</a></div><div id="instagramPost-modal" class="modal"><div class="modal-bg modal-close"></div><div id="instagramPost-modal_outer" class="modal-close"><div class="modal-content"><div class="modal-content_inner"></div><a class="modal-close_btn modal-close" href=""><img src="https://shiraistore.itembox.design/item/src/icon-close.svg" alt="閉じる" title="閉じる"></a><ul id="modal-control"><li class="modal-ctr-open prev" data-target="instagramPost-modal" data-postid=""></li><li class="modal-ctr-open next" data-target="instagramPost-modal" data-postid=""></li></ul></div></div></div></div></div>'
					);
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
}

/* searchTagsCanonicalChange
========================================================================== */

function searchTagsCanonicalChange() {
	if ($('#fs_ProductSearch').length && $('.advanceSearchTag').length) {
		var url = location.href;
		$('link[rel="canonical"]').attr('href', url);
	}
}

/* searchTagsTitleDescriptionChange
========================================================================== */

function searchTagsTitleDescriptionChange() {
	if ($('#fs_ProductSearch').length) {
		var param = getParam('tag');
		console.log(param);
		switch (param) {
			case 'おもちゃ収納ずっと使える':
				$('title').html('大きくなってもずっと使えるおもちゃ収納の商品一覧 | 収納家具専門 SHIRAI STORE');
				$('meta[name ="description"]').attr('content', 'SHIRAI STOREなら子どもが大きくなってもずっと使えるおもちゃ収納が見つかります。会員登録で送料無料＆割引クーポン進呈中 | 収納家具専門メーカー直営 SHIRAI STORE');
				break;
			case '本棚白（ホワイト系）':
				$('title').html('高品質な白い本棚が50種類以上3,000円以下から | 収納家具専門 SHIRAI STORE');
				$('meta[name ="description"]').attr('content', 'SHIRAI STOREなら高品質な白い本棚を50種類以上を取り揃えています。会員登録で送料無料＆割引クーポン進呈中 | 収納家具専門メーカー直営 SHIRAI STORE');
				break;
			case '本棚おしゃれ':
				$('title').html('高評価で人気のおしゃれな本棚が40種類以上 | 収納家具専門 SHIRAI STORE');
				$('meta[name ="description"]').attr('content', 'SHIRAI STOREなら高評価で人気のおしゃれな本棚を40種類以上取り揃えています。会員登録で送料無料＆割引クーポン進呈中 | 収納家具専門メーカー直営 SHIRAI STORE');
				break;
		}
	}
}

/* advancedSearchForm
========================================================================== */

function advancedSearchForm() {
	//検索ボタンを押したら詳細検索フォームが開く
	$(document).on('click', '#header-keywordSearch .keywordSearch', function () {
		if ($('#header-keywordSearch .advancedSearchForm').css('display') == 'none') {
			$('#header-keywordSearch .advancedSearchForm').slideDown();
			$('#globalNavi-overlay').fadeIn(200);
		}
	});

	//スマホで検索ボタンを押したら詳細検索フォームが開く
	$(document).on('click', '#searchOpenButton', function () {
		if ($('#header-keywordSearch').css('display') == 'none') {
			$('#header-keywordSearch .advancedSearchForm').css('display', 'flex');
			$('#header-keywordSearch').slideDown();
			$('#globalNavi-overlay').fadeIn(200);
		} else {
			$('#header-keywordSearch').slideUp();
			$('#globalNavi-overlay').fadeOut(200);
		}
	});

	//詳細検索フォームの外側をクリックしたら閉じる
	$('#header-keywordSearch .formClose,#globalNavi-overlay, #header-keywordSearch .advancedSearchForm .close').on('click', function () {
		if ($('#header-keywordSearch').hasClass('max768')) {
			$('#header-keywordSearch').slideUp();
		} else {
			$('#header-keywordSearch .advancedSearchForm').slideUp();
		}
		$('#globalNavi-overlay').fadeOut(200);
	});

	//検索結果なしのメッセージがあったら
	var is_noResultMessage;
	if ($('#noResultMessage').length) {
		var html = $('#header-keywordSearch').html();
		html = html.replace(/name="(.+)"/g, 'name="noResultMessage_$1"');
		//その下に検索フォームを表示する
		$('#noResultMessageAdvancedSearchForm').html(html);
		is_noResultMessage = true;
	} else {
		is_noResultMessage = false;
	}

	//チェックボタンのチェックを外せるようにする
	//インプット要素を取得する

	//インプット要素がクリックされたら
	$('.advancedSearchForm .fs-c-radio__label, .advancedSearchForm .fs-c-checkbox__label').on('click', function () {
		var inputElement = $(this).prev('input');

		if (inputElement.prop('checked')) {
			inputElement.prop('checked', false);
		} else {
			inputElement.prop('checked', true);
			if (is_noResultMessage) {
				//console.log(inputElement.val());
				$('.searchTags,.priceRange').each(function () {
					//valueと値が同じであればinputをチェック状態にする
					if ($(this).val() == inputElement.val()) {
						//console.log(inputElement.val());
						$(this).prop('checked', true);
					}
				});
			}
		}
		if ($(this).prev('input').hasClass('priceRange')) {
			var priceRange = $(this).prev('input').val();
			var priceRange_ary = priceRange.split('-');
			$(".advancedSearchForm input[name='minprice']").val(priceRange_ary[0]);
			$(".advancedSearchForm input[name='maxprice']").val(priceRange_ary[1]);
		}
	});

	//クリアボタン
	$('.advancedSearchForm .clearButton_all').on('click', function () {
		$('.advancedSearchForm input').prop('checked', false);
	});
	$('.advancedSearchForm .clearButton').on('click', function () {
		$(this).parent().next('td').find('input').prop('checked', false);
	});
	$('#header-keywordSearch .advancedSearchForm button').on('click', function () {
		var is_noResultForm = $(this).parents('#noResultMessageAdvancedSearchForm').length;
		advancedSearchFormURL(is_noResultForm);
	});

	$('#noResultMessageAdvancedSearchForm .advancedSearchForm button').on('click', function () {
		var is_noResultForm = $(this).parents('#noResultMessageAdvancedSearchForm').length;
		advancedSearchFormURL(is_noResultForm);
	});
}

//URL生成
function advancedSearchFormURL(is_noResultForm) {
	var keyword = '';
	var advancedSearchValue = $('.fs-p-searchForm__input').val();

	if (advancedSearchValue != undefined) {
		keyword = '&keyword=' + advancedSearchValue;
	}

	var tags = '';
	var formType = '';
	var price = '';
	var priceRange = '';
	var minprice = '';
	var maxprice = '';

	if (is_noResultForm == 1) {
		formType = $('#noResultMessageAdvancedSearchForm .searchTags:checked');
		priceRange = $('#noResultMessageAdvancedSearchForm .priceRange:checked').val();
	} else {
		formType = $('#header-keywordSearch .searchTags:checked');
		priceRange = $('#header-keywordSearch .priceRange:checked').val();
	}
	formType.each(function () {
		tags += ',' + $(this).val();
	});
	if (tags != '') {
		tags = '&tag=' + tags.slice(1);
	}

	//console.log(priceRange);

	if (priceRange != undefined) {
		var priceRange_ary = priceRange.split('-');
		minprice = priceRange_ary[0];
		maxprice = priceRange_ary[1];

		if (minprice != 30000) {
			price = `&minprice=${minprice}&maxprice=${maxprice}`;
		} else {
			price = `&minprice=${minprice}`;
		}
	}

	// $('.priceRange:checked').each(function () {
	// 	var priceRange = $(this).val();
	// 	var priceRange_ary = priceRange.split('-');
	// 	minprice = priceRange_ary[0];
	// 	maxprice = priceRange_ary[1];

	// 	if (minprice != 30000) {
	// 		price = `&minprice=${minprice}&maxprice=${maxprice}`;
	// 	} else {
	// 		price = `&minprice=${minprice}`;
	// 	}
	// });

	//var param = `${keyword}${tags}${price}&mode=advanceSearch`;
	var param = `${tags}${price}&mode=advanceSearch`;
	param = param.slice(1);
	//console.log(param);
	window.location.href = `/p/search?${param}`;
}

//遷移後もボタンを選択状態にする
function advancedSearchFormSelected() {
	if ($('#fs_ProductSearch').length) {
		//tagに値がある場合
		//urlを取得
		var searchUrl = decodeURIComponent($(location).attr('search'));

		//urlを?を削除
		searchUrl = searchUrl.replace('?', '');
		//urlを&で配列に格納
		var searchUrl_ary = [];
		if (searchUrl.indexOf('&') > -1) {
			searchUrl_ary = searchUrl.split('&');
		}

		var tags = '';
		var tags_ary = [];

		for (var i = 0; i < searchUrl_ary.length; i++) {
			if (searchUrl_ary[i].indexOf('keyword=') != -1) {
				var keyword = searchUrl_ary[i].replace('keyword=', '');
				$('.fs-p-searchForm__input').each(function () {
					$(this).val(keyword);
				});
			} else if (searchUrl_ary[i].indexOf('tag') != -1) {
				tags = searchUrl_ary[i].replace('tag=', '');
			}

			var selectedPropChecked = function () {
				$('.priceRange').each(function () {
					// console.log('price:', price);
					// console.log('input:', $(this).val());
					if ($(this).val() == price) {
						$(this).prop('checked', true);
					}
				});
			};

			if (searchUrl_ary[i].indexOf('minprice') > -1) {
				var minprice = searchUrl_ary[i].replace('minprice=', '');

				var price = `${minprice}`;
				// console.log(price);

				selectedPropChecked();
			}

			if (searchUrl_ary[i].indexOf('maxprice') > -1) {
				var maxprice = searchUrl_ary[i].replace('maxprice=', '');

				var price = `${minprice}-${maxprice}`;
				// console.log(price);

				selectedPropChecked();
			}
		}

		if (tags.indexOf(',') != -1) {
			tags_ary = tags.split(',');
		} else {
			tags_ary = [tags];
		}

		//判定
		for (var i = 0; i < tags_ary.length; i++) {
			$('.searchTags').each(function () {
				//valueと値が同じであればinputをチェック状態にする
				if ($(this).val() == tags_ary[i]) {
					//console.log(tags_ary[i]);
					$(this).prop('checked', true);
				}
			});
		}
	}
}

/* orderChangeCancelForm
========================================================================== */
function orderChangeCancelForm() {
	if ($('#orderChangeCancel').length) {
		var value = $('[name=case]').val();
		//console.log(value);
		if (value == 0) {
			$('#orderChange').css('display', 'block');
			$('#orderCancel').css('display', 'none');
		} else {
			$('#orderChange').css('display', 'none');
			$('#orderCancel').css('display', 'block');
		}
		$('#selectCase').change(function () {
			value = $(this).val();
			if (value == 0) {
				$('#orderChange').css('display', 'block');
				$('#orderCancel').css('display', 'none');
			} else {
				$('#orderChange').css('display', 'none');
				$('#orderCancel').css('display', 'block');
			}
		});

		var orderCode = getParam('orderCode');
		// console.log(orderCode);
		if (orderCode !== '') {
			$('.orderCode').each(function () {
				$(this).val(orderCode);
			});
		}
	}
}

/* productDetailSeriesLink
========================================================================== */
function productDetailSeriesLink() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'tl1' || series[0] == 'tl2' || series[0] == 'tl3') {
			series[0] = series[0].slice(0, 2);
		}

		var categoryURL = $('nav .fs-c-breadcrumb__list li:nth-last-child(2) a').attr('href');
		var categoryName = $('nav .fs-c-breadcrumb__list li:nth-last-child(2) a').text();
		//console.log(categoryURL);
		//console.log(categoryName);

		//console.log(series[0]);
		//var html = '<div id="seriesLink"><a href="' + categoryURL + '" class="mb-16">「' + categoryName + '」一覧を見る</a><br><a href="/c/series/' + series[0] + '">この商品のシリーズ一覧を見る</a></div>';
		var html = '<div id="seriesLink"><a href="' + categoryURL + '" class="mb-16">この商品と同じカテゴリの商品を見る</a></div>';

		$('#product-sns-share').before(html);
	}
}

/* productDetail_tnlListTableLink
========================================================================== */
function productDetail_tnlListTableLink() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'tnl') {
			var color = series[series.length - 1];
			//console.log(series[series.length -1]);
			$('#tnl-listTable table td a').each(function () {
				var link = $(this).attr('href');
				//console.log(link);
				link = link.slice(0, -2) + color;
				$(this).attr('href', link);
			});
		}
	}
}

/* productDetail_mhpContentsBanner
========================================================================== */
function productDetail_mhpContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'mhp') {
			var html =
				'<ul id="contents-banner"><li><a href="/f/feature/mamihapi-byage"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-mamihapi-byage.png"></a></li><li><a href="/f/feature/mamihapi-questionnaire"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-mamihapi-questionnaire.png"></a></li><li><a href="/f/feature/mamihapi-tidyingUpReview"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-mamihapi-tidyingUpReview.jpg"></a></li></ul>';

			$('#productActionBox').after(html);
		}
	}
}

/* productDetail_ptsContentsBanner
========================================================================== */
function productDetail_ptsContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'pts') {
			var html = '<ul id="contents-banner"><li><a href="/f/feature/pitashie-featureAndCombination"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-pitashie-featureAndCombination.jpg"></a></li><li><a href="/f/feature/pitashie-review"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-pitashie-review.jpg"></a></li></ul>';

			$('#productActionBox').after(html);
		}
	}
}

/* productDetail_bookShelfContentsBanner
========================================================================== */
function productDetail_bookShelfContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		// var series = url[url.length - 1].split('-');
		if (url[3] == 'book-shelf') {
			var html = '<ul id="contents-banner"><li><a href="/f/feature/book-shelf-capacity"><img src="https://shiraistore.itembox.design/item/src/book-shelf-capacity_460x96.jpg"></a></li></ul>';
			$('#productActionBox').after(html);
		}
	}
}

/* productDetail_tlfContentsBanner
========================================================================== */
function productDetail_tlfContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'tlf') {
			var html = '<ul id="contents-banner"><li><a href="/f/feature/tallflat-review"><img src="https://shiraistore.itembox.design/item/src/banner_tallflat-review_460x96.jpg"></a></li></ul>';
			$('#productActionBox').after(html);
		}
	}
}

/* productDetail_logContentsBanner
========================================================================== */
function productDetail_logContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'log') {
			var html = '<ul id="contents-banner"><li><a href="/f/feature/loguno-review"><img src="https://shiraistore.itembox.design/item/src/banner_loguno-review_460x96.jpg"></a></li></ul>';
			$('#productActionBox').after(html);
		}
	}
}

/* productDetail_porContentsBanner
========================================================================== */
function productDetail_porContentsBanner() {
	if ($('#fs_ProductDetails').length) {
		var url = window.location.pathname.substring(1);
		url = url.split('/');
		var series = url[url.length - 1].split('-');
		if (series[0] == 'por') {
			var html = '<ul id="contents-banner"><li><a href="/f/feature/portale-review"><img src="https://shiraistore.itembox.design/item/src/banner_portale-review_460x96.jpg"></a></li></ul>';
			$('#productActionBox').after(html);
		}
	}
}

/* productCategory Ranking page+2 DisplayNone
========================================================================== */
function productCategoryRankingDisplayNone() {
	if ($('#fs_ProductCategory').length) {
		var urlParam = window.location.search.substring(1);
		if (urlParam) {
			var param = urlParam.split('&');
			var paramArray = [];
			for (i = 0; i < param.length; i++) {
				var paramItem = param[i].split('=');
				paramArray[paramItem[0]] = paramItem[1];
			}
			if (paramArray.page == '1' || paramArray.page == '') {
				//alert('1ページ目です');
				$('#_rcmdjp_display_1').css('display', 'block');
			} else {
				$('#_rcmdjp_display_1').css('display', 'none');
			}
		}
	}
}

/* productCategory SubCategoryMenu
    ========================================================================== */

function productCategorySubCategoryMenu() {
	if ($('#fs_ProductCategory').length && $('.fs-body-category-category').length != 1) {
		var urlPath = window.location.pathname;
		var pathArray = urlPath.split('/');

		var categoryArray = ['rack', 'tv-stand', 'kitchen', 'clothing', 'entrance', 'cabinet', 'wall-unit-storage', 'table', 'desk', 'kids', 'office-furniture', 'parts', 'outdoor', 'altar'];

		for (i = 0; i < categoryArray.length; i++) {
			var result = $.inArray(categoryArray[i], pathArray);
			if (result > -1) {
				var categoryNum = i + 1;
				break;
			}
		}
		//console.log(categoryNum);
		var html = '';
		var className = '.data-category-area' + categoryNum + ' ul';
		//console.log(className);
		$(className).each(function () {
			html += $(this).prop('outerHTML');
		});

		//console.log(html);

		$('.category-subCategory-menu-inner').each(function () {
			$(this).html(html);
		});

		$('.category-subCategory-menu').css('display', 'block');
	}
}

/* top mainVisual slider
   ========================================================================== */

function topMainVisualSlider() {
	if ($('#fs_Top').length) {
		$('#mainVisual-slider').css('display', 'block');
		$('#mainVisual-slider').slick({
			autoplay: true,
			dots: true,
			centerMode: true,
			arrows: true,
			variableWidth: true,
		});
	}
}

/* productImageViewer
========================================================================== */
function productImageViewer() {
	$('.fs-c-productCarouselMainImage__image').on('click', function () {
		$('header').css('display', 'none');
	});
	$('.pswp__button--close').on('click', function () {
		$('header').css('display', 'block');
	});
}

/* Search word save
========================================================================== */
function searchWordSave(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	if (results != '') $('header .fs-p-advancedSearchForm__input').val(decodeURIComponent(results[2].replace(/\+/g, ' ')));
}

/* productSortSelect
========================================================================== */
function productSortSelect() {
	$('.fs-c-sortItems').each(function () {
		$(this).find('.fs-c-sortItems__label').after('<span class="display_selectedItem"></span>');

		var selectedItem = $(this).find('.is-active').text(),
			selectBox = $(this).find('.fs-c-sortItems__list'),
			selectItems = $(this).find('.fs-c-sortItems__list__item'),
			display = $(this).find('.display_selectedItem');

		display.text(selectedItem);
		selectBox.hide();

		display.on('click', function () {
			selectBox.slideToggle();
		});

		selectItems.on('click', function () {
			selectBox.hide();
			display.text(selectedItem);
		});
	});
}

/* Search tag title
========================================================================== */
//セール会場用バナー表示
function searchTagTitle() {
	var params = parameterToArray();
	if (params.tag == 'sale20230420-20230508') {
		$('#fs_ProductSearch h1').before('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-sale20230420-20230508_1184x240.jpg" alt="3rd Anniversary SALE 対象商品">');
		$('#fs_ProductSearch h1').html('3rd Anniversary SALE 対象商品');
		$('.fs-c-breadcrumb__listItem:last-child').text('3rd Anniversary SALE 対象商品');
		$('title').text('3rd Anniversary SALE 対象商品');
	} else if (params.tag == 'sale20230511-20230518') {
		$('#fs_ProductSearch h1').before('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-sale20230511-20230518_1184x240.jpg" alt="7Days TimeSale 対象商品">');
		$('#fs_ProductSearch h1').html('7Days TimeSale 対象商品');
		$('.fs-c-breadcrumb__listItem:last-child').text('7Days TimeSale 対象商品');
		$('title').text('7Days TimeSale 対象商品');
	} else if (params.tag == 'feature20230303') {
		$('#fs_ProductSearch h1').before('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-feature20230303_1184x240.jpg" alt="入園入学の準備">');
		$('#fs_ProductSearch h1').html('入園入学の準備');
		$('.fs-c-breadcrumb__listItem:last-child').text('入園入学の準備');
		$('title').text('入園入学の準備');
	} else if (params.tag == 'outlet') {
		$('#fs_ProductSearch h1').before('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-outlet_1184x240.jpg" alt="アウトレット家具 対象商品">');
		$('#fs_ProductSearch h1').html('アウトレット家具 対象商品');
		$('.fs-c-breadcrumb__listItem:last-child').text('アウトレット家具 対象商品');
		$('title').text('アウトレット家具対象商品 | 家具インテリア通販のSHIRAI STORE(白井産業)');
		$('meta[name ="description"]').attr('content', '廃番商品をアウトレット家具として21%Off以上の特別価格でご提供 | SHIRAI STOREならいつでもお買い得。会員なら通常送料が無料！（離島・沖縄を除く）');
		$('discrption').text('アウトレット家具対象商品 | 家具インテリア通販のSHIRAI STORE(白井産業)');
		$('h1.fs-c-heading').after(
			'<div id="outlet-description"><h3>アウトレット家具について</h3><ul><li>廃番商品をアウトレット家具として特別価格でご提供しております。お届けする商品はすべて新品です。</li><li>アウトレット家具は在庫限りとなっております。商品の品質には万全を期しておりますが、万が一、返品交換の対象となった場合に交換品がご用意できない場合がございます。その際は返金にて対応させていただきます。</li><li>アウトレット家具は組立サービス対象外となっております。</li><li>ストア会員様は通常商品と同様に、商品割引クーポンと送料無料クーポンをお使いいただけます。</li></ul></div>'
		);
	} else if (params.tag == 'bundle20210121-0218') {
		var newWindowWidth = $(window).width();
		if (newWindowWidth > 480) {
			if (results != '') $('#fs_ProductSearch h1').html('トルフラット まとめ割<span class="subTitle">2点以上お買い上げで15%OFF</span>');
		} else {
			if (results != '') $('#fs_ProductSearch h1').html('トルフラット まとめ割<span class="subTitle">2点以上お買い上げで15%OFF</span>');
		}
		$('.fs-c-breadcrumb__listItem:last-child').text('トルフラット まとめ割 15%OFF');
	} else if (params.tag != undefined) {
		//console.log('params:', params);
		//if (params.mode == 'advanceSearch') {
		//console.log(params.tag);
		var tags_html = '';
		if (params.tag != undefined) {
			var tags = params.tag.split(',');
			for (const tag of tags) {
				$('#fs_ProductSearch h1').text('#' + decodeURIComponent(tag.replace(/\+/g, ' ')) + ' 検索結果');
				tags_html += '<span class="advanceSearchTag">#' + decodeURIComponent(tag) + '</span>';
			}
		}

		//console.log(params.minprice);
		if (params.minprice || params.maxprice) {
			if (params.minprice == 30000) {
				tags_html += '<span class="advanceSearchTag">#' + decodeURIComponent(params.minprice) + '円以上</span>';
			} else if (params.minprice == 0) {
				tags_html += '<span class="advanceSearchTag">#' + decodeURIComponent(params.maxprice) + '円未満</span>';
			} else {
				tags_html += '<span class="advanceSearchTag">#' + decodeURIComponent(params.minprice) + '〜' + decodeURIComponent(params.maxprice) + '円以上</span>';
			}
		}

		$('#fs_ProductSearch h1').html('検索結果<br>' + tags_html);

		if ($('.fs-c-pagination').length) {
			$('.fs-c-pagination a').each(function () {
				var href = $(this).attr('href');
				if (href.indexOf('?') > -1) {
					href = href + '&mode=advanceSearch';
				} else {
					href = href + '?mode=advanceSearch';
				}
				$(this).attr('href', href);
			});
		}

		$('.fs-c-sortItems__list a').each(function () {
			var href = $(this).attr('href');
			if (href.indexOf('?') > -1) {
				href = href + '&mode=advanceSearch';
			} else {
				href = href + '?mode=advanceSearch';
			}
			$(this).attr('href', href);
		});
	} else {
		//$('#fs_ProductSearch h1').text('#' + decodeURIComponent(params.tag.replace(/\+/g, ' ')) + ' 検索結果');
	}
}

function parameterToArray() {
	// URLパラメータを"&"で分離する
	var url_search = location.search.slice(1).split('&');
	//console.log(url_search);
	// パラメータ連想配列エリア初期化
	var param = [];
	// キーエリア初期化
	var key = null;

	for (var i = 0; i < url_search.length; i++) {
		// "&"で分離したパラメータを"="で再分離
		key = url_search[i].split('=');
		// パラメータを連想配列でセット
		param[key[0]] = key[1];
	}

	// 連想配列パラメータを返す
	return param;
}

/* ADIS discription open/close
========================================================================== */
//組立サービス説明 開閉
function ADIS_discriptionOpenClose() {
	$('#optDisc-ADIS-title').on('click', function () {
		$('#optDisc-ADIS-body').slideToggle(function () {
			if ($(this).is(':visible')) {
				$(this).prev('dl').addClass('visible');
			} else {
				$(this).prev('dl').removeClass('visible');
			}
		});
	});
	$('#optDisc-ADIS-close').on('click', function () {
		$('#optDisc-ADIS-body').slideToggle(function () {
			if ($(this).is(':visible')) {
				$(this).prev('dl').addClass('visible');
			} else {
				$(this).prev('dl').removeClass('visible');
			}
		});
	});

	$('.optDisc-ADIS-title').on('click', function () {
		$(this).parents('dt').next('dd').find('.optDisc-ADIS-body').slideToggle();
	});
	$('.optDisc-ADIS-close').on('click', function () {
		$(this).parents('.optDisc-ADIS-body').slideUp();
	});
}

/* MagazineImageChange
========================================================================== */
function magazineImageChange() {
	$('.magazine-product-block li img').hover(function () {
		var imageURL = $(this).attr('src').replace('_thum', '');
		$(this).parents('li').addClass('active');
		$(this).parents('.thumImageBox').next('.mainImageBox').find('img').attr('src', imageURL);
	});
}

/* FAQ AnswerOpen
========================================================================== */
function faqAnswerOpen() {
	$('#faq dt span').click(function () {
		$(this).parents('dt').next('dd').slideToggle();
	});
}

/* Product TagsLink
========================================================================== */
function product_tagsLink() {
	if ($('#fs_ProductDetails').length) {
		var array = $('#product-tagList').text().split(',');
		$('#product-tagList').text('');
		$.each(array, function (i, value) {
			urlTag = value.replace(/ /g, '');
			$('#product-tagList').append('<a href="/p/search?tag=' + encodeURIComponent(urlTag) + '">' + value + '</a>');
		});
	}
}

/* productVariation
========================================================================== */
function productVariation() {
	if ($('#fs_ProductDetails').length) {
		if ($('#product-comment_5').html() != '') {
			var url = $('link[rel="canonical"]').attr('href');
			//console.log(url)
			var variation_text = $('#product-comment_5').text().split(',');
			var variation_ary = [];
			var htmlSource = '';
			for (i = 0; variation_text.length > i; i++) {
				variation_ary.push(variation_text[i].split('/'));
			}
			var productCode = variation_ary[0][0];
			var seriesCode = productCode.slice(0, 3);
			var colorName = variation_ary[0][1];
			//htmlSource = '';
			var url_split = url.split('/');
			url = url.replace(url_split[url_split.length - 1], '');
			for (i = 0; variation_ary.length > i; i++) {
				var seriesCode = variation_ary[i][0].slice(0, 3);
				var productCode = variation_ary[i][0];
				var colorName = variation_ary[i][1];
				var activeFlag = '';
				if (url_split.slice(-1)[0] == productCode) {
					activeFlag = 'active';
				}
				if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
					seriesCode = 'tl';
				} else if (seriesCode == 'ona') {
					seriesCode = 'of2';
				}
				htmlSource = htmlSource + '<li data-productcode="' + productCode + '" class="' + activeFlag + '"><a href="/c/series/' + seriesCode + '/' + productCode + '"><img src="https://shiraistore.itembox.design/item/src/product_variation/' + productCode + '.jpg" alt=""><span>' + colorName + '</span></a></li>';
			}
			//$('#product-comment_5').html('<h4>カラー：' + variation_ary[0][1] + '</h4><ul>' + htmlSource + '</ul>');
			$('#product-comment_5').html('<h4>カラー</h4><ul>' + htmlSource + '</ul>');

			$('#product-comment_5').css('display', 'block');

			// $('#product-comment_5 > ul > li > .variationItem').on('click', function () {
			//     $(this).next('ul').slideToggle();
			// });
			// $('#product-comment_5 > ul > li > ul > li > span').on('click', function () {
			//     window.location.href = url + $(this).parent('li').data('productcode');
			// });
		}
	}
}

/* productSizeVariation
========================================================================== */

function productSizeVariation() {
	//if ($('#fs_preview_header').length) {
	$('#product-comment_9').css('display', 'block');

	if ($('#fs_ProductDetails').length) {
		if ($('#product-comment_9').html() != '') {
			var url = $('link[rel="canonical"]').attr('href');
			//console.log(url)
			var variation_text = $('#product-comment_9').text().split(',');
			var variation_ary = [];
			var htmlSource = '';
			for (i = 0; variation_text.length > i; i++) {
				variation_ary.push(variation_text[i].split('/'));
			}
			//var productCode = variation_ary[0][0];
			//var colorName = variation_ary[0][1];
			//htmlSource = '<li data-productcode="' + productCode + '"><span class="variationItem"><span>' + colorName + '</span></span><ul>';
			var url_split = url.split('/');
			url = url.replace(url_split[url_split.length - 1], '');

			for (i = 0; variation_ary.length > i; i++) {
				var productCode = variation_ary[i][0];
				var seriesCode = productCode.slice(0, 3);
				var colorName = variation_ary[i][1];
				var activeFlag = '';
				if (url_split.slice(-1)[0] == productCode) {
					activeFlag = 'active';
				}
				if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
					seriesCode = 'tl';
				} else if (seriesCode == 'ona') {
					seriesCode = 'of2';
				}
				htmlSource = htmlSource + '<li data-productcode="' + productCode + '" class="' + activeFlag + '"><a href="/c/series/' + seriesCode + '/' + productCode + '" class="variationItem"><span>' + colorName + '</span></a></li>';
			}
			$('#product-comment_9').html('<h4>サイズ</h4><ul>' + htmlSource + '</ul>');
			$('#product-comment_9').css('display', 'block');
			var url_split = url.split('/');
			//console.log(url_split.slice(-1)[0]);
			// url = url.replace(url_split[url_split.length - 1], '');
			// $('#product-comment_9 > ul > li').on('click', function () {
			//     if (url_split.slice(-1)[0] != $(this).data('productcode')) {
			//         window.location.href = url + $(this).data('productcode');
			//     }
			// });
		}
	}
	//}
}

/* productCompatibleList
========================================================================== */

function productCompatibleList() {
	//if ($('#fs_preview_header').length) {
	$('#product-comment_13').css('display', 'block');

	if ($('#fs_ProductDetails').length) {
		if ($('#product-comment_13').html() != '') {
			var compatible_text = $('#product-comment_13').text().split(',');
			//(compatible_text);
			var compatible_ary = [];
			var htmlSource = '';
			for (i = 0; compatible_text.length > i; i++) {
				compatible_ary.push(compatible_text[i].split('/'));
			}
			for (i = 0; compatible_ary.length > i; i++) {
				var productCode = compatible_ary[i][0];
				var productName = compatible_ary[i][1];
				var seriesCode = productCode.substr(0, 3);

				if (productCode.indexOf('tnl-em') == -1) {
					htmlSource = htmlSource + '<li><a  href="/c/series/' + seriesCode + '/' + productCode + '" class="compatibleItem"><img src="https://shiraistore.itembox.design/item/src/product_variation/' + productCode + '.jpg"><span>' + productName + '</span></a></li>';
				} else {
					var url = $('link[rel="canonical"]').attr('href');
					// console.log('url:',url);
					var url_split = url.split('/');
					// console.log('url_split:',url_split);
					var activeProductCode = url_split[url_split.length - 1];
					// console.log('activeProductCode:',activeProductCode);
					activeProductColor = activeProductCode.replace(/...-.+-/, '');
					activeProductCode = activeProductCode.replace(/(-[a-z][a-z]$)/, '');
					// console.log('activeProductCode:',activeProductCode);
					var activeProductCode_width = activeProductCode.substr(-2, 2);
					// console.log('activeProductCode_width:',activeProductCode_width);
					var imageName;
					switch (activeProductCode_width) {
						case '31':
							imageName = 'TNL-EMU015_034M-' + activeProductColor.toUpperCase();
							break;
						case '44':
							imageName = 'TNL-EMU035_044M-' + activeProductColor.toUpperCase();
							break;
						case '59':
							imageName = 'TNL-EMU045_060M-' + activeProductColor.toUpperCase();
							break;
						case '87':
							imageName = 'TNL-EMU081_090M-' + activeProductColor.toUpperCase();
							break;
					}
					productCode = productCode.replace(/(-[a-z][a-z]$)/, '');
					imageName;
					htmlSource = htmlSource + '<li><a  href="/f/sizeOrder/' + productCode + '?w=' + activeProductCode_width + '&d=m&c=' + activeProductColor + '" class="compatibleItem"><img src="/assets/img/product/sizeOrder/tnl-em/thum/' + imageName + '_thum.jpg"><span>' + productName + ' オーダーメイド</span></a></li>';
				}
			}
			$('#product-comment_13').html('<h4>対応商品</h4><ul>' + htmlSource + '</ul>');
			$('#product-comment_13').css('display', 'block');
		}
	}
	//}
}

/* reviewSlideDown
========================================================================== */

function reviewSlideDown(id, cssHeight) {
	if ($(id).length) {
		var i = 0;
		$('.fs-c-reviewList__item').each(function () {
			sHeight = $('.fs-c-reviewList__item').get(i).scrollHeight; // 隠れているテキストの高さ
			oHeight = $('.fs-c-reviewList__item').get(i).offsetHeight; // 表示されているテキストの高さ
			hiddenDiff = sHeight - oHeight;

			if (hiddenDiff > 0) {
				$(this).append('<div class="readMore" >続きを見る</div>');
			}

			i++;
		});

		// more
		$('.readMore').click(function () {
			//get data
			txt_height = parseInt($(this).parent('.fs-c-reviewList__item').css('height'), 10);
			//console.log('txt_height:' + txt_height);
			sHeight = $(this).parent('.fs-c-reviewList__item').get(0).scrollHeight;
			oHeight = $(this).parent('.fs-c-reviewList__item').get(0).offsetHeight;
			hiddenDiff = sHeight - oHeight;

			new_txt_height = txt_height + hiddenDiff;

			//console.log('sHeight:' + sHeight);
			//console.log('oHeight:' + oHeight);
			//console.log('hiddenDiff:' + hiddenDiff);
			//console.log('txt_height:' + txt_height);
			//console.log('new_txt_height:' + new_txt_height);
			//console.log('cssHeight:' + cssHeight);

			if (new_txt_height < cssHeight) {
				//console.log('A');
				cssHeight = new_txt_height;
			}

			$(this)
				.parent('.fs-c-reviewList__item')
				.css({ 'max-height': 'inherit', height: cssHeight + 'px' });
			$(this).parent('.fs-c-reviewList__item').animate({ height: new_txt_height }, 500);
			$(this).slideUp();
		});
	}
}

/* instagramPostList
========================================================================== */

function instagramPostList() {
	if ($('#fs_Top, #shirai_fan').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/instagramDisplayPhoto_v1_0.json', function (instagramPostData) {
			var listHtml = '';
			for (var i in instagramPostData.reverse()) {
				var postId = instagramPostData[i].postId,
					thumbnail_url = instagramPostData[i].thumbnail_url,
					sizeAdjustment = instagramPostData[i].sizeAdjustment;

				listHtml = '<li class="modal-open" data-target="instagramPost-modal" data-postid="' + postId + '"><img src="' + thumbnail_url + '" style="width:' + sizeAdjustment + '%;height:' + sizeAdjustment + '%;" alt="instagramPost_' + postId + '"></li>';
				$('#postedList').append(listHtml);

				if (i == 9 && $('#fs_Top').length) {
					break;
				}
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
			averageRating_html = '<span class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + averageRating + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '" class="itemReviewCount">（' + reviewCount + '）</a></span>';
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
			'<li class="relatedProductItem"><a href="https://shirai-store.net/c/series/' +
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
			'" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazyload"></a><p><a href="https://shirai-store.net/c/series/' +
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

	var prevPost = $('#postedList')
		.children('[data-postid=' + id + ']')
		.prev('li')
		.data('postid');
	var nextPost = $('#postedList')
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

function multipleRankingTop10() {
	$('.productTop10Slider').each(function () {
		if (typeof $(this).data('category') !== 'undefined') {
			console.log('AAAA');
			var category = $(this).data('category');
			if (category == 'allProducts') {
				var categoryName = '';
			} else {
				var categoryName = '-' + category;
			}

			var jsonurl = 'https://cdn.shirai-store.net/assets/json/ranking/ranking' + categoryName + '_v2_0.json';
			var selector = $(this);
			//console.log(jsonurl);
			$.getJSON(jsonurl, selector, function (rankingList) {
				for (var i in rankingList) {
					var productUrl = rankingList[i].productUrl,
						seriesCode = productUrl.slice(0, 3),
						productId = rankingList[i].productId,
						productName = rankingList[i].productName,
						productId_12Len = zeroPadding(productId, 12),
						product_image_group = Math.floor(productId / 100),
						sellingPrice = Number(rankingList[i].sellingPrice),
						normalPrice = Number(rankingList[i].normalPrice),
						icon = rankingList[i].icon,
						size = rankingList[i].size,
						reviewScore = Number(rankingList[i].averageRating).toFixed(1),
						reviewCount = Number(rankingList[i].reviewCount),
						thumbnail = rankingList[i].thumbNumber;

					thumbnail = ('00' + thumbnail).slice(-2);

					if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
						seriesCode = 'tl';
					} else if (seriesCode == 'ona') {
						seriesCode = 'of2';
					}

					if (sellingPrice < normalPrice) {
						sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
					} else {
						sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
					}

					var icon_ary = icon.split(',');

					var iconHtml = '';
					for (var j = 0; j < icon_ary.length; j++) {
						if (icon_ary[j] != '') {
							icon_ary[j] = icon_ary[j].split(':');

							if (icon_ary[j][0] == 'mark-rank' && category == '') {
								//categoryName = categoryNameShorter(categoryName);
								iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
							}

							if (icon_ary[j][0] == 'mark-categoryRank' && category != '') {
								//categoryName = categoryNameShorter(categoryName);
								iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
							}

							if (icon_ary[j][0] == 'mark-new') {
								iconHtml += '<span class="mark-new">新着</span>';
							}

							if (icon_ary[j][0] == 'mark-longseller') {
								iconHtml += '<span class="mark-longseller">ロングセラー</span>';
							}

							if (icon_ary[j][0] == 'mark-limitedProduct') {
								iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
							}

							if (icon_ary[j][0] == 'mark-sale') {
								iconHtml += '<span class="mark-sale">SALE</span>';
							}
						}
					}

					if (reviewScore < 0.5) {
						reviewScore = '0';
					} else if (reviewScore < 1.0) {
						reviewScore = '0.5';
					} else if (reviewScore < 1.5) {
						reviewScore = '1.0';
					} else if (reviewScore < 2.0) {
						reviewScore = '1.5';
					} else if (reviewScore < 2.5) {
						reviewScore = '2.0';
					} else if (reviewScore < 3.0) {
						reviewScore = '2.5';
					} else if (reviewScore < 3.5) {
						reviewScore = '3.0';
					} else if (reviewScore < 4.0) {
						reviewScore = '3.5';
					} else if (reviewScore < 4.5) {
						reviewScore = '4.0';
					} else if (reviewScore < 5) {
						reviewScore = '4.5';
					} else if (reviewScore == 5) {
						reviewScore = '5.0';
					}

					var reviewHTML = '';

					if (reviewScore != 0) {
						reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
					} else {
						reviewHTML = '';
					}

					var h =
						'<li><a href="/c/series/' +
						seriesCode +
						'/' +
						productUrl +
						'"><img src="https://shiraistore.itembox.design/product/' +
						zeroPadding(product_image_group, 3) +
						'/' +
						productId_12Len +
						'/' +
						productId_12Len +
						'-' +
						thumbnail +
						'-m.jpg" alt="' +
						productName +
						'" >' +
						productName +
						'</a>' +
						'<div class="productMarks">' +
						iconHtml +
						'</div>' +
						'<div class="productSize">' +
						size +
						'</div>' +
						reviewHTML +
						'<a href="/c/series/' +
						seriesCode +
						'/' +
						productUrl +
						'">' +
						sellingPrice +
						'</a></li>';

					selector.find('ul').append(h);

					var urlPath = location.pathname;
					//console.log(urlPath);
					if (urlPath == '/c/category/table' && i == 8) {
						checkScreenSize();
						break;
					}

					if (i == 9) {
						checkScreenSize();
						break;
					}
				}
			});

			$(this)
				.find('ul')
				.after('<div class="fs-c-buttonContainer more-button"><a href="/f/ranking' + categoryName + '" class="fs-c-button--standard">もっと見る</a></div>');
		}
	});
}

/* rankingTop10_forFanplayr
========================================================================== */

function rankingTop10_forFanplayr(category) {
	var jsonurl = 'https://cdn.shirai-store.net/assets/json/ranking/ranking-' + category + '_v2_0.json';
	$.getJSON(jsonurl, function (rankingList) {
		for (var i in rankingList) {
			var productUrl = rankingList[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = rankingList[i].productId,
				productName = rankingList[i].productName,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				sellingPrice = Number(rankingList[i].sellingPrice),
				normalPrice = Number(rankingList[i].normalPrice),
				icon = rankingList[i].icon,
				size = rankingList[i].size,
				reviewScore = Number(rankingList[i].averageRating).toFixed(1),
				reviewCount = Number(rankingList[i].reviewCount),
				thumbnail = rankingList[i].thumbNumber,
				categoryName = rankingList[i].categoryLv1,
				categoryUrl = rankingList[i].categoryUrl;

			// console.log(icon);

			thumbnail = ('00' + thumbnail).slice(-2);

			if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
				seriesCode = 'tl';
			} else if (seriesCode == 'ona') {
				seriesCode = 'of2';
			}

			if (sellingPrice < normalPrice) {
				sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			} else {
				sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			}

			var icon_ary = icon.split(',');

			var iconHtml = '';
			for (var j = 0; j < icon_ary.length; j++) {
				if (icon_ary[j] != '') {
					icon_ary[j] = icon_ary[j].split(':');

					if (icon_ary[j][0] == 'mark-categoryRank') {
						//categoryName = categoryNameShorter(categoryName);
						iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
					}

					if (icon_ary[j][0] == 'mark-new') {
						iconHtml += '<span class="mark-new">新着</span>';
					}

					if (icon_ary[j][0] == 'mark-longseller') {
						iconHtml += '<span class="mark-longseller">ロングセラー</span>';
					}

					if (icon_ary[j][0] == 'mark-limitedProduct') {
						iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
					}

					if (icon_ary[j][0] == 'mark-sale') {
						iconHtml += '<span class="mark-sale">SALE</span>';
					}
				}
			}

			if (reviewScore < 0.5) {
				reviewScore = '0';
			} else if (reviewScore < 1.0) {
				reviewScore = '0.5';
			} else if (reviewScore < 1.5) {
				reviewScore = '1.0';
			} else if (reviewScore < 2.0) {
				reviewScore = '1.5';
			} else if (reviewScore < 2.5) {
				reviewScore = '2.0';
			} else if (reviewScore < 3.0) {
				reviewScore = '2.5';
			} else if (reviewScore < 3.5) {
				reviewScore = '3.0';
			} else if (reviewScore < 4.0) {
				reviewScore = '3.5';
			} else if (reviewScore < 4.5) {
				reviewScore = '4.0';
			} else if (reviewScore < 5) {
				reviewScore = '4.5';
			} else if (reviewScore == 5) {
				reviewScore = '5.0';
			}

			var reviewHTML = '';

			if (reviewScore != 0) {
				reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '&fp=' + category + 'ranking">（' + reviewCount + '）</a></div>';
			} else {
				reviewHTML = '';
			}

			var h =
				'<li><a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'?fp=' +
				category +
				'ranking"><img src="https://shiraistore.itembox.design/product/' +
				zeroPadding(product_image_group, 3) +
				'/' +
				productId_12Len +
				'/' +
				productId_12Len +
				'-' +
				thumbnail +
				'-m.jpg" alt="' +
				productName +
				'" ><h3>' +
				productName +
				'</h3></a>' +
				'<div class="productMarks">' +
				iconHtml +
				'</div>' +
				'<div class="productSize">' +
				size +
				'</div>' +
				reviewHTML +
				'<a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'?fp=' +
				category +
				'ranking">' +
				sellingPrice +
				'</a></li>';

			$('#rankingTop10_forFanplayr ul').append(h);
			var urlPath = location.pathname;
			//console.log(urlPath);
			if (urlPath == '/c/category/table' && i == 8) {
				checkScreenSize();
				break;
			}

			if (i == 9) {
				checkScreenSize();
				break;
			}
		}

		$('#rankingTop10_forFanplayr-outer').css('display', 'block');
	});
	var categoryName = '';
	switch (category) {
		case 'rack':
			categoryName = '本棚・ラック';
			break;
		case 'tv-stand':
			categoryName = 'テレビ台';
			break;
		default:
			break;
	}

	$('#rankingTop10_forFanplayr ul').before('<h4>' + categoryName + ' ランキング</h4>');
	$('#rankingTop10_forFanplayr ul').after('<div class="fs-c-buttonContainer more-button"><a href="/f/ranking-' + cateory + '?fp=' + category + 'ranking" class="fs-c-button--standard">もっと見る</a></div>');
	g;
}

/* modal
========================================================================== */

function modal() {
	// ウィンドウを開く
	$('.modal-open, .modal-open-instagram').on('click', function () {
		$('body').css('overflow', 'hidden');
		var target = $(this).data('target');
		var modal = document.getElementById(target);
		$(modal).fadeIn(300);
		return false;
	});

	// ウィンドウを閉じる
	$('.modal-close').on('click', function () {
		$('body').css('overflow', 'inherit');
		$('.modal').fadeOut(300);
		return false;
	});

	$('.modal-content').on('click', function (event) {
		event.stopPropagation();
	});
}

/* soldOut
========================================================================== */

function soldOut() {
	if ($('.fs-c-productNotice--outOfStock').length && $('.mark-soldout').length) {
		$('.fs-c-productNotice--outOfStock').html('完売しました。<span>次回の入荷はございません。</span>');
	}
}

/* SearchFilter tnl
========================================================================== */
function searchFilterTnl() {
	if ($('#fs_ProductSearch').length || $('.fs-body-category-tnl').length) {
		var param = decodeURIComponent(location.search).replace('?', '');
		params = param.split(/\+|=|&/);
		// console.log(param);
		// console.log(param.indexOf('search-tnl'));

		if (param.indexOf('search-tnl') > -1 || param.indexOf('sale20221027-20221110') > -1 || $('.fs-body-category-tnl').length) {
			if (!param.indexOf('sale20221027-20221110') > -1) {
				$('#fs_ProductSearch h1').text('タナリオ サイズ絞り込み検索');
				$('.fs-c-breadcrumb__listItem:last-child').text('タナリオ サイズ絞り込み検索');
			}

			$('.fs-c-productList__list').before(
				'<div id="productSearchBox" class="tnl"><h4>サイズで絞り込む</h4><select id="tnl-width"><option value="">横幅</option><option value="幅31cm">幅31cm</option><option value="幅44cm">幅44cm</option><option value="幅59cm">幅59cm</option><option value="幅87cm">幅87cm</option><option value="幅117cm">幅117cm</option></select><select id="tnl-height"><option value="">高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option><option value="高さ120cm">高さ120cm</option><option value="高さ150cm">高さ150cm</option><option value="高さ180cm">高さ180cm</option><option value="高さ198cm">高さ198cm</option></select><select id="tnl-color"><option value="">カラー</option><option value="ナチュラルブラウン">ナチュラルブラウン</option><option value="ダークブラウン">ダークブラウン</option><option value="ホワイト">ホワイト（白木目）</option></select><button>絞り込む</button></div>'
			);

			var selectedWidth = '',
				selectedHeight = '',
				selectedColor = '';

			if (params.indexOf('幅31cm') > 0) {
				selectedWidth = '幅31cm';
			} else if (params.indexOf('幅44cm') > 0) {
				selectedWidth = '幅44cm';
			} else if (params.indexOf('幅59cm') > 0) {
				selectedWidth = '幅59cm';
			} else if (params.indexOf('幅87cm') > 0) {
				selectedWidth = '幅87cm';
			} else if (params.indexOf('幅117cm') > 0) {
				selectedWidth = '幅117cm';
				$('#tnl-height').html('<option value="" selected>高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option></select>');
			}

			if (params.indexOf('高さ60cm') > 0) {
				selectedHeight = '高さ60cm';
			} else if (params.indexOf('高さ90cm') > 0) {
				selectedHeight = '高さ90cm';
			} else if (params.indexOf('高さ120cm') > 0) {
				selectedHeight = '高さ120cm';
			} else if (params.indexOf('高さ150cm') > 0) {
				selectedHeight = '高さ150cm';
			} else if (params.indexOf('高さ180cm') > 0) {
				selectedHeight = '高さ180cm';
			} else if (params.indexOf('高さ198cm') > 0) {
				selectedHeight = '高さ198cm';
			}

			if (param.indexOf('ナチュラルブラウン') > 0) {
				selectedColor = 'ナチュラルブラウン';
			} else if (param.indexOf('ダークブラウン') > 0) {
				selectedColor = 'ダークブラウン';
			} else if (param.indexOf('ホワイト') > 0) {
				selectedColor = 'ホワイト';
			}

			$('#productSearchBox.tnl #tnl-width').val(selectedWidth);
			$('#productSearchBox.tnl #tnl-height').val(selectedHeight);
			$('#productSearchBox.tnl #tnl-color').val(selectedColor);

			var flag = 0;
			$(document).on('change', '#productSearchBox.tnl #tnl-width', function () {
				if ($('#productSearchBox.tnl #tnl-width').val() == '幅117cm') {
					$('#tnl-height').html('<option value="">高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option></select>');
					flag = 1;
				} else {
					if (flag == 1) {
						$('#tnl-height').html('<option value="">高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option><option value="高さ120cm">高さ120cm</option><option value="高さ150cm">高さ150cm</option><option value="高さ180cm">高さ180cm</option><option value="高さ198cm">高さ198cm</option></select>');
						flag = 0;
					}
				}
			});

			$('#productSearchBox.tnl button').on('click', function () {
				var width = $('#productSearchBox.tnl #tnl-width').val(),
					height = $('#productSearchBox.tnl #tnl-height').val(),
					color = $('#productSearchBox.tnl #tnl-color').val(),
					type = '';
				if (width) {
					type = '+' + width;
				}
				if (height) {
					type = type + '+' + height;
				}
				if (color) {
					color = ',' + color;
				}
				window.location.href = 'https://shirai-store.net/p/search?tag=search-tnl' + color + '&keyword=%E3%82%BF%E3%83%8A%E3%83%AA%E3%82%AA' + type + '&sort=price_low';
			});
		}
	}
}

/* RewriteDOM
========================================================================== */
function rewriteDOM() {
	if ($('#fs_ProductDetails').length) {
		//シリーズ名表示
		var seriesName = $('#product-comment_1').html();
		$('#product-comment_1').remove();
		$('.fs-c-productNumber__label').html(seriesName + '：');

		//商品詳細に画像が1枚だけの場合に画像を中央表示
		if (!$('.fs-c-productCarouselMainImage__thumbnail__img').length) {
			$('.fs-c-productCarouselMainImage').css('justify-content', 'space-around');
		}

		//ADIS説明移動
		$('#optDisc-ADIS-body').insertAfter('.fs-c-productOption__comment');

		//ADIS扉オプション移動
		$('.fs-c-productSelection').insertAfter('#optDisc-ADIS-body');

		//ADIS扉オプション表示制御
		//最初の状態
		var optionName = $('#optionWithPrice_1').val();
		$('#option_1').val('組立サービスのみ指定可');
		$('#option_2').val('組立サービスのみ指定可');
		if (optionName == 'ADIS-00') {
			$('.fs-c-productSelection').slideUp();
		}

		//URLで分岐
		if (location.href.match('por-5530du|hnb-4540d|por-1830d')) {
			$('.fs-c-productSelection .fs-c-productSelection__field').append('<img src="https://shiraistore.itembox.design/item/src/product_detail/detail-doorOpeningDirection.png">');
		} else if (location.href.match('adl')) {
			$('.fs-c-productSelection .fs-c-productSelection__field').append('<img src="https://shiraistore.itembox.design/item/src/product_detail/detail-adlOpeningDirection.png">');
		}

		//組立サービス変更
		$('#optionWithPrice_1').change(function () {
			optionName = $('#optionWithPrice_1').val();
			if (optionName != 'ADIS-00') {
				$('.fs-c-productSelection').slideDown();
				$('#option_1').val('');
				$('#option_1 option[value="組立サービスのみ指定可"]').attr('disabled', 'disabled');
				$('#option_1 option[value="組立サービスのみ指定可"]').remove();
			} else {
				$('.fs-c-productSelection').slideUp();
				$('#option_1').append($('<option>').html('組立サービスのみ指定可').val('組立サービスのみ指定可'));
				$('#option_1 option[value="組立サービスのみ指定可"]').removeAttr('disabled').prop('selected', true);
			}
		});

		//商品詳細：お気に入りボタン移動
		$('.fs-c-productQuantityAndWishlist .fs-c-productQuantityAndWishlist__wishlist').insertAfter('.fs-c-button--addToCart--detail');

		//在庫がない場合のフラグ
		if ($('.fs-c-productNotice--outOfStock').length) {
			$('body').addClass('outOfStock');
		}

		if (!$('.fs-c-productOption').length) {
			$('#productActionBox').before('<dl class="fs-c-productOption unusable"><dt class="fs-c-productOption__name"><label for="optionWithPrice_1" class="fs-c-productOption__label">組立サービス</label></dt><dd class="fs-c-productOption__option">この商品は組立サービスをご利用いただけません。</dd></dl>');
		}

		//タナリオサイズオーダー テキストリンク

		var url = location.pathname;
		var seriseCode = url.split('/').pop();
		// console.log('seriseCode:', seriseCode);

		if (seriseCode.indexOf('tnl-t') != -1) {
			$('.fs-c-productPostage').after('<div class="sizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div>【サイズオーダー】ご希望のサイズでお作りします。<a href="/f/sizeOrder/tnl-emts">横幅1cm単位でご注文はこちら</a></div></div>');
		} else if (seriseCode.indexOf('tnl-198') != -1 || seriseCode.indexOf('tnl-18') != -1) {
			$('.fs-c-productPostage').after(
				'<div class="sizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div></span>【サイズオーダー】ご希望のサイズでお作りします。<a href="/f/sizeOrder/tnl-em-introduction">横幅1cm単位でご注文はこちら</a><a href="/f/sizeOrder/tnl-emu">上置きのご注文はこちら</a></span></div></div>'
			);
		} else if (seriseCode.indexOf('tnl-') != -1) {
			$('.fs-c-productPostage').after('<div class="sizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div>【サイズオーダー】ご希望のサイズでお作りします。<a href="/f/sizeOrder/tnl-em-introduction">横幅1cm単位でご注文はこちら</a></div></div>');
		} else if (seriseCode.match(/.*sep-[0-9]{4}?-.*/) != null) {
			$('.fs-c-productPostage').after('<div class="sizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div>【サイズオーダー】1〜30マスまでご希望のサイズでお作りします。<a href="/f/sizeOrder/sep-emrack">1マス単位でのご注文はこちら</a></div></div>');
		} else if (seriseCode.match(/.*sep-[0-9]{4}?desk.+-.*/) != null) {
			$('.fs-c-productPostage').after('<div class="sizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div>【サイズオーダー】横幅60〜210cmまでご希望のサイズでお作りします。<a href="/f/sizeOrder/sep-emdesk">横幅1cm単位でご注文はこちら</a></div></div>');
		}

		// console.log('match:', seriseCode.match(/.*sep-[0-9]{4}?-.*/));
	}

	if ($('#fs_ShoppingCart').length) {
		// 組立オプション指定があった場合のカート内表示変更
		var productUrl = '';
		var productUrl_ary = '';
		var modelNumber = '';

		// 該当するmodelNumberを配列に格納する
		var optionHasProducts = ['por-1830d-na', 'por-1830d-wh', 'por-1830d-dk', 'por-5530du-na', 'por-5530du-wh', 'por-5530du-dk', 'hnb-4540d', 'adl-4013dh-na', 'adl-4013dh-wh', 'adl-4013dh-dk'];

		$('.fs-c-cartTable__productName__name').each(function () {
			// 商品のリンクを取得する
			productUrl = $(this).find('.fs-c-listedProductName__name').attr('href');

			// 配列にする
			productUrl_ary = productUrl.split('/');

			// リンクの最後の部分(型番)を取得
			modelNumber = productUrl_ary[productUrl_ary.length - 1];

			//optionHasProductsにmodelNumberがあるか判定する
			if (optionHasProducts.indexOf(modelNumber) != -1) {
				//modelNumberが該当商品であるか判定し処理を分岐
				if (modelNumber.match(/por-5530du|hnb-4540d|por-1830d/)) {
					//あるのであれば.fs-c-listedProductName__selection__choiceの値を取得する
					var optionValue = '';
					var optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
					optionValue = `（扉の開き方：${optionValue})`;
					//console.log(optionValue);

					//textとして挿入
					$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
				} else if (modelNumber.match(/adl-4013dh/)) {
					var optionValue = '';
					var optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
					optionValue = `（組立の向き：${optionValue})`;
					//console.log(optionValue);

					$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
				}
			}
		});
	}

	//カテゴリページ制御
	// if ($('body[class*="fs-body-category-"]').length) {
	// 	//シリーズ商品一覧メイン画像
	// 	var seriesUrl = location.pathname.replace('/c/series/', '');
	// 	//console.log(seriesUrl);
	// 	if (seriesUrl != 'wlk' && seriesUrl != 'mdl') {
	// 		$('#category-series-visual').html('<img src="https://shiraistore.itembox.design/item/src/series/main-' + seriesUrl + '.jpg" alt="">');
	// 	}
	// }

	//カートページのサイズオーダー商品サムネイル表示
	if ($('#fs_ShoppingCart').length) {
		$('.fs-c-cartTable a').each(function () {
			if ($(this).attr('href').indexOf('tnl-emts') >= 0) {
				$(this).attr('href', '/f/sizeOrder/tnl-emts');
				$(this).parents('.fs-c-cartTable__product').addClass('sizeOrder');
			} else if ($(this).attr('href').indexOf('tnl-emu') >= 0) {
				$(this).attr('href', '/f/sizeOrder/tnl-emu');
				$(this).parents('.fs-c-cartTable__product').addClass('sizeOrder');
			} else if ($(this).attr('href').indexOf('tnl-em') >= 0) {
				$(this).attr('href', '/f/sizeOrder/tnl-em');
				$(this).parents('.fs-c-cartTable__product').addClass('sizeOrder');
			} else if ($(this).attr('href').indexOf('sep-emdesk') >= 0) {
				$(this).attr('href', '/f/sizeOrder/sep-emdesk');
				$(this).parents('.fs-c-cartTable__product').addClass('sizeOrder');
			} else if ($(this).attr('href').indexOf('sep-em') >= 0) {
				$(this).attr('href', '/f/sizeOrder/sep-emrack');
				$(this).parents('.fs-c-cartTable__product').addClass('sizeOrder');
			} else {
				$(this).parents('.fs-c-cartTable__product').addClass('readyMade');
			}
		});

		var orderDetails = '',
			productNumber = '',
			orderType = '',
			orderHeight = '',
			orderWidth = '',
			orderDepth = '',
			orderColor = '';

		$('.sizeOrder').each(function () {
			orderDetails = $(this).find('.fs-c-listedOptionPrice__option__value').html();
			//console.log(orderDetails);
			var href = $(this).find('.fs-c-listedProductName__name').attr('href');
			//console.log(href);
			if (href.indexOf('tnl-em') >= 0) {
				if (orderDetails.indexOf('本体') >= 0) {
					orderType = 'TNL-EM';
					orderHeight = orderDetails.replace(/.*高さ([0-9]+)cm.*/g, '$1');
					if (orderHeight < 100) {
						orderType = 'TNL-EM0';
					}
				} else if (orderDetails.indexOf('上置き') >= 0) {
					orderType = 'TNL-EMU';
					orderHeight = '';
				} else if (orderDetails.indexOf('追加移動棚') >= 0) {
					orderType = 'TNL-EMTS';
				}
				orderWidth = orderDetails.replace(/.*横幅([0-9]+)cm.*/g, '$1');

				if (orderWidth >= 15 && orderWidth <= 34) {
					orderWidth = '015_034';
				} else if (orderWidth >= 35 && orderWidth <= 44) {
					orderWidth = '035_044';
				} else if (orderWidth >= 45 && orderWidth <= 60) {
					orderWidth = '045_060';
				} else if (orderWidth >= 61 && orderWidth <= 70) {
					orderWidth = '061_070';
				} else if (orderWidth >= 71 && orderWidth <= 80) {
					orderWidth = '071_080';
				} else if (orderWidth >= 81 && orderWidth <= 90) {
					orderWidth = '081_090';
				}

				orderDepth = orderDetails.replace(/.*奥行([0-9]+)cm.*/g, '$1');
				if (orderDepth == 19) {
					orderDepth = 'A';
				} else if (orderDepth == 29) {
					orderDepth = 'M';
				} else if (orderDepth == 44) {
					orderDepth = 'F';
				}

				orderColor = $(this).find('.fs-c-listedOptionPrice__option:nth-child(3) .fs-c-listedOptionPrice__option__value').text();

				switch (orderColor) {
					case 'ブラックウォールナット':
						orderColor = 'KW';
						break;
					case 'ダークオーク':
						orderColor = 'DK';
						break;
					case 'ブラウンウォールナット':
						orderColor = 'BW';
						break;
					case 'ブラウンオーク':
						orderColor = 'BO';
						break;
					case 'ナチュラルチーク':
						orderColor = 'NT';
						break;
					case 'ナチュラルオーク3':
						orderColor = 'NC';
						break;
					case 'ナチュラルオーク1':
						orderColor = 'NA';
						break;
					case 'ナチュラルビーチ':
						orderColor = 'NB';
						break;
					case 'ホワイトオーク':
						orderColor = 'WH';
						break;
					case 'ホワイト単色':
						orderColor = 'WT';
						break;
				}

				if (orderType == 'TNL-EMTS') {
					var thumbnail = orderType + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';
				} else {
					var thumbnail = orderType + orderHeight + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';
				}

				$(this)
					.find('img')
					.attr('src', '/assets/img/product/sizeOrder/tnl-em/thum/' + thumbnail);
			} else if (href.indexOf('sep-emrack') >= 0) {
				//console.log('emrack');
				orderWidth = orderDetails.replace(/.*横([0-9]+)マス.*/g, '$1');
				orderHeight = orderDetails.replace(/.*縦([0-9]+)マス.*/g, '$1');

				// console.log('orderWidth:', orderWidth);
				// console.log('orderHeight:', orderHeight);

				orderColor = $(this).find('.fs-c-listedOptionPrice__option:nth-child(3) .fs-c-listedOptionPrice__option__value').text();

				switch (orderColor) {
					case 'ダークブラウン':
						orderColor = 'dk';
						break;
					case 'ナチュラルブラウン':
						orderColor = 'na';
						break;
					case 'アイボリー':
						orderColor = 'iv';
						break;
				}

				var thumbnail = orderWidth + '-' + orderHeight + '-' + orderColor + '_thum.jpg';

				//console.log(thumbnail);

				$(this)
					.find('img')
					.attr('src', '/assets/img/product/sizeOrder/sep-em/rack/thum/' + thumbnail);
			} else if (href.indexOf('sep-emdesk') >= 0) {
				//console.log('emdesk');
				orderWidth = orderDetails.replace(/.*横幅([0-9]+)cm.*/g, '$1');
				if (orderDetails.indexOf('深型')) {
					orderDepth = 'f';
				} else if (orderDetails.indexOf('浅型')) {
					orderDepth = 'a';
				}

				// console.log('orderWidth:', orderWidth);
				// console.log('orderDepth:', orderDepth);

				orderColor = $(this).find('.fs-c-listedOptionPrice__option:nth-child(3) .fs-c-listedOptionPrice__option__value').text();

				switch (orderColor) {
					case 'ダークブラウン':
						orderColor = 'dk';
						break;
					case 'ナチュラルブラウン':
						orderColor = 'na';
						break;
					case 'アイボリー':
						orderColor = 'iv';
						break;
				}

				orderWidth = orderWidth.slice(0, -1) + '0';

				var thumbnail = orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';

				//console.log(thumbnail);

				$(this)
					.find('img')
					.attr('src', '/assets/img/product/sizeOrder/sep-em/desk/thum/' + thumbnail);
			}
		});

		$('.readyMade .fs-c-productImage img ').each(function () {
			var readyMadeImage = $(this).attr('src');
			readyMadeImage = readyMadeImage.replace(/[0-9]{2}-xs.jpg/, '02-xs.jpg');
			//console.log(readyMadeImage);
			$(this).attr('src', readyMadeImage);
		});
	}
}

/* timeSale
========================================================================== */

function timeSale() {
	//スライダー：タイムセール
	if ($('.fs-c-productListCarousel__list__item .mark-sale,.fs-c-productListCarousel__list__item .mark-outlet').length) {
		$('.mark-sale, .mark-clearance, .mark-outlet').each(function () {
			$(this).parents('.fs-c-productListCarousel__list__item').addClass('time-sale');
		});
	}

	//商品一覧：タイムセール
	if ($('.mark-sale, .mark-clearance, .mark-outlet').length) {
		$('.mark-sale, .mark-clearance, .mark-outlet').each(function () {
			$(this).parents('.fs-c-productList__list__item').addClass('time-sale');
		});
	}

	//商品詳細：タイムセール
	if ($('body.fs-body-product .fs-c-productPrice__main__label').length) {
		$('body').addClass('time-sale');
		var normalPrice = $('.fs-c-productPrice--selling .fs-c-price__value').text().replace(',', ''),
			salePrice = $('.fs-c-productPrice--member .fs-c-price__value').text().replace(',', '');
		var priceOffValue = Math.round((1 - salePrice / normalPrice) * 100 * 10) / 10;
		$('.fs-c-productPrice--member .fs-c-productPrice__addon__label').before('<span class="priceOffValue">' + priceOffValue + '% OFF</span>');

		//スモールセール用在庫表示
		if (stockValue <= 3) {
			$('body.fs-body-product .fs-c-productStock').text('残りわずか');
			$('body.fs-body-product .fs-c-productStock').addClass('leftOver');
		} else {
			$('body.fs-body-product .fs-c-productStock').text('在庫あり');
		}
		$('body.fs-body-product .fs-c-productStock').css('display', 'inline-block');
	} else {
		var stockValue = $('.fs-c-productStock__number').text();
		if (stockValue <= 3) {
			$('body.fs-body-product .fs-c-productStock').text('残りわずか');
			$('body.fs-body-product .fs-c-productStock').addClass('leftOver');
		} else {
			$('body.fs-body-product .fs-c-productStock').text('在庫あり');
		}
		$('body.fs-body-product .fs-c-productStock').css('display', 'inline-block');
	}
}

/* RewriteDOM load
========================================================================== */
function rewriteDOMLoad() {
	if ($('body[class*="fs-body-category-"]').length) {
		//商品一覧：カテゴリランキングMoreButtonLinkアンカー制御
		var categoryUrl = location.pathname.replace('/c/category/', '');
		$('#content-ranking .more-button a').attr('href', '/f/ranking#' + categoryUrl);
	}
}

/* featureMamihapiSeries_slider
========================================================================== */
function featureMamihapiSeries_slider() {
	if ($('#feature-mamihapi-series').length) {
		$('.product-image').each(function (i) {
			var $_t = $(this);

			$_t.find('.product-slider')
				.addClass('product-slider' + i)
				.slick({
					asNavFor: '.product-item-thum' + i,
					adaptiveHeight: true,
				});

			$_t.find('.product-item-thum')
				.addClass('product-item-thum' + i)
				.slick({
					asNavFor: '.product-slider' + i,
					vertical: true,
					slidesToShow: 5,
					focusOnSelect: true,
					centerMode: true,
					verticalSwiping: true,
					arrows: false,
				});
		});
	}
}

function featureMamihapiSeries_cart() {
	$(document).on('change', '.variationItemSelect select', function () {
		var nowProductcode_Upper = $(this).parents('.productInformationBox').find('.productNumber').text();
		var nowProductcode_Lower = nowProductcode_Upper.toLowerCase();
		var productcode_Lower = $(this).val();
		var productcode_Upper = productcode_Lower.toUpperCase();

		// console.log(nowProductcode_Upper);
		// console.log(nowProductcode_Lower);
		// console.log(productcode_Upper);
		// console.log(productcode_Lower);
		var htmlSource = '';

		$(this)
			.parents('.product-right')
			.find('form > input')
			.attr('name', 'products[' + productcode_Upper + '].productNo');
		$(this).parents('.product-right').find('form > input').attr('value', productcode_Upper);
		$(this)
			.parents('.product-right')
			.find('.productOption input')
			.attr('name', 'products[' + productcode_Upper + '].productOptionsWithPrice[1].id');
		$(this)
			.parents('.product-right')
			.find('.productOption select')
			.attr('name', 'products[' + productcode_Upper + '].productOptionsWithPrice[1].value');
		$(this)
			.parents('.product-right')
			.find('.productActionBox select')
			.attr('name', 'products[' + productcode_Upper + '].quantity');

		// htmlSource = $(this).parents('.product-right').html()
		// 	//console.log($(this).html());
		// htmlSource = htmlSource.replace(new RegExp(nowProductcode_Upper, 'g'), productcode_Upper);
		// console.log(htmlSource);
		// //htmlSource = htmlSource.replace(new RegExp(nowProductcode_Lower, 'g'), productcode_Lower);
		// 		// if ($(this).is('.variationItemSelect select option') == false) {
		// 		// 	htmlSource = $(this).html();
		// 		// 	//console.log(htmlSource);

		// 		//
		// 		// }
		// $(this).parents('.product-right').html(htmlSource)
		// //$(this).html(htmlSource);
		// console.log(productcode_Lower);
		// console.log($(this).html());
		// $(this).val(productcode_Lower);
	});
	// console.log($(this).html())
	// console.log($(this).val());

	// $(this)
	// 	.parents('.product-right *')
	// 	.each(function () {
	// 		if ($(this).is('.variationItemSelect select option') == false) {
	// 			htmlSource = $(this).html();
	// 			console.log(htmlSource);
	// 			$(this).html(htmlSource.replace(new RegExp(nowProductcode_Lower, 'g'), productcode_Lower));
	// 		}
	// 	});
	//});

	// $(document).on('change', '.blanketQuantitySelect', function () {
	// 	var blanketQuantitySelectVal = $(this).val();
	// 	$(this)
	// 		.parents('.productActionButton')
	// 		.find('.blanketQuantity')
	// 		.each(function () {
	// 			var basequantity = $(this).data('basequantity');
	// 			$(this).val(blanketQuantitySelectVal * basequantity);
	// 		});
	// });

	// $(document).on('change', '.blanketADISSelect', function () {
	// 	var blanketADISSelectVal = $(this).val();
	// 	$(this)
	// 		.parents('.productActionButton')
	// 		.find('.blanketADIS')
	// 		.each(function () {
	// 			$(this).val(blanketADISSelectVal);
	// 		});
	// });
}

/* featureMamihapibyages_slider
========================================================================== */
function featureMamihapibyage_slider() {
	if ($('#feature-mamihapi-byage').length) {
		$('.product-image').each(function (i) {
			var $_t = $(this);

			$_t.find('.product-slider')
				.addClass('product-slider' + i)
				.slick({
					asNavFor: '.product-item-thum' + i,
					adaptiveHeight: true,
				});

			$_t.find('.product-item-thum')
				.addClass('product-item-thum' + i)
				.slick({
					asNavFor: '.product-slider' + i,
					vertical: true,
					slidesToShow: 4,
					focusOnSelect: true,
					centerMode: true,
					verticalSwiping: true,
					arrows: false,
				});
		});
	}
}

/* feature-mamihapi-byage
========================================================================== */

function featureMamihapiByage_cart() {
	if ($('#feature-mamihapi-byage').length) {
		$(document).on('change', '.blanketQuantitySelect', function () {
			var blanketQuantitySelectVal = $(this).val();
			$(this)
				.parents('.productActionButton')
				.find('.blanketQuantity')
				.each(function () {
					var basequantity = $(this).data('basequantity');
					$(this).val(blanketQuantitySelectVal * basequantity);
				});
		});

		$(document).on('change', '.blanketADISSelect', function () {
			var blanketADISSelectVal = $(this).val();
			$(this)
				.parents('.productActionButton')
				.find('.blanketADIS')
				.each(function () {
					$(this).val(blanketADISSelectVal);
				});
		});
	}
}

/* reviewAssistText
========================================================================== */

function reviewAssistText() {
	$('#fs_WriteReview .fs-system-assistTarget #fs_input_reviewContents').attr('placeholder', '気に入ったこと/気に入らなかったことはなんですか？この商品をどのように使いましたか？');
}

/* pinterestSNSButtonInstallation
========================================================================== */

function pinterestTagWrite() {
	if ($('#fs_ProductDetails').length) {
		var url = $('link[rel="canonical"]').attr('href');
		var imgsrc = $('.fs-c-productPlainImage--0 img')
			.data('layzr')
			.replace('-l.jpg', '-xl.jpg')
			.replace(/\?t=.*/g, '');
		var description = $('meta[name="description"]').attr('content');
		$('#product-sns-share ul li:last-child').after('<li><a data-pin-do="buttonPin" data-pin-tall="true" data-pin-round="true" target="_blank" href="https://www.pinterest.com/pin/create/button/?url=' + url + '&media=' + imgsrc + '&description=' + description + '"><img src="https://shiraistore.itembox.design/item/src/icon-pinterest-bk.svg" /></a></li>');
	}
}

/* multipleReviewList
========================================================================== */

function multipleReviewList() {
	var url = location.href;
	var url_ary = url.split('?');
	if (url_ary[0] == 'https://shirai-store.net/f/reviewList') {
		var modelCode = getParam('modelCode');
		var rewviewListURL = 'https://cdn.shirai-store.net/assets/json/reviewList/reviewList_' + modelCode + '_v2_0.json';
		var reviewScore_ary = [];

		$.getJSON(rewviewListURL, function (multipleReviewList) {
			for (var i in multipleReviewList) {
				reviewScore_ary.push(multipleReviewList[i].rating);

				var productUrl = multipleReviewList[i].productUrl,
					seriesCode = productUrl.slice(0, 3),
					productId = multipleReviewList[i].productId,
					nickname = multipleReviewList[i].nickname,
					prefecture = multipleReviewList[i].prefecture,
					ageGroup = multipleReviewList[i].ageGroup,
					gender = multipleReviewList[i].gender,
					reviewScore = Number(multipleReviewList[i].rating).toFixed(1),
					datetime = multipleReviewList[i].datetime.slice(0, 10).replace(/-/g, '/'),
					reviewBody = multipleReviewList[i].reviewBody,
					productId_12Len = zeroPadding(productId, 12),
					product_image_group = Math.floor(productId / 100),
					thumbnail = ('00' + multipleReviewList[i].thumbNumber).slice(-2),
					color = multipleReviewList[i].color;

				if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
					seriesCode = 'tl';
				} else if (seriesCode == 'ona') {
					seriesCode = 'of2';
				}

				var reviewScoreToFixed = multipleReviewList[i].rating;

				//レビュースコアの閾値を設定
				if (reviewScore < 0.5) {
					reviewScore = '0';
				} else if (reviewScore < 1.0) {
					reviewScore = '0.5';
				} else if (reviewScore < 1.5) {
					reviewScore = '1.0';
				} else if (reviewScore < 2.0) {
					reviewScore = '1.5';
				} else if (reviewScore < 2.5) {
					reviewScore = '2.0';
				} else if (reviewScore < 3.0) {
					reviewScore = '2.5';
				} else if (reviewScore < 3.5) {
					reviewScore = '3.0';
				} else if (reviewScore < 4.0) {
					reviewScore = '3.5';
				} else if (reviewScore < 4.5) {
					reviewScore = '4.0';
				} else if (reviewScore < 5) {
					reviewScore = '4.5';
				} else if (reviewScore == 5) {
					reviewScore = '5.0';
				}

				var profHTML = '';

				if (prefecture == '' && ageGroup == '' && gender == '') {
					profHTML = '<span class="fs-c-reviewer__profile__status">非公開</span>';
				} else {
					if (prefecture != '') {
						profHTML = profHTML + '<span class="fs-c-reviewer__profile__prefecture">' + prefecture + '</span>';
					}
					if (ageGroup != '') {
						profHTML = profHTML + '<span class="fs-c-reviewer__profile__ageGroup">' + ageGroup + '</span>';
					}
					if (gender != '') {
						profHTML = profHTML + '<span class="fs-c-reviewer__profile__gender">' + gender + '</span>';
					}
				}

				profHTML = '<div class="fs-c-reviewer__profile">' + profHTML + '</div></div>';

				var reviewerHTML = '<div class="fs-c-reviewList__item__info fs-c-reviewInfo"><div class="fs-c-reviewInfo__reviewer fs-c-reviewer"><div class="fs-c-reviewer__name"><span class="fs-c-reviewer__name__nickname">' + nickname + '</span></div><div class="fs-c-reviewer__status"><span class="fs-c-reviewerStatus">購入者</span></div>';

				var dateHTML = '<dl class="fs-c-reviewInfo__date"><dt>投稿日</dt><dd><time datetime="' + datetime + '" class="fs-c-time">' + datetime + '</time></dd></dl><div class="fs-c-reviewRating"><div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"></div></div></div>';

				var colorHTML = '<div class="color">' + color + '</div>';

				var commentHTML = '<div class="fs-c-reviewList__item__body fs-c-reviewBody">' + reviewBody + '</div>';

				var imageHTML =
					'<div class="reviewImage"><a href="/c/series/' +
					seriesCode +
					'/' +
					productUrl +
					'"><img data-original="https://shiraistore.itembox.design/product/' +
					zeroPadding(product_image_group, 3) +
					'/' +
					productId_12Len +
					'/' +
					productId_12Len +
					'-' +
					thumbnail +
					'-xs.jpg" alt="" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazy" ></a></div>';

				var h = '<li class="fs-c-reviewList__item reviewScore-' + reviewScoreToFixed + '">' + imageHTML + '<div class="reviewContent">' + reviewerHTML + profHTML + dateHTML + colorHTML + commentHTML + '</div></li>';

				$('#multipleReviewList ul').append(h);
			}

			//レビューグラフの書き出し
			var score_length = reviewScore_ary.length;

			var score_count = 0;
			for (var j = 5; j > 0; j--) {
				for (var i = 0; i < score_length; i++) {
					if (reviewScore_ary[i] == j) {
						score_count++;
					}
				}

				var rate = Math.round((score_count / score_length) * 100);

				$('.score' + j + ' .bar-info').attr('data-total', rate);
				$('.score' + j + ' .rating').html(rate + '%');
				score_count = 0;
			}

			function skillSet() {
				$('.bar-info').each(function () {
					total = $(this).data('total');
					$(this).css('width', total + '%');
				});
				$('.percent').each(function () {
					var $this = $(this);
					$({
						Counter: 10,
					}).animate(
						{
							Counter: $this.text(),
						},
						{
							duration: 3000,
							easing: 'swing',
							step: function () {
								$this.text(Math.ceil(this.Counter) + '%');
							},
						}
					);
				});
			}
			setTimeout(skillSet, 400);

			//平均レビュースコアの設定と表示
			var totalScore = reviewScore_ary.reduce(function (sum, element) {
				return sum + element;
			}, 0);
			var averageScore = Math.round((totalScore / reviewScore_ary.length) * 10) / 10;
			var averageScore_star = averageScore;

			if (averageScore_star < 0.5) {
				averageScore_star = '0';
			} else if (averageScore_star < 1.0) {
				averageScore_star = '0.5';
			} else if (averageScore_star < 1.5) {
				averageScore_star = '1.0';
			} else if (averageScore_star < 2.0) {
				averageScore_star = '1.5';
			} else if (averageScore_star < 2.5) {
				averageScore_star = '2.0';
			} else if (averageScore_star < 3.0) {
				averageScore_star = '2.5';
			} else if (averageScore_star < 3.5) {
				averageScore_star = '3.0';
			} else if (averageScore_star < 4.0) {
				averageScore_star = '3.5';
			} else if (averageScore_star < 4.5) {
				averageScore_star = '4.0';
			} else if (averageScore_star < 5) {
				averageScore_star = '4.5';
			} else if (averageScore_star == 5) {
				averageScore_star = '5.0';
			}

			if (modelCode == 'tnl') {
				var modelName = 'タナリオシリーズの';
			} else if (modelCode == 'csc') {
				var modelName = 'チェスカシリーズの';
			} else if (modelCode == 'mcn') {
				var modelName = 'モンシェリーヌシリーズの';
			} else if (modelCode == 'log') {
				var modelName = 'ログーノシリーズの';
			} else if (modelCode == 'ram') {
				var modelName = 'ラモリアシリーズの';
			} else if (modelCode == 'amz') {
				var modelName = 'AMZシリーズの';
			} else {
				var modelName = 'この商品の';
			}
			var averageHTML = '<h2 id="totalScoreTitle">' + modelName + '総合評価<span class="fs-c-reviewInfo__stars fs-c-reviewStars" data-ratingcount="' + averageScore_star + '">' + averageScore.toFixed(1) + '</span></h2>';

			$('#averageMultipleReview').append(averageHTML);
			$('#multipleReviewList').before('<p class="fs-c-listControl__status">' + reviewScore_ary.length + '件中' + reviewScore_ary.length + '件表示</p>');

			//レビュー絞り込みプルダウン
			var ratingSelectHTML = '<select id="selectScore"><option value="">レビュー絞り込み</option>';

			var score_length = reviewScore_ary.length;

			var score_count = 0;
			for (var j = 5; j > 0; j--) {
				for (var i = 0; i < score_length; i++) {
					if (reviewScore_ary[i] == j) {
						score_count++;
					}
				}

				if (j == 5) {
					star = '★★★★★';
				} else if (j == 4) {
					star = '★★★★☆';
				} else if (j == 3) {
					star = '★★★☆☆';
				} else if (j == 2) {
					star = '★★☆☆☆';
				} else if (j == 1) {
					star = '★☆☆☆☆';
				}

				ratingSelectHTML = ratingSelectHTML + '<option value="reviewScore-' + j + '">' + star + '（' + score_count + '件）</option>';
				score_count = 0;
			}

			ratingSelectHTML = ratingSelectHTML + '</select>';

			$('#reviwRatingBox').after(ratingSelectHTML);

			$('#selectScore').change(function () {
				var count = 0;
				var selectedReviewScore = $(this).val();
				if (selectedReviewScore != '') {
					$('.fs-c-reviewList__item').each(function () {
						$(this).css('display', 'none');
					});
					$('.' + selectedReviewScore).each(function () {
						$(this).css('display', 'block');
						count++;
					});
				} else {
					$('.fs-c-reviewList__item').each(function () {
						$(this).css('display', 'block');
						count++;
					});
				}

				$('.fs-c-listControl__status').html(reviewScore_ary.length + '件中' + count + '件表示');

				if (count == 0) {
					$('#reviewCaution').css('display', 'block');
				} else {
					$('#reviewCaution').css('display', 'none');
				}
			});

			//ページ読み込み時のパラメーターによって絞り込みの初期値を設定
			var score = getParam('score');
			if (score != null) {
				var count = 0;
				var selectedReviewScore = 'reviewScore-' + score;
				if (selectedReviewScore != '') {
					$('.fs-c-reviewList__item').each(function () {
						$(this).css('display', 'none');
					});
					$('.' + selectedReviewScore).each(function () {
						$(this).css('display', 'block');
						count++;
					});
				} else {
					$('.fs-c-reviewList__item').each(function () {
						$(this).css('display', 'block');
						count++;
					});
				}
				$('#selectScore').val('reviewScore-' + score);
				$('.fs-c-listControl__status').html(reviewScore_ary.length + '件中' + count + '件表示');
			}

			if (count == 0) {
				$('#reviewCaution').css('display', 'block');
			} else {
				$('#reviewCaution').css('display', 'none');
			}

			//文字量が多いレビューの表示領域開閉
			reviewSlideDown('#multipleReviewList', '360');

			$('img.lazy').lazyload({
				threshold: 200,
			});
		});
	}
}

/* productListAddData
========================================================================== */

function productListAddData() {
	if ($('#fs_ProductCategory').length || $('#fs_ProductSearch').length) {
		//$(function () {
		$.getJSON('https://cdn.shirai-store.net/assets/json/common/dataForProductList_v2_0.json', function (data) {
			$('.fs-c-productListItem').each(function () {
				url = $(this).find('.fs-c-productName > a').attr('href').split('/').pop();
				var result_ranking = data.ranking.find(function (v) {
					return v.productUrl == url;
				});

				if (result_ranking != undefined) {
					var categoryName = categoryNameShorter(result_ranking.category);

					var rankingHTML = '<span class="mark-catRank">' + categoryName + ' ' + result_ranking.categoryRanking + '位</span>';

					$(this).find('.fs-c-productName').before(rankingHTML);
				}

				var result_price = data.price.find(function (v) {
					return v.productUrl == url;
				});

				//console.log(result_price)

				if (result_price != undefined) {
					$(this).find('.fs-c-productPrice--selling').addClass('salePrice');
					var normalPrice = result_price.normalPrice;
					//console.log(normalPrice);
					normalPrice = String(normalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
					var normalPriceHTML =
						'<div class="fs-c-productPrice fs-c-productPrice--selling"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span> <span class="fs-c-price__value">' +
						normalPrice +
						'</span></span></span> <span class="fs-c-productPrice__addon"><span class="fs-c-productPrice__addon__label">税込</span></span></div>';
					$(this).find('.fs-c-productPrice--selling').before(normalPriceHTML);
				}

				var result_reviewRating = data.reviewRating.find(function (v) {
					return v.productUrl == url;
				});
				//console.log('result_reviewRating:', result_reviewRating)

				if (result_reviewRating != undefined) {
					var reviewScore = result_reviewRating.averageRating;

					if (reviewScore < 0.5) {
						reviewScore = '0';
					} else if (reviewScore < 1.0) {
						reviewScore = '0.5';
					} else if (reviewScore < 1.5) {
						reviewScore = '1.0';
					} else if (reviewScore < 2.0) {
						reviewScore = '1.5';
					} else if (reviewScore < 2.5) {
						reviewScore = '2.0';
					} else if (reviewScore < 3.0) {
						reviewScore = '2.5';
					} else if (reviewScore < 3.5) {
						reviewScore = '3.0';
					} else if (reviewScore < 4.0) {
						reviewScore = '3.5';
					} else if (reviewScore < 4.5) {
						reviewScore = '4.0';
					} else if (reviewScore < 5) {
						reviewScore = '4.5';
					} else if (reviewScore == 5) {
						reviewScore = '5.0';
					}

					var reviewHTML = '';

					if (reviewScore != 0) {
						reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="/f/reviewList?modelCode=' + url + '">（' + result_reviewRating.reviewCount + '）</a></div>';
					} else {
						reviewHTML = '';
					}

					$(this).find('.fs-c-productPrices').before(reviewHTML);
				}
			});
		});
		//});
	}
}

/* productDetailAddData
========================================================================== */

function productDetailAddData() {
	if ($('#fs_ProductDetails').length) {
		var url = location.pathname;
		var modelCode = url.split('/').pop();

		// 商品詳細ページにテキストを表示
		$('.fs-c-productPlainImage img').each(function () {
			var text = $(this).attr('alt');
			if (text[0] == '[') {
				text = text.slice(1);
				var text_ary = text.split(']');

				$(this).after(`<p>${text_ary[1]}</p>`);
				$(this).after(`<h3>${text_ary[0]}</h3>`);
			}
		});

		$(window).on('load', function () {
			var srcPath = '';
			if ($('.fs-body-product-log-3518gh-br').length) {
				srcPath = '83d65eca-f3fc-47f1-900c-262e5b54bf7c';
			} else if ($('.fs-body-product-log-3518gh-na').length) {
				srcPath = '3e0e9ccf-6d54-441f-b175-b9a71fb4aa31';
			} else if ($('.fs-body-product-log-3515gh-br').length) {
				srcPath = 'c597604c-65a3-4bea-af06-bf6fdc839309';
			} else if ($('.fs-body-product-log-3515gh-na').length) {
				srcPath = 'efc87ddb-72ef-4483-acea-d1d71e07d7d8';
			} else if ($('.fs-body-product-log-3512gh-br').length) {
				srcPath = '56675797-ed1f-4f50-914e-8361cc05853e';
			} else if ($('.fs-body-product-log-3512gh-na').length) {
				srcPath = '7b198c17-5371-4fc2-81d2-7d3b7eb6518f';
			}

			if (srcPath != '') {
				$('#productImageBoxSlider').after(
					'<div id="showRoom"><div class="modal-open text-link-color">360°ビュー</div><a href="https://1tap-showroom.dendoh.co.jp/ar/?key=' +
						srcPath +
						'&placement=0" class="displayInlineBlock ml-8 text-link-color" target="_blank">ARでサイズ感を試す</a><div class="modal-container"><div class="modal-body"><div class="modal-close">×</div><div class="modal-content"><iframe loading="lazy" src="https://1tap-showroom.dendoh.co.jp/embed/?key=' +
						srcPath +
						'" title="ワンタップショールーム" frameborder="0" width="100%" height="600px"></iframe></div></div></div></div>'
				);
			}

			// 変数に要素を入れる
			var open = $('.modal-open'),
				close = $('.modal-close'),
				container = $('.modal-container');

			//開くボタンをクリックしたらモーダルを表示する
			open.on('click', function () {
				container.addClass('active');
				$('body').css('overflow', 'hidden');
				return false;
			});

			//閉じるボタンをクリックしたらモーダルを閉じる
			close.on('click', function () {
				container.removeClass('active');

				$('body').css('overflow', 'inherit');
			});

			//モーダルの外側をクリックしたらモーダルを閉じる
			$(document).on('click', function (e) {
				if (!$(e.target).closest('.modal-body').length) {
					container.removeClass('active');
					$('body').css('overflow', 'inherit');
				}
			});
		});

		//商品の特長の開くボタン
		$('.productDetailGradient span').click(function () {
			//現在のheight取得
			curHeight = $('.fs-p-productDescription--full').height();
			//autoにした場合のheightを取得
			autoHeight = $('.fs-p-productDescription--full').css('height', 'auto').height();
			//autoにした場合のheightへ向かってanimate
			//数値なのでanimateが有効
			$('.fs-p-productDescription--full')
				.height(curHeight)
				.animate({ height: autoHeight }, 500, 'linear', function () {
					$('.productDetailGradient').remove();
				});
		});

		//console.log('modelCode:',modelCode);

		// var dataForProductDetailUrl = 'https://cdn.shirai-store.net/assets/json/productDetail/dataForProductDetail_' + modelCode + '_v2_1.json';

		var url = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/getDataForProductDetail';
		var params = { product_number: modelCode };
		//console.log(JSON.stringify(params));

		var response = $.ajax({
			type: 'post',
			url: url,
			async: false,
			data: JSON.stringify(params),
			contentType: 'application/json',
			dataType: 'json',
			scriptCharset: 'utf-8',
			success: function (response) {
				// Success
				// console.log(JSON.stringify(response));
			},
			error: function (response) {
				// Error
				// console.log(JSON.stringify(response));
			},
		}).responseText;

		response = JSON.parse(response);

		// console.log(response);

		data = response.result;
		// console.log(dataForProductDetailUrl);

		if (data.rankingTop10 != undefined && data.rankingTop10 != '') {
			var rankingList = data.rankingTop10;
			for (var i in data.rankingTop10) {
				var productUrl = rankingList[i].productUrl,
					seriesCode = productUrl.slice(0, 3),
					productId = rankingList[i].productId,
					productName = rankingList[i].productName,
					productId_12Len = zeroPadding(productId, 12),
					product_image_group = Math.floor(productId / 100),
					sellingPrice = Number(rankingList[i].sellingPrice),
					normalPrice = Number(rankingList[i].normalPrice),
					icon = rankingList[i].icon,
					size = rankingList[i].size,
					reviewScore = Number(rankingList[i].averageRating).toFixed(1),
					reviewCount = Number(rankingList[i].reviewCount),
					thumbnail = rankingList[i].thumbNumber,
					categoryName = rankingList[i].categoryLv1,
					categoryUrl = rankingList[i].categoryUrl;

				thumbnail = ('00' + thumbnail).slice(-2);

				if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
					seriesCode = 'tl';
				}

				if (sellingPrice < normalPrice) {
					sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				} else {
					sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				}

				var icon_ary = icon.split(',');

				var iconHtml = '';
				for (var j = 0; j < icon_ary.length; j++) {
					if (icon_ary[j] != '') {
						icon_ary[j] = icon_ary[j].split(':');

						// if (icon_ary[j][0] == 'mark-rank' && categoryUrl == '') {
						//     //categoryName = categoryNameShorter(categoryName);
						//     iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
						// }

						if (icon_ary[j][0] == 'mark-categoryRank' && categoryUrl != '') {
							//categoryName = categoryNameShorter(categoryName);
							iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
						}

						if (icon_ary[j][0] == 'mark-new') {
							iconHtml += '<span class="mark-new">新着</span>';
						}

						if (icon_ary[j][0] == 'mark-longseller') {
							iconHtml += '<span class="mark-longseller">ロングセラー</span>';
						}

						if (icon_ary[j][0] == 'mark-limitedProduct') {
							iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
						}

						if (icon_ary[j][0] == 'mark-sale') {
							iconHtml += '<span class="mark-sale">SALE</span>';
						}

						if (icon_ary[j][0] == 'mark-outlet') {
							iconHtml += '<span class="mark-outlet">OUTLET</span>';
						}
					}
				}

				reviewScore = reviewScoreThreshold(reviewScore);

				var reviewHTML = '';

				if (reviewScore != 0) {
					reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
				} else {
					reviewHTML = '';
				}

				var h =
					'<li><a href="/c/series/' +
					seriesCode +
					'/' +
					productUrl +
					'"><img src="https://shiraistore.itembox.design/product/' +
					zeroPadding(product_image_group, 3) +
					'/' +
					productId_12Len +
					'/' +
					productId_12Len +
					'-' +
					thumbnail +
					'-m.jpg" alt="' +
					productName +
					'" ><h3>' +
					productName +
					'</h3></a>' +
					'<div class="productMarks">' +
					iconHtml +
					'</div>' +
					'<div class="productSize">' +
					size +
					'</div>' +
					reviewHTML +
					'<a href="/c/series/' +
					seriesCode +
					'/' +
					productUrl +
					'">' +
					sellingPrice +
					'</a></li>';

				$('.productTop10Slider.ranking ul').append(h);

				var urlPath = location.pathname;
				//console.log(urlPath);
				if (urlPath == '/c/category/table' && i == 8) {
					checkScreenSize();
					break;
				}

				if (i == 9) {
					checkScreenSize();
					break;
				}
			}

			$('.productTop10Slider.ranking').after('<div class="fs-c-buttonContainer more-button"><a href="/f/ranking-' + categoryUrl + '" class="fs-c-button--standard">もっと見る</a></div>');

			$('#productDetail-rankingTop10').css('display', 'block');
		}

		var newWindowWidth = $(window).width();

		var faqHtml = '';
		//console.log('data.faq:', data.faq);
		if (data.faq != undefined && data.faq != '') {
			for (var i in data.faq) {
				faqHtml += `<dt>${data.faq[i].question}</dt><dd>${data.faq[i].answer}</dd>`;
			}

			$('#product-review').before(`<div id="productDetail-faq"><h2 class="productDescriptionTitle">この商品に関するよくある質問</h2><dl>${faqHtml}</dl></div>`);
		}

		if (data.comparisonData != undefined && data.comparisonData != '') {
			//console.log(data.comparisonData);
			var comparisonData = data.comparisonData,
				comparisonHTML = '',
				comparisonImage = '<td></td>',
				//comparisonName = '<td></td>',
				comparisonReview = '<th>評価</th>',
				comparisonPrice = '<th>価格</th>',
				comparisonColor = '<th>カラー</th>',
				comparisonSize = '<th>サイズ</th>',
				comparisonButton = '<td></td>';

			for (var i in comparisonData) {
				var productUrl = comparisonData[i].productUrl,
					seriesCode = productUrl.slice(0, 3),
					productId = comparisonData[i].productId,
					productName = comparisonData[i].productName,
					productColor = comparisonData[i].color.split(' '),
					productColor = productColor[0].replace('カラー：', ''),
					productId_12Len = zeroPadding(productId, 12),
					product_image_group = Math.floor(productId / 100),
					sellingPrice = Number(comparisonData[i].sellingPrice),
					normalPrice = Number(comparisonData[i].normalPrice),
					categoryName = comparisonData[i].categoryName,
					icon = comparisonData[i].icon,
					size = comparisonData[i].size.replace(/\s/g, '').replace(/×/g, '<br>'),
					reviewScore = Number(comparisonData[i].averageRating).toFixed(1),
					reviewCount = Number(comparisonData[i].reviewCount),
					thumbnail = ('00' + comparisonData[i].thumbNumber).slice(-2);

				productName = productName.length > 36 ? productName.slice(0, 36) + '…' : productName;

				if (sellingPrice < normalPrice) {
					sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				} else {
					sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				}

				//console.log(icon)
				var comparisonIconHtml = '';
				if (icon != null) {
					var icon_ary = icon.split(',');

					for (var j = 0; j < icon_ary.length; j++) {
						//console.log('icon_ary[j]:', icon_ary[j]);
						if (icon_ary[j] != '') {
							icon_ary[j] = icon_ary[j].split(':');

							if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 11) {
								categoryName = categoryNameShorter(categoryName);
								comparisonIconHtml += '<span class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</span>';
							}

							if (icon_ary[j][0] == 'mark-new') {
								comparisonIconHtml += '<span class="mark-new">新着</span>';
							}

							if (icon_ary[j][0] == 'mark-limitedProduct') {
								comparisonIconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
							}

							if (icon_ary[j][0] == 'mark-sale') {
								comparisonIconHtml += '<span class="mark-sale">SALE</span>';
							}
						}
					}
					if (comparisonIconHtml != '') {
						comparisonIconHtml = '<div class="iconBox">' + comparisonIconHtml + '</div>';
					}
				} else {
					comparisonIconHtml = '';
				}

				//レビュースコアの閾値を計算
				reviewScore = reviewScoreThreshold(reviewScore);

				var reviewHTML = '';

				if (reviewScore != 0) {
					reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
				} else {
					reviewHTML = '評価がありません';
				}

				if (!seriesCode.indexOf('tl')) {
					seriesCode = 'tl';
				}

				if (i == 0) {
					comparisonImage +=
						'<td><div class="displayProduct">表示中</div><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="" >' + comparisonIconHtml + productName + '</td>';
				} else {
					comparisonImage += '<td><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="" >' + comparisonIconHtml + '</div>' + productName + '</td>';
				}

				// += '<td><div>' + iconHtml + '</div><a href="/c/series/' + seriesCode + '/' + productUrl + '">' + productName + '</a></td>'
				comparisonReview += '<td>' + reviewHTML + '</td>';
				comparisonPrice += '<td>' + sellingPrice + '</td>';
				comparisonColor += '<td>' + productColor + '</td>';
				comparisonSize += '<td>' + size + '</td>';

				if (i == 0) {
					comparisonButton += '<td></td>';
				} else {
					comparisonButton += '<td><a href="/c/series/' + seriesCode + '/' + productUrl + '">詳細を見る</a></td>';
				}
			}

			comparisonHTML = `<div id="productDetail-comparison"><h2 class="productDescriptionTitle">類似商品との比較</h2><div id="productComparison"><table><tbody><tr class="comparisonImage">${comparisonImage}</tr><tr class="comparisonReview">${comparisonReview}</tr><tr class="comparisonPrice">${comparisonPrice}</tr><tr class="comparisonColor">${comparisonColor}</tr><tr class="comparisonSize">${comparisonSize}</tr><tr class="comparisonButton">${comparisonButton}</tr></tbody></table></div>`;

			$('.fs-p-productDescription--full').after(comparisonHTML);
		}

		if (data.nextArrivalDate[0] != undefined) {
			const convertJST = new Date(data.nextArrivalDate[0].nextArrivalDate);
			convertJST.setHours(convertJST.getHours() + 9);
			let nextArrivalDate = convertJST.toLocaleString('ja-JP');
			nextArrivalDate = nextArrivalDate.replace(/ .*/g, '');
			$('.fs-c-productNotice--outOfStock span').html('次回の入荷日は<strong class="newArrivalDate">「' + nextArrivalDate + '」</strong>頃の予定です。');
		}

		//console.log(data.ranking[0]);
		if (data.ranking[0] != undefined) {
			var iconHtml = '<li class="fs-c-productMark__item"><a class="mark-categoryRank fs-c-productMark__mark--0 fs-c-productMark__mark" href="/f/ranking-' + data.ranking[0].categoryUrl + '"><span class="fs-c-productMark__label">' + data.ranking[0].categoryName + ' ' + data.ranking[0].categoryRanking + '位' + '</span></a></li>';
			if ($('.fs-c-productMarks').length) {
				$('.fs-c-productMark').append(iconHtml);
			} else {
				$('.fs-c-productPrices').before('<div class="fs-c-productMarks"><ul class="fs-c-productMark">' + iconHtml + '</ul></div>');
			}
		}

		//console.log(data.price[0]);
		if (data.price[0] != undefined) {
			var salePrice = $('.fs-c-productPrice--selling .fs-c-price__value').text().replace(',', '');
			//console.log(salePrice);
			//console.log('salePrice:' + salePrice);
			if (data.price[0].normalPrice != salePrice) {
				$('body').addClass('time-sale');
				$('.fs-c-productPrice--selling').addClass('salePrice');

				var normalPrice = data.price[0].normalPrice;
				//console.log(normalPrice);
				var priceOffValue = Math.round((1 - salePrice / normalPrice) * 100 * 10) / 10;
				$('.fs-c-productPrice--selling.salePrice .fs-c-productPrice__addon__label').before('<span class="priceOffValue">' + priceOffValue + '% OFF</span>');
				//console.log(normalPrice);
				normalPrice = String(normalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
				var normalPriceHTML =
					'<div class="fs-c-productPrice fs-c-productPrice--selling"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span><span class="fs-c-price__value">' +
					normalPrice +
					'</span></span></span><span class="fs-c-productPrice__addon"><span class="fs-c-productPrice__addon__label">税込</span></span></div>';
				$('.fs-c-productPrice--selling').before(normalPriceHTML);
			}
		}

		for (var i in data.reviewDetail) {
			//reviewScore_ary.push(multipleReviewList[i].rating);

			var productUrl = data.reviewDetail[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = data.reviewDetail[i].productId,
				nickname = data.reviewDetail[i].nickname,
				prefecture = data.reviewDetail[i].prefecture,
				ageGroup = data.reviewDetail[i].ageGroup,
				gender = data.reviewDetail[i].gender,
				reviewScore = Number(data.reviewDetail[i].rating).toFixed(1),
				datetime = data.reviewDetail[i].datetime.slice(0, 10).replace(/-/g, '/'),
				reviewBody = data.reviewDetail[i].reviewBody,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				thumbnail = ('00' + data.reviewDetail[i].thumbNumber).slice(-2),
				color = data.reviewDetail[i].color;

			var reviewScoreToFixed = data.reviewDetail[i].rating;

			//レビュースコアの閾値を計算
			reviewScore = reviewScoreThreshold(reviewScore);

			var profHTML = '';

			profHTML = '<div class="fs-c-reviewer__profile">' + profHTML + '</div></div>';

			var reviewerHTML = '<div class="fs-c-reviewList__item__info fs-c-reviewInfo"><div class="fs-c-reviewInfo__reviewer fs-c-reviewer"><div class="fs-c-reviewer__name"><span class="fs-c-reviewer__name__nickname">' + nickname + '</span></div><div class="fs-c-reviewer__status"><span class="fs-c-reviewerStatus">購入者</span></div>';

			var dateHTML = '<dl class="fs-c-reviewInfo__date"><dt>投稿日</dt><dd><time datetime="' + datetime + '" class="fs-c-time">' + datetime + '</time></dd></dl><div class="fs-c-reviewRating"><div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"></div></div></div>';

			var colorHTML = '<div class="color">' + color + '</div>';

			var commentHTML = '<div class="fs-c-reviewList__item__body fs-c-reviewBody">' + reviewBody + '</div>';

			var imageHTML = '<div class="reviewImage"><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-xs.jpg" alt="" ></a></div>';

			var h = '<li class="fs-c-reviewList__item reviewScore-' + reviewScoreToFixed + '">' + imageHTML + '<div class="reviewContent">' + reviewerHTML + profHTML + dateHTML + colorHTML + commentHTML + '</div></li>';

			$('#multipleReviewList ul').append(h);
		}

		//文字量が多いレビューの表示領域開閉
		var newWindowWidth = $(window).width();
		if (newWindowWidth <= 480) {
			var maxHeight = '360';
		} else {
			var maxHeight = '240';
		}

		//console.log(maxHeight);

		reviewSlideDown('#multipleReviewList', maxHeight);

		//レビューグラフの書き出し

		var ratingCount = 0;
		for (var j = 5; j > 0; j--) {
			var reviewCount = data.reviewRating[0].reviewCount;

			switch (j) {
				case 5:
					ratingCount = data.reviewRating[0].rating5Count;
					break;
				case 4:
					ratingCount = data.reviewRating[0].rating4Count;
					break;
				case 3:
					ratingCount = data.reviewRating[0].rating3Count;
					break;
				case 2:
					ratingCount = data.reviewRating[0].rating2Count;
					break;
				case 1:
					ratingCount = data.reviewRating[0].rating1Count;
					break;
			}

			var rate = Math.round((ratingCount / reviewCount) * 100);

			$('.score' + j + ' .bar-info').attr('data-total', rate);
			$('.score' + j + ' .rating').html(rate + '%');
			score_count = 0;
		}

		function skillSet() {
			$('.bar-info').each(function () {
				total = $(this).data('total');
				$(this).css('width', total + '%');
			});
			$('.percent').each(function () {
				var $this = $(this);
				$({
					Counter: 10,
				}).animate(
					{
						Counter: $this.text(),
					},
					{
						duration: 3000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter) + '%');
						},
					}
				);
			});
		}
		setTimeout(skillSet, 400);

		//console.log(reviewCount)
		//平均レビュースコアの設定と表示
		if (reviewCount > 0) {
			var averageRating = data.reviewRating[0].averageRating;
			var reviewScore = data.reviewRating[0].averageRating;

			//レビュースコアの閾値を計算
			reviewScore = reviewScoreThreshold(reviewScore);

			var averageHTML = '<div id="averageScore"><span class="fs-c-reviewInfo__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"></span><span>' + averageRating + '</span></div>';

			$('#product-reviewTitle').after(averageHTML);

			$('#product-reviewTitle span').text(reviewCount + '件の');

			var reviewListURL = '/f/reviewList?modelCode=' + modelCode;

			$('.score-bar-inner').click(function () {
				var score = $(this).data('score');
				//console.log(score);
				location.href = reviewListURL + '&score=' + score;
			});

			//価格上部にレビュースコアを表示
			$('#productPriceBox').before('<div id="product-ratingStars"><a href="#product-review"><span class="fs-c-reviewInfo__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"></span><span>' + averageRating + '</span><span>（' + reviewCount + '）</span></a></div>');

			$('#reviwRatingBox').css('display', 'block');

			//レビュー件数が10件以下ならレビュー詳細ボタンを削除
			if (reviewCount < 11) {
				$('.fs-c-productReview__allReviews').remove();
			} else {
				$('#multipleReviewList').append('<div class="fs-c-productReview__allReviews fs-c-buttonContainer fs-c-buttonContainer--viewAllReviews"><a href="' + reviewListURL + '" class="othersReview fs-c-button--viewAllReviews fs-c-button--plain"><span class="fs-c-button__label">その他のレビューを見る</span></a></div>');
			}
		} else {
			$('#product-reviewTitle').after('<p class="text-center">この商品のレビューはありません。</p>');
		}

		//console.log(data.seriesItems);
		if (data.seriesItems.length >= 1) {
			for (var i in data.seriesItems) {
				var productUrl = data.seriesItems[i].productUrl,
					seriesCode = productUrl.slice(0, 3),
					productId = data.seriesItems[i].productId,
					productName = data.seriesItems[i].productName,
					productId_12Len = zeroPadding(productId, 12),
					product_image_group = Math.floor(productId / 100),
					sellingPrice = Number(data.seriesItems[i].sellingPrice),
					normalPrice = Number(data.seriesItems[i].normalPrice),
					icon = data.seriesItems[i].icon,
					size = data.seriesItems[i].size,
					reviewScore = Number(data.seriesItems[i].averageRating).toFixed(1),
					reviewCount = Number(data.seriesItems[i].reviewCount),
					thumbnail = data.seriesItems[i].thumbNumber,
					categoryName = data.seriesItems[i].categoryLv1,
					categoryUrl = data.seriesItems[i].categoryUrl;

				thumbnail = ('00' + thumbnail).slice(-2);

				if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
					seriesCode = 'tl';
				}

				if (sellingPrice < normalPrice) {
					sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				} else {
					sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
				}

				var iconHtml = '';

				if (icon != null) {
					var icon_ary = icon.split(',');

					for (var j = 0; j < icon_ary.length; j++) {
						if (icon_ary[j] != '') {
							icon_ary[j] = icon_ary[j].split(':');

							if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 11) {
								categoryName = categoryNameShorter(categoryName);
								iconHtml += '<a href="/f/ranking-' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
							}

							if (icon_ary[j][0] == 'mark-new') {
								iconHtml += '<span class="mark-new">新着</span>';
							}

							if (icon_ary[j][0] == 'mark-limitedProduct') {
								iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
							}

							if (icon_ary[j][0] == 'mark-sale') {
								iconHtml += '<span class="mark-sale">SALE</span>';
							}
						}
					}
				}

				reviewScore = reviewScoreThreshold(reviewScore);
				//console.log('reviewScore:',reviewScore)

				var reviewHTML = '';

				if (reviewScore != 0) {
					reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
				} else {
					reviewHTML = '';
				}

				if (iconHtml == undefined) {
					iconHtml = '';
				}

				var h =
					'<li><a href="/c/series/' +
					seriesCode +
					'/' +
					productUrl +
					'"><img src="https://shiraistore.itembox.design/product/' +
					zeroPadding(product_image_group, 3) +
					'/' +
					productId_12Len +
					'/' +
					productId_12Len +
					'-' +
					thumbnail +
					'-m.jpg" alt="' +
					productName +
					'" ><h3>' +
					productName +
					'</h3></a>' +
					'<div class="productMarks">' +
					iconHtml +
					'</div>' +
					'<div class="productSize">' +
					size +
					'</div>' +
					reviewHTML +
					'<a href="/c/series/' +
					seriesCode +
					'/' +
					productUrl +
					'">' +
					sellingPrice +
					'</a></li>';

				$('.productTop10Slider.series ul').append(h);

				//$('img.lazy').lazyload();
				if (i == 14) {
					if (data.seriesItems.length > 15) {
						$('.productTop10Slider.series ul').after('<div class="fs-c-buttonContainer more-button"><a href="/c/series/' + seriesCode + '" class="fs-c-button--standard">もっと見る</a></div>');
					}
					checkScreenSize();
					break;
				}
			}
			checkScreenSize();
			$('#productDetail-seriesItems').css('display', 'block');
		}

		$.getJSON('https://cdn.shirai-store.net/assets/json/common/instagramDisplayPhoto_v1_0.json', function (instagramPostData) {
			//console.log(instagramPostData);
			var productNumbers = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
			//console.log(productNumbers);
			var listHtml = '';
			$('#product-comment_5 li,#product-comment_9 li').each(function () {
				productNumbers += $(this).data('productcode');
			});

			//console.log(productNumbers);

			var count = 0;

			instagramPostData = instagramPostData.reverse();

			for (var i in instagramPostData) {
				for (var j in instagramPostData[i].relatedProduct) {
					var checkProductNumber = instagramPostData[i].relatedProduct[j].productUrl;
					//console.log('checkProductNumber:' + productNumber);
					//console.log('checkProductNumber:' + checkProductNumber);
					if (count >= 10) {
						break;
					}

					if (productNumbers.indexOf(checkProductNumber) > -1) {
						var postId = instagramPostData[i].postId,
							thumbnail_url = instagramPostData[i].thumbnail_url,
							sizeAdjustment = instagramPostData[i].sizeAdjustment;

						listHtml += '<li class="modal-open-instagram" data-target="instagramPost-modal" data-postid="' + postId + '"><img src="' + thumbnail_url + '" style="width:' + sizeAdjustment + '%;height:' + sizeAdjustment + '%;" alt="instagramPost_' + postId + '"></li>';
						// $('#postedList').append(listHtml);
						//console.log(listHtml);
						count++;
						break;
					}
				}
			}

			if (listHtml != '') {
				$('#feature').before(
					'<div id="shirai_fan"><h2 class="productDescriptionTitle">みんなの投稿写真<span>#shirai_fan</span></h2><p class="text-center">Instagramでみなさんに投稿していただいた写真をご紹介しています。</p><ul id="postedList">' +
						listHtml +
						'</ul><div class="fs-c-buttonContainer more-button"><a href="/f/shirai-fan" class="fs-c-button--standard">その他の投稿を見る</a></div><div id="instagramPost-modal" class="modal"><div class="modal-bg modal-close"></div><div id="instagramPost-modal_outer" class="modal-close"><div class="modal-content"><div class="modal-content_inner"></div><a class="modal-close_btn modal-close" href=""><img src="https://shiraistore.itembox.design/item/src/icon-close.svg" alt="閉じる" title="閉じる"></a><ul id="modal-control"><li class="modal-ctr-open prev" data-target="instagramPost-modal" data-postid=""></li><li class="modal-ctr-open next" data-target="instagramPost-modal" data-postid=""></li></ul></div></div></div></div></div>'
				);
			}

			$('.modal-open-instagram').on('click', function () {
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

// productTop10Slider
var recommend_top10Slider;
var ranking_top10Slider;
var productDetail_top10Slider;
var newLife_top10Slider1, newLife_top10Slider2, newLife_top10Slider3, newLife_top10Slider4, newLife_top10Slider5, newLife_top10Slider6, newLife_top10Slider7, newLife_top10Slider8, newLife_top10Slider9, newLife_top10Slider10, newLife_top10Slider11, newLife_top10Slider12, newLife_top10Slider13;

var top10Slider_option1 = {
	infiniteLoop: false,
	pager: false,
	hideControlOnEnd: true,
	touchEnabled: false,
	minSlides: 5,
	maxSlides: 5,
	slideWidth: 203,
	slideMargin: 8,
	controls: false,
};
var top10Slider_option2 = {
	infiniteLoop: false,
	pager: false,
	hideControlOnEnd: true,
	touchEnabled: false,
	minSlides: 5,
	maxSlides: 5,
	slideWidth: 203,
	slideMargin: 8,
};

if (recommend_top10Slider == null) {
	recommend_top10Slider = $('.productTop10Slider.recommend .bxslider').bxSlider(top10Slider_option1);
}
if (ranking_top10Slider == null) {
	ranking_top10Slider = $('.productTop10Slider.ranking .bxslider').bxSlider(top10Slider_option1);
}
if (productDetail_top10Slider == null) {
	productDetail_top10Slider = $('.productTop10Slider.series .bxslider').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider1 == null) {
	newLife_top10Slider1 = $('#newLife2022 .bxslider1').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider2 == null) {
	newLife_top10Slider2 = $('#newLife2022 .bxslider2').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider3 == null) {
	newLife_top10Slider3 = $('#newLife2022 .bxslider3').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider4 == null) {
	newLife_top10Slider4 = $('#newLife2022 .bxslider4').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider5 == null) {
	newLife_top10Slider5 = $('#newLife2022 .bxslider5').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider6 == null) {
	newLife_top10Slider6 = $('#newLife2022 .bxslider6').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider7 == null) {
	newLife_top10Slider7 = $('#newLife2022 .bxslider7').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider8 == null) {
	newLife_top10Slider8 = $('#newLife2022 .bxslider8').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider9 == null) {
	newLife_top10Slider9 = $('#newLife2022 .bxslider9').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider10 == null) {
	newLife_top10Slider10 = $('#newLife2022 .bxslider10').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider11 == null) {
	newLife_top10Slider11 = $('#newLife2022 .bxslider11').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider12 == null) {
	newLife_top10Slider12 = $('#newLife2022 .bxslider12').bxSlider(top10Slider_option1);
}
if (newLife_top10Slider13 == null) {
	newLife_top10Slider13 = $('#newLife2022 .bxslider13').bxSlider(top10Slider_option1);
}

function reviewScoreThreshold(reviewScore) {
	//レビュースコアの閾値を設定
	if (reviewScore < 0.5) {
		reviewScore = '0';
	} else if (reviewScore < 1.0) {
		reviewScore = '0.5';
	} else if (reviewScore < 1.5) {
		reviewScore = '1.0';
	} else if (reviewScore < 2.0) {
		reviewScore = '1.5';
	} else if (reviewScore < 2.5) {
		reviewScore = '2.0';
	} else if (reviewScore < 3.0) {
		reviewScore = '2.5';
	} else if (reviewScore < 3.5) {
		reviewScore = '3.0';
	} else if (reviewScore < 4.0) {
		reviewScore = '3.5';
	} else if (reviewScore < 4.5) {
		reviewScore = '4.0';
	} else if (reviewScore < 5) {
		reviewScore = '4.5';
	} else if (reviewScore == 5) {
		reviewScore = '5.0';
	}
	return reviewScore;
}

function checkScreenSize() {
	if ($('.productTop10Slider.recommend').length && recommend_top10Slider) {
		var newWindowWidth = $(window).width();
		if (newWindowWidth <= 1200) {
			recommend_top10Slider.destroySlider();
			$('.productTop10Slider').addClass('destroy');
		} else {
			recommend_top10Slider.reloadSlider(top10Slider_option2);
			$('.productTop10Slider').removeClass('destroy');
		}
	}

	if ($('.productTop10Slider.ranking').length && ranking_top10Slider) {
		var newWindowWidth = $(window).width();
		if (newWindowWidth <= 1200) {
			ranking_top10Slider.destroySlider();
			$('.productTop10Slider').addClass('destroy');
		} else {
			ranking_top10Slider.reloadSlider(top10Slider_option2);
			$('.productTop10Slider').removeClass('destroy');
		}
	}
	if ($('.productTop10Slider.series').length && productDetail_top10Slider) {
		var newWindowWidth = $(window).width();
		if (newWindowWidth <= 1200) {
			productDetail_top10Slider.destroySlider();
			$('.productTop10Slider').addClass('destroy');
		} else {
			productDetail_top10Slider.reloadSlider(top10Slider_option2);
			$('.productTop10Slider').removeClass('destroy');
		}
	}
	//newLife2022
	if ($('#newLife2022').length && (newLife_top10Slider1 || newLife_top10Slider2 || newLife_top10Slider3 || newLife_top10Slider4 || newLife_top10Slider5 || newLife_top10Slider6 || newLife_top10Slider7 || newLife_top10Slider8 || newLife_top10Slider9 || newLife_top10Slider10 || newLife_top10Slider11 || newLife_top10Slider12 || newLife_top10Slider13)) {
		var newWindowWidth = $(window).width();
		if (newWindowWidth <= 1200) {
			newLife_top10Slider1.destroySlider();
			newLife_top10Slider2.destroySlider();
			newLife_top10Slider3.destroySlider();
			newLife_top10Slider4.destroySlider();
			newLife_top10Slider5.destroySlider();
			newLife_top10Slider6.destroySlider();
			newLife_top10Slider7.destroySlider();
			newLife_top10Slider8.destroySlider();
			newLife_top10Slider9.destroySlider();
			newLife_top10Slider10.destroySlider();
			newLife_top10Slider11.destroySlider();
			newLife_top10Slider12.destroySlider();
			newLife_top10Slider13.destroySlider();
			$('.productTop10Slider').each(function () {
				$(this).addClass('destroy');
			});
		} else {
			newLife_top10Slider1.reloadSlider(top10Slider_option2);
			newLife_top10Slider2.reloadSlider(top10Slider_option2);
			newLife_top10Slider3.reloadSlider(top10Slider_option2);
			newLife_top10Slider4.reloadSlider(top10Slider_option2);
			newLife_top10Slider5.reloadSlider(top10Slider_option2);
			newLife_top10Slider6.reloadSlider(top10Slider_option2);
			newLife_top10Slider7.reloadSlider(top10Slider_option2);
			newLife_top10Slider8.reloadSlider(top10Slider_option2);
			newLife_top10Slider9.reloadSlider(top10Slider_option2);
			newLife_top10Slider10.reloadSlider(top10Slider_option2);
			newLife_top10Slider11.reloadSlider(top10Slider_option2);
			newLife_top10Slider12.reloadSlider(top10Slider_option2);
			newLife_top10Slider13.reloadSlider(top10Slider_option2);
			$('.productTop10Slider').each(function () {
				$(this).removeClass('destroy');
			});
		}
	}
}

function zeroPadding(NUM, LEN) {
	return (Array(LEN).join('0') + NUM).slice(-LEN);
}

function categoryNameShorter(categoryName) {
	switch (categoryName) {
		case 'テレビ台・ローボード':
			return 'テレビ台';
		case '本棚・ラック・カラーボックス':
			return '本棚・ラック';
		case 'キャビネット・収納庫':
			return 'キャビネット';
		default:
			return categoryName;
	}
}

function recommendTop10() {
	$.getJSON('https://cdn.shirai-store.net/assets/json/recommend/recommend_v2_0.json', function (recommendList) {
		for (var i in recommendList) {
			var productUrl = recommendList[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = recommendList[i].productId,
				productName = recommendList[i].productName,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				sellingPrice = Number(recommendList[i].sellingPrice),
				normalPrice = Number(recommendList[i].normalPrice),
				icon = recommendList[i].icon,
				size = recommendList[i].size,
				reviewScore = Number(recommendList[i].averageRating).toFixed(1),
				reviewCount = Number(recommendList[i].reviewCount),
				thumbnail = recommendList[i].thumbNumber,
				categoryName = recommendList[i].categoryLv1,
				categoryUrl = recommendList[i].categoryUrl;

			thumbnail = ('00' + thumbnail).slice(-2);

			if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
				seriesCode = 'tl';
			} else if (seriesCode == 'ona') {
				seriesCode = 'of2';
			}

			//console.log(thumb);

			if (sellingPrice < normalPrice) {
				sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			} else {
				sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			}

			var icon_ary = icon.split(',');

			var iconHtml = '';
			for (var j = 0; j < icon_ary.length; j++) {
				if (icon_ary[j] != '') {
					icon_ary[j] = icon_ary[j].split(':');

					if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 4) {
						categoryName = categoryNameShorter(categoryName);
						iconHtml += '<a href="/f/ranking-' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
					}

					if (icon_ary[j][0] == 'mark-new') {
						iconHtml += '<span class="mark-new">新着</span>';
					}

					if (icon_ary[j][0] == 'mark-limitedProduct') {
						iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
					}

					if (icon_ary[j][0] == 'mark-sale') {
						iconHtml += '<span class="mark-sale">SALE</span>';
					}
				}
			}

			if (reviewScore < 0.5) {
				reviewScore = '0';
			} else if (reviewScore < 1.0) {
				reviewScore = '0.5';
			} else if (reviewScore < 1.5) {
				reviewScore = '1.0';
			} else if (reviewScore < 2.0) {
				reviewScore = '1.5';
			} else if (reviewScore < 2.5) {
				reviewScore = '2.0';
			} else if (reviewScore < 3.0) {
				reviewScore = '2.5';
			} else if (reviewScore < 3.5) {
				reviewScore = '3.0';
			} else if (reviewScore < 4.0) {
				reviewScore = '3.5';
			} else if (reviewScore < 4.5) {
				reviewScore = '4.0';
			} else if (reviewScore < 5) {
				reviewScore = '4.5';
			} else if (reviewScore == 5) {
				reviewScore = '5.0';
			}

			var reviewHTML = '';

			if (reviewScore != 0) {
				reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
			} else {
				reviewHTML = '';
			}

			var h =
				'<li><a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'"><img src="https://shiraistore.itembox.design/product/' +
				zeroPadding(product_image_group, 3) +
				'/' +
				productId_12Len +
				'/' +
				productId_12Len +
				'-' +
				thumbnail +
				'-m.jpg" alt="' +
				productName +
				'" ><h3>' +
				productName +
				'</h3></a>' +
				'<div class="productMarks">' +
				iconHtml +
				'</div>' +
				'<div class="productSize">' +
				size +
				'</div>' +
				reviewHTML +
				'<a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'">' +
				sellingPrice +
				'</a></li>';

			$('.productTop10Slider.recommend ul').append(h);

			//$('img.lazy').lazyload();
			if (i == 9) {
				checkScreenSize();
				break;
			}
		}
	});
}

function rankingTop10(rakingTop10Type) {
	var pathName = location.pathname;
	var catURL = '';
	if (rakingTop10Type != undefined) {
		catURL = pathName.split('/').pop();
	} else {
		rakingTop10Type = 'ranking';
	}

	var jsonurl = 'https://cdn.shirai-store.net/assets/json/ranking/' + rakingTop10Type + catURL + '_v2_0.json';
	//console.log(jsonurl);
	$.getJSON(jsonurl, function (rankingList) {
		for (var i in rankingList) {
			var productUrl = rankingList[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = rankingList[i].productId,
				productName = rankingList[i].productName,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				sellingPrice = Number(rankingList[i].sellingPrice),
				normalPrice = Number(rankingList[i].normalPrice),
				icon = rankingList[i].icon,
				size = rankingList[i].size,
				reviewScore = Number(rankingList[i].averageRating).toFixed(1),
				reviewCount = Number(rankingList[i].reviewCount),
				thumbnail = rankingList[i].thumbNumber,
				categoryName = rankingList[i].categoryLv1,
				categoryUrl = rankingList[i].categoryUrl;

			thumbnail = ('00' + thumbnail).slice(-2);

			if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
				seriesCode = 'tl';
			} else if (seriesCode == 'ona') {
				seriesCode = 'of2';
			}

			if (sellingPrice < normalPrice) {
				sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			} else {
				sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			}

			var icon_ary = icon.split(',');

			var iconHtml = '';
			for (var j = 0; j < icon_ary.length; j++) {
				if (icon_ary[j] != '') {
					icon_ary[j] = icon_ary[j].split(':');

					if (icon_ary[j][0] == 'mark-rank' && catURL == '') {
						//categoryName = categoryNameShorter(categoryName);
						iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
					}

					if (icon_ary[j][0] == 'mark-categoryRank' && catURL != '') {
						//categoryName = categoryNameShorter(categoryName);
						iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
					}

					if (icon_ary[j][0] == 'mark-new') {
						iconHtml += '<span class="mark-new">新着</span>';
					}

					if (icon_ary[j][0] == 'mark-longseller') {
						iconHtml += '<span class="mark-longseller">ロングセラー</span>';
					}

					if (icon_ary[j][0] == 'mark-limitedProduct') {
						iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
					}

					if (icon_ary[j][0] == 'mark-sale') {
						iconHtml += '<span class="mark-sale">SALE</span>';
					}
				}
			}

			if (reviewScore < 0.5) {
				reviewScore = '0';
			} else if (reviewScore < 1.0) {
				reviewScore = '0.5';
			} else if (reviewScore < 1.5) {
				reviewScore = '1.0';
			} else if (reviewScore < 2.0) {
				reviewScore = '1.5';
			} else if (reviewScore < 2.5) {
				reviewScore = '2.0';
			} else if (reviewScore < 3.0) {
				reviewScore = '2.5';
			} else if (reviewScore < 3.5) {
				reviewScore = '3.0';
			} else if (reviewScore < 4.0) {
				reviewScore = '3.5';
			} else if (reviewScore < 4.5) {
				reviewScore = '4.0';
			} else if (reviewScore < 5) {
				reviewScore = '4.5';
			} else if (reviewScore == 5) {
				reviewScore = '5.0';
			}

			var reviewHTML = '';

			if (reviewScore != 0) {
				reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
			} else {
				reviewHTML = '';
			}

			var h =
				'<li><a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'"><img src="https://shiraistore.itembox.design/product/' +
				zeroPadding(product_image_group, 3) +
				'/' +
				productId_12Len +
				'/' +
				productId_12Len +
				'-' +
				thumbnail +
				'-m.jpg" alt="' +
				productName +
				'" ><h3>' +
				productName +
				'</h3></a>' +
				'<div class="productMarks">' +
				iconHtml +
				'</div>' +
				'<div class="productSize">' +
				size +
				'</div>' +
				reviewHTML +
				'<a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'">' +
				sellingPrice +
				'</a></li>';

			$('.productTop10Slider.ranking ul').append(h);

			var urlPath = location.pathname;
			//console.log(urlPath);
			if (urlPath == '/c/category/table' && i == 8) {
				checkScreenSize();
				break;
			}

			if (i == 9) {
				checkScreenSize();
				break;
			}
		}
	});

	$('.productTop10Slider.ranking ul').after('<div class="fs-c-buttonContainer more-button"><a href="/f/' + rakingTop10Type + catURL + '" class="fs-c-button--standard">もっと見る</a></div>');
}

function recommendList() {
	$.getJSON('https://cdn.shirai-store.net/assets/json/recommend/recommend_v2_0.json', function (recommendList) {
		for (var i in recommendList) {
			var productUrl = recommendList[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = recommendList[i].productId,
				productName = recommendList[i].productName,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				sellingPrice = Number(recommendList[i].sellingPrice),
				normalPrice = Number(recommendList[i].normalPrice),
				icon = recommendList[i].icon,
				size = recommendList[i].size,
				reviewScore = Number(recommendList[i].averageRating).toFixed(1),
				reviewCount = Number(recommendList[i].reviewCount),
				thumbnail = recommendList[i].thumbNumber,
				categoryName = recommendList[i].categoryLv1,
				categoryUrl = recommendList[i].categoryUrl;

			thumbnail = ('00' + thumbnail).slice(-2);

			if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
				seriesCode = 'tl';
			} else if (seriesCode == 'ona') {
				seriesCode = 'of2';
			}

			//console.log(thumb);

			if (sellingPrice < normalPrice) {
				sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			} else {
				sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			}

			var icon_ary = icon.split(',');

			var iconHtml = '';
			for (var j = 0; j < icon_ary.length; j++) {
				if (icon_ary[j] != '') {
					icon_ary[j] = icon_ary[j].split(':');

					if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 4) {
						categoryName = categoryNameShorter(categoryName);
						iconHtml += '<a href="/f/ranking-' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
					}

					//console.log('aaaa:',icon_ary[j][1]);

					if (icon_ary[j][0] == 'mark-new') {
						iconHtml += '<span class="mark-new">新着</span>';
					}

					if (icon_ary[j][0] == 'mark-limitedProduct') {
						iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
					}

					if (icon_ary[j][0] == 'mark-sale') {
						iconHtml += '<span class="mark-sale">SALE</span>';
					}
				}
			}

			if (reviewScore < 0.5) {
				reviewScore = '0';
			} else if (reviewScore < 1.0) {
				reviewScore = '0.5';
			} else if (reviewScore < 1.5) {
				reviewScore = '1.0';
			} else if (reviewScore < 2.0) {
				reviewScore = '1.5';
			} else if (reviewScore < 2.5) {
				reviewScore = '2.0';
			} else if (reviewScore < 3.0) {
				reviewScore = '2.5';
			} else if (reviewScore < 3.5) {
				reviewScore = '3.0';
			} else if (reviewScore < 4.0) {
				reviewScore = '3.5';
			} else if (reviewScore < 4.5) {
				reviewScore = '4.0';
			} else if (reviewScore < 5) {
				reviewScore = '4.5';
			} else if (reviewScore == 5) {
				reviewScore = '5.0';
			}

			var reviewHTML = '';

			if (reviewScore != 0) {
				reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
			} else {
				reviewHTML = '';
			}

			var h =
				'<li><a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'"><img src="https://shiraistore.itembox.design/product/' +
				zeroPadding(product_image_group, 3) +
				'/' +
				productId_12Len +
				'/' +
				productId_12Len +
				'-' +
				thumbnail +
				'-m.jpg" alt="' +
				productName +
				'" ><h2>' +
				productName +
				'</h2></a>' +
				'<div class="productMarks">' +
				iconHtml +
				'</div>' +
				'<div class="productSize">' +
				size +
				'</div>' +
				reviewHTML +
				'<a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'">' +
				sellingPrice +
				'</a></li>';

			$('#recommendList ul').append(h);

			$('img.lazy').lazyload({
				threshold: 200,
			});
		}
	});
}

function rankingList(jsonfile) {
	var jsonurl = 'https://cdn.shirai-store.net/assets/json/ranking/' + jsonfile + '_v2_0.json';
	//console.log(jsonurl);
	$.getJSON(jsonurl, function (rankingList) {
		for (var i in rankingList) {
			var productUrl = rankingList[i].productUrl,
				seriesCode = productUrl.slice(0, 3),
				productId = rankingList[i].productId,
				productName = rankingList[i].productName,
				productId_12Len = zeroPadding(productId, 12),
				product_image_group = Math.floor(productId / 100),
				sellingPrice = Number(rankingList[i].sellingPrice),
				normalPrice = Number(rankingList[i].normalPrice),
				icon = rankingList[i].icon,
				size = rankingList[i].size,
				reviewScore = Number(rankingList[i].averageRating).toFixed(1),
				reviewCount = Number(rankingList[i].reviewCount),
				thumbnail = rankingList[i].thumbNumber,
				categoryName = rankingList[i].categoryLv1,
				categoryUrl = rankingList[i].categoryUrl;

			thumbnail = ('00' + thumbnail).slice(-2);

			if (seriesCode == 'tl1' || seriesCode == 'tl2' || seriesCode == 'tl3') {
				seriesCode = 'tl';
			} else if (seriesCode == 'ona') {
				seriesCode = 'of2';
			}

			if (sellingPrice < normalPrice) {
				sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			} else {
				sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>';
			}

			var icon_ary = icon.split(',');

			var iconHtml = '';
			for (var j = 0; j < icon_ary.length; j++) {
				if (icon_ary[j] != '') {
					icon_ary[j] = icon_ary[j].split(':');

					if (icon_ary[j][0] == 'mark-rank' && jsonfile == 'ranking') {
						//categoryName = categoryNameShorter(categoryName);
						iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
					}

					if (icon_ary[j][0] == 'mark-categoryRank' && jsonfile != 'ranking') {
						//categoryName = categoryNameShorter(categoryName);
						iconHtml += '<span class="mark-rank">' + icon_ary[j][1] + '位</span>';
					}

					if (icon_ary[j][0] == 'mark-new') {
						iconHtml += '<span class="mark-new">新着</span>';
					}

					if (icon_ary[j][0] == 'mark-longseller') {
						iconHtml += '<span class="mark-longseller">ロングセラー</span>';
					}

					if (icon_ary[j][0] == 'mark-limitedProduct') {
						iconHtml += '<span class="mark-limitedProduct">当店限定商品</span>';
					}

					if (icon_ary[j][0] == 'mark-sale') {
						iconHtml += '<span class="mark-sale">SALE</span>';
					}
				}
			}

			if (reviewScore < 0.5) {
				reviewScore = '0';
			} else if (reviewScore < 1.0) {
				reviewScore = '0.5';
			} else if (reviewScore < 1.5) {
				reviewScore = '1.0';
			} else if (reviewScore < 2.0) {
				reviewScore = '1.5';
			} else if (reviewScore < 2.5) {
				reviewScore = '2.0';
			} else if (reviewScore < 3.0) {
				reviewScore = '2.5';
			} else if (reviewScore < 3.5) {
				reviewScore = '3.0';
			} else if (reviewScore < 4.0) {
				reviewScore = '3.5';
			} else if (reviewScore < 4.5) {
				reviewScore = '4.0';
			} else if (reviewScore < 5) {
				reviewScore = '4.5';
			} else if (reviewScore == 5) {
				reviewScore = '5.0';
			}

			var reviewHTML = '';

			if (reviewScore != 0) {
				reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
			} else {
				reviewHTML = '';
			}

			var h =
				'<li><a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'"><img src="https://shiraistore.itembox.design/product/' +
				zeroPadding(product_image_group, 3) +
				'/' +
				productId_12Len +
				'/' +
				productId_12Len +
				'-' +
				thumbnail +
				'-m.jpg" alt="' +
				productName +
				'" ><h2>' +
				productName +
				'</h2></a>' +
				'<div class="productMarks">' +
				iconHtml +
				'</div>' +
				'<div class="productSize">' +
				size +
				'</div>' +
				reviewHTML +
				'<a href="/c/series/' +
				seriesCode +
				'/' +
				productUrl +
				'">' +
				sellingPrice +
				'</a></li>';

			$('#rankingList ul').append(h);

			$('img.lazy').lazyload({
				threshold: 200,
			});
		}
	});
}

function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* BirthdayYear default selected
========================================================================== */
function birthdayYearDefaultSelected() {
	$('#fs_input_birthdayYear').val(1980);
}

/* calendar
========================================================================== */

// Cal3.4.5 / 2014-08-05
// SYNCK GRAPHICA
// charset UTF-8

function calendar() {
	var calObj = new Array();

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//【以下カレンダー0の設定】

	// [0]は0番目のカレンダー
	calObj[0] = new Object();

	// 曜日スタート // [0] 日 / [1] 月 / [2] 火 / [3] 水 / [4] 木 / [5] 金 / [6] 土
	calObj[0].weekStart = 0;

	// xヶ月後のカレンダーを初期表示するか (0の場合は当月)
	calObj[0].defaultMonth = 0;

	// ["day"] 日付に対してのクラス指定
	calObj[0].daysClass = new Object();
	calObj[0].daysClass['2022/12/28'] = 'Holyday';
	calObj[0].daysClass['2022/12/29'] = 'Holyday';
	calObj[0].daysClass['2022/12/30'] = 'Holyday';
	calObj[0].daysClass['2023/1/1'] = 'Holyday';
	calObj[0].daysClass['2023/1/2'] = 'Holyday';
	calObj[0].daysClass['2023/1/3'] = 'Holyday';
	calObj[0].daysClass['2023/1/4'] = 'Holyday';
	calObj[0].daysClass['2023/1/9'] = 'Holyday';
	calObj[0].daysClass['2023/2/11'] = 'Holyday';
	calObj[0].daysClass['2023/2/23'] = 'Holyday';
	calObj[0].daysClass['2023/3/21'] = 'Holyday';
	calObj[0].daysClass['2023/4/29'] = 'Holyday';
	calObj[0].daysClass['2023/5/3'] = 'Holyday';
	calObj[0].daysClass['2023/5/4'] = 'Holyday';
	calObj[0].daysClass['2023/5/5'] = 'Holyday';
	calObj[0].daysClass['2023/7/17'] = 'Holyday';
	calObj[0].daysClass['2023/8/11'] = 'Holyday';
	calObj[0].daysClass['2023/8/16'] = 'Holyday';
	calObj[0].daysClass['2023/9/18'] = 'Holyday';
	calObj[0].daysClass['2023/9/23'] = 'Holyday';
	calObj[0].daysClass['2023/10/9'] = 'Holyday';
	calObj[0].daysClass['2023/11/3'] = 'Holyday';
	calObj[0].daysClass['2023/11/23'] = 'Holyday';
	calObj[0].daysClass['2024/1/1'] = 'Holyday';
	calObj[0].daysClass['2024/1/8'] = 'Holyday';
	calObj[0].daysClass['2024/2/11'] = 'Holyday';
	calObj[0].daysClass['2024/2/12'] = 'Holyday';
	calObj[0].daysClass['2024/2/23'] = 'Holyday';
	calObj[0].daysClass['2024/3/20'] = 'Holyday';
	calObj[0].daysClass['2024/4/29'] = 'Holyday';
	calObj[0].daysClass['2024/5/3'] = 'Holyday';
	calObj[0].daysClass['2024/5/4'] = 'Holyday';
	calObj[0].daysClass['2024/5/5'] = 'Holyday';
	calObj[0].daysClass['2024/5/6'] = 'Holyday';
	calObj[0].daysClass['2024/7/15'] = 'Holyday';
	calObj[0].daysClass['2024/8/11'] = 'Holyday';
	calObj[0].daysClass['2024/8/12'] = 'Holyday';
	calObj[0].daysClass['2024/9/16'] = 'Holyday';
	calObj[0].daysClass['2024/9/22'] = 'Holyday';
	calObj[0].daysClass['2024/9/23'] = 'Holyday';
	calObj[0].daysClass['2024/10/14'] = 'Holyday';
	calObj[0].daysClass['2024/11/3'] = 'Holyday';
	calObj[0].daysClass['2024/11/4'] = 'Holyday';
	calObj[0].daysClass['2024/11/23'] = 'Holyday';
	//calObj[0].daysClass["2012/6/9"] = 'Birthday;テキストテキストテキスト<br />テキストテキストテキスト;http://weblogs.trancedive.com';
	// 2012/6/9にBirthdayクラスを指定ってことね(和田の誕生日です)。
	// セミコロンで区切ると説明コメント、URLを付けることができます(全クラス指定共通)。
	//calObj[0].daysClass["6/9"] = 'Birthday;年を抜くと毎年。;http://weblogs.trancedive.com';

	// ["xDaysLater"] ○日後のクラス指定
	calObj[0].xDaysLater = new Array();
	//calObj[0].xDaysLater[0] = 'Today'; // 0日後にTodayクラスを指定
	//calObj[0].xDaysLater[4] = 'Deli;本日注文の場合の発送予定日'; // 1日後にTomorrowクラスを指定

	/*calObj[0].daysClass["1/1"] = 'Holyday';
    calObj[0].daysClass["2/11"] = 'Holyday';
    calObj[0].daysClass["3/20"] = 'Holyday';
    calObj[0].daysClass["4/29"] = 'Holyday';
    calObj[0].daysClass["5/3"] = 'Holyday';
    calObj[0].daysClass["5/4"] = 'Holyday';
    calObj[0].daysClass["5/5"] = 'Holyday';
    calObj[0].daysClass["8/10"] = 'Holyday';
    calObj[0].daysClass["11/3"] = 'Holyday';
    calObj[0].daysClass["11/23"] = 'Holyday';*/

	// ["xDay"] 毎月○日のクラス指定
	calObj[0].xDays = new Array();
	//calObj[0].xDays[1] = 'Sale;毎月1日は激安セールの日☆'; // 毎月1日にSaleクラスを指定

	// ["week"] 毎週○曜日の場合
	calObj[0].week = new Array();
	calObj[0].week[0] = 'Holyday'; // Sun
	calObj[0].week[1]; // Mon
	calObj[0].week[2]; // Tue
	calObj[0].week[3]; // Wed
	calObj[0].week[4]; // Thu
	calObj[0].week[5]; // Fri
	calObj[0].week[6] = 'Holyday'; // Sat

	// (○月) 第× △曜日の場合
	calObj[0].month = new Object();
	// 毎月「曜日-第○」 日:0 / 月:1 / 火:2 / 水:3 / 木:4 / 金:5 / 土:6
	//calObj[0].month["0-4"] = 'Holyday;第2月曜日'; // 第2火曜日はHolydayクラス指定
	//calObj[0].month["2-2"] = 'Holyday;第2火曜日は定休日です☆'; // 第2火曜日はHolydayクラス指定
	//calObj[0].month["2-4"] = 'Holyday;第4火曜日は定休日です☆'; // 第4火曜日はHolydayクラス指定
	// 固定月「月-曜日-第○」 日:0 / 月:1 / 火:2 / 水:3 / 木:4 / 金:5 / 土:6
	//calObj[0].month["1-1-2"] = 'Holyday'; // 1月 月曜日(1) 第2
	//calObj[0].month["7-1-3"] = 'Holyday'; // 7月 月曜日(1) 第3
	//calObj[0].month["9-1-3"] = 'Holyday'; // 9月 月曜日(1) 第3
	//calObj[0].month["10-1-2"] = 'Holyday'; // 10月 月曜日(1) 第2

	// ["backward"] 過去の日付のクラス名(指定しない場合はnull)
	calObj[0].backward = 'backward';

	// カレンダーをクリックできるようにする場合 (有効 : true / 無効 : false)
	// クラス指定でURLが指定されている場合はそっちが優先されます。
	calObj[0].click = false;

	// クリックした時に開くURL ( _YEAR_ : 年 / _MONTH_ : 月 / _DAY_ : 日 )
	calObj[0].clickURI = 'http://www.yahoo.co.jp/?year=_YEAR_&month=_MONTH_&day=_DAY_';

	// クリック可能にしたいクラス名 (すべての日をクリック可能にする場合は空にしてください)
	// Holyday と指定した場合はclassがHolyday指定された日付だけクリックできるようになります。
	calObj[0].clickClassName = '';

	// 優先度 クラス指定する順番が変わります。
	calObj[0].priority = new Array('week', 'xDay', 'xDaysLater', 'day', 'backward');

	//【カレンダー0の設定はここまで】

	// [0]のカレンダーを[1]にコピーして修正
	calObj[1] = new Object();
	calObj[1] = cal_clone(calObj[0]);
	calObj[1].defaultMonth = 1; //翌月から表示
	calObj[1].weekStart = 0;

	// カレンダー1の設定はここまで

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 以下、さわらぬ神にたたりなし
	calObj.calendars = new Array();
	calObj.days = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	calObj.weekName = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
	calObj.monthName = new Array('', '/01', '/02', '/03', '/04', '/05', '/06', '/07', '/08', '/09', '/10', '/11', '/12');
	calObj.date = new Date();
	calObj.date = new Date(calObj.date.getFullYear() + '/' + (calObj.date.getMonth() + 1) + '/' + calObj.date.getDate() + ' 00:00:00');
	calObj.day = calObj.date.getDate();
	calObj.month = calObj.date.getMonth() + 1;
	calObj.year = calObj.date.getFullYear();
	calObj.currentList = null;

	function cal_init() {
		var d = window.document;
		var tagObj = d.getElementsByTagName('div');
		var calToday = new Date();
		for (var i = 0; i < tagObj.length; i++) {
			if (tagObj[i].className == 'cal_wrapper') {
				var calId = Number(tagObj[i].id.substring(3, tagObj[i].id.length));
				calObj.calendars.push(calId);
				if (0 < calObj.month + calObj[calId].defaultMonth && calObj.month + calObj[calId].defaultMonth < 13) calObj[calId].currentMonth = new Date(calObj.year + '/' + (calObj.month + calObj[calId].defaultMonth) + '/' + '1 00:00:00');
				else calObj[calId].currentMonth = new Date(calObj.year + 1 + '/' + ((calObj.month + calObj[calId].defaultMonth) % 12) + '/' + '1 00:00:00');
				cal_create(calId);
			}
		}
	}
	function cal_create(calId) {
		var d = window.document;
		var day = calObj[calId].currentMonth.getDate();
		var month = calObj[calId].currentMonth.getMonth() + 1;
		var year = calObj[calId].currentMonth.getFullYear();
		var week = calObj[calId].currentMonth.getDay();
		var time = calObj[calId].currentMonth.getTime();
		var tdTextListArr = new Array();
		var bisDay = 0;
		var MonthDays = calObj.days[month];
		var WeekCnt = new Array();
		var calendarHash = [];
		if (month == 2) {
			if (year % 100 == 0 || year % 4 != 0) {
				if (year % 400 != 0) {
					bisDay = 0;
				} else {
					bisDay = 1;
				}
			} else if (year % 4 == 0) {
				bisDay = 1;
			} else {
				bisDay = 0;
			}
		}
		MonthDays += bisDay;
		var calHTML = "<table border='0' cellspacing='0' cellpadding='0' class='cal'>";
		calHTML += "<tr><th colspan='7'>";
		calHTML += "<div class='cal_ui'>";
		calHTML += "<input type='button' onclick='cal_move(" + calId + ",-1);' value='&lt; prev' />";
		calHTML += "<input type='button' onclick='cal_move(" + calId + ",null);' value='-' />";
		calHTML += "<input type='button' onclick='cal_move(" + calId + ",1);' value='next &gt;' />";
		calHTML += '</div>';
		calHTML += '<p>' + year + calObj.monthName[month] + '</p></th></tr>';
		calHTML += "<tr class='headline'>";
		for (var i = 0; i < 7; i++) {
			var w = (calObj[calId].weekStart + i) % 7;
			calHTML += '<td>' + calObj.weekName[w] + '</td>';
		}
		calHTML += '</tr><tr>';
		var weekBreak = (calObj[calId].weekStart - 1) % 7;
		if (weekBreak < 0) {
			weekBreak = 6;
		}
		var ws = week;
		var i = 0;
		var weekBlank = [];
		while (ws != calObj[calId].weekStart) {
			var t = new Date(time - (i + 1) * (60 * 60 * 24 * 1000));
			weekBlank.unshift('<td><div class="backward">' + t.getDate() + '</div></td>');
			i++;
			ws--;
			if (ws < 0) {
				ws = 6;
			}
		}
		calHTML += weekBlank.join('');

		for (dayCnt = 1; dayCnt <= calObj.days[month] + bisDay; dayCnt++) {
			var dayStr = year + '/' + month + '/' + dayCnt;
			var dayStrN = month + '/' + dayCnt;
			if (WeekCnt[week] == undefined) WeekCnt[week] = 0;
			WeekCnt[week]++;

			var monStr = '' + month + '-' + week + '-' + WeekCnt[week];
			var weekStr = '' + week + '-' + WeekCnt[week];

			var dayClass = new Object();
			var dayClassText = new Object();
			var currentDayDate = new Date(year + '/' + month + '/' + dayCnt + ' 00:00:00');
			var laterDay = Math.floor((currentDayDate.getTime() - calObj.date.getTime()) / 1000 / (60 * 60 * 24));
			var tdId = 'td_' + calId + '_' + year + '_' + month + '_' + dayCnt;

			// backward
			if (calObj[calId].backward != null && currentDayDate.getTime() < calObj.date.getTime()) dayClass['backward'] = calObj[calId].backward;

			// week
			if (calObj[calId].month[weekStr] != undefined) dayClass['week'] = calObj[calId].month[weekStr];
			else if (calObj[calId].month[monStr] != undefined) dayClass['week'] = calObj[calId].month[monStr];
			else if (calObj[calId].week[week] != undefined) {
				if (typeof calObj[calId].week[week] == 'object' && calObj[calId].week[week][WeekCnt[week]] != undefined) {
					dayClass['week'] = calObj[calId].week[week][WeekCnt[week]];
				} else if (calObj[calId].week[week] != undefined && typeof calObj[calId].week[week] != 'object') dayClass['week'] = calObj[calId].week[week];
			}
			// xDay
			if (calObj[calId].xDays[dayCnt] != undefined) dayClass['xDay'] = calObj[calId].xDays[dayCnt];

			// xDaysLater
			if (calObj[calId].xDaysLater[laterDay] != undefined) dayClass['xDaysLater'] = calObj[calId].xDaysLater[laterDay];

			// day
			if (calObj[calId].daysClass[dayStr] != undefined) dayClass['day'] = calObj[calId].daysClass[dayStr];
			else if (calObj[calId].daysClass[dayStrN] != undefined) dayClass['day'] = calObj[calId].daysClass[dayStrN];

			var tdClassArr = new Array();
			var tdTextArr = new Array();
			var tdLinkArr = new Array();
			var tdClassStr = '';
			var tdTextStr = '';
			var tdMouse = '';
			var tdClassNames = new Object();
			for (var ci = 0; ci < calObj[calId].priority.length; ci++) {
				if (dayClass[calObj[calId].priority[ci]] != undefined) {
					var splitArr = new Array();
					splitArr = dayClass[calObj[calId].priority[ci]].split(';');
					tdClassArr.push(splitArr[0]);
					tdClassNames[splitArr[0]] = true;
					if (splitArr[1] != undefined) {
						tdTextArr.push(splitArr[1]);
						var tdTextListLink = '';
						if (splitArr[2] != undefined) tdTextListLink = ' onclick="cal_open(\'' + splitArr[2] + '\')"';
						tdTextListArr.push('<ol><li id="' + tdId + '_li" onmouseover="cal_list2day_over(this)" onmouseout="cal_list2day_out(this)" value="' + dayCnt + '"' + tdTextListLink + '>' + splitArr[1] + '</li></ol>');
					}
					if (splitArr[2] != undefined) tdLinkArr.push(splitArr[2]);
				}
			}
			if (tdTextArr.length > 0) {
				tdTextStr = "<span id='" + tdId + "'>";
				for (var i = 0; i < tdTextArr.length; i++) {
					tdTextStr += tdTextArr[i] + '<br />';
				}
				tdTextStr += '</span>';
				tdMouse = ' onmouseover="cal_disp_text(\'' + tdId + '\')" onmouseout="cal_hide_text(\'' + tdId + '\')"';
				tdClassArr.push('pointer');
			}
			if (tdLinkArr.length > 0) tdMouse += ' onclick="cal_open(\'' + tdLinkArr[0] + '\')"';
			else if (calObj[calId].click) {
				var clickOpenURI = calObj[calId].clickURI;
				clickOpenURI = clickOpenURI.replace(/_YEAR_/gi, year);
				clickOpenURI = clickOpenURI.replace(/_MONTH_/gi, month);
				clickOpenURI = clickOpenURI.replace(/_DAY_/gi, dayCnt);
				if ((calObj[calId].clickClassName != '' && tdClassNames[calObj[calId].clickClassName]) || calObj[calId].clickClassName == '') {
					tdMouse += ' onclick="cal_open(\'' + clickOpenURI + '\')"';
					tdClassArr.push('pointer');
				}
			}
			if (tdClassArr.length > 0) tdClassStr = " class='" + tdClassArr.join(' ') + "'";
			calHTML += "<td id='" + tdId + "_td'><div" + tdClassStr + tdMouse + '>' + dayCnt + tdTextStr + '</div></td>';
			if (week == weekBreak) {
				calHTML += '</tr>';
				if (dayCnt < calObj.days[month]) {
					calHTML += '<tr>';
				}
			}
			week++;
			week = week % 7;
		}
		var nd = 0;
		while (week != calObj[calId].weekStart) {
			nd++;
			calHTML += '<td><div class="backward">' + nd + '</div></td>';
			week++;
			week = week % 7;
		}
		calHTML += '</table>';
		d.getElementById('cal' + calId).innerHTML = calHTML;

		if (d.getElementById('schedule' + calId)) {
			d.getElementById('schedule' + calId).innerHTML = '';
			if (tdTextListArr.length > 0 && d.getElementById('schedule' + calId)) {
				d.getElementById('schedule' + calId).innerHTML = tdTextListArr.join('');
			}
		}
	}
	function cal_list2day_over(obj) {
		var d = window.document;
		var dayId = obj.id.substring(0, obj.id.indexOf('_li'));
		if (d.getElementById(calObj.currentList)) d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
		calObj.currentList = dayId + '_td';
		if (d.getElementById(dayId + '_td')) d.getElementById(dayId + '_td').style.backgroundColor = '#CCC';
	}
	function cal_list2day_out(obj) {
		var d = window.document;
		var dayId = obj.id.substring(0, obj.id.indexOf('_li'));
		if (d.getElementById(calObj.currentList)) d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
	}
	function cal_open(uri) {
		window.open(uri);
	}
	function cal_disp_text(textId) {
		var d = window.document;
		if (navigator.userAgent.indexOf('MSIE') == -1) d.getElementById(textId).style.display = 'block';
	}
	function cal_hide_text(textId) {
		var d = window.document;
		d.getElementById(textId).style.display = 'none';
	}

	function cal_move(calId, m) {
		if (m == null) calObj[calId].currentMonth = new Date(calObj.year + '/' + calObj.month + '/' + '1 00:00:00');
		else {
			var day = calObj[calId].currentMonth.getDate();
			var month = calObj[calId].currentMonth.getMonth() + 1;
			var year = calObj[calId].currentMonth.getFullYear();
			if (0 < month + m && month + m < 13) calObj[calId].currentMonth = new Date(year + '/' + (month + m) + '/' + '1 00:00:00');
			else if (month + m < 1) {
				year--;
				month = 12;
				calObj[calId].currentMonth = new Date(year + '/' + month + '/' + '1 00:00:00');
			} else {
				year++;
				month = 1;
				calObj[calId].currentMonth = new Date(year + '/' + month + '/' + '1 00:00:00');
			}
		}
		cal_create(calId);
	}
	function cal_clone(obj) {
		var dest;
		if (typeof obj == 'object') {
			if (obj instanceof Array) {
				dest = new Array();
				for (i = 0; i < obj.length; i++) dest[i] = cal_clone(obj[i]);
			} else {
				dest = new Object();
				for (prop in obj) dest[prop] = cal_clone(obj[prop]);
			}
		} else dest = obj;
		return dest;
	}
	function cal_getMonth() {}
	cal_init();
}

/* GlobalNavi
========================================================================== */
function globalNavi() {
	$('.dropDown').hover(
		function () {
			$(this).children('div').hide().stop().fadeIn(200);
			$('#globalNavi-overlay').hide().stop().fadeIn(200);
			$('.advancedSearchForm').hide();
		},
		function () {
			$(this).children('div').stop().fadeOut(200);
			$('#globalNavi-overlay').stop().fadeOut(200);
		}
	);
	$('.globalNavi-productLevel1 span').on('click', function () {
		var i = $(this).data('category-tab'),
			target = '.data-category-area' + i;
		$('[class^="data-category-area"]').not(target).slideUp(200);
		$(target).slideDown(200);
	});
}

/* imageChange
========================================================================== */
function imageChange() {
	var windowWidth = parseInt($(window).width());
	if (windowWidth > 480) {
		$('.imageChange').each(function () {
			var imageName = $(this).attr('src').replace('_sp.', '_pc.');
			$(this).attr('src', imageName);
		});
	} else if (windowWidth <= 480) {
		$('.imageChange').each(function () {
			var imageName = $(this).attr('src').replace('_pc.', '_sp.');
			$(this).attr('src', imageName);
		});
	}
}
function searchOpen() {
	if (global_lastInnerWidth > 768) {
		$('#header-keywordSearch').removeClass('max768');
	} else {
		$('#header-keywordSearch').addClass('max768');
	}
}

/* slideNaviResizeHeight
========================================================================== */
function slideNaviResizeHeight() {
	var slideNaviHeight = $(window).height();
	$('#slideNavi-body').css('height', slideNaviHeight - 47);
	$('#header-keywordSearch .slideNavi-list-category-item').css('height', slideNaviHeight - 160);
}

/* smoothScroll
========================================================================== */
function smoothScroll() {
	$('a[href^="#"]').on('click', function () {
		var speed = 500;
		var href = $(this).attr('href');
		var target = $(href == '#' || href == '' ? 'html' : href);
		var position = target.offset().top - 88;
		$('html, body').animate({ scrollTop: position }, speed, 'swing');
		return false;
	});

	var url = $(location).attr('href');
	if (url.indexOf('#&') == -1) {
		if (url.indexOf('#') != -1) {
			var anchor = url.split('#');
			var target = $('#' + anchor[anchor.length - 1]);
			if (target.length) {
				var pos = Math.floor(target.offset().top) - $('.fs-l-header').height();
				$('html, body').animate({ scrollTop: pos }, 0);
			}
		}
	}
}

/* topMainVisualSlider imageChange
========================================================================== */
function topMainVisualSlider_imageChange() {
	var windowWidth = parseInt($(window).width());
	if (windowWidth > 480) {
		$('#mainVisual-slider .slick-item img').each(function () {
			var imageName = $(this).attr('src').replace('_sp.', '_pc.');
			$(this).attr('src', imageName);
		});
	} else if (windowWidth <= 480) {
		$('#mainVisual-slider .slick-item img').each(function () {
			var imageName = $(this).attr('src').replace('_pc.', '_sp.');
			$(this).attr('src', imageName);
		});
	}
}

/* Window resize event
========================================================================== */
function windowWidthDOMChange() {
	var windowWidth = document.body.clientWidth;
	if ($('#magazine-type1').length) {
		$('.magazine-product-block .thumImageBox').height($('#magazine-type1 .mainImageBox').width());
	}

	if (windowWidth > 1024) {
		/* product productInformationBox change */
		if ($('#fs_ProductDetails').length) {
			$('.fs-l-productLayout__item--1 #_rcmdjp_display_1').prependTo('.fs-l-productLayout__item--2');
			$('.fs-l-productLayout__item--1 #product-banner').prependTo('.fs-l-productLayout__item--2');
			$('.fs-l-productLayout__item--1 #productInformationBox').prependTo('.fs-l-productLayout__item--2');
		}
		/* slideNavi featureBox change */
		$('#slideNavi #header-globalNavi-bannerArea').insertAfter('#productNavi .globalNavi-productList-bottom');
		$('#slideNavi #featureBox').prependTo('#magazineNavi .globalNaviBox');
	} else if (windowWidth <= 1024) {
		/* product productInformationBox change */
		if ($('#fs_ProductDetails').length) {
			if ($('#productImageBoxBottomBanner').length) {
				$('.fs-l-productLayout__item--2 #productInformationBox').insertAfter('#productImageBoxBottomBanner');
			} else {
				$('.fs-l-productLayout__item--2 #productInformationBox').insertAfter('#productImageBox');
			}
			$('.fs-l-productLayout__item--2 #_rcmdjp_display_1').insertAfter('#product-review');
			$('.fs-l-productLayout__item--2 #product-banner').insertAfter('#product-review');

			$('#productDetail-rankingTop10').insertAfter('#productDetail-comparison');
			//console.log('AA');
		}
		/* slideNavi featureBox change */
		$('#productNavi #header-globalNavi-bannerArea').insertBefore('#slideNavi-utility');
		$('#featureBox').insertAfter('#slideNavi-list-middle');

		var url = window.location.pathname.split('/');
		//console.log(url[1])
		if (url[1] == 'my') {
			$('#slideNavi-list-mypage').css('display', 'block');
		}
	}

	if (windowWidth <= 480) {
	} else {
		$('#header-keywordSearch .slideNavi-list-category-item').css('display', 'none');
	}
}

/* windowWidthprocessingChange
========================================================================== */
function windowWidthprocessingChange() {
	$('#slideNavi-button').on('click', function () {
		var windowWidth = $(window).width();
		if (windowWidth <= 1024) {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#slideNavi').removeClass('open');
				if (windowWidth <= 768) {
					$('#slideNavi').animate({ left: '-100%' });
				} else {
					$('#slideNavi').animate({ left: '-50%' });
				}
				$('#slideNavi-overlay').fadeOut();
			} else {
				$(this).addClass('active');
				$('html').css('overflow', 'hidden');
				$('#slideNavi').addClass('open');
				$('#slideNavi').animate({ left: '0' });
				$('#slideNavi-overlay').fadeIn();
			}
		}
	});
	$('#slideNavi .close, #slideNavi-overlay').on('click', function () {
		var windowWidth = $(window).width();
		if (windowWidth <= 1024) {
			$('#slideNavi-button').removeClass('active');
			$('#slideNavi').removeClass('open');
			if (windowWidth <= 768) {
				$('#slideNavi').animate({ left: '-100%' });
				$('html').css('overflow', 'scroll');
			} else {
				$('#slideNavi').animate({ left: '-50%' });
				$('html').css('overflow', 'scroll');
			}
			$('#slideNavi-overlay').fadeOut();
		}
	});
	$(document).on('click', '.slideNavi-list-category, .slideNavi-list-series', function () {
		$(this).next('ul').slideToggle();
		$(this).toggleClass('open');
	});
	$(document).on('click', '.slideNavi-list-category-item > li > span', function () {
		$(this).next('.slideNavi-list-category-item-sub').slideToggle();
		$(this).toggleClass('open');
	});
}

/* cartRegistBranch
========================================================================== */
function cartADISCaution() {
	if ($('#fs_ShoppingCart').length) {
		$('.fs-c-listedOptionPrice__option__value').each(function () {
			var value = $(this).text();
			if (value == '組立済+玄関渡し' || value == '組立済+搬入') {
				$(this).after('<span class="cartADISCauton">搬入路に十分な広さがあることをご確認ください</span>');
			}
		});
	}
}

/* cartRegistBranch
========================================================================== */
function cartRegistBranch() {
	if ($('#fs_ShoppingCart').length) {
		$('.fs-c-buttonContainer--unregisteredUserPurchase span').html('<span class="textDecoration">会員登録せずにお買い物する</span>');
		$('.fs-c-buttonContainer--unregisteredUserPurchase a').after('<span>【ご注意】送料無料&各種割引クーポンをご利用いただくには会員登録が必要です。</span>');
		$('.fs-c-buttonContainer--loginAndPurchase').after(
			'<div class="fs-c-cartPayment__button fs-c-buttonContainer fs-c-buttonContainer--newUserPurchase"> <a href="/p/register?route=fromCart" class="fs-c-button--unregisteredUserPurchase fs-c-button--secondary click-fromCart"> <span class="fs-c-button__label">会員登録<span class="small-text">（無料）</span>してお買い物する</a> </div>'
		);
	}

	if ($('#fs_Register').length) {
		var pram = $(location).attr('search');
		//console.log(pram)
		if (pram.indexOf('fromCart') != -1) {
			$.cookie('cartRegistFlag', 1);
		}
	}

	if ($('#fs_RegisterSuccess').length) {
		if ($.cookie('cartRegistFlag') == 1) {
			$('.fs-c-buttonContainer--myPageTop').addClass('goToCheckout');
			$('.fs-c-buttonContainer--myPageTop a').attr('href', '/p/checkout?payment=here');
			$('.fs-c-buttonContainer--myPageTop a span').text('ご注文に進む');
			$.removeCookie('cartRegistFlag');
		}
	}
}

/* slideToggleButton
========================================================================== */
function slideToggleButton() {
	$('.slideToggleButton').on('click', function () {
		$(this).next('.slideToggleBody').slideToggle();
	});
	$('.slideToggleBody-close').on('click', function () {
		$(this).parent('.slideToggleBody').slideUp();
	});
}

/* ie11_compulsionScroll
========================================================================== */
function ie11_compulsionScroll() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('trident') != -1) {
		$('html,body').animate({ scrollTop: $('body').offset().top + 1 });
	}
}
