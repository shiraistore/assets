$(function () {
	tnl_em_introduction();
	tnl_em_select();
	tnl_emu_select();
	tnl_emts_select();
});

function tnl_em_introduction() {
	if ($('#tnl-em-introduction').length) {
		$.getJSON('https://cdn.shirai-store.net/assets/json/reviewList/reviewList_tnl_v2_0.json', function (multipleReviewList) {
			var reviewScore_ary = [];
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

				//if (i < 3) {
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

				var h =
					'<li class="fs-c-reviewList__item reviewScore-' +
					reviewScoreToFixed +
					'">' +
					//+ imageHTML
					'<div class="reviewContent">' +
					reviewerHTML +
					profHTML +
					dateHTML +
					colorHTML +
					commentHTML +
					'</div></li>';

				$('#multipleReviewList ul').append(h);

				//}
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

			var averageHTML = '<h2><span class="point-icon">POINT<span>4</span></span><span>タナリオシリーズのお客様の声</span></h2><div id="averageScore"><span class="fs-c-reviewInfo__stars fs-c-reviewStars" data-ratingcount="' + averageScore_star + '">' + averageScore.toFixed(1) + '</span></div>';

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
					$('#multipleReviewList').css('display', 'none');
				} else {
					$('#reviewCaution').css('display', 'none');
					$('#multipleReviewList').css('display', 'block');
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

			$('#reviwRatingBox').css('display', 'block');

			//文字量が多いレビューの表示領域開閉
			reviewSlideDown('#multipleReviewList', '360');

			$('img.lazy').lazyload({
				threshold: 200,
			});
		});
	}
}

