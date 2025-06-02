/*
このJSで行っている処理の概要
・新しいプライバシーポリシーに同意しているかどうか判定し、同意していない場合は同意するための表示を行う
・お届け先の郵便番号をもとに、離島の判定やお届け先の時間指定の区分を出し分けする
・離島の場合は、組立サービス不可の処理、代金引換不可の処理をしている
・オーダー商品の場合は、代金引換不可の処理

FSの注文手続きの特性
FS側のJSによるAjaxで処理をしているため、コールバックや同期のハンドリングができないため、値を監視して処理を実行している。
*/

// 初期値設定
let checkZipCodeResult = undefined; //郵便番号のチェック結果初期値設定
let is_apiOptIn, is_optIn, is_option, is_specifyDate, is_sizeOrder, is_specifyDateSizeOrder; // Cookieに書き込む判定変数の宣言
let execute_flag = 1; //実行できる状態のフラグ

// AmazonPay決済手続き画面の場合
// AmazonPay決済手続き画面はなぜか「$(window).on('load'」が動作しない
setInterval(function () {
	// カート内の商品が読み込みが完了するのを待ち、実行フラグが立っているかどうかを判定
	if ($('.fs-c-cartTable__productInfo').length > 0 && execute_flag == 1) {
		// 条件が揃い実行ができる場合の処理
		$.cookie('is_optIn',0);
		$.cookie('is_option',0);
		$.cookie('is_specifyDate',0);
		$.cookie('is_sizeOrder',0);
		$.cookie('is_specifyDateSizeOrder',0);

		//組立オプションの判定
		optionJudgment();
		// 実行できる状態から実行しない状態のフラグを立たせる
		execute_flag = 0;
	}
}, 300);

/* checkOrderEnabled
// 注文ができるか状態かどうか判定して注文ボタンをEnableもしくはDisableにする関数
========================================================================== */
function checkOrderEnabled(memberId) {
	is_optIn = $.cookie('is_optIn'); //Cookieの情報を取得
	is_option = $.cookie('is_option'); //Cookieの情報を取得
	is_specifyDate = $.cookie('is_specifyDate'); //Cookieの情報を取得
	is_sizeOrder = $.cookie('is_sizeOrder'); //Cookieの情報を取得
	is_specifyDateSizeOrder = $.cookie('is_specifyDateSizeOrder'); //Cookieの情報を取得

	//会員かどうか判定する
	if (memberId != 'guest') {
		//会員の場合の処理
		//全ての条件が揃っているのであれば注文ボタンをEnableにする
		if (is_optIn == 1 && is_option == 1 && is_specifyDate == 1) {
			if (is_sizeOrder == 1){
				if (is_specifyDateSizeOrder == 1){
					orderEnabled();
				} else {
					orderDisabled();
				}
			} else {
				orderEnabled();
			}
		} else {
			orderDisabled();
		}
	} else {
		//非会員の場合の処理
		if (is_option == 1 && is_specifyDate == 1) {
			orderEnabled();
		} else {
			orderDisabled();
		}
	}
}

/* delivery_date_time_sizeorder_enabled 開発中
// オーダー品がカートに入っている、かつ、お届け希望日が「指定なし」になっている場合に、「サイズオーダー品をご注文の方はお届け希望日を指定ください。」と表示し、注文できないように注文ボタンをdisabledにする関数
========================================================================== */
function delivery_date_time_sizeorder_enabled() {
	if (!$('.deliveryMethodAlert3').length) {
		is_sizeOrder = $.cookie('is_sizeOrder'); //Cookieの情報を取得
		//console.log('is_sizeOrder: ' + is_sizeOrder);
		//var delivery_time = $('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text();
		if (is_sizeOrder == 1) {
			if(!$('#delivery_data_size_order_caution').length){
				$('.addDeliveryDateTimeTitle').append('<span id="delivery_data_size_order_caution" class="red ml-8 small-text">※サイズオーダー・受注生産品ご注文時必須</span>')
			}
			var delivery_date = $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text();
			if (delivery_date == '指定なし') {
				// お届け希望日が「指定なし」になっている場合
				$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert3 red mt-16">【重要】サイズオーダー・受注生産品をご注文の方は<strong>お届け希望日</strong>をご指定ください。<span class="delivery_date_time_check mt-24 mb-24 text-link-color">→お届け希望日時の指定はこちら</span></p>');
				$.cookie('is_specifyDateSizeOrder', 0);
			} else {
				$.cookie('is_specifyDateSizeOrder', 1)
			}
		}

		$(document).off('click', '.openDeliveryModal').on('click', '.openDeliveryModal', function () {
			// モーダルを表示できるように制御
			$('body').removeClass('modal_displayNone');

			// モーダル表示を試行（要素が描画されるまで100msおきに試す）
			var button = $('#fs_button_changeDeliveryMethod button.fs-c-button--change--small');
			button.trigger('click');
			// var open_modal = setInterval(function () {
			// 	var button = $('#fs_button_changeDeliveryMethod button.fs-c-button--change--small');
			// 	if (button.length && button.is(':visible')) {
			// 		button.trigger('click');
			// 		clearInterval(open_modal);
			// 	}
			// }, 100);
		});
	}
}

/* checkMemberIdOptInPolicy
// プライバシーポリシーに同意しているかどうか判定し、同意していなければ同意するための表示をする関数
========================================================================== */
function checkMemberIdOptInPolicy() {
	const memberId = $('#memberId').text();
	// 会員かどうか判定（会員であればmemberIdに整数が入る）
	if (memberId != 'guest') {
		// 会員の場合の処理
		// Cookieにis_optInのKEYがない場合にオプトイン状況をAPIで取得する
		if (is_apiOptIn == undefined) {
			const checkUrl = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/checkMemberOptInPolicy';
			const checkParams = { member_id: memberId };
			is_apiOptIn = apiOptInPolicy(checkUrl, checkParams);
			if (is_apiOptIn['result'] == false) {
				// プライバシーポリシーに同意していない場合の処理
				is_apiOptIn = 'none';
			} else {
				// プライバシーポリシーに同意している場合の処理
				is_apiOptIn = is_apiOptIn['is_opt_in'];
			}
		}

		//プライバシーポリシーのオプトイン状態が1（すでに同意している）であれば表示しない
		if (is_apiOptIn == 0) {
			//同意していない場合の処理
			if (!$('#optInPolicy').length) {
				const policyOptInHtml = '<a href="/p/about/privacy-policy" target="_blank" class="text-link-color">プライバシーポリシー</a>に同意する<br><span class="xsmall-text">*別タブで開きます</span>';
				//同意状況をCookieから取得する
				is_optIn = $.cookie('is_optIn');

				//同意状況により適宜処理をする
				if (is_optIn == 1) {
					//同意済の処理
					//チェックボックスにチェックを入れた状態する
					$('#fs_button_placeOrder').before(`<div id="optInPolicy"><p>プライバシーポリシーの改訂に伴い、同意をお願いいたします。</p><input type="checkbox" checked>${policyOptInHtml}</div>`);
				} else {
					//未同意の処理
					//チェックボックスにチェックを入れていない状態する
					$('#fs_button_placeOrder').before(`<div id="optInPolicy"><p>プライバシーポリシーの改訂に伴い、同意をお願いいたします。</p><input type="checkbox">${policyOptInHtml}</div>`);
				}

				// プライバシーポリシーの同意チェックボックスを変更するとオプトイン状況をAPIで書き込む
				$('#optInPolicy input').change(function () {
					if ($(this).prop('checked')) {
						//同意する場合の処理
						$.cookie('is_optIn', 1);
					} else {
						//同意しない場合の処理
						$.cookie('is_optIn', 0);
					}
				});
			}
		} else {
			//同意している場合の処理
			$.cookie('is_optIn', 1);
		}
	} else {
		return memberId;
	}
}

