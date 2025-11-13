$(function () {
  featurePts();
});

/* タブ作成（そのまま） */
jQuery(function($){
  $('.tab').click(function(){
    $('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    $('.is-show').removeClass('is-show');
    const index = $(this).index();
    $('.panel').eq(index).addClass('is-show');
  });
});

/* 安全パーサ（BOM/コメント/末尾カンマ対応） */
function parseApiJson(raw) {
  if (typeof raw !== 'string') return raw;
  let s = raw.trim();
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  s = s.replace(/\/\/[^\n\r]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  s = s.replace(/,\s*(?=[}\]])/g, '');
  return JSON.parse(s);
}

function featurePts() {
  // 1) ページ内にあるSKUを全て集めてAPIリクエスト用に整形・重複除去
  const skuSet = new Set();

  $('.addToCart').each(function(){
    const v = $(this).data('products');
    if (v != null && String(v).trim() !== '') skuSet.add(String(v).trim().toUpperCase());
  });

  $('.addToCart-multiple').each(function(){
    const list = String($(this).data('products') || '').split(',');
    list.forEach(s => {
      const v = String(s || '').trim();
      if (v) skuSet.add(v.toUpperCase());
    });
  });

  const skuList = Array.from(skuSet);
  if (skuList.length === 0) return;

  // 2) API呼び出し（POST）
  $.ajax({
    url: 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_list_add_data',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'text',
    processData: false,
    headers: { 'Accept': 'application/json' },
    data: JSON.stringify({ skus: skuList })
  }).done(function(raw){
    let resp;
    try {
      resp = parseApiJson(raw);
    } catch (e) {
      console.error('API response JSON parse failed:', e, raw);
      return;
    }

    // 3) レスポンス正規化
    const items = Array.isArray(resp?.items) ? resp.items
                : Array.isArray(resp?.data)  ? resp.data
                : Array.isArray(resp?.result)? resp.result
                : [];

    // sku_no 小文字 → データ のマップ
    const bySku = {};
    items.forEach(it => {
      if (it && it.sku_no) bySku[String(it.sku_no).toLowerCase()] = it;
    });

    // 4) 単品カートブロックの描画
    $('.addToCart').each(function(){
      const $wrap = $(this);
      const product = $wrap.data('products');                 // 小文字SKU想定の既存HTMLでもOKにする
      const specifiedName = $wrap.data('specifiedname');
      const productImage = Number($wrap.data('image')) || 1;
      const productImageSize = String($wrap.data('imagesize') || 's');

      if (!product) return;
      const result = bySku[String(product).toLowerCase()];
      if (!result) return;

      const sku_no = String(result.sku_no || product);
      const productNumber = sku_no.toUpperCase();
      const productId = Number(result.id);
      let productName = String(result.name || '');
      let sellingPrice = Number(result.selling_price || 0);
      let normalPrice  = Number(result.normal_price  || 0);
      const thumbnail  = Number(result.thumbnail_number || productImage);
      const seriesCode = sku_no.slice(0,3);
      const url = '/c/series/' + seriesCode.toLowerCase() + '/' + sku_no.toLowerCase();

      if (specifiedName && String(specifiedName).trim() !== '') {
        productName = String(specifiedName);
      }

      let priceText = '';
      if (sellingPrice > 0 && normalPrice > 0 && sellingPrice < normalPrice) {
        priceText =
          '<span class="mark-sale">SALE</span>' +
          '<span class="normalPrice">¥' + normalPrice.toLocaleString() + '（税込）</span>' +
          '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
      } else if (sellingPrice > 0) {
        priceText =
          '<span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>';
      }

      if (!Number.isFinite(productId)) return;
      const productId_Len12 = ('000000000000' + productId).slice(-12);
      const productId_Len3  = ('000' + Math.floor(productId / 100)).slice(-3);
      const productImageNumber = ('00' + (thumbnail || productImage)).slice(-2);
      const imgSrc = 'https://shiraistore.itembox.design/product/' +
                     productId_Len3 + '/' + productId_Len12 + '/' +
                     productId_Len12 + '-' + productImageNumber + '-' + productImageSize + '.jpg';

      $wrap.find('.addToCartImage').empty().prepend('<img src="' + imgSrc + '">');

      const inner =
        '<form action="https://shirai-store.net/p/cart/add" method="post">' +
          '<h5 class="productName">' + productName + '</h5>' +
          '<p class="productPrice"><span>price</span>' + priceText + '</p>' +
          '<input type="hidden" name="products[' + productNumber + '].productNo" value="' + productNumber + '">' +
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
        '<div class=""><a href="' + url + '">商品詳細を見る</a></div>';

      $wrap.find('.addToCartInner').empty().prepend(inner);
    });

    // 5) 複数カートブロックの描画（合計金額表示 & 代表画像表示）
    $('.addToCart-multiple').each(function(){
      const $wrap = $(this);
      const products = String($wrap.data('products') || '');
      const quantity = String($wrap.data('quantity') || '');
      const productImage = Number($wrap.data('image')) || 1;
      const productImageSize = String($wrap.data('imagesize') || 's');

      const products_ary = products.split(',').map(s => String(s || '').trim()).filter(Boolean);
      const quantity_ary = quantity.split(',').map(s => Number(String(s || '1').trim()) || 1);

      let totalSellingPrice = 0;
      let totalNormalPrice = 0;
      let representativeImgSrc = '';

      products_ary.forEach((skuRaw, idx) => {
        const it = bySku[String(skuRaw).toLowerCase()];
        if (!it) return;

        const q = quantity_ary[idx] ?? 1;
        const selling = Number(it.selling_price || 0) * q;
        const normal  = Number(it.normal_price  || 0) * q;

        totalSellingPrice += selling;
        totalNormalPrice  += normal;

        // 代表画像（最初に見つかった商品を使用）
        if (!representativeImgSrc && Number.isFinite(Number(it.id))) {
          const pid = Number(it.id);
          const pid12 = ('000000000000' + pid).slice(-12);
          const pid3  = ('000' + Math.floor(pid / 100)).slice(-3);
          const thumbNo = ('00' + (Number(it.thumbnail_number || productImage) || 1)).slice(-2);
          representativeImgSrc = 'https://shiraistore.itembox.design/product/' +
                                 pid3 + '/' + pid12 + '/' + pid12 + '-' + thumbNo + '-' + productImageSize + '.jpg';
        }
      });

      let priceText = '';
      if (totalSellingPrice > 0 && totalNormalPrice > 0 && totalSellingPrice < totalNormalPrice) {
        priceText =
          '<p class="productPrice"><span>price</span>' +
          '<span class="mark-sale">SALE</span>' +
          '<span class="normalPrice">¥' + totalNormalPrice.toLocaleString() + '<span class="tax">（税込）</span></span>' +
          '<span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>' +
          '</p>';
      } else if (totalSellingPrice > 0) {
        priceText =
          '<p class="productPrice"><span>price</span>' +
          '<span class="sellingPrice">¥' + totalSellingPrice.toLocaleString() + '<span class="tax">（税込）</span></span>' +
          '</p>';
      }

      if (representativeImgSrc) {
        $wrap.find('.addToCartImage').empty().prepend('<img src="' + representativeImgSrc + '">');
      }
      $wrap.find('.addToCartInner').prepend(priceText);
    });

    // （必要あれば数量セレクトのイベントを追加）
    $('.quantitySelect').off('change').on('change', function(){
      const val = $(this).val();
      $(this).closest('.cartBlock').find('.quantityInput').val(val);
    });

  }).fail(function(xhr, status, err){
    console.error('get_product_list_add_data API error:', status, err, xhr && xhr.responseText);
  });
}
