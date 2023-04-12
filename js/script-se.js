var noTimeSpecifiedZipCodes_result = undefined;
var yhcTimeSpecifiedZipCodes_result = undefined;
var checkRemoteIslandZipCodes_result = undefined;

$(window).on('load', function () {
	optionJudgment(); //order
	//expectedArrival(); //order
});

function optionNameChange() {
	if ($('#fs_Checkout,#fs_CheckoutWithAmazon').length) {
		if (!$('.optionNameChanged').length) {
			// 組立オプション指定があった場合のカート内表示変更
			var productUrl = '';
			var productUrl_ary = '';
			var modelNumber = '';

			// 該当するmodelNumberを配列に格納する
			var optionHasProducts = ['por-1830d-na', 'por-1830d-wh', 'por-1830d-dk', 'por-5530du-na', 'por-5530du-wh', 'por-5530du-dk', 'hnb-4540d', 'adl-4013dh-na', 'adl-4013dh-wh', 'adl-4013dh-dk'];

			//CAUTION:カートのスクリプトと指定しているClassが異なる fs-c-cartTable__productName__name -> fs-c-listedProductName__name
			$('.fs-c-listedProductName__name').each(function () {
				// 商品のリンクを取得する
				productUrl = $(this).attr('href');

				// 配列にする
				productUrl_ary = productUrl.split('/');

				// リンクの最後の部分(型番)を取得
				modelNumber = productUrl_ary[productUrl_ary.length - 1];
				//console.log(modelNumber);
				//optionHasProductsにmodelNumberがあるか判定する
				var optionValue = '';
				if (optionHasProducts.indexOf(modelNumber) != -1) {
					//modelNumberが該当商品であるか判定し処理を分岐
					if (modelNumber.match(/por-5530du|hnb-4540d|por-1830d/)) {
						//あるのであれば.fs-c-listedProductName__selection__choiceの値を取得する

						optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
						optionValue = `（扉の開き方：${optionValue})`;
						//console.log(optionValue);

						//textとして挿入
						$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
					} else if (modelNumber.match(/adl-4013dh/)) {
						optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
						optionValue = `（組立の向き：${optionValue})`;
						//console.log(optionValue);

						$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
					}
					$(this).addClass('optionNameChanged');
				}
			});
		}
	}
}

/* checkout checkZipCodes
========================================================================== */

function checkZipCodes(checkType, zipCode) {
	var url = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/' + checkType;
	var params = { zip_code: zipCode };
	//console.log(JSON.stringify(params));
	//console.log(url);
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
			//console.log(JSON.stringify(response));
		},
		error: function (response) {
			// Error
			// console.log(JSON.stringify(response));
		},
	}).responseText;

	// console.log(response);

	response = JSON.parse(response);

	return response;
}

/* checkout couponUseCheck
========================================================================== */
function couponUseCheck() {
	if ($('#fs_Checkout,#fs_CheckoutWithAmazon').length) {
		if (!$('.couponUseCheck').length) {
			$('#fs_button_placeOrder').before('<p class="couponUseCheck text-center mt-24 mb-24"><a href="#fs-couponInfo-container" class="text-link-color">クーポンの付け忘れはございませんか？</a></p>');
		}
	}
}

/* checkout AddDeliveryMethodTitle
========================================================================== */
function addDeliveryMethodTitle(optionResult) {
	if ($('#fs_Checkout,#fs_CheckoutWithAmazon').length) {
		if (optionResult != false) {
			if (!$('.addDeliveryDateTimeTitle').length) {
				$('.fs-c-checkout-delivery__method__deliveryDateTime').before('<h4 class="fs-c-checkout-delivery__method__title addDeliveryDateTimeTitle mt-48">お届け希望日時</h4>');
			}
		}
	}
}

/* checkout sizeOrderDisplayThumb
========================================================================== */
function sizeOrderDisplayThumb() {
	//if ($("#fs_Checkout,#fs_CheckoutWithAmazon").length) {
	//setInterval(function () {
	$('.fs-c-cartTable__dataCell').each(function () {
		if ($(this).find('.fs-c-listedProductName__name').text().indexOf('サイズオーダー') >= 0) {
			$(this).find('.fs-c-cartTable__product').addClass('sizeOrder');
		} else {
			$(this).find('.fs-c-cartTable__product').addClass('readyMade');
		}
	});

	var orderDetails = '',
		orderType = '',
		orderHeight = '',
		orderWidth = '',
		orderDepth = '',
		orderColor = '';
	if ($('.sizeOrder').length) {
		if ($('.sizeOrder').find('.fs-c-productImage__image').attr('src').indexOf('xs.jpg') >= 0) {
			//console.log('A')
			$('.sizeOrder').each(function () {
				//console.log('B')
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

					// console.log(orderType);

					if (orderType == 'TNL-EMTS') {
						var thumbnail = orderType + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';
					} else {
						var thumbnail = orderType + orderHeight + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';
					}

					//console.log(thumbnail);

					$(this)
						.find('img')
						.attr('src', '/assets/img/product/sizeOrder/tnl-em/thum/' + thumbnail);
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
				} else if (href.indexOf('sep-em') >= 0) {
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
				}
			});
		}
	}

	if ($('.readyMade').length) {
		$('.readyMade img').each(function () {
			var readyMadeImage = $(this).attr('src');
			readyMadeImage = readyMadeImage.replace(/[0-9]{2}-xs.jpg/, '02-xs.jpg');
			//console.log(readyMadeImage);
			$(this).attr('src', readyMadeImage);
		});
	}
	//}, 1000);
	//}
}

