$(function () {
    addCart();
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

    // ▼ 追加：配列を指定した数（例：50個）ずつ分割する
    const CHUNK_SIZE = 50; 
    const chunkedSkus = [];
    for (let i = 0; i < skuListForApi.length; i += CHUNK_SIZE) {
        chunkedSkus.push(skuListForApi.slice(i, i + CHUNK_SIZE));
    }

    // ▼ 追加：分割した配列ごとにajaxリクエストを作成し、Promiseの配列にする
    const ajaxPromises = chunkedSkus.map(chunk => {
        return $.ajax({
            url: 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_product_list_add_data',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            processData: false,
            headers: { 'Accept': 'application/json' },
            data: JSON.stringify({ skus: chunk })
        });
    });

    // ▼ 追加：全てのリクエストが完了するのを待つ (Promise.all)
    Promise.all(ajaxPromises).then(responses => {
        let allItems = [];

        // 複数のレスポンスを1つの配列 (allItems) に結合する
        responses.forEach(raw => {
            let resp;
            try {
                resp = parseApiJson(raw);
            } catch (e) {
                console.error('API response JSON parse failed:', e, raw);
                return; // このチャンクがエラーでも他のチャンクは処理を続行
            }

            let items = [];
            if (resp && Array.isArray(resp.items)) {
                items = resp.items;
            } else if (resp && Array.isArray(resp.data)) {
                items = resp.data;
            } else if (resp && Array.isArray(resp.result)) {
                items = resp.result;
            }
            // 取得したアイテムを結合
            allItems = allItems.concat(items);
        });

        // 結合したデータをもとに SKUをキーにしたオブジェクトを作成
        const bySku = {};
        allItems.forEach(it => {
            if (it && it.sku_no) bySku[String(it.sku_no).toLowerCase()] = it;
        });

        // ▼ 追加：画像サイズのパラメータ対照表
        const imageSizeParams = {
            'xs': '?size=xs&w=MTAw',
            's': '?size=s&w=MjAw',
            'm': '?size=m&w=NDAw',
            'l': '?size=l&w=ODAw',
            'xl': '?size=xl&w=MTIwMA',
            'xxl': '?size=xxl&w=MTYwMA'
        };

        // 描画処理
        $('.addToCart').each(function () {
            const $wrap = $(this);
            const skuRaw = $wrap.data('products');
            const specifiedName = $wrap.data('specifiedname');
            const productImage = Number($wrap.data('image')) || 1;
            const productImageSize = String($wrap.data('imagesize') || 'm').toLowerCase(); // デフォルトをmに設定
            if (!skuRaw) return;

            const result = bySku[String(skuRaw).toLowerCase()];
            if (!result) return;

            const sku_no = String(result.sku_no);
            const productNumber = sku_no.toUpperCase();
            const productId = Number(result.id);
            let productName = String(result.name || '');
            const sellingPrice = Number(result.selling_price || 0);
            const normalPrice = Number(result.normal_price || 0);
            const thumbnail = Number(result.thumbnail_number || productImage);

            let seriesCode = sku_no.slice(0, 3);
            if (seriesCode === 'TL1' || seriesCode === 'TL2' || seriesCode === 'TL3') seriesCode = 'tl';
            else if (seriesCode === 'ONA' || seriesCode === 'OBK') seriesCode = 'of2';
            else if (seriesCode === 'GBP') seriesCode = 'gbt';

            const url = '/c/series/' + seriesCode.toLowerCase() + '/' + sku_no.toLowerCase();

            if (specifiedName && String(specifiedName).trim() !== '') {
                productName = String(specifiedName);
            }

            let priceText = '';
            if (sellingPrice > 0 && normalPrice > 0 && sellingPrice < normalPrice) {
                priceText = '<span><span>Price: </span><span class="normalPrice">¥' + normalPrice.toLocaleString() + '</span><span class="tax">（税込）</span></span>' +
                    '<span><span class="mark-sale">SALE</span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '</span><span class="tax">（税込）</span></span>';
            } else if (sellingPrice > 0) {
                priceText = '<span><span>Price: </span><span class="sellingPrice">¥' + sellingPrice.toLocaleString() + '</span><span class="tax">（税込）</span></span>';
            }

            if (!Number.isFinite(productId)) return;
            const productId_Len12 = ('000000000000' + productId).slice(-12);
            const productId_Len3 = ('000' + Math.floor(productId / 100)).slice(-3);
            const productImageNumber = ('00' + (thumbnail || productImage)).slice(-2);
            
            // ▼ 変更：対照表からパラメータを取得（設定がない、またはtypo等の場合はmサイズをデフォルトとする）
            const sizeQuery = imageSizeParams[productImageSize] || '?size=m&w=NDAw';

            // ▼ 変更：URLの末尾にsizeQueryを結合
            const imgSrc = 'https://shiraistore.itembox.cloud/product/' +
                productId_Len3 + '/' + productId_Len12 + '/' +
                productId_Len12 + '-' + productImageNumber + '.jpg' + sizeQuery;

            const image = '<img src="' + imgSrc + '">';
            const inner =
                '<form action="https://shirai-store.net/p/cart/add" method="post" target="_blank">' +
                '<h5 class="productName">' + productName + '</h5>' +
                '<p class="productPrice">' + priceText + '</p>' +
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
                '<div class=""><a target="_blank" href="' + url + '">商品詳細を見る</a></div>';

            $wrap.find('.addToCartImage').empty().prepend(image);
            $wrap.find('.addToCartInner').empty().prepend(inner);
        });

        $('.quantitySelect').on('change', function () {
            const val = $(this).val();
            $(this).closest('.cartBlock').find('.quantityInput').val(val);
        });

    }).catch(function (err) {
        // Promise.all内でどれか一つでも通信自体が失敗した場合のエラーハンドリング
        console.error('get_product_list_add_data API network error:', err);
    });
}