/* apiOptInPolicy
// 新しいプライバシーポリシーに同意しているかどうかチェックをする関数
========================================================================== */
function apiOptInPolicy(url, params) {
	// AWS DynamoDBに接続して会員の同意状況を取得する
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
	response = JSON.parse(response);
	return response;
}

/* optionNameChange
// 組立オプションで右開きなど組立方法に指定がある商品のオプション名を変更する関数
========================================================================== */
function optionNameChange() {
	if (!$('.optionNameChanged').length) {
		// 組立オプション指定があった場合のカート内表示変更
		var productUrl = '';
		var productUrl_ary = '';
		var modelNumber = '';

		// 該当するmodelNumberを配列に格納する
		var optionHasProducts = [
			'por-1830d-na',
			'por-1830d-wh',
			'por-1830d-dk',
			'por-5530du-na',
			'por-5530du-wh',
			'por-5530du-dk',
			'hnb-4540d',
			'adl-4013dh-na',
			'adl-4013dh-wh',
			'adl-4013dh-dk',
			'sep-1690ar-na',
			'sep-1690ar-dk',
			'',
			'lge-1285-dk',
			'lge-1285-na',
			'lge-1285-iv',
			'lge-1212-na',
			'lge-1212-dk',
			'lge-1212-iv',
			'lge-1612-na',
			'lge-1612-dk',
			'lge-1612-iv',
			'lge-8545-na',
			'lge-8545-dk',
			'lge-8545-iv',
			'lge-8585-na',
			'lge-8585-dk',
			'lge-8585-iv',
		];

		//CAUTION:カートのスクリプトと指定しているClassが異なる fs-c-cartTable__productName__name -> fs-c-listedProductName__name
		$('.fs-c-listedProductName__name').each(function () {
			// 商品のリンクを取得する
			productUrl = $(this).attr('href');

			// 配列にする
			productUrl_ary = productUrl.split('/');

			// リンクの最後の部分(型番)を取得
			modelNumber = productUrl_ary[productUrl_ary.length - 1];
			//optionHasProductsにmodelNumberがあるか判定する
			var optionValue = '';
			if (optionHasProducts.indexOf(modelNumber) != -1) {
				//modelNumberが該当商品であるか判定し処理を分岐
				// //あるのであれば.fs-c-listedProductName__selection__choiceの値を取得する
				if (modelNumber.match(/por-5530du|hnb-4540d|por-1830d/)) {
					//扉の開き方の組立オプションがある場合の処理
					optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
					optionValue = `（扉の開き方：${optionValue})`;
					$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
				} else if (modelNumber.match(/adl-4013dh|sep-1690ar/)) {
					//組立の向きの組立オプションがある場合の処理
					optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
					optionValue = `（組立の向き：${optionValue})`;
					$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
				} else if (modelNumber.match(/lge-/)) {
					//背板の柄の組立オプションがある場合の処理
					optionValue = $(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text();
					optionValue = `（背板の柄：${optionValue})`;
					$(this).next('.fs-c-listedProductName__selection').find('.fs-c-listedProductName__selection__choice').text(optionValue);
				}
				$(this).addClass('optionNameChanged');
			}
		});
	}
}

/* checkout checkZipCodes
// お届け先の郵便番号を元に配送業者ごとにお届け日時の指定ができるかどうかの情報を取得する関数
========================================================================== */
function checkZipCodes(zipCode) {
	//配送先の郵便番号から配送対応情報をAPIで取得する
	var url = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/check_zip_code_for_delivery';
	var params = { zip_code: zipCode };
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
	response = JSON.parse(response);
	return response;
}

/* checkout couponUseCheck
// クーポンがつけ忘れている可能性がある場合に注意表示する関数
========================================================================== */
function couponUseCheck() {
	if (!$('.couponUseCheck').length) {
		//クーポンが適用されていない場合の処理
		$('#fs_button_placeOrder').before('<p class="couponUseCheck text-center mt-24 mb-24"><a href="#fs-couponInfo-container" class="text-link-color">クーポンの付け忘れはございませんか？</a></p>');
	}
}

/* checkout delivery_date_time_check
// お届け希望日を指定し忘れている可能性がある場合に注意表示する関数
========================================================================== */
function delivery_date_time_check() {
	if (!$('.delivery_date_time_check').length) {
		$('#fs_button_placeOrder').before('<p class="delivery_date_time_check text-center mt-24 mb-24 text-link-color">お届け希望日時の指定はありませんか？</p>');
	}

	// クリック時にモーダルを表示
	$(document).on('click', '.delivery_date_time_check', function () {
		// bodyに追加されていた非表示クラスを削除
		$('body').removeClass('modal_displayNone');

		// モーダルを開く（配送方法変更ボタンをトリガー）
		$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');
	});
}

/* checkout AddDeliveryMethodTitle
// お届け希望日時の表示部分にタイトルを表示する関数（お届け希望日時をどこで指定するかわからない人が多いため目立たせるための処置）
========================================================================== */
function addDeliveryMethodTitle(optionResult) {
	if (optionResult != false) {
		//optionResultの値がある場合の処理
		if (!$('.addDeliveryDateTimeTitle').length) {
			$('.fs-c-checkout-delivery__method__deliveryDateTime').before('<h4 class="fs-c-checkout-delivery__method__title addDeliveryDateTimeTitle mt-48">お届け希望日時</h4>');
		}
	}
}

/* checkout add_caution_about_wrong_info
// お届け先の表示部分にお届け先や電話番号に誤りがないか確認を促すメッセージを表示する関数
========================================================================== */
function add_caution_about_wrong_info() {
		if (!$('.add_caution_about_wrong_info').length) {
			$('#fs-addressInfo-container').append('<p class="add_caution_about_wrong_info red mt-16">誤った住所・電話番号により商品がお届けできないケースが発生しています。お届け先や電話番号に誤りがないかご確認をお願いします。</p>');
		}
}

/* checkout sizeOrderDisplayThumb
// ご注文内容に表示されるサイズオーダーのサムネイルがデフォルトだと選択した商品にならないため適宜変更するための関数
========================================================================== */
function sizeOrderDisplayThumb() {
	//サイズオーダーがカートに入っているかどうかを判定する
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
		//サイズオーダー品がある場合の処理
		if ($('.sizeOrder').find('.fs-c-productImage__image').attr('src').indexOf('xs.jpg') >= 0) {
			$('.sizeOrder').each(function () {
				orderDetails = $(this).find('.fs-c-listedOptionPrice__option__value').html();
				var href = $(this).find('.fs-c-listedProductName__name').attr('href');
				if (href.indexOf('tnl-em') >= 0) {
					//TNLオーダーの処理
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
						case 'グレー単色':
							orderColor = 'GY';
							break;
						case 'ブラウンウォールナット1':
							orderColor = 'MW';
							break;
						case 'ライトウォールナット':
							orderColor = 'LW';
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
				} else if (href.indexOf('sep-emdesk') >= 0) {
					//SEPデスクの処理
					orderWidth = orderDetails.replace(/.*横幅([0-9]+)cm.*/g, '$1');
					if (orderDetails.indexOf('深型')) {
						orderDepth = 'f';
					} else if (orderDetails.indexOf('浅型')) {
						orderDepth = 'a';
					}

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
					$(this)
						.find('img')
						.attr('src', '/assets/img/product/sizeOrder/sep-em/desk/thum/' + thumbnail);
				} else if (href.indexOf('sep-em') >= 0) {
					//SEPラックオーダーの処理
					orderWidth = orderDetails.replace(/.*横([0-9]+)マス.*/g, '$1');
					orderHeight = orderDetails.replace(/.*縦([0-9]+)マス.*/g, '$1');

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

					$(this)
						.find('img')
						.attr('src', '/assets/img/product/sizeOrder/sep-em/rack/thum/' + thumbnail);
				}
			});
		}
	}

	if ($('.readyMade').length) {
		//既製品の場合の処理
		$('.readyMade img').each(function () {
			var readyMadeImage = $(this).attr('src');
			readyMadeImage = readyMadeImage.replace(/[0-9]{2}-xs.jpg/, '02-xs.jpg');
			$(this).attr('src', readyMadeImage);
		});
	}
}