/* optionJudgment
========================================================================== */
function optionJudgment() {
	if ($('#fs_Checkout,#fs_CheckoutWithAmazon').length) {
		var optionResult = false;
		var execution = function () {
			if (optionResult == false) {
				optionResult = checkOption();
				// console.log('optionResult:', optionResult);
			}
			if (optionResult != false) {
				// console.log('optionResult:', optionResult);

				var zipCode = $('.fs-c-checkout-destination__address .fs-c-checkout-destination__address__zipCode').text().replace('-', '');
				// console.log(zipCode);
				if (zipCode != undefined) {
					//離島で組立サービスを利用している場合
					if (zipCode != zipCodeChangeCheck) {
						//郵便番号が変更された場合
						zipCodeChangeCheck = zipCode;

						//YHC時間指定
						yhcTimeSpecifiedZipCodes_result = checkZipCodes('checkYhcTimeSpecifiedZipCodes', zipCode);
						// console.log('yhcTimeSpecifiedZipCodes_result.serviceType4_is:', yhcTimeSpecifiedZipCodes_result.serviceType4_is);
						// console.log('yhcTimeSpecifiedZipCodes_result.serviceType3_is:', yhcTimeSpecifiedZipCodes_result.serviceType3_is);

						// console.log(zipCode);
						checkRemoteIslandZipCodes_result = checkZipCodes('checkRemoteIslandZipCodes', zipCode);
						// console.log('result1:',result);
						$('body').addClass('modal_displayNone');
						setTimeout(function () {
							$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
							setTimeout(function () {
								if (checkRemoteIslandZipCodes_result.result) {
									$('#fs_input_expectedArrival_note').val('【重要】お届け先が離島であるため別途送料がかかります。ご注文内容を確認後にメールにて送料をお知らせします。追加送料にご了承いただきましたら発送いたします。');
								} else {
									$('#fs_input_expectedArrival_note').val('');
								}
								setTimeout(function () {
									$('#__fs_modal_delivery button.fs-c-button--settings').trigger('click');
								}, 1);
							}, 1);
							checkFlag = 1;
						}, 300);
					}

					if (checkFlag == 1) {
						//時間指定がない場合
						//指定状態を取得する
						var deliveryDate = $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text();
						var deliveryTime = $('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text();
						//console.log('deliveryDate:' + deliveryDate);
						//console.log('deliveryTime:' + deliveryTime);

						// console.log('zipCode:' + zipCode);
						// console.log('zipCodeChangeCheck:' + zipCodeChangeCheck);
						if (optionResult.result2 >= 0) {
							if (yhcTimeSpecifiedZipCodes_result.serviceType4_is == 1 || yhcTimeSpecifiedZipCodes_result.serviceType3_is == 1) {
								if (deliveryDate == '指定なし' || deliveryTime == '指定なし') {
									//組立済+搬入サービスは日時指定が必須

									orderDisabled();
									if (!$('.deliveryMethodAlert').length) {
										$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert red text-center mt-16">このお届け先で「組立済+搬入」サービスをご利用の場合は<strong>お届け希望日と時間帯</strong>をご指定ください。</p>');
									}
								}
							} else if (yhcTimeSpecifiedZipCodes_result.serviceType4_is == 0 && yhcTimeSpecifiedZipCodes_result.serviceType3_is == 0) {
								if (deliveryDate == '指定なし') {
									orderDisabled();
									if (!$('.deliveryMethodAlert').length) {
										$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert red text-center mt-16">このお届け先で「組立済+搬入」サービスをご利用の場合は<strong>お届け希望日</strong>をご指定ください。</p>');
									}
								}
							}
						} else {
							orderEnabled();
							if ($('.deliveryMethodAlert').length) {
								$('.deliveryMethodAlert').remove();
							}
						}

						if (deliveryTime != '指定なし') {
							// console.log('optionResult.result2:', optionResult.result2);
							//通常配送と組立済+玄関渡しサービスの時間指定対応判定
							if (optionResult.result2 == undefined || optionResult.result2 == -1) {
								if (noTimeSpecifiedZipCodes_result == undefined) {
									noTimeSpecifiedZipCodes_result = checkZipCodes('checkNoTimeSpecifiedZipCodes', zipCode);

									if (noTimeSpecifiedZipCodes_result.result == true) {
										// お届け希望日をリセットする
										$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
										const resetArrivalDate = setInterval(function () {
											if ($('#__fs_modal_delivery button.fs-c-button--settings').length) {
												$('#__fs_modal_delivery').css('display', 'none');
												$('#fs_input_expectedArrival_time').val('none');
												$('#__fs_modal_delivery button.fs-c-button--settings').trigger('click');
												clearInterval(resetArrivalDate);
											}
										}, 1);
										$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>このお届け先は時間指定ができません</h4><p>配送業者がお届け時間指定に対応していないため「指定なし」に変更されました。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
										$('.confirmOrderAlert-button').on('click', function () {
											$('#confirmOrderAlert').remove();
											noTimeSpecifiedZipCodes_result = undefined;
										});
									}
								}
							} else if (optionResult.result2 >= 0) {
							}
						}

						if (checkRemoteIslandZipCodes_result.result == true) {
							//離島の場合

							//組立サービス利用は沖縄・離島不可

							if (optionResult.result1 >= 0 || optionResult.result2 >= 0) {
								orderDisabled();
								if (!$('.deliveryAlert').length) {
									$('.fs-c-checkout-destination__title').after('<div class="deliveryAlert"><p class="mb-0">お届け先が沖縄・離島の場合は「組立サービス」をご利用いただけません。<br>該当する商品をカートから削除し、組立サービスを選択せずにカートに入れてからご注文ください。</p></div>');
									$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert1 red text-center mt-16">お届け先が沖縄・離島の場合は「組立サービス」をご利用いただけません。</p>');
								}
							} else {
								orderEnabled();
								if ($('.deliveryAlert').length) {
									$('.deliveryAlert').remove();
									$('.deliveryMethodAlert1').remove();
								}
							}
						}
						if (!$('.deliveryMethodAlert2').length) {
							var sizeOrderArray = [];
							$('.fs-c-listedProductName__name').each(function () {
								sizeOrderArray.push($(this).text());
							});
							if (sizeOrderArray.find((value) => value.match(/サイズオーダー/g)) != undefined || optionResult.result1 >= 0 || optionResult.result2 >= 0) {
								$('#fs_button_placeOrder').before('<p class="deliveryMethodAlert2 mt-16"><span>お願い</span>サイズオーダーや組立サービスは、キャンセルや変更を承ることができません。ご注文内容に誤りがないかご確認ください。</p>');
							}

							$('#fs_couponCode').attr('placeholder', '会員様のみご利用いただけます');
							addDeliveryMethodTitle(optionResult);
							sizeOrderDisplayThumb();
							couponUseCheck();
							optionNameChange();
						}
						//console.log(optionResult);

						//組立サービス利用は代引不可
						if (optionResult.result1 >= 0 || optionResult.result2 >= 0) {
							$('#fs_input_payment_cashOnDelivery').prop('disabled', true);
							$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
							$('.fs-c-checkout-paymentMethod--cashOnDelivery .fs-c-radio__radioLabelText').html('代金引換<span class="red paymentCaution">（組立サービスをお申し込みの場合はご利用いただけません）</span>');
							if ($('#fs_input_payment_cashOnDelivery').prop('checked')) {
								$('.fs-l-page').before(
									'<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>代金引換をご利用いただけません</h4><p>申し訳ございませんが、組立サービスをお申し込みの場合は代金引換をご利用いただけません。</p><p>該当する商品をカートから削除し、組立サービスを選択せずに再度カートに入れてからご注文ください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>'
								);
								$('.fs-c-checkout-paymentMethodList li:nth-child(2) label').trigger('click');
								$('.confirmOrderAlert-button').on('click', function () {
									$('#confirmOrderAlert').remove();
								});
							}
						}

						//サイズオーダーは代引不可
						var sizeOrderArray = [];

						$('.fs-c-listedProductName__name').each(function () {
							sizeOrderArray.push($(this).text());
						});

						if (sizeOrderArray.find((value) => value.match(/サイズオーダー/g)) != undefined) {
							//console.log('サイズオーダー');

							$('#fs_input_payment_cashOnDelivery').prop('disabled', true);
							$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
							$('.fs-c-checkout-paymentMethod--cashOnDelivery .fs-c-radio__radioLabelText').html('代金引換<span class="red paymentCaution">（サイズオーダーをお申し込みの場合はご利用いただけません）</span>');
							if ($('#fs_input_payment_cashOnDelivery').prop('checked')) {
								$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>代金引換をご利用いただけません</h4><p>申し訳ございませんが、サイズオーダーをお申し込みの場合は代金引換をご利用いただけません。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
								$('.fs-c-checkout-paymentMethodList li:nth-child(2) label').trigger('click');
								$('.confirmOrderAlert-button').on('click', function () {
									$('#confirmOrderAlert').remove();
								});
							}
						}

						//離島の場合
						if (checkRemoteIslandZipCodes_result.result == true) {
							//沖縄離島の場合は代引利用が不可
							$('#fs_input_payment_cashOnDelivery').prop('disabled', true);
							$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
							$('.fs-c-checkout-paymentMethod--cashOnDelivery .fs-c-radio__radioLabelText').html('代金引換<span class="red paymentCaution">（沖縄・離島はご利用いただけません。）</span>');
							if ($('#fs_input_payment_cashOnDelivery').prop('checked')) {
								$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>代金引換をご利用いただけません</h4><p>申し訳ございませんが、お届け先が沖縄・離島の場合は代金引換をご利用いただけません。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
								$('.fs-c-checkout-paymentMethodList li:first-child label').trigger('click');
								$('.confirmOrderAlert-button').on('click', function () {
									$('#confirmOrderAlert').remove();
								});
							}
						}

						if ($('.fs-c-checkout-paymentMethod__disabledMessage').length) {
							$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
						}

						if ($('.fs-c-checkout-delivery__method__deliveryDetail+dd').text() == '指定なし') {
							$('.fs-c-checkout-delivery__method__deliveryDetail+dd').css('display', 'none');
						} else {
							$('.fs-c-checkout-delivery__method__deliveryDetail+dd').css('display', 'block');
						}

						//配送方法指定をする際にモーダルが表示されるようにする
						$('#fs-deliveryInfo-container .fs-c-button--change--small').hover(function () {
							$('body').removeClass('modal_displayNone');
						});
					}
				}
			}
		};

		var checkFlag = 0;
		//console.log('optionJudgment');
		// var txt = new XMLHttpRequest();
		// txt.open('get', 'https://shiraistore.itembox.design/item/js/remoteIslandZipCode.csv', false);
		// txt.send();
		// var zipCodeArray = txt.responseText.split('\n');
		var zipCodeChangeCheck;

		var orderDisabled = function () {
			//console.log('orderDisabled');
			$('#fs_button_placeOrder button').prop('disabled', true);
			$('#fs_button_placeOrder button').css({
				background: '#ccc',
				cursor: 'default',
				border: '1px solid #ccc',
			});
		};

		var orderEnabled = function () {
			//console.log('orderEnabled');
			$('#fs_button_placeOrder button').prop('disabled', false);
			$('#fs_button_placeOrder button').css({
				background: '#e87909',
				cursor: 'pointer',
				border: '1px solid #e87909',
			});
		};

		setInterval(function () {
			execution(optionResult);
		}, 300);

		expectedArrival(optionResult);
	}
}

/* expectedArrival
========================================================================== */
function expectedArrival(optionResult) {
	if ($('#fs_Checkout, #fs_CheckoutWithAmazon').length) {
		var execution = function () {
			if (optionResult == false) {
				optionResult = checkOption();
			}
			if ($('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '') {
				if (($('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text() != '指定なし' || $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '指定なし') && stopFlag_load == 0) {
					// お届け希望日をリセットする
					$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
					const resetArrivalDate = setInterval(function () {
						if ($('#__fs_modal_delivery button.fs-c-button--settings').length) {
							$('#__fs_modal_delivery').css('display', 'none');
							$('#fs_input_expectedArrival_date').val('none');
							$('#fs_input_expectedArrival_time').val('none');
							$('#__fs_modal_delivery button.fs-c-button--settings').trigger('click');
							clearInterval(resetArrivalDate);
						}
					}, 1);
					// setTimeout(function () {
					// 	$('#fs_input_expectedArrival_date').val('none');
					// 	$('#fs_input_expectedArrival_time').val('none');

					// 	setTimeout(function () {

					// 	}, 300);
					// }, 200);
					$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け指定日時が「指定なし」に変更されました</h4><p>再読み込みがされたため、お届け指定日時が「指定なし」に変更されました。お届け指定日時を再設定してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');

					$('.confirmOrderAlert-button').on('click', function () {
						$('#confirmOrderAlert').remove();
					});
				}

				stopFlag_load = 1;

				if ($('.fs-c-modal--checkout-deliveryMethod').length) {
					var selectedValue = $('#fs_input_expectedArrival_date').val();

					if (stopFlag == 0) {
						var orderLeadTime = 0, //受注処理までのリードタイム
							manufactureLeadTime = 0, //サイズオーダー時のリードタイム
							assemblyLeadTime = 0, //組立サービス時のリードタイム
							sizeOrderArray = [];

						var operation_holyDay = [
							'2022-11-05',
							'2022-11-06',
							'2022-11-12',
							'2022-11-13',
							'2022-11-19',
							'2022-11-20',
							'2022-11-26',
							'2022-11-27',
							'2022-12-03',
							'2022-12-04',
							'2022-12-10',
							'2022-12-11',
							'2022-12-17',
							'2022-12-18',
							'2022-12-24',
							'2022-12-25',
							'2022-12-29',
							'2022-12-30',
							'2022-12-31',
							'2023-01-01',
							'2023-01-02',
							'2023-01-03',
							'2023-01-07',
							'2023-01-08',
							'2023-01-14',
							'2023-01-15',
							'2023-01-21',
							'2023-01-22',
							'2023-01-28',
							'2023-01-29',
							'2023-02-04',
							'2023-02-05',
							'2023-02-11',
							'2023-02-12',
							'2023-02-18',
							'2023-02-19',
							'2023-02-25',
							'2023-02-26',
							'2023-03-04',
							'2023-03-05',
							'2023-03-11',
							'2023-03-12',
							'2023-03-18',
							'2023-03-19',
							'2023-03-25',
							'2023-03-26',
							'2023-04-01',
							'2023-04-02',
							'2023-04-08',
							'2023-04-09',
							'2023-04-15',
							'2023-04-16',
							'2023-04-22',
							'2023-04-23',
							'2023-04-29',
							'2023-04-30',
							'2023-05-03',
							'2023-05-04',
							'2023-05-05',
							'2023-05-06',
							'2023-05-07',
							'2023-05-13',
							'2023-05-14',
							'2023-05-20',
							'2023-05-21',
							'2023-05-27',
							'2023-05-28',
							'2023-06-03',
							'2023-06-04',
							'2023-06-10',
							'2023-06-11',
							'2023-06-17',
							'2023-06-18',
							'2023-06-24',
							'2023-06-25',
							'2023-07-01',
							'2023-07-02',
							'2023-07-08',
							'2023-07-09',
							'2023-07-15',
							'2023-07-16',
							'2023-07-17',
							'2023-07-22',
							'2023-07-23',
							'2023-07-29',
							'2023-07-30',
							'2023-08-05',
							'2023-08-06',
							'2023-08-11',
							'2023-08-12',
							'2023-08-13',
							'2023-08-14',
							'2023-08-15',
							'2023-08-19',
							'2023-08-20',
							'2023-08-26',
							'2023-08-27',
							'2023-09-02',
							'2023-09-03',
							'2023-09-09',
							'2023-09-10',
							'2023-09-16',
							'2023-09-17',
							'2023-09-23',
							'2023-09-24',
							'2023-09-30',
							'2023-10-01',
							'2023-10-07',
							'2023-10-08',
							'2023-10-09',
							'2023-10-14',
							'2023-10-15',
							'2023-10-21',
							'2023-10-22',
							'2023-10-28',
							'2023-10-29',
							'2023-11-04',
							'2023-11-05',
							'2023-11-11',
							'2023-11-12',
							'2023-11-18',
							'2023-11-19',
							'2023-11-25',
							'2023-11-26',
							'2023-12-02',
							'2023-12-03',
							'2023-12-09',
							'2023-12-10',
							'2023-12-16',
							'2023-12-17',
							'2023-12-23',
							'2023-12-24',
							'2023-12-28',
							'2023-12-29',
							'2023-12-30',
							'2023-12-31',
						];

						var factory_holyDay = [
							'2022-11-05',
							'2022-11-06',
							'2022-11-12',
							'2022-11-13',
							'2022-11-19',
							'2022-11-20',
							'2022-11-26',
							'2022-11-27',
							'2022-12-03',
							'2022-12-04',
							'2022-12-10',
							'2022-12-11',
							'2022-12-17',
							'2022-12-18',
							'2022-12-24',
							'2022-12-25',
							'2022-12-28',
							'2022-12-29',
							'2022-12-30',
							'2022-12-31',
							'2023-01-01',
							'2023-01-02',
							'2023-01-03',
							'2023-01-04',
							'2023-01-07',
							'2023-01-08',
							'2023-01-14',
							'2023-01-15',
							'2023-01-21',
							'2023-01-22',
							'2023-01-28',
							'2023-01-29',
							'2023-02-04',
							'2023-02-05',
							'2023-02-11',
							'2023-02-12',
							'2023-02-18',
							'2023-02-19',
							'2023-02-23',
							'2023-02-25',
							'2023-02-26',
							'2023-03-04',
							'2023-03-05',
							'2023-03-11',
							'2023-03-12',
							'2023-03-18',
							'2023-03-19',
							'2023-03-25',
							'2023-03-26',
							'2023-04-01',
							'2023-04-02',
							'2023-04-08',
							'2023-04-09',
							'2023-04-15',
							'2023-04-16',
							'2023-04-22',
							'2023-04-23',
							'2023-04-29',
							'2023-04-30',
							'2023-05-03',
							'2023-05-04',
							'2023-05-05',
							'2023-05-06',
							'2023-05-07',
							'2023-05-13',
							'2023-05-14',
							'2023-05-20',
							'2023-05-21',
							'2023-05-27',
							'2023-05-28',
							'2023-06-03',
							'2023-06-04',
							'2023-06-10',
							'2023-06-11',
							'2023-06-17',
							'2023-06-18',
							'2023-06-24',
							'2023-06-25',
							'2023-07-01',
							'2023-07-02',
							'2023-07-08',
							'2023-07-09',
							'2023-07-15',
							'2023-07-16',
							'2023-07-22',
							'2023-07-23',
							'2023-07-24',
							'2023-07-25',
							'2023-07-26',
							'2023-07-29',
							'2023-07-30',
							'2023-08-05',
							'2023-08-06',
							'2023-08-11',
							'2023-08-12',
							'2023-08-13',
							'2023-08-14',
							'2023-08-15',
							'2023-08-16',
							'2023-08-19',
							'2023-08-20',
							'2023-08-26',
							'2023-08-27',
							'2023-09-02',
							'2023-09-03',
							'2023-09-09',
							'2023-09-10',
							'2023-09-16',
							'2023-09-17',
							'2023-09-18',
							'2023-09-23',
							'2023-09-24',
							'2023-09-30',
							'2023-10-01',
							'2023-10-07',
							'2023-10-08',
							'2023-10-09',
							'2023-10-14',
							'2023-10-15',
							'2023-10-21',
							'2023-10-22',
							'2023-10-28',
							'2023-10-29',
							'2023-11-04',
							'2023-11-05',
							'2023-11-11',
							'2023-11-12',
							'2023-11-18',
							'2023-11-19',
							'2023-11-25',
							'2023-11-26',
							'2023-12-02',
							'2023-12-03',
							'2023-12-09',
							'2023-12-10',
							'2023-12-16',
							'2023-12-17',
							'2023-12-23',
							'2023-12-24',
							'2023-12-28',
							'2023-12-29',
							'2023-12-30',
							'2023-12-31',
						];

						var arrivalDate_ary = [];

						$('#fs_input_expectedArrival_date option').each(function () {
							arrivalDate_ary.push($(this).val());
						});

						arrivalDate_ary.splice(0, 1);

						function checkHolyDay(arrivalDate_ary, leadTime, holyDay, status) {
							for (let i = 0; i < leadTime; i++) {
								if ($.inArray(arrivalDate_ary[i], holyDay) > -1) {
									//console.log(arrivalDate_ary[i] + 'は休業日');
									arrivalDate_ary[i] = '';
									leadTime++;
								} else {
									//console.log(arrivalDate_ary[i] + 'を削除（' + status + 'リードタイム）');
									arrivalDate_ary[i] = '';
								}
							}
							arrivalDate_ary = arrivalDate_ary.filter(Boolean);
							return arrivalDate_ary;
						}

						$('.fs-c-listedProductName__name').each(function () {
							sizeOrderArray.push($(this).text());
						});

						//組立サービスがありなら指定した日数のリードタイムを追加

						if (sizeOrderArray.find((value) => value.match(/サイズオーダー/g)) != undefined) {
							//console.log('サイズオーダー');
							orderLeadTime += 3;
							//console.log('サイズオーダー:', orderLeadTime);
							arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderLeadTime, operation_holyDay, '事務処理');
							manufactureLeadTime += 10;
							arrivalDate_ary = checkHolyDay(arrivalDate_ary, manufactureLeadTime, factory_holyDay, '生産');
						} else {
							//console.log('サイズオーダー以外');

							//組立サービスがありなら指定した日数のリードタイムを追加

							if (optionResult.result1 >= 0 || optionResult.result2 >= 0) {
								//console.log('組立サービス')
								orderLeadTime += 3;
								//console.log('組立サービス:', orderLeadTime);
								arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderLeadTime, operation_holyDay, '事務処理');
								assemblyLeadTime += 5;
								arrivalDate_ary = checkHolyDay(arrivalDate_ary, assemblyLeadTime, operation_holyDay, '組立');
							} else {
								if ($('#fs_input_payment_bankTransfer').prop('checked')) {
									orderLeadTime += 1;
									//console.log('銀行振込:', orderLeadTime);
									arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderLeadTime, operation_holyDay, '事務処理');
								}
							}
						}

						var deliveryReadyLeadTime = 1;
						for (let i = 0; i < deliveryReadyLeadTime; i++) {
							if ($.inArray(arrivalDate_ary[i], operation_holyDay) > -1) {
								// console.log(arrivalDate_ary[i] + 'は運営が休業日');
								arrivalDate_ary[i] = '';
								deliveryReadyLeadTime++;
							} else {
								// console.log(arrivalDate_ary[i] + 'は運営が営業日だから発送');
								arrivalDate_ary[i] = '';
							}
						}
						arrivalDate_ary = arrivalDate_ary.filter(Boolean);

						var prefArray_SGW = [
								{ pref: '北海道', leadTime: 3 },
								{ pref: '青森県', leadTime: 2 },
								{ pref: '岩手県', leadTime: 2 },
								{ pref: '宮城県', leadTime: 2 },
								{ pref: '秋田県', leadTime: 2 },
								{ pref: '山形県', leadTime: 2 },
								{ pref: '福島県', leadTime: 2 },
								{ pref: '茨城県', leadTime: 1 },
								{ pref: '栃木県', leadTime: 1 },
								{ pref: '群馬県', leadTime: 1 },
								{ pref: '埼玉県', leadTime: 1 },
								{ pref: '千葉県', leadTime: 1 },
								{ pref: '東京都', leadTime: 1 },
								{ pref: '神奈川県', leadTime: 1 },
								{ pref: '新潟県', leadTime: 1 },
								{ pref: '富山県', leadTime: 1 },
								{ pref: '石川県', leadTime: 1 },
								{ pref: '福井県', leadTime: 1 },
								{ pref: '山梨県', leadTime: 1 },
								{ pref: '長野県', leadTime: 1 },
								{ pref: '岐阜県', leadTime: 1 },
								{ pref: '静岡県', leadTime: 1 },
								{ pref: '愛知県', leadTime: 1 },
								{ pref: '三重県', leadTime: 1 },
								{ pref: '滋賀県', leadTime: 1 },
								{ pref: '京都府', leadTime: 1 },
								{ pref: '大阪府', leadTime: 1 },
								{ pref: '兵庫県', leadTime: 1 },
								{ pref: '奈良県', leadTime: 1 },
								{ pref: '和歌山県', leadTime: 1 },
								{ pref: '鳥取県', leadTime: 2 },
								{ pref: '島根県', leadTime: 2 },
								{ pref: '岡山県', leadTime: 2 },
								{ pref: '広島県', leadTime: 2 },
								{ pref: '山口県', leadTime: 2 },
								{ pref: '徳島県', leadTime: 2 },
								{ pref: '香川県', leadTime: 2 },
								{ pref: '愛媛県', leadTime: 2 },
								{ pref: '高知県', leadTime: 2 },
								{ pref: '福岡県', leadTime: 3 },
								{ pref: '佐賀県', leadTime: 3 },
								{ pref: '長崎県', leadTime: 3 },
								{ pref: '熊本県', leadTime: 3 },
								{ pref: '大分県', leadTime: 3 },
								{ pref: '宮崎県', leadTime: 3 },
								{ pref: '鹿児島県', leadTime: 3 },
								{ pref: '沖縄県', leadTime: 7 },
							],
							prefArray_YHC = [
								{ pref: '北海道', leadTime: 6 },
								{ pref: '青森県', leadTime: 4 },
								{ pref: '岩手県', leadTime: 4 },
								{ pref: '宮城県', leadTime: 3 },
								{ pref: '秋田県', leadTime: 4 },
								{ pref: '山形県', leadTime: 4 },
								{ pref: '福島県', leadTime: 4 },
								{ pref: '茨城県', leadTime: 3 },
								{ pref: '栃木県', leadTime: 3 },
								{ pref: '群馬県', leadTime: 3 },
								{ pref: '埼玉県', leadTime: 2 },
								{ pref: '千葉県', leadTime: 3 },
								{ pref: '東京都', leadTime: 2 },
								{ pref: '神奈川県', leadTime: 2 },
								{ pref: '新潟県', leadTime: 4 },
								{ pref: '富山県', leadTime: 4 },
								{ pref: '石川県', leadTime: 5 },
								{ pref: '福井県', leadTime: 5 },
								{ pref: '山梨県', leadTime: 3 },
								{ pref: '長野県', leadTime: 4 },
								{ pref: '岐阜県', leadTime: 4 },
								{ pref: '静岡県', leadTime: 2 },
								{ pref: '愛知県', leadTime: 3 },
								{ pref: '三重県', leadTime: 3 },
								{ pref: '滋賀県', leadTime: 3 },
								{ pref: '京都府', leadTime: 3 },
								{ pref: '大阪府', leadTime: 3 },
								{ pref: '兵庫県', leadTime: 3 },
								{ pref: '奈良県', leadTime: 3 },
								{ pref: '和歌山県', leadTime: 3 },
								{ pref: '鳥取県', leadTime: 7 },
								{ pref: '島根県', leadTime: 7 },
								{ pref: '岡山県', leadTime: 6 },
								{ pref: '広島県', leadTime: 6 },
								{ pref: '山口県', leadTime: 5 },
								{ pref: '徳島県', leadTime: 5 },
								{ pref: '香川県', leadTime: 5 },
								{ pref: '愛媛県', leadTime: 5 },
								{ pref: '高知県', leadTime: 5 },
								{ pref: '福岡県', leadTime: 4 },
								{ pref: '佐賀県', leadTime: 5 },
								{ pref: '長崎県', leadTime: 5 },
								{ pref: '熊本県', leadTime: 5 },
								{ pref: '大分県', leadTime: 5 },
								{ pref: '宮崎県', leadTime: 5 },
								{ pref: '鹿児島県', leadTime: 5 },
								{ pref: '沖縄県', leadTime: 10 },
							];

						var destinationAddress = $('.fs-c-checkout-destination__address__address').text().split(/\s+/);
						var expectedArrival_time_selected = $('#fs_input_expectedArrival_time').val();
						// console.log(optionResult);
						if (optionResult.result2 >= 0) {
							//console.log('組立済+搬入');
							var prefArray = prefArray_YHC;
							var zipCode = $('.fs-c-checkout-destination__address .fs-c-checkout-destination__address__zipCode').text().replace('-', '');
							expectedArrivalTime_YHC(expectedArrival_time_selected, zipCode);
						} else if (optionResult.result1 >= 0) {
							//console.log('組立済+玄関渡し');
							expectedArrivalTime_SGW(expectedArrival_time_selected);
							var prefArray = prefArray_SGW;
						} else {
							//console.log('組立サービス以外');
							expectedArrivalTime_SGW(expectedArrival_time_selected);
							var prefArray = prefArray_SGW;
						}

						var prefArray_find = prefArray.find((u) => u.pref === destinationAddress[0]);
						var deliveryLeadTime = prefArray_find.leadTime;

						for (i = 0; i < deliveryLeadTime; i++) {
							//console.log(arrivalDate_ary[i] + 'を削除（配送リードタイム）');
							arrivalDate_ary[i] = '';
						}

						arrivalDate_ary = arrivalDate_ary.filter(Boolean);

						var optionHtml = '<option value="none">指定なし</option>';

						for (i = 0; arrivalDate_ary.length > i; i++) {
							var dateValue_ary = arrivalDate_ary[i].split('-');
							// 今回指定する年月日情報（２０２０年１０月１日）
							var yearStr = Number(dateValue_ary[0]);
							var monthStr = Number(dateValue_ary[1]);
							var dayStr = Number(dateValue_ary[2]);
							// Dateオブジェクトには実際の月ー１の値を指定するため
							var jsMonth = monthStr - 1;
							// Dateオブジェクトは曜日情報を0から6の数値で保持しているため、翻訳する
							var dayOfWeekStrJP = ['日', '月', '火', '水', '木', '金', '土'];
							// 指定日付で初期化したDateオブジェクトのインスタンスを生成する
							var date = new Date(yearStr, jsMonth, dayStr);
							// 木曜日は数値の4として保持されているため、dayOfWeekStrJP[4]の値が出力される
							optionHtml = optionHtml + '<option value="' + arrivalDate_ary[i] + '">' + dateValue_ary[0] + '/' + dateValue_ary[1] + '/' + dateValue_ary[2] + '(' + dayOfWeekStrJP[date.getDay()] + ')</option>';
							// console.log('<option value="' + arrivalDate_ary[i] + '">' + dateValue_ary[0] + '/' + dateValue_ary[1] + '/' + dateValue_ary[2] + '(' + dayOfWeekStrJP[date.getDay()] + ')</option>');
						}
						$('#fs_input_expectedArrival_date').html(optionHtml);
						$('#fs_input_expectedArrival_date').val(selectedValue);
					}
					stopFlag = 1;
				} else {
					stopFlag = 0;
					//お届け先住所が変更されたらお届け希望日をリセットする
					checkAddress = $('.fs-c-checkout-destination__address__address').text();
					if (checkAddressRetention == '') {
						checkAddressRetention = checkAddress;
					} else if (checkAddressRetention != checkAddress) {
						if ($('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text() != '指定なし' || $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '指定なし') {
							// お届け希望日をリセットする
							$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
							const resetArrivalDate = setInterval(function () {
								if ($('#__fs_modal_delivery button.fs-c-button--settings').length) {
									$('#__fs_modal_delivery').css('display', 'none');
									$('#fs_input_expectedArrival_date').val('none');
									$('#fs_input_expectedArrival_time').val('none');
									$('#__fs_modal_delivery button.fs-c-button--settings').trigger('click');
									clearInterval(resetArrivalDate);
								}
							}, 1);

							$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け希望日時が「指定なし」に変更されました</h4><p>届け先住所が変更されたため、<span class="red">お届け希望日時を再度指定</span>してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
							$('.confirmOrderAlert-button').on('click', function () {
								$('#confirmOrderAlert').remove();
								noTimeSpecifiedZipCodes_result = undefined;
							});
						}
						checkAddressRetention = checkAddress;
					}

					//支払い方法が他の決裁方法から銀行振込に指定された場合にお届け希望日をリセットする
					checkPayment = $('.fs-c-checkout-paymentMethodList input:checked').val();
					if (checkPaymentRetention == '') {
						checkPaymentRetention = checkPayment;
					} else if ($('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text() != '指定なし' || $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '指定なし') {
						if (checkPayment == 'BANK_TRANSFER') {
							if (checkPaymentRetention != checkPayment) {
								// お届け希望日をリセットする
								$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
								const resetArrivalDate = setInterval(function () {
									if ($('#__fs_modal_delivery button.fs-c-button--settings').length) {
										$('#__fs_modal_delivery').css('display', 'none');
										$('#fs_input_expectedArrival_date').val('none');
										$('#fs_input_expectedArrival_time').val('none');
										$('#__fs_modal_delivery button.fs-c-button--settings').trigger('click');
										clearInterval(resetArrivalDate);
									}
								}, 1);

								$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け希望日時が「指定なし」に変更されました</h4><p>お支払い方法が銀行振込に変更されたため、<span class="red">お届け希望日時を再度指定</span>してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
								$('.confirmOrderAlert-button').on('click', function () {
									$('#confirmOrderAlert').remove();
									noTimeSpecifiedZipCodes_result = undefined;
								});
							}
						}
						checkPaymentRetention = checkPayment;
					}
				}
			}
		};

		var stopFlag = 0,
			stopFlag_load = 0,
			checkAddress = '',
			checkAddressRetention = '',
			checkPayment = '',
			checkPaymentRetention = '';

		setInterval(function () {
			execution(optionResult);
		}, 300);
	}
}

/* expectedArrivalTime_control
========================================================================== */
function expectedArrivalTime_SGW(selected) {
	var expectedArrival_time_html;
	//SGW
	expectedArrival_time_html = '<option value="2">12:00～14:00</option><option value="3">14:00～16:00</option><option value="4">16:00～18:00</option><option value="5">18:00～21:00</option>';
	$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_html + '</select>');
	$('#fs_input_expectedArrival_time option[value="' + selected + '"]').prop('selected', true);
}

function expectedArrivalTime_YHC(selected, zipCode) {
	yhcTimeSpecifiedZipCodes_result = checkZipCodes('checkYhcTimeSpecifiedZipCodes', zipCode);

	if (yhcTimeSpecifiedZipCodes_result.serviceType4_is == 1) {
		var expectedArrival_time_type4_html = '<option value="6">12:00〜15:00</option><option value="7">15:00〜18:00</option><option value="8">18:00〜21:00</option>';
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_type4_html + '</select>');
		$('#fs_input_expectedArrival_time option[value="' + selected + '"]').prop('selected', true);
	} else if (yhcTimeSpecifiedZipCodes_result.serviceType3_is == 1) {
		var expectedArrival_time_type3_html = '<option value="9">12:00〜18:00</option><option value="8">18:00〜21:00</option>';
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_type3_html + '</select>');
		$('#fs_input_expectedArrival_time option[value="' + selected + '"]').prop('selected', true);
	} else {
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
		$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
		$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
	}
}

function checkOption() {
	var optionArray = [];
	$('.fs-c-listedOptionPrice__option__value').each(function () {
		optionArray.push($(this).text());
	});
	// console.log(optionArray);
	if (optionArray.length == 0) {
		return false;
	} else {
		var result1 = $.inArray('組立済+玄関渡し', optionArray);
		var result2 = $.inArray('組立済+搬入', optionArray);
		return { result1: result1, result2: result2 };
	}
}
