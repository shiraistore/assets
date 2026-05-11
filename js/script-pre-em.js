$(function () {
	pre_emfot_select();
	displayEstimatedDeliveryDate();
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