/* optionJudgment
// 組立オプションの有無を判定する関数
========================================================================== */
function optionJudgment() {
	var optionResult = false;
	var check_adis_result = 0;
	var memberId;
	var execution = function () {
		if (optionResult == false) {
			//optionResultがfalseの場合の処理
			optionResult = check_option();
		}

		if (check_adis_result == false) {
			//check_adis_resultがfalseの場合の処理
			check_adis_result = check_adis();
		}

		if (optionResult == 10) {
			// console.log('通常品 + オプションなし');
			//Cookieに書き込み注文ボタンを押せる状態にする
			$.cookie('is_option', 1);
			$.cookie('is_specifyDate', 1);
		} else if (optionResult == 11) {
			// console.log('通常品 + 組立済+玄関渡し');
		} else if (optionResult == 12) {
			// console.log('通常品 + 組立済+搬入');
		} else if (optionResult == 20) {
			// console.log('オーダー品 + オプションなし');
			//Cookieに書き込み注文ボタンを押せる状態にする
			$.cookie('is_option', 1);
			$.cookie('is_specifyDate', 1);
		} else if (optionResult == 21) {
			// console.log('オーダー品 + 組立済+玄関渡し');
		} else if (optionResult == 22) {
			// console.log('オーダー品 + 組立済+搬入');
		}

		/* options_available
		// オプションの判定や離島の時間指定の有無
		========================================================================== */
		function options_available() {
			// 郵便番号にあるハイフンを削除する
			var zipCode = $('.fs-c-checkout-destination__address .fs-c-checkout-destination__address__zipCode').text().replace('-', '');

			if (zipCode != undefined) {
				// 郵便番号が取得できた場合の処理
				if (zipCode != zipCodeChangeCheck) {
					//郵便番号が変更された場合
					//新たに郵便番号を取得する
					zipCodeChangeCheck = zipCode;

					//郵便番号の配送業者対応情報を取得する
					checkZipCodeResult = checkZipCodes(zipCode);

					//JSで配送日時指定をリセットする制御のためにFSが表示制御しているモーダルウインドウを強制的に非表示にする
					$('body').addClass('modal_displayNone');

					setTimeout(function () {
						//モーダルウインドウを起動させる
						$('#fs_button_changeDeliveryMethod button.fs-c-button--change--small').trigger('click');

						setTimeout(function () {
							// モーダルウインドウの保存ボタンをクリックして、値の内容を保存する
							$('#__fs_modal_delivery, .fs-c-loader, .fs-c-loader__items').css('display','none');
						}, 1);

						setTimeout(function () {

							
							if (checkZipCodeResult.is_remote_island == 1) {
								// 離島の場合の処理
								// 備考の値にお客様への連絡事項を格納する
								$('#fs_input_expectedArrival_note').val('【重要】お届け先が離島であるため別途送料がかかります。ご注文内容を確認後にメールにて送料をお知らせします。追加送料にご了承いただきましたら発送いたします。');
							} else {
								// 離島ではない場合の処理
								// 備考欄の値を削除する
								$('#fs_input_expectedArrival_note').val('');
							}
							setTimeout(function () {
								// モーダルウインドウの保存ボタンをクリックして、値の内容を保存する
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

					if (check_adis_result.result2 >= 0) {
						// 組立済+搬入の場合の処理
						if (checkZipCodeResult.is_yhc_service_type_4 == 1 || checkZipCodeResult.is_yhc_service_type_3 == 1) {
							// YHCの時間指定ができる場合の処理
							if (deliveryDate == '指定なし' || deliveryTime == '指定なし') {
								// 日時指定がない場合の処理
								// 組立済+搬入サービスは日時指定が必須
								$.cookie('is_specifyDate', 0);
								if (!$('.deliveryMethodAlert').length) {
									$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert red text-center mt-16">【重要】ご指定のお届け先で「組立済+搬入」サービスをご利用の場合は<strong>お届け希望日と時間帯</strong>をご指定ください。<span class="delivery_date_time_check mt-24 mb-24 text-link-color">→お届け希望日時の指定はこちら</span></p>');
								}
							} else {
								// 日時指定がされている場合の処理
								// Cookieに配送日時指定がされている情報を書き込む
								$.cookie('is_specifyDate', 1);
							}
						} else if (checkZipCodeResult.is_yhc_service_type_4 == 0 && checkZipCodeResult.is_yhc_service_type_3 == 0) {
							//YHCの時間指定ができない場合の処理
							if (deliveryDate == '指定なし') {
								// 日時指定がない場合の処理
								$.cookie('is_specifyDate', 0);
								if (!$('.deliveryMethodAlert').length) {
									$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert red text-center mt-16">このお届け先で「組立済+搬入」サービスをご利用の場合は<strong>お届け希望日</strong>をご指定ください。</p>');
								}
							} else {
								// 日時指定がされている場合の処理
								$.cookie('is_specifyDate', 1);
							}
						}
					} else {
						// 組立済+搬入ではない場合の処理
						$.cookie('is_specifyDate', 1);
						if ($('.deliveryMethodAlert').length) {
							// デリバリーアラートの表示がされていた場合の処理
							// デリバリーアラートの表示を削除する
							$('.deliveryMethodAlert').remove();
						}
					}

					if (deliveryTime != '指定なし') {
						//通常配送と組立済+玄関渡しサービスの時間指定対応判定
						if (check_adis_result.result2 == undefined || check_adis_result.result2 == -1) {
							if (checkZipCodeResult.is_sgw_time_specified == 0) {
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
								if (!$('#confirmOrderAlert').length) {
									$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>このお届け先は時間指定ができません</h4><p>配送業者がお届け時間指定に対応していないため「指定なし」に変更されました。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
								}
								$('.confirmOrderAlert-button').on('click', function () {
									$('#confirmOrderAlert').remove();
								});
							}
						} else if (check_adis_result.result2 >= 0) {
						}
					}

					if (checkZipCodeResult.is_remote_island == 1) {
						//離島の場合
						//組立サービス利用は沖縄・離島不可

						if (check_adis_result.result1 >= 0 || check_adis_result.result2 >= 0) {
							//組立サービスが利用されている場合の処理
							$.cookie('is_option', 0);
							if (!$('.deliveryAlert').length) {
								$('.fs-c-checkout-destination__title').after('<div class="deliveryAlert"><p class="mb-0">お届け先が沖縄・離島の場合は「組立サービス」をご利用いただけません。<br>該当する商品をカートから削除し、組立サービスを選択せずにカートに入れてからご注文ください。</p></div>');
								$('#fs_button_placeOrder').after('<p class="deliveryMethodAlert1 red text-center mt-16">お届け先が沖縄・離島の場合は「組立サービス」をご利用いただけません。</p>');
							}
						} else {
							//組立サービスが利用されていない場合の処理
							$.cookie('is_option', 1);
							if ($('.deliveryAlert').length) {
								$('.deliveryAlert').remove();
								$('.deliveryMethodAlert1').remove();
							}
						}
					} else {
						$.cookie('is_option', 1);
					}
					if (!$('.deliveryMethodAlert2').length) {
						var sizeOrderArray = [];
						$('.fs-c-listedProductName__name').each(function () {
							sizeOrderArray.push($(this).text());
						});
						if (sizeOrderArray.find((value) => value.match(/(サイズオーダー|受注生産)/g)) != undefined || check_adis_result.result1 >= 0 || check_adis_result.result2 >= 0) {
							$('#fs_button_placeOrder').before('<p class="deliveryMethodAlert2 mt-16"><span>お願い</span>サイズオーダー・受注生産品や組立サービスは、キャンセルや変更を承ることができません。ご注文内容に誤りがないかご確認ください。</p>');
						}

						$('#fs_couponCode').attr('placeholder', '会員様のみご利用いただけます');
						addDeliveryMethodTitle(optionResult);
						add_caution_about_wrong_info();
						sizeOrderDisplayThumb();
						optionNameChange();
					}

					// 組立サービス利用は代引不可
					if (check_adis_result.result1 >= 0 || check_adis_result.result2 >= 0) {
						// 組立サービスが利用されている場合の処理
						$('#fs_input_payment_cashOnDelivery').prop('disabled', true);
						$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
						$('.fs-c-checkout-paymentMethod--cashOnDelivery .fs-c-radio__radioLabelText').html('代金引換<span class="red paymentCaution">（組立サービスをお申し込みの場合はご利用いただけません）</span>');
						if ($('#fs_input_payment_cashOnDelivery').prop('checked')) {
							//代金引換が選択されている場合の処理
							if (!$('#confirmOrderAlert').length) {
								$('.fs-l-page').before(
									'<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>代金引換をご利用いただけません</h4><p>申し訳ございませんが、組立サービスをお申し込みの場合は代金引換をご利用いただけません。</p><p>該当する商品をカートから削除し、組立サービスを選択せずに再度カートに入れてからご注文ください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>'
								);
							}
							//代引引換以外の支払い方法を選択する
							$('.fs-c-checkout-paymentMethodList li:nth-child(2) label').trigger('click');

							// ボタンがクリックされたらアラートを非表示にする
							$('.confirmOrderAlert-button').on('click', function () {
								$('#confirmOrderAlert').remove();
							});
						}
					}

					// サイズオーダーは代引不可
					var sizeOrderArray = [];

					// サイズオーダーの判定のための情報を取得する
					$('.fs-c-listedProductName__name').each(function () {
						sizeOrderArray.push($(this).text());
					});

					if (sizeOrderArray.find((value) => value.match(/(サイズオーダー|受注生産)/g)) != undefined) {
						// サイズオーダーか受注生産品のどちらかの場合の処理
						$('#fs_input_payment_cashOnDelivery').prop('disabled', true);
						$('.fs-c-checkout-paymentMethod--cashOnDelivery').css('opacity', '0.5');
						$('.fs-c-checkout-paymentMethod--cashOnDelivery .fs-c-radio__radioLabelText').html('代金引換<span class="red paymentCaution">（サイズオーダー・受注生産品をご注文の場合はご利用いただけません）</span>');
						if ($('#fs_input_payment_cashOnDelivery').prop('checked')) {
							//代引引換が選択されている場合の処理
							//アラートを表示する
							$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>代金引換をご利用いただけません</h4><p>申し訳ございませんが、サイズオーダーや受注生産品をご注文の場合は代金引換をご利用いただけません。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
							$('.fs-c-checkout-paymentMethodList li:nth-child(2) label').trigger('click');
							$('.confirmOrderAlert-button').on('click', function () {
								/// ボタンがクリックされたらアラートを非表示にする
								$('#confirmOrderAlert').remove();
							});
						}
					}

					if (checkZipCodeResult.is_remote_island == 1) {
						// 離島の場合の処理
						// 沖縄離島の場合は代引利用が不可
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

		// オプションが利用できるかどうか判定する
		options_available();

		// クーポンが適用されているか判定する
		couponUseCheck();

		// お届け希望日が指定されているか判定する
		delivery_date_time_check();

		memberId = checkMemberIdOptInPolicy();
	};

	var checkFlag = 0;
	var zipCodeChangeCheck;

	setInterval(function () {
		// 300ms毎に実行する
		execution(optionResult);
		delivery_date_time_sizeorder_enabled();
		checkOrderEnabled(memberId);
	}, 300);

	expectedArrival(optionResult);
}

// 注文を確定するボタンを押せない状態にする
function orderDisabled() {
	$('#fs_button_placeOrder button').prop('disabled', true);
	$('#fs_button_placeOrder button').css({
		background: '#ccc',
		cursor: 'default',
		border: '1px solid #ccc',
	});
}

// 注文を確定するボタンを押せる状態にする
function orderEnabled() {
	$('#fs_button_placeOrder button').prop('disabled', false);
	$('#fs_button_placeOrder button').css({
		background: '#e87909',
		cursor: 'pointer',
		border: '1px solid #e87909',
	});
}

/* expectedArrival
// お届け希望日の開始日時を制御するための関数
========================================================================== */
function expectedArrival(optionResult) {
	var execution = function () {
		//初回の処理
		if (optionResult == false) {
			optionResult = check_option();
		}
		//初回の処理
		if (check_adis_result == undefined) {
			var check_adis_result = check_adis();
		}

		if ($('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '') {
			//お届け日が指定されていない場合の処理
			if (($('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text() != '指定なし' || $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text() != '指定なし') && stopFlag_load == 0) {
				// FSの注文手続き画面をJSで操作してお届け希望日をリセットする
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

				$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け指定日時が「指定なし」に変更されました</h4><p>再読み込みがされたため、お届け指定日時が「指定なし」に変更されました。お届け指定日時を再設定してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');

				$('.confirmOrderAlert-button').on('click', function () {
					// ボタンがクリックされたらアラートを非表示にする
					$('#confirmOrderAlert').remove();
				});
			}

			// 停止フラグを設定する
			stopFlag_load = 1;

			if ($('.fs-c-modal--checkout-deliveryMethod').length) {
				// 配送日時が設定されている場合の処理
				var selectedValue = $('#fs_input_expectedArrival_date').val();

				if (stopFlag == 0) {
					// 停止フラグが立っていない場合の処理
					// 変数の初期値を設定する
					var orderInputLeadTime = 0,
						requestWaitingLeadTime = 0,
						orderRequestLeadTime = 0,
						assemblyLeadTime = 0,
						manufactureLeadTime = 0,
						shippingReadyLeadTime = 0,
						shippingDateLeadTime = 0,
						deliveryReadyLeadTime = 0,
						deliveryLeadTime = 0,
						bankTransferLeadTime = 0,
						sizeOrderArray = [];

					// 物流業務部の休業日を設定する
					var operation_holyDay = [
						'2024-11-02',
						'2024-11-03',
						'2024-11-09',
						'2024-11-10',
						'2024-11-16',
						'2024-11-17',
						'2024-11-23',
						'2024-11-24',
						'2024-11-30',
						'2024-12-01',
						'2024-12-07',
						'2024-12-08',
						'2024-12-14',
						'2024-12-15',
						'2024-12-21',
						'2024-12-22',
						'2024-12-28',
						'2024-12-29',
						'2024-12-30',
						'2024-12-31',
						'2025-01-01',
						'2025-01-02',
						'2025-01-03',
						'2025-01-04',
						'2025-01-05',
						'2025-01-11',
						'2025-01-12',
						'2025-01-18',
						'2025-01-19',
						'2025-01-25',
						'2025-01-26',
						'2025-02-01',
						'2025-02-02',
						'2025-02-08',
						'2025-02-09',
						'2025-02-15',
						'2025-02-16',
						'2025-02-22',
						'2025-02-23',
						'2025-02-24',
						'2025-03-01',
						'2025-03-02',
						'2025-03-08',
						'2025-03-09',
						'2025-03-15',
						'2025-03-16',
						'2025-03-22',
						'2025-03-23',
						'2025-03-29',
						'2025-03-30',
						'2025-04-05',
						'2025-04-06',
						'2025-04-12',
						'2025-04-13',
						'2025-04-19',
						'2025-04-20',
						'2025-04-26',
						'2025-04-27',
						'2025-05-03',
						'2025-05-04',
						'2025-05-05',
						'2025-05-06',
						'2025-05-10',
						'2025-05-11',
						'2025-05-17',
						'2025-05-18',
						'2025-05-24',
						'2025-05-25',
						'2025-05-31',
						'2025-06-01',
						'2025-06-07',
						'2025-06-08',
						'2025-06-14',
						'2025-06-15',
						'2025-06-21',
						'2025-06-22',
						'2025-06-28',
						'2025-06-29',
						'2025-07-05',
						'2025-07-06',
						'2025-07-12',
						'2025-07-13',
						'2025-07-19',
						'2025-07-20',
						'2025-07-26',
						'2025-07-27',
						'2025-08-02',
						'2025-08-03',
						'2025-08-09',
						'2025-08-10',
						'2025-08-13',
						'2025-08-14',
						'2025-08-15',
						'2025-08-16',
						'2025-08-17',
						'2025-08-23',
						'2025-08-24',
						'2025-08-30',
						'2025-08-31',
						'2025-09-06',
						'2025-09-07',
						'2025-09-13',
						'2025-09-14',
						'2025-09-15',
						'2025-09-20',
						'2025-09-21',
						'2025-09-27',
						'2025-09-28',
						'2025-10-04',
						'2025-10-05',
						'2025-10-11',
						'2025-10-12',
						'2025-10-13',
						'2025-10-18',
						'2025-10-19',
						'2025-10-25',
						'2025-10-26',
						'2025-11-01',
						'2025-11-02',
						'2025-11-03',
						'2025-11-08',
						'2025-11-09',
						'2025-11-15',
						'2025-11-16',
						'2025-11-22',
						'2025-11-23',
						'2025-11-29',
						'2025-11-30',
						'2025-12-06',
						'2025-12-07',
						'2025-12-13',
						'2025-12-14',
						'2025-12-20',
						'2025-12-21',
						'2025-12-27',
						'2025-12-28',
						'2025-12-29',
						'2025-12-30',
						'2025-12-31',
						'2026-01-01',
						'2026-01-02',
						'2026-01-03',
						'2026-01-04',
						'2026-01-10',
						'2026-01-11',
						'2026-01-17',
						'2026-01-18',
						'2026-01-24',
						'2026-01-25',
						'2026-01-31',
					];
					// 製造部の休業日を設定する
					var factory_holyDay = [
						'2024-11-02',
						'2024-11-03',
						'2024-11-04',
						'2024-11-09',
						'2024-11-10',
						'2024-11-16',
						'2024-11-17',
						'2024-11-23',
						'2024-11-24',
						'2024-11-30',
						'2024-12-01',
						'2024-12-07',
						'2024-12-08',
						'2024-12-14',
						'2024-12-15',
						'2024-12-21',
						'2024-12-22',
						'2024-12-28',
						'2024-12-29',
						'2024-12-30',
						'2024-12-31',
						'2025-01-01',
						'2025-01-02',
						'2025-01-03',
						'2025-01-04',
						'2025-01-05',
						'2025-01-11',
						'2025-01-12',
						'2025-01-18',
						'2025-01-19',
						'2025-01-25',
						'2025-01-26',
						'2025-02-01',
						'2025-02-02',
						'2025-02-08',
						'2025-02-09',
						'2025-02-15',
						'2025-02-16',
						'2025-02-22',
						'2025-02-23',
						'2025-02-24',
						'2025-03-01',
						'2025-03-02',
						'2025-03-08',
						'2025-03-09',
						'2025-03-15',
						'2025-03-16',
						'2025-03-22',
						'2025-03-23',
						'2025-03-29',
						'2025-03-30',
						'2025-04-05',
						'2025-04-06',
						'2025-04-12',
						'2025-04-13',
						'2025-04-19',
						'2025-04-20',
						'2025-04-26',
						'2025-04-27',
						'2025-05-03',
						'2025-05-04',
						'2025-05-05',
						'2025-05-06',
						'2025-05-10',
						'2025-05-11',
						'2025-05-17',
						'2025-05-18',
						'2025-05-24',
						'2025-05-25',
						'2025-05-31',
						'2025-06-01',
						'2025-06-07',
						'2025-06-08',
						'2025-06-14',
						'2025-06-15',
						'2025-06-21',
						'2025-06-22',
						'2025-06-28',
						'2025-06-29',
						'2025-07-05',
						'2025-07-06',
						'2025-07-12',
						'2025-07-13',
						'2025-07-19',
						'2025-07-20',
						'2025-07-21',
						'2025-07-26',
						'2025-07-27',
						'2025-08-02',
						'2025-08-03',
						'2025-08-09',
						'2025-08-10',
						'2025-08-13',
						'2025-08-14',
						'2025-08-15',
						'2025-08-16',
						'2025-08-17',
						'2025-08-23',
						'2025-08-24',
						'2025-08-30',
						'2025-08-31',
						'2025-09-06',
						'2025-09-07',
						'2025-09-13',
						'2025-09-14',
						'2025-09-15',
						'2025-09-20',
						'2025-09-21',
						'2025-09-27',
						'2025-09-28',
						'2025-10-04',
						'2025-10-05',
						'2025-10-11',
						'2025-10-12',
						'2025-10-13',
						'2025-10-18',
						'2025-10-19',
						'2025-10-25',
						'2025-10-26',
						'2025-11-01',
						'2025-11-02',
						'2025-11-03',
						'2025-11-08',
						'2025-11-09',
						'2025-11-15',
						'2025-11-16',
						'2025-11-22',
						'2025-11-23',
						'2025-11-29',
						'2025-11-30',
						'2025-12-06',
						'2025-12-07',
						'2025-12-13',
						'2025-12-14',
						'2025-12-20',
						'2025-12-21',
						'2025-12-27',
						'2025-12-28',
						'2025-12-30',
						'2025-12-31',
						'2026-01-01',
						'2026-01-02',
						'2026-01-03',
						'2026-01-04',
						'2026-01-10',
						'2026-01-11',
						'2026-01-17',
						'2026-01-18',
						'2026-01-24',
						'2026-01-25',
						'2026-01-31',
					];

					// 佐川急便の都道府県別リードタイムを設定する
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
						// YHCの都道府県別リードタイムを設定する
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

					var arrivalDate_ary = [];
					// FSが出力するお届け希望を取得する
					$('#fs_input_expectedArrival_date option').each(function () {
						arrivalDate_ary.push($(this).val());
					});

					// console.log(arrivalDate_ary);

					let delete_days = 0; // 日付調整用
					for (let i = 0; i < delete_days; i++) {
						arrivalDate_ary.splice(1, 1);
					}

					// 最初の日付は注文日の翌日なので削除する
					// arrivalDate_ary.splice(0, 1);

					// 休日かどうかを削除する関数
					function checkHolyDay(arrivalDate_ary, leadTime, holyDay, status) {
						for (let i = 0; i < leadTime; i++) {
							if ($.inArray(arrivalDate_ary[i], holyDay) > -1) {
								// 当該日が休業日である場合の処理
								// console.log(arrivalDate_ary[i] + 'は' + status + 'が休業日');
								arrivalDate_ary[i] = '';
								leadTime++;
							} else {
								// 当該日が営業日である場合の処理
								if (status == '生産' && i == leadTime) {
									//製造部かつリードタイムによる削除が完了したら終了
									break;
								} else {
									//製造部ではなく、リードタイムによる削除が未完了の場合の処理
									// console.log(arrivalDate_ary[i] + 'を削除（' + status + 'リードタイム）');
									arrivalDate_ary[i] = '';
								}
							}
						}
						arrivalDate_ary = arrivalDate_ary.filter(Boolean);
						return arrivalDate_ary;
					}

					// お届け先住所を取得する
					var destinationAddress = $('.fs-c-checkout-destination__address__address').text().split(/\s+/);
					var expectedArrival_time_selected = $('#fs_input_expectedArrival_time').val();
					var prefArray;

					// 銀行振込の場合はリードタイムを1日追加
					if ($('#fs_input_payment_bankTransfer').prop('checked')) {
						// 支払い方法が銀行振込の場合の処理
						bankTransferLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, bankTransferLeadTime, operation_holyDay, '銀行振込');
					}

					if (optionResult == 10) {
						// console.log('通常品 + オプションなし');

						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込日');

						shippingReadyLeadTime += 2; //通常2日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// SGWのお届け時間区分を取得する
						expectedArrivalTime_SGW(expectedArrival_time_selected);

						// 佐川急便の都道府県別リードタイムを格納する
						prefArray = prefArray_SGW;
					} else if (optionResult == 11) {
						// console.log('通常品 + 組立済+玄関渡し');
						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込日');

						requestWaitingLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, requestWaitingLeadTime, operation_holyDay, '依頼待機日');

						orderRequestLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderRequestLeadTime, operation_holyDay, '組立依頼日');

						assemblyLeadTime += 5; //通常5日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, assemblyLeadTime, operation_holyDay, '組立');

						shippingReadyLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// SGWのお届け時間区分を取得する
						expectedArrivalTime_SGW(expectedArrival_time_selected);

						// 佐川急便の都道府県別リードタイムを格納する
						prefArray = prefArray_SGW;

						if (checkZipCodeResult.is_sgw_time_specified == 0) {
							// 佐川急便がお届け時間指定の対応できない場合の処理
							$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
							$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
							$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
						}
					} else if (optionResult == 12) {
						// console.log('通常品 + 組立済+搬入');

						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込日');

						requestWaitingLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, requestWaitingLeadTime, operation_holyDay, '依頼待機日');

						orderRequestLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderRequestLeadTime, operation_holyDay, '組立依頼日');

						assemblyLeadTime += 5; //通常5日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, assemblyLeadTime, operation_holyDay, '組立');

						shippingReadyLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// YHCのお届け時間区分を取得する
						checkZipCodeResult = expectedArrivalTime_YHC(checkZipCodeResult);

						// YHCの都道府県別リードタイムを格納する
						prefArray = prefArray_YHC;

						if (checkZipCodeResult.is_yhc_service_type_4 == 0 && checkZipCodeResult.is_yhc_service_type_3 == 0) {
							// YHCのと届け時間帯指定ができない場合の処理
							$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
							$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
							$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
						}
					} else if (optionResult == 20) {
						// console.log('オーダー品 + オプションなし');
						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込');

						requestWaitingLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, requestWaitingLeadTime, operation_holyDay, '依頼待機日');

						orderRequestLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderRequestLeadTime, operation_holyDay, '製造依頼');

						manufactureLeadTime += 5; //通常10日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, manufactureLeadTime, factory_holyDay, '製造');

						shippingReadyLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// SGWのお届け時間区分を取得する
						expectedArrivalTime_SGW(expectedArrival_time_selected);

						// 佐川急便の都道府県別リードタイムを格納する
						prefArray = prefArray_SGW;
					} else if (optionResult == 21) {
						// console.log('オーダー品 + 組立済+玄関渡し');
						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込');

						requestWaitingLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, requestWaitingLeadTime, operation_holyDay, '依頼待機日');

						orderRequestLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderRequestLeadTime, operation_holyDay, '組立依頼');

						manufactureLeadTime += 5; //通常10日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, manufactureLeadTime, factory_holyDay, '製造');

						assemblyLeadTime += 2; //通常2日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, assemblyLeadTime, operation_holyDay, '組立');

						shippingReadyLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// SGWのお届け時間区分を取得する
						expectedArrivalTime_SGW(expectedArrival_time_selected);

						// 佐川急便の都道府県別リードタイムを格納する
						prefArray = prefArray_SGW;

						if (checkZipCodeResult.is_sgw_time_specified == 0) {
							// 佐川急便がお届け時間指定の対応できない場合の処理
							$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
							$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
							$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
						}
					} else if (optionResult == 22) {
						// console.log('オーダー品 + 組立済+搬入');
						orderInputLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderInputLeadTime, operation_holyDay, '注文取込');

						requestWaitingLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, requestWaitingLeadTime, operation_holyDay, '依頼待機日');

						orderRequestLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, orderRequestLeadTime, operation_holyDay, '製造依頼');

						manufactureLeadTime += 5; //通常10日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, manufactureLeadTime, factory_holyDay, '製造');

						assemblyLeadTime += 2; //通常2日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, assemblyLeadTime, operation_holyDay, '組立');

						shippingReadyLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingReadyLeadTime, operation_holyDay, '出荷準備');

						shippingDateLeadTime += 1; //通常1日
						arrivalDate_ary = checkHolyDay(arrivalDate_ary, shippingDateLeadTime, operation_holyDay, '出荷日');

						// YHCのお届け時間区分を取得する
						checkZipCodeResult = expectedArrivalTime_YHC(checkZipCodeResult);

						// YHCの都道府県別リードタイムを格納する
						prefArray = prefArray_YHC;

						if (checkZipCodeResult.is_yhc_service_type_4 == 0 && checkZipCodeResult.is_yhc_service_type_3 == 0) {
							// YHCのと届け時間帯指定ができない場合の処理
							$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
							$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
							$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
						}
					}

					for (let i = 0; i < deliveryReadyLeadTime; i++) {
						if ($.inArray(arrivalDate_ary[i], operation_holyDay) > -1) {
							// console.log(arrivalDate_ary[i] + 'は運営が休業日');
							arrivalDate_ary[i] = '';
							deliveryReadyLeadTime += 1;
						} else {
							// console.log(arrivalDate_ary[i] + 'は運営が営業日だから発送');
							arrivalDate_ary[i] = '';
						}
					}

					arrivalDate_ary = arrivalDate_ary.filter(Boolean);

					// お届け先都道府県のリードタイムを取得
					var prefArray_find = prefArray.find((u) => u.pref === destinationAddress[0]);
					var deliveryLeadTime = prefArray_find.leadTime;

					for (i = 0; i < deliveryLeadTime; i++) {
						// 配送リードタイムに該当する日付を削除する
						// console.log(arrivalDate_ary[i] + 'を削除（配送リードタイム）');
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

						// アラートが表示されていなければ表示する
						if (!$('#confirmOrderAlert').length) {
							$('.fs-l-page').before('<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け希望日時が「指定なし」に変更されました</h4><p>届け先住所が変更されたため、<span class="red">お届け希望日時を再度指定</span>してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>');
						}

						// アラートのボタンをクリックされたら非表示にする
						$('.confirmOrderAlert-button').on('click', function () {
							$('#confirmOrderAlert').remove();
							noTimeSpecifiedZipCodes_result = undefined;
						});
					}
					checkAddressRetention = checkAddress;
				}

				//支払い方法が他の決裁方法から銀行振込に指定された場合にお届け希望日をリセットする
				checkPayment = $('.fs-c-checkout-paymentMethodList input:checked').val();
				var deliveryTime = $('.fs-c-checkout-delivery__method__deliveryTime').next('dd').text();
				var deliveryDate = $('.fs-c-checkout-delivery__method__deliveryDate').next('dd').text();

				if (checkPaymentRetention == '' || checkPaymentRetention == undefined) {
					checkPaymentRetention = checkPayment;
				} else if (checkPaymentRetention != checkPayment) {
					if (deliveryTime != '指定なし' || deliveryDate != '指定なし') {
						if (checkPayment == 'BANK_TRANSFER') {
							// console.log('optionResult.result1:', optionResult.result1);
							// console.log('optionResult.result2:', optionResult.result2);
							var sizeOrderArray = [];
							$('.fs-c-listedProductName__name').each(function () {
								sizeOrderArray.push($(this).text());
							});
							// console.log('sizeOrderArray:', sizeOrderArray);
							var checkSizeOrder = sizeOrderArray.find((value) => value.match(/(サイズオーダー|受注生産)/g));
							// console.log('checkSizeOrder', checkSizeOrder);
							if (checkPaymentRetention != checkPayment) {
								// お届け希望日をリセットする
								if (checkSizeOrder == undefined) {
									if ((check_adis_result.result1 == -1 && check_adis_result.result2 == -1) || check_adis_result.result1 == undefined || check_adis_result.result2 == undefined) {
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
										if (!$('#confirmOrderAlert').length) {
											$('.fs-l-page').before(
												'<div id="confirmOrderAlert"><div id="confirmOrderAlert-inner"><h4>お届け希望日時が「指定なし」に変更されました</h4><p>お支払い方法が銀行振込に変更されたため、<span class="red">お届け希望日時を再度指定</span>してください。</p><div class="confirmOrderAlert-button"><span>OK</span></div></div></div>'
											);
										}
										$('.confirmOrderAlert-button').on('click', function () {
											$('#confirmOrderAlert').remove();
											noTimeSpecifiedZipCodes_result = undefined;
										});
									}
								}
							}
						}
						checkPaymentRetention = checkPayment;
					}
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

/* expectedArrivalTime_control
// 佐川急便やYHCそれぞれのお届け時間帯を表示するための関数
========================================================================== */
function expectedArrivalTime_SGW(expectedArrival_time_selected) {
	var expectedArrival_time_html = '<option value="2">12:00～14:00</option><option value="3">14:00～16:00</option><option value="4">16:00～18:00</option><option value="5">18:00～21:00</option>';
	$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_html + '</select>');
	$('#fs_input_expectedArrival_time option[value="' + expectedArrival_time_selected + '"]').prop('selected', true);
}

function expectedArrivalTime_YHC(checkZipCodeResult) {
	var selected = $('#fs_input_expectedArrival_time').val();

	if (checkZipCodeResult.is_yhc_service_type_4 == 1) {
		// YHCのお届け指定区分が4区分の場合の処理
		var expectedArrival_time_type4_html = '<option value="6">12:00〜15:00</option><option value="7">15:00〜18:00</option><option value="8">18:00〜21:00</option>';
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_type4_html + '</select>');
		$('#fs_input_expectedArrival_time option[value="' + selected + '"]').prop('selected', true);
	} else if (checkZipCodeResult.is_yhc_service_type_3 == 1) {
		// YHCのお届け指定区分が3区分の場合の処理
		var expectedArrival_time_type3_html = '<option value="9">12:00〜18:00</option><option value="8">18:00〜21:00</option>';
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu"><option value="none" selected="selected">指定なし</option><option value="1">午前中</option>' + expectedArrival_time_type3_html + '</select>');
		$('#fs_input_expectedArrival_time option[value="' + selected + '"]').prop('selected', true);
	} else {
		// YHCのお届け指定区分が3と4区分以外の場合の処理
		$('#fs_input_expectedArrival_time').replaceWith('<select name="time" id="fs_input_expectedArrival_time" class="fs-c-dropdown__menu" disabled><option value="none" selected="selected">指定なし</option></select>');
		$('.fs-c-checkout-deliveryMethod__deliveryTime label').html('お届け時間帯 <span class="red">このお届け先は時間をご指定いただけません</span>');
		$('#fs_input_expectedArrival_time option[value="none"]').prop('selected', true);
	}

	return checkZipCodeResult;
}

/* check_option
// 商品名からサイズオーダーまたは受注生産品かどうかを判定し、その判定とオプションの有無によってコードを設定する関数
========================================================================== */
var check_option_result = [];

function check_option() {
	$('.fs-c-cartTable__productInfo').each(function () {
		// 商品名のテキストを取得
		var product_name = $(this).find('.fs-c-listedProductName__name').text();
		// 判定
		if (product_name.match(/サイズオーダー|受注生産/)) {
			// サイズオーダーまたは受注生産品の場合の処理
			$.cookie('is_sizeOrder', 1);
			$(this)
				.find('.fs-c-listedOptionPrice__option__value')
				.each(function () {
					var option_name = $(this).text().trim();
					if (option_name.includes('組立済+玄関渡し')) {
						// 組立済+玄関渡しの場合の処理
						check_option_result.push('21');
					} else if (option_name.includes('組立済+搬入')) {
						// 組立済+搬入の場合の処理
						check_option_result.push('22');
					} else {
						// 組立サービスが設定されていない場合の処理
						check_option_result.push('20');
					}
				});
		} else {
			// サイズオーダーまたは受注生産品以外の場合の処理
			if ($('.fs-c-listedOptionPrice__option__value').length) {
				$(this)
					.find('.fs-c-listedOptionPrice__option__value')
					.each(function () {
						var option_name = $(this).text().trim();
						if (option_name.includes('組立済+玄関渡し')) {
							// 組立済+玄関渡しの場合の処理
							check_option_result.push('11');
						} else if (option_name.includes('組立済+搬入')) {
							// 組立済+搬入の場合の処理
							check_option_result.push('12');
						} else {
							// 組立サービスが設定されていない場合の処理
							check_option_result.push('10');
						}
					});
			} else {
				check_option_result.push('10');
			}
		}
	});
	// コードの最大値を取得し値を返す
	const check_result = Math.max(...check_option_result);
	return check_result;
}

/* check_option
// 組立サービスの種類によって判定結果を返すための関数
========================================================================== */
function check_adis() {
	var optionArray = [];
	$('.fs-c-listedOptionPrice__option__value').each(function () {
		optionArray.push($(this).text());
	});
	if (optionArray.length == 0) {
		// 組立サービスがない場合の処理
		return false;
	} else {
		// 組立サービスがある場合の処理
		var result1 = $.inArray('組立済+玄関渡し', optionArray);
		var result2 = $.inArray('組立済+搬入', optionArray);
		return { result1: result1, result2: result2 };
	}
}