function tnl_em_select() {
	if ($('#tnl_em').length) {
		$.getJSON(
			//"https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_1.json",
			'https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_sale_v1_1.json',
			function (priceArray) {
				tnl_em_selectWrite(priceArray);
				$('#tnl_em input[type="radio"],#tnl_em select').change(function () {
					tnl_em_selectWrite(priceArray);
				});

				function tnl_em_selectWrite(priceArray) {
					var readyMadeFlag_Message = '',
						readyMadeFlag_check,
						readyMadeFlag_width = 0,
						readyMadeFlag_depth = 0,
						readyMadeFlag_strength = 0,
						readyMadeFlag_material = 0,
						readyMadeFlag_color = 0,
						optionHeight = $('#tnl_em [name=tnl_em_optionHeight]').val(),
						optionHeightName = $('#tnl_em [name=tnl_em_optionHeight] option:selected').data('typename'),
						optionWidth = $('#tnl_em [name=tnl_em_optionWidth]').val(),
						optionDepth = $('#tnl_em [name=tnl_em_optionDepth]:checked').val(),
						optionDepthName = $('#tnl_em [name=tnl_em_optionDepth]:checked').data('typename'),
						optionStrength = $('#tnl_em [name=tnl_em_optionStrength]:checked').val(),
						optionStrengthName = $('#tnl_em [name=tnl_em_optionStrength]:checked').data('typename'),
						optionMaterial = $('#tnl_em [name=tnl_em_optionMaterial]:checked').val(),
						optionMaterialName = $('#tnl_em [name=tnl_em_optionMaterial]:checked').data('typename'),
						optionColor = $('#tnl_em [name=tnl_em_optionColor]:checked').val(),
						optionColorName = $('#tnl_em [name=tnl_em_optionColor]:checked').data('colorname'),
						optionColor_length = $('#tnl_em input[name=tnl_em_optionColor]').length,
						optionADIS = $('#tnl_em [name=tnl_em_optionADIS]').val(),
						optionADISName = $('#tnl_em [name=tnl_em_optionADIS] option:selected').data('typename'),
						arraySizeRange = ['015_034', '035_044', '045_060', '061_070', '071_080', '081_090'],
						arraySizeRangeValue = arraySizeRange[$('#tnl_em [name=tnl_em_optionWidth] option:selected').data('digit2') - 1],
						productSizeImage = 0;

					if (optionWidth == '031' || optionWidth == '044' || optionWidth == '059' || optionWidth == '087') {
						readyMadeFlag_width = 1;
					}

					var optionDepthSize;

					switch (optionDepth) {
						case 'A':
							optionDepthSize = 19;
							break;
						case 'M':
							optionDepthSize = 29;
							break;
						case 'F':
							optionDepthSize = 44;
							break;
					}
					var adjustableSize = 9; //梱包サイズの調整（cm）
					var totalSize = Number(optionHeight) + Number(optionWidth) + optionDepthSize + adjustableSize;

					var selectADISHtml = '<option data-typename="なし" value="ADIS-00">なし</option><option data-typename="組立宅配" value="ADIS-01">組立宅配</option><option data-typename="組立設置" value="ADIS-02">組立設置</option>';

					$('#tnl_em [name=tnl_em_optionADIS]').html(selectADISHtml);

					if (Number(optionHeight) + 3 > 200 && totalSize > 260) {
						$('#tnl_em [name=tnl_em_optionADIS]').val('ADIS-00');
						$('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-01"]').remove();
						$('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-02"]').remove();
					} else if (Number(optionHeight) + 3 > 200) {
						$('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-02"]').remove();
						if (optionADIS == 'ADIS-02') {
							$('#tnl_em [name=tnl_em_optionADIS]').val('ADIS-00');
						} else {
							$('#tnl_em [name=tnl_em_optionADIS]').val(optionADIS);
						}
					} else if (totalSize > 260) {
						$('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-01"]').remove();
						if (optionADIS == 'ADIS-01') {
							$('#tnl_em [name=tnl_em_optionADIS]').val('ADIS-00');
						} else {
							$('#tnl_em [name=tnl_em_optionADIS]').val(optionADIS);
						}
					} else {
						$('#tnl_em [name=tnl_em_optionADIS]').val(optionADIS);
					}

					optionADIS = $('#tnl_em [name=tnl_em_optionADIS]').val();
					optionADISName = $('#tnl_em [name=tnl_em_optionADIS] option:selected').data('typename');

					if (optionDepth == 'M') {
						readyMadeFlag_depth = 1;
						$('#tnl_em input[name=tnl_em_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_depth = 0;
					}

					if (optionStrength == 'T') {
						readyMadeFlag_strength = 1;
						$('#tnl_em input[name=tnl_em_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_strength = 0;
					}

					if (optionMaterial == 'F2') {
						readyMadeFlag_material = 1;
						$('#tnl_em input[name=tnl_em_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_material = 0;
						for (var i = 0; i <= optionColor_length; i++) {
							if (i == 1 || i == 6 || i == 8) {
								$('#tnl_em input[name=tnl_em_optionColor]').eq(i).parent('label').css('display', 'block');
							} else {
								$('#tnl_em input[name=tnl_em_optionColor]').eq(i).parent('label').css('display', 'none');
							}
						}

						$('#tnl_em input[name=tnl_em_optionColor]').each(function () {
							if (optionColor == 'NA' || optionColor == 'DK' || optionColor == 'WH') {
							} else {
								$('#tnl_em input[name=tnl_em_optionColor]:eq(1)').prop('checked', true);
							}
						});

						optionColor = $('#tnl_em [name=tnl_em_optionColor]:checked').val();
						optionColorName = $('#tnl_em [name=tnl_em_optionColor]:checked').data('colorname');
					}

					if (optionColor == 'NA' || optionColor == 'DK' || optionColor == 'WH') {
						readyMadeFlag_color = 1;
					}

					switch (arraySizeRangeValue) {
						case '015_034':
							productSizeImage = 31;
							break;
						case '035_044':
							productSizeImage = 44;
							break;
						case '045_060':
							productSizeImage = 59;
							break;
						case '061_070':
							productSizeImage = 67;
							break;
						case '071_080':
							productSizeImage = 77;
							break;
						case '081_090':
							productSizeImage = 87;
							break;
					}

					$('#tnl_em_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/TNL-EM' + optionHeight + arraySizeRangeValue + optionDepth + '-' + optionColor + '.jpg">');
					$('#tnl_em_selectedProductImageText').html('<p>※画像は横幅' + productSizeImage + 'cmです</p>');
					$('#tnl_em_selectedProductHeightImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/' + 'tnl-em_height' + optionHeight + '.png">');
					$('#tnl_em_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/' + 'tnl-em_width' + arraySizeRangeValue + '.png">');
					$('#tnl_em_selectedHeight').text(optionHeightName + 'cm');
					$('#tnl_em_selectedWidth').text(Number(optionWidth) + 'cm');
					$('#tnl_em_selectedDepth').text(optionDepthName);
					$('#tnl_em_selectedStrength').text(optionStrengthName);
					$('#tnl_em_selectedMaterial').text(optionMaterialName);
					$('#tnl_em_selectedADIS').text(optionADISName);
					if (optionColor == 'NA' || optionColor == 'NB' || optionColor == 'WH' || optionColor == 'WT') {
						var optionTextInversion = 'textColorInversion';
					} else {
						var optionTextInversion = '';
					}
					console.log(optionColorName);
					$('#tnl_em_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optionColorName + '</span>');

					readyMadeFlag_check = readyMadeFlag_width + readyMadeFlag_depth + readyMadeFlag_strength + readyMadeFlag_material + readyMadeFlag_color;

					var modelOptionHeight = optionHeight;
					if (readyMadeFlag_check == 5) {
						$('#readyMadeMessage').text('お選びのサイズ・カラーは既製品です。');
						if (Number(optionHeight) > 100 && Number(optionHeight) < 198) {
							modelOptionHeight = optionHeight / 10;
						}
						$('#tnl_em_selectedProduct').text('TNL-' + Number(modelOptionHeight) + Number(optionWidth) + '-' + optionColor);

						var productURL = 'TNL-' + Number(modelOptionHeight) + Number(optionWidth) + '-' + optionColor;
						var optionCode = productURL;

						$('#tnl_selectedProductButton').html('<a href="/c/series/tnl/' + productURL.toLowerCase() + '">既製品のご注文はこちら</a>');
						$('#tnl_selectedProductButton').css('display', 'block');
						$('#tnl_em_selectedProductButton').css('display', 'none');
						$('.fs-c-productOption.unusable').css('display', 'none');

						var price = priceArray.find((v) => v.productNumber === productURL);
						//SALE価格かどうか判定し価格を出し分ける
						if (price.sellingPrice < price.normalPrice) {
							var discountRate = ((1 - price.sellingPrice / price.normalPrice) * 100).toFixed(1);
							$('body').addClass('time-sale');
							$('div.salePrice').remove();
							$('#productPriceBox .fs-c-price__value').text(price.normalPrice.toLocaleString());
							$('#productPriceBox .fs-c-productPrice__addon').after(
								`<div class="fs-c-productPrice fs-c-productPrice--selling salePrice"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span><span class="fs-c-price__value">${price.sellingPrice.toLocaleString()}</span></span></span><span class="fs-c-productPrice__addon"><span class="priceOffValue">${discountRate}% OFF</span><span class="fs-c-productPrice__addon__label">税込</span></span></div>`
							);
						} else {
							$('body').removeClass('time-sale');
							$('div.salePrice').remove();
							$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
						}
						$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
						//$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

						if (Number(optionHeight) < 198) {
							var html =
								'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' +
								productURL +
								'].productNo" value="' +
								productURL +
								'"><input type="hidden" name="products[' +
								productURL +
								'].productOptionsWithPrice[1].id" value="1"/><select name="products[' +
								productURL +
								'].productOptionsWithPrice[1].value"><option value="' +
								optionADIS +
								'"></option></select><input name="products[' +
								productURL +
								'].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
						} else {
							var html =
								'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' +
								productURL +
								'].productNo" value="' +
								productURL +
								'"><input name="products[' +
								productURL +
								'].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
						}
					} else {
						$('#readyMadeMessage').text('');
						$('#tnl_selectedProductButton').css('display', 'none');
						$('#tnl_em_selectedProductButton').css('display', 'block');
						$('.fs-c-productOption.unusable').css('display', 'block');

						var productURL = 'TNL-EM' + optionHeight + optionWidth + optionDepth;
						var optionCode = 'TNL-EM' + optionHeight + optionWidth + optionDepth + optionStrength + optionMaterial;

						$('#tnl_em_selectedProduct').text(optionCode + '-' + optionColor);
						var price = priceArray.find((v) => v.productNumber === optionCode);

						//SALE価格かどうか判定し価格を出し分ける
						if (price.sellingPrice < price.normalPrice) {
							var discountRate = ((1 - price.sellingPrice / price.normalPrice) * 100).toFixed(1);
							$('body').addClass('time-sale');
							$('div.salePrice').remove();
							$('#productPriceBox .fs-c-price__value').text(price.normalPrice.toLocaleString());
							$('#productPriceBox .fs-c-productPrice__addon').after(
								`<div class="fs-c-productPrice fs-c-productPrice--selling salePrice"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span><span class="fs-c-price__value">${price.sellingPrice.toLocaleString()}</span></span></span><span class="fs-c-productPrice__addon"><span class="priceOffValue">${discountRate}% OFF</span><span class="fs-c-productPrice__addon__label">税込</span></span></div>`
							);
						} else {
							$('body').removeClass('time-sale');
							$('div.salePrice').remove();
							$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
						}

						$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
						$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

						var html =
							'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' +
							productURL +
							'].productNo" value="' +
							productURL +
							'"><input type="hidden" name="products[' +
							productURL +
							'].productOptionsWithPrice[1].id" value="1"><select name="products[' +
							productURL +
							'].productOptionsWithPrice[1].value"><option value="' +
							optionCode +
							'"></option></select><input type="hidden" name="products[' +
							productURL +
							'].productOptionsWithPrice[2].id" value="2"><select name="products[' +
							productURL +
							'].productOptionsWithPrice[2].value"><option value="' +
							optionColor +
							'"></option></select><input type="hidden" name="products[' +
							productURL +
							'].productOptionsWithPrice[3].id" value="3"><select name="products[' +
							productURL +
							'].productOptionsWithPrice[3].value"><option value="' +
							optionADIS +
							'"></option></select><input name="products[' +
							productURL +
							'].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
					}

					$('#tnl_em_selectedProductButton').html(html);

					var innerWidth;
					var innerHeight = Number(optionHeight) - 11.1;
					var innerDepth;

					if (optionDepth == 'A') {
						innerDepth = '16.7';
					} else if (optionDepth == 'M') {
						innerDepth = '26.7';
					} else if (optionDepth == 'F') {
						innerDepth = '41.7';
					}

					if (optionWidth >= 71) {
						innerWidth = (Number(optionWidth) - 5.4) / 2;
						var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
					} else {
						innerWidth = Number(optionWidth) - 3.6;
						var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
					}

					$('#tnl_em_selectedProduct-innerSize').html(innerSizeHTML);
				}
			}
		);
	}
}

function tnl_emu_select() {
	if ($('#tnl_emu').length) {
		$.getJSON(
			//"https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_1.json",
			'https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_sale_v1_1.json',
			function (priceArray) {
				tnl_emu_selectWrite(priceArray);
				$('#tnl_emu input[type="radio"],#tnl_emu select').change(function () {
					tnl_emu_selectWrite(priceArray);
				});

				function tnl_emu_selectWrite(priceArray) {
					var optionWidth = $('#tnl_emu [name=tnl_emu_optionWidth]').val(),
						optionDepth = $('#tnl_emu [name=tnl_emu_optionDepth]:checked').val(),
						optionDepthName = $('#tnl_emu [name=tnl_emu_optionDepth]:checked').data('typename'),
						optionMaterial = $('#tnl_emu [name=tnl_emu_optionMaterial]:checked').val(),
						optionMaterialName = $('#tnl_emu [name=tnl_emu_optionMaterial]:checked').data('typename'),
						optionColor = $('#tnl_emu [name=tnl_emu_optionColor]:checked').val(),
						optionColorName = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname'),
						optionColor_length = $('#tnl_emu input[name=tnl_emu_optionColor]').length,
						optionADIS = $('#tnl_emu [name=tnl_emu_optionADIS]').val(),
						optionADISName = $('#tnl_emu [name=tnl_emu_optionADIS] option:selected').data('typename'),
						arraySizeRange = ['015_034', '035_044', '045_060', '061_070', '071_080', '081_090'],
						arraySizeRangeValue = arraySizeRange[$('#tnl_emu [name=tnl_emu_optionWidth] option:selected').data('digit2') - 1],
						productSizeImage = 0;

					optionColor = $('#tnl_emu [name=tnl_emu_optionColor]:checked').val();
					optionColorName = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname');

					if (optionDepth == 'M') {
						$('#tnl_emu input[name=tnl_emu_optionColor]').parent('label').css('display', 'block');
					}

					if (optionMaterial == 'F2') {
						$('#tnl_emu input[name=tnl_emu_optionColor]').parent('label').css('display', 'block');
					} else {
						for (var i = 0; i <= optionColor_length; i++) {
							if (i == 1 || i == 6 || i == 8) {
								$('#tnl_emu input[name=tnl_emu_optionColor]').eq(i).parent('label').css('display', 'block');
							} else {
								$('#tnl_emu input[name=tnl_emu_optionColor]').eq(i).parent('label').css('display', 'none');
							}
						}

						$('#tnl_emu input[name=tnl_emu_optionColor]').each(function () {
							if (optionColor == 'NA' || optionColor == 'DK' || optionColor == 'WH') {
							} else {
								$('#tnl_emu input[name=tnl_emu_optionColor]:eq(1)').prop('checked', true);
							}
						});

						optionColor = $('#tnl_emu [name=tnl_emu_optionColor]:checked').val();
						optionColorName = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname');
					}

					switch (arraySizeRangeValue) {
						case '015_034':
							productSizeImage = 31;
							break;
						case '035_044':
							productSizeImage = 44;
							break;
						case '045_060':
							productSizeImage = 59;
							break;
						case '061_070':
							productSizeImage = 67;
							break;
						case '071_080':
							productSizeImage = 77;
							break;
						case '081_090':
							productSizeImage = 87;
							break;
					}

					$('#tnl_emu_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/TNL-EMU' + arraySizeRangeValue + optionDepth + '-' + optionColor + '.jpg">');
					$('#tnl_emu_selectedProductImageText').html('<p>※画像は横幅' + productSizeImage + 'cmです</p>');
					$('#tnl_emu_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/' + 'tnl-em_width' + arraySizeRangeValue + '.png">');
					$('#tnl_emu_selectedWidth').text(Number(optionWidth) + 'cm');
					$('#tnl_emu_selectedDepth').text(optionDepthName);
					$('#tnl_emu_selectedMaterial').text(optionMaterialName);
					$('#tnl_emu_selectedADIS').text(optionADISName);
					if (optionColor == 'NA' || optionColor == 'NB' || optionColor == 'WH' || optionColor == 'WT') {
						var optionTextInversion = 'textColorInversion';
					} else {
						var optionTextInversion = '';
					}
					$('#tnl_emu_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optionColorName + '</span>');

					$('#tnl_emu_selectedProduct').text('TNL-EM035' + optionWidth + 'U' + optionDepth + optionMaterial + '-' + optionColor);

					var productURL = 'TNL-EMU' + optionWidth + optionDepth;
					var optionCode = 'TNL-EM035' + optionWidth + 'U' + optionDepth + optionMaterial;

					var price = priceArray.find((v) => v.productNumber === optionCode);
					//SALE価格かどうか判定し価格を出し分ける
					if (price.sellingPrice < price.normalPrice) {
						var discountRate = ((1 - price.sellingPrice / price.normalPrice) * 100).toFixed(1);
						$('body').addClass('time-sale');
						$('div.salePrice').remove();
						$('#productPriceBox .fs-c-price__value').text(price.normalPrice.toLocaleString());
						$('#productPriceBox .fs-c-productPrice__addon').after(
							`<div class="fs-c-productPrice fs-c-productPrice--selling salePrice"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span><span class="fs-c-price__value">${price.sellingPrice.toLocaleString()}</span></span></span><span class="fs-c-productPrice__addon"><span class="priceOffValue">${discountRate}% OFF</span><span class="fs-c-productPrice__addon__label">税込</span></span></div>`
						);
					} else {
						$('body').removeClass('time-sale');
						$('div.salePrice').remove();
						$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
					}
					$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
					$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

					var html =
						'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' +
						productURL +
						'].productNo" value="' +
						productURL +
						'"><input type="hidden" name="products[' +
						productURL +
						'].productOptionsWithPrice[1].id" value="1"><select name="products[' +
						productURL +
						'].productOptionsWithPrice[1].value"><option value="' +
						optionCode +
						'"></option></select><input type="hidden" name="products[' +
						productURL +
						'].productOptionsWithPrice[2].id" value="2"><select name="products[' +
						productURL +
						'].productOptionsWithPrice[2].value"><option value="' +
						optionColor +
						'"></option></select><input type="hidden" name="products[' +
						productURL +
						'].productOptionsWithPrice[3].id" value="3"><select name="products[' +
						productURL +
						'].productOptionsWithPrice[3].value"><option value="' +
						optionADIS +
						'"></option></select><input name="products[' +
						productURL +
						'].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';

					$('#tnl_emu_selectedProductButton').html(html);

					//<div id="tnl_em_selectedProduct-innerSize" style="background: #878376;color: #fff;text-align: center;margin: 8px 0;"></div>

					var innerWidth;
					var innerDepth;

					if (optionDepth == 'A') {
						innerDepth = '17.0';
					} else if (optionDepth == 'M') {
						innerDepth = '27.0';
					} else if (optionDepth == 'F') {
						innerDepth = '42.0';
					}

					if (optionWidth >= 71) {
						innerWidth = (Number(optionWidth) - 5.4) / 2;
						var innerSizeHTML = `【内寸】高さ:25.4cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`;
					} else {
						innerWidth = Number(optionWidth) - 3.6;
						var innerSizeHTML = `【内寸】高さ:25.4cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`;
					}

					$('#tnl_emu_selectedProduct-innerSize').html(innerSizeHTML);
				}
			}
		);
	}
}

function tnl_emts_select() {
	if ($('#tnl_emts').length) {
		$.getJSON(
			//"https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_1.json",
			'https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_sale_v1_1.json',
			function (priceArray) {
				tnl_emts_selectWrite(priceArray);
				$('#tnl_emts input[type="radio"],#tnl_emts select').change(function () {
					tnl_emts_selectWrite(priceArray);
				});

				function tnl_emts_selectWrite(priceArray) {
					var readyMadeFlag_check,
						readyMadeFlag_width = 0,
						readyMadeFlag_depth = 0,
						readyMadeFlag_strength = 0,
						readyMadeFlag_material = 0,
						readyMadeFlag_color = 0,
						optionWidth = $('#tnl_emts [name=tnl_emts_optionWidth]').val(),
						optionDepth = $('#tnl_emts [name=tnl_emts_optionDepth]:checked').val(),
						optionDepthName = $('#tnl_emts [name=tnl_emts_optionDepth]:checked').data('typename'),
						optionStrength = $('#tnl_emts [name=tnl_emts_optionStrength]:checked').val(),
						optionStrengthName = $('#tnl_emts [name=tnl_emts_optionStrength]:checked').data('typename'),
						optionMaterial = $('#tnl_emts [name=tnl_emts_optionMaterial]:checked').val(),
						optionMaterialName = $('#tnl_emts [name=tnl_emts_optionMaterial]:checked').data('typename'),
						optionColor = $('#tnl_emts [name=tnl_emts_optionColor]:checked').val(),
						optionColorName = $('#tnl_emts [name=tnl_emts_optionColor]:checked').data('colorname'),
						optionColor_length = $('#tnl_emts input[name=tnl_emts_optionColor]').length,
						arraySizeRange = ['015_034', '035_044', '045_060', '061_070', '071_080', '081_090'],
						arraySizeRangeValue = arraySizeRange[$('#tnl_emts [name=tnl_emts_optionWidth] option:selected').data('digit2') - 1],
						productSizeImage = 0;

					if (optionWidth == 31 || optionWidth == 44 || optionWidth == 59 || optionWidth == 87) {
						readyMadeFlag_width = 1;
					}

					if (optionDepth == 'M') {
						readyMadeFlag_depth = 1;
						$('#tnl_emts input[name=tnl_emts_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_depth = 0;
					}

					if (optionStrength == 'T') {
						readyMadeFlag_strength = 1;
						$('#tnl_emts input[name=tnl_emts_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_strength = 0;
					}

					if (optionMaterial == 'F2') {
						readyMadeFlag_material = 1;
						$('#tnl_emts input[name=tnl_emts_optionColor]').parent('label').css('display', 'block');
					} else {
						readyMadeFlag_material = 0;
						for (var i = 0; i <= optionColor_length; i++) {
							if (i == 1 || i == 6 || i == 8) {
								$('#tnl_emts input[name=tnl_emts_optionColor]').eq(i).parent('label').css('display', 'block');
							} else {
								$('#tnl_emts input[name=tnl_emts_optionColor]').eq(i).parent('label').css('display', 'none');
							}
						}

						$('#tnl_emts input[name=tnl_emts_optionColor]').each(function () {
							if (optionColor == 'NA' || optionColor == 'DK' || optionColor == 'WH') {
							} else {
								$('#tnl_emts input[name=tnl_emts_optionColor]:eq(1)').prop('checked', true);
							}
						});

						optionColor = $('#tnl_emts [name=tnl_emts_optionColor]:checked').val();
						optionColorName = $('#tnl_emts [name=tnl_emts_optionColor]:checked').data('colorname');
					}

					if (optionColor == 'NA' || optionColor == 'DK' || optionColor == 'WH') {
						readyMadeFlag_color = 1;
					}

					switch (arraySizeRangeValue) {
						case '015_034':
							productSizeImage = 31;
							break;
						case '035_044':
							productSizeImage = 44;
							break;
						case '045_060':
							productSizeImage = 59;
							break;
						case '061_070':
							productSizeImage = 67;
							break;
						case '071_080':
							productSizeImage = 77;
							break;
						case '081_090':
							productSizeImage = 87;
							break;
					}

					$('#tnl_emts_selectedProductImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/TNL-EMTS' + arraySizeRangeValue + optionDepth + '-' + optionColor + '.jpg">');
					$('#tnl_emts_selectedProductImageText').html('<p>※画像はタナリオ本体の横幅' + productSizeImage + 'cm用です</p>');
					$('#tnl_emts_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/' + 'tnl-emts_width' + arraySizeRangeValue + '_rev2.png">');
					$('#tnl_emts_selectedWidth').text(Number(optionWidth) + 'cm');
					$('#tnl_emts_selectedDepth').text(optionDepthName);
					$('#tnl_emts_selectedStrength').text(optionStrengthName);
					$('#tnl_emts_selectedMaterial').text(optionMaterialName);
					if (optionColor == 'NA' || optionColor == 'NB' || optionColor == 'WH' || optionColor == 'WT') {
						var optionTextInversion = 'textColorInversion';
					} else {
						var optionTextInversion = '';
					}
					$('#tnl_emts_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optionColorName + '</span>');

					readyMadeFlag_check = readyMadeFlag_width + readyMadeFlag_depth + readyMadeFlag_strength + readyMadeFlag_material + readyMadeFlag_color;

					if (readyMadeFlag_check == 5) {
						$('#tnl_emts_selectedProduct').text('TNL-T' + Number(optionWidth) + 'A-' + optionColor);
						$('#readyMadeMessage').text('お選びのサイズ・カラーは既製品です。');

						var productURL = 'TNL-T' + Number(optionWidth) + 'A-' + optionColor;
						var optionCode = productURL;

						var price = priceArray.find((v) => v.productNumber === productURL);
						$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
						$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
						$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

						var html =
							'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
					} else {
						$('#tnl_emts_selectedProduct').text('TNL-EM' + optionStrength + optionWidth + optionDepth + optionMaterial + '-' + optionColor);

						$('#readyMadeMessage').text('');

						var productURL = 'TNL-EMTS' + optionWidth;
						var optionCode = 'TNL-EM' + optionStrength + optionWidth + optionDepth + optionMaterial;

						var price = priceArray.find((v) => v.productNumber === optionCode);
						$('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
						$('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
						$('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

						var html =
							'<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' +
							productURL +
							'].productNo" value="' +
							productURL +
							'"><input type="hidden" name="products[' +
							productURL +
							'].productOptionsWithPrice[1].id" value="1"><select name="products[' +
							productURL +
							'].productOptionsWithPrice[1].value"><option value="' +
							optionCode +
							'"></option></select><input type="hidden" name="products[' +
							productURL +
							'].productOptionsWithPrice[2].id" value="2"><select name="products[' +
							productURL +
							'].productOptionsWithPrice[2].value"><option value="' +
							optionColor +
							'"></option></select><input name="products[' +
							productURL +
							'].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
					}
					$('#tnl_em_selectedProductButton').html(html);
				}
			}
		);
	}
}
