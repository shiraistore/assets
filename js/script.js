$(function () {
    previewModeDecision();//OK
    rewriteDOM();//OK
    globalNavi();//javaScriptParts
    smoothScroll();//javaScriptParts
    slideToggleButton();//javaScriptParts
    birthdayYearDefaultSelected();//javaScriptParts
    calendar();//javaScriptParts
    topMainVisualSlider_imageChange();//javaScriptParts
    imageChange();//javaScriptParts
    cartRegistBranch();//javaScriptParts
    ADIS_discriptionOpenClose();//OK
    magazineImageChange();//OK
    faqAnswerOpen();//OK
    timeSale();//OK
    product_tagsLink();//OK
    searchWordSave('keyword');//OK
    searchTagTitle('tag');//OK
    productSortSelect();//OK
    productCategoryRankingDisplayNone();//OK
    productCategorySubCategoryMenu();//OK
    productVariation();//OK
    productSizeVariation();//OK
    productDetailSeriesLink();//OK
    productDetail_tnlListTableLink();
    productDetail_mhpContentsBanner();
    reviewSlideDown('#fs_ProductDetails', '240');//OK
    instagramPostList();//OK
    soldout();//OK
    tnl_em_introduction();
    tnl_em_select();
    tnl_emu_select();
    tnl_emts_select();
    featureMamihapiSeries_slider();//OK
    featureMamihapiSeries_cart();//OK
    featureMamihapibyage_slider();//OK
    featureMamihapiByage_cart();//OK
    productListAddData();//OK
    productDetailAddData();//OK
    multipleReviewList();//OK
    recommendTop10();//OK
    searchFilterTnl();//OK
    var grobal_rakingTop10Type = $('.productTop10Slider.ranking').data('ranking');
    //console.log('grobal_rakingTop10Type:',grobal_rakingTop10Type);
    if (grobal_rakingTop10Type) {
        var grobal_page = getParam('page');
        //console.log('grobal_page:',grobal_page);
        if (grobal_page == 1 || grobal_page == null) {
            if ($('#fs_CustomPage').length) {
                rankingTop10();//OK
            } else {
                rankingTop10(grobal_rakingTop10Type);//OK
            }
        } else {
            $('.productTop10Slider').remove();
        }
    }
    var grobal_recommendRankingPathName = location.pathname;
    if (grobal_recommendRankingPathName.indexOf('recommend') > 0) {
        recommendList();//OK
    }
    if (grobal_recommendRankingPathName.match(/ranking/g)) {
        rankingList(grobal_recommendRankingPathName.split('/').pop());//OK
    }
    var grobal_selectRankingHTML = '<select name="ranking"><option value="ranking">総合ランキング</option><option value="ranking_rack">本棚・フリーラック</option><option value="ranking_tv-stand">テレビ台・ローボード</option><option value="ranking_kitchen">キッチン収納</option><option value="ranking_clothing">衣類収納</option><option value="ranking_entrance">玄関収納</option><option value="ranking_cabinet">キャビネット・収納庫</option><option value="ranking_wall-unit-storage">壁面収納・システム収納</option><option value="ranking_table">テーブル</option><option value="ranking_desk">デスク</option><option value="ranking_kids">キッズ収納</option><option value="ranking_office-furniture">オフィス家具</option></select>';
    $('.selectRanking').each(function () {
        $(this).html(grobal_selectRankingHTML);
    });
    var grobal_recommendRankingPathName = location.pathname;
    $('.selectRanking').each(function () {
        $(this).find('select').val(grobal_recommendRankingPathName.split('/').pop());
    });
    $('.selectRanking select[name=ranking]').change(function () {
        if ($(this).val() != '') {
            window.location.href = $(this).val();
        }
    });

    topMainVisualSlider();//OK
    rewriteDOMLoad();//OK
    reviewAssistText();//OK
    ie11_compulsionScroll();//javaScriptParts
    sp_searchOpen();//javaScriptParts
    windowWidthprocessingChange();//javaScriptParts
    windowWidthDOMChange();//javaScriptParts
});

$(window).on('load', function () {
    pinterestTagWrite();//OK
});

grobal_lastInnerWidth = document.body.clientWidth;

var delayStart;
var delayTime = 200;

$(window).on('resize', function () {
    if (grobal_lastInnerWidth != document.body.clientWidth) {
        grobal_lastInnerWidth = document.body.clientWidth;
        windowWidthDOMChange();//javaScriptParts
        searchOpen();//javaScriptParts
    }

    clearTimeout(delayStart);
    delayStart = setTimeout(function () {
        topMainVisualSlider_imageChange();//javaScriptParts
        imageChange();//javaScriptParts
    }, delayTime);

    checkScreenSize();//OK
});

$(window).on('load scroll', function () {
    slideNaviResizeHeight();//javaScriptParts
});

/* ========== OK end ========== */

/* previewMode
========================================================================== */
function previewModeDecision() {
    if ($('#fs_preview_header').length) {
        $('body').addClass('previewMode');
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
        var html = '<div id="seriesLink"><a href="' + categoryURL + '" class="mb-16">「' + categoryName + '」一覧を見る</a></div>';

        $('#productActionBox').after(html);
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
            var html = '<ul id="contents-banner"><li><a href="/f/feature/mamihapi-byage"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-mamihapi-byage.png"></a></li><li><a href="/f/feature/mamihapi-questionnaire"><img src="https://shiraistore.itembox.design/item/src/gNav-banner-mamihapi-questionnaire.png"></a></li></ul>';

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

        var className = '.data-catgory-area' + categoryNum + ' ul';
        //console.log(className);

        var html = $(className).prop('outerHTML');
        //console.log(html);

        $('.category-subCategory-menu').each(function () {
            $(this).find('.category-subCategory-menuTitle').after(html);
        });


        $('.category-subCategory-menu').css('display', 'block');
    }
}

/* top mainVisual slider
   ========================================================================== */

function topMainVisualSlider() {
    if ($('#fs_Top').length) {
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
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    if (results != "") $('header .fs-p-searchForm__input').val(decodeURIComponent(results[2].replace(/\+/g, ' ')));
};

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
            display.text(selectedItem)
        });
    });
}

/* Search tag title
========================================================================== */
//セール会場用バナー表示
function searchTagTitle(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    if (results[2] == 'sale20220324-20220421') {
        if (results != "") {
            $('#fs_ProductSearch h1').html('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-sale20220324-20220421_1184x240.jpg" alt="新生活応援セール 第2弾 対象商品"><br>新生活応援セール 第2弾 対象商品');
            $('.fs-c-breadcrumb__listItem:last-child').text('新生活応援セール 第2弾 対象商品');
            $('title').text('新生活応援セール 第2弾 対象商品');
        }
    } else if (results[2] == 'feature20220224') {
        if (results != "") {
            $('#fs_ProductSearch h1').html('<img src="https://shiraistore.itembox.design/item/src/featurePage-banner-feature20220224_1184x240.jpg" alt="入園入学の準備"><br>入園入学の準備');
            $('.fs-c-breadcrumb__listItem:last-child').text('入園入学の準備');
            $('title').text('入園入学の準備');
        }
    } else if (results[2] == 'sale20220224-20220324') {
        if (results != "") {
            $('#fs_ProductSearch h1').html('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-sale20220224-20220324_1184x240.jpg" alt="新生活応援セール 第1弾 対象商品"><br>新生活応援セール 第1弾 対象商品');
            $('.fs-c-breadcrumb__listItem:last-child').text('新生活応援セール 第1弾 対象商品');
            $('title').text('新生活応援セール 第1弾 対象商品');

            /*
            console.log('XXXX');

            var param = decodeURIComponent(location.search).replace('?', '');
            params = param.split(/\+|=|&/);
            //console.log(params);
            $('.fs-c-productList__list').before('<div id="productSearchBox" class="tnl"><h4>サイズで絞り込む</h4><select id="tnl-width"><option value="">横幅</option><option value="幅31cm">幅31cm</option><option value="幅44cm">幅44cm</option><option value="幅59cm">幅59cm</option><option value="幅87cm">幅87cm</option><option value="幅117cm">幅117cm</option></select><select id="tnl-height"><option value="">高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option><option value="高さ120cm">高さ120cm</option><option value="高さ150cm">高さ150cm</option><option value="高さ180cm">高さ180cm</option><option value="高さ198cm">高さ198cm</option></select><button>絞り込む</button></div>');

            var selectedWidth = '',
                selectedHeight = '';

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

            $('#productSearchBox.tnl #tnl-width').val(selectedWidth);
            $('#productSearchBox.tnl #tnl-height').val(selectedHeight);

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
                    type = '';
                if (width) {
                    type = '+' + width;
                }
                if (height) {
                    type = type + '+' + height;
                }
                window.location.href = 'https://shirai-store.net/p/search?tag=sale20211028-20211111&keyword=%E3%82%BF%E3%83%8A%E3%83%AA%E3%82%AA' + type + '&sort=price_low';

            });
            */


        }
    } else if (results[2] == 'outlet') {
        if (results != "") {
            $('#fs_ProductSearch h1').html('<img src="https://shiraistore.itembox.design/item/src/salePage-banner-outlet_1184x240.jpg" alt="アウトレット 対象商品"><br>アウトレット 対象商品');
            $('.fs-c-breadcrumb__listItem:last-child').text('アウトレット 対象商品');
            $('title').text('アウトレット 対象商品');
            $('h1.fs-c-heading').after('<div id="outlet-description"><h3>アウトレットについて</h3><ul><li>廃番商品をアウトレット品として特別価格でご提供しております。お届けする商品はすべて新品です。</li><li>アウトレット品は在庫限りとなっております。商品の品質には万全を期しておりますが、万が一、返品交換の対象となった場合に交換品がご用意できない場合がございます。その際は返金にて対応させていただきます。</li><li>アウトレット品は組立サービス対象外となっております。</li><li>ストア会員様は通常商品と同様に、商品割引クーポンと送料無料クーポンをお使いいただけます。</li></ul></div>');
        }
    } else if (results[2] == 'bundle20210121-0218') {
        var newWindowWidth = $(window).width();
        if (newWindowWidth > 480) {
            if (results != "") $('#fs_ProductSearch h1').html('トルフラット まとめ割<span class="subTitle">2点以上お買い上げで15%OFF</span>');
        } else {
            if (results != "") $('#fs_ProductSearch h1').html('トルフラット まとめ割<span class="subTitle">2点以上お買い上げで15%OFF</span>');
        }
        $('.fs-c-breadcrumb__listItem:last-child').text('トルフラット まとめ割 15%OFF');
    } else {
        if (results != "") $('#fs_ProductSearch h1').text('#' + decodeURIComponent(results[2].replace(/\+/g, " ")) + ' 検索結果');
    }
};

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
        //console.log('A');
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
            $('#product-tagList').append('<a href="/p/search?tag=' + encodeURIComponent(value) + '">' + value + '</a>');
        });
    }
}

/* productVariation
========================================================================== */
function productVariation() {
    if ($('#fs_ProductDetails').length) {
        if ($('#product-comment_5').html() != "") {
            var url = $('link[rel="canonical"]').attr('href');
            //console.log(url)
            var variation_text = $('#product-comment_5').text().split(',');
            var variation_ary = [];
            var htmlSource = '';
            for (i = 0; variation_text.length > i; i++) {
                variation_ary.push(variation_text[i].split('/'));
            }
            var productCode = variation_ary[0][0];
            var colorName = variation_ary[0][1];
            //htmlSource = '';
            var url_split = url.split('/');
            url = url.replace(url_split[url_split.length - 1], '');

            for (i = 0; variation_ary.length > i; i++) {
                var productCode = variation_ary[i][0];
                var colorName = variation_ary[i][1];
                htmlSource = htmlSource + '<li data-productcode="' + productCode + '"><a href="' + url + productCode + '"><img src="https://shiraistore.itembox.design/item/src/product_variation/' + productCode + '.jpg" alt=""><span>' + colorName + '</span></a></li>';
            }
            //$('#product-comment_5').html('<h4>カラー：' + variation_ary[0][1] + '</h4><ul>' + htmlSource + '</ul>');
            $('#product-comment_5').html('<h4>カラー</h4><ul>' + htmlSource + '</ul>');

            $('#product-comment_5').css('display', 'block')

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
        if ($('#product-comment_9').html() != "") {
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

            for (i = 0; variation_ary.length > i; i++) {
                var productCode = variation_ary[i][0];
                var colorName = variation_ary[i][1];
                var activeFlag = '';
                if (url_split.slice(-1)[0] == productCode) {
                    activeFlag = 'active';
                }
                htmlSource = htmlSource + '<li data-productcode="' + productCode + '" class="' + activeFlag + '"><span class="variationItem"><span>' + colorName + '</span></span></li>';
            }
            $('#product-comment_9').html('<h4>サイズ</h4><ul>' + htmlSource + '</ul>');
            $('#product-comment_9').css('display', 'block')
            var url_split = url.split('/');
            //console.log(url_split.slice(-1)[0]);
            url = url.replace(url_split[url_split.length - 1], '');
            $('#product-comment_9 > ul > li').on('click', function () {
                if (url_split.slice(-1)[0] != $(this).data('productcode')) {
                    window.location.href = url + $(this).data('productcode');
                }
            });
        }
    }
    //}
};

/* reviewSlideDown
========================================================================== */

function reviewSlideDown(id, cssHeight) {
    if ($(id).length) {
        var i = 0;
        $('.fs-c-reviewList__item').each(function () {

            sHeight = $('.fs-c-reviewList__item').get(i).scrollHeight;// 隠れているテキストの高さ
            oHeight = $('.fs-c-reviewList__item').get(i).offsetHeight;// 表示されているテキストの高さ
            hiddenDiff = sHeight - oHeight;

            if (hiddenDiff > 0) {
                $(this).append('<div class="readMore" >続きを見る</div>')
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

            $(this).parent('.fs-c-reviewList__item').css({ 'max-height': 'inherit', 'height': cssHeight + 'px' });
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
                modal_addContent(instagramPostData, thumbnail_url, $(this));
            });

            $('.modal-ctr-open').on('click', function () {
                if (!$(this).hasClass('disable')) {
                    $('.modal-content_inner').fadeOut(0);
                    modal_addContent(instagramPostData, thumbnail_url, $(this));
                    $('.modal-content_inner').fadeIn(300);
                }
            });
            modal();
        });
    }

    function modal_addContent(instagramPostData, thumbnail_url, element) {
        var id = element.data('postid');

        var target = instagramPostData.filter(function (object) {
            return object.postId == id
        }).shift()

        var thumbnail_url = target.thumbnail_url;
        var author_name = target.author_name;
        var modalHtml = '<div id="imageBox"><a href="https://www.instagram.com/p/' + id + '/" target="_blank"><img width="320" data-src="' + thumbnail_url + '" src="https://shiraistore.itembox.design/item/src/loading.svg" id="thumbnail" class="lazyload" alt="instagramPost_' + id + '"></a><span id="author"><img src="https://shiraistore.itembox.design/item/src/icon-instagram-gr.svg" width="16"><span>Photo by</span><a href=https://www.instagram.com/' + author_name + ' target="_blank">' + author_name + '</a></span></div>';

        var modalProductHtml = '';
        for (var i = 0; target.relatedProduct.length > i; i++) {
            //console.log('i:',i)
            var productUrl = target.relatedProduct[i].productUrl;
            var productId = target.relatedProduct[i].productId;
            var productId_12Len = zeroPadding(target.relatedProduct[i].productId, 12);
            var item_image_group = Math.floor(productId / 100)
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
                averageRating = "0";
                //console.log(averageRating)
            } else if (averageRating < 1.0) {
                averageRating = "0.5";
            } else if (averageRating < 1.5) {
                averageRating = "1.0";
            } else if (averageRating < 2.0) {
                averageRating = "1.5";
            } else if (averageRating < 2.5) {
                averageRating = "2.0";
            } else if (averageRating < 3.0) {
                averageRating = "2.5";
            } else if (averageRating < 3.5) {
                averageRating = "3.0";
            } else if (averageRating < 4.0) {
                averageRating = "3.5";
            } else if (averageRating < 4.5) {
                averageRating = "4.0";
            } else if (averageRating < 5) {
                averageRating = "4.5";
            } else if (averageRating == 5) {
                averageRating = "5.0";
            }

            var averageRating_html = '';
            if (reviewCount != 0) {
                averageRating_html = '<span class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + averageRating + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '" class="itemReviewCount">（' + reviewCount + '）</a></span>';
            }

            sellingPrice = String(sellingPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            normalPrice = String(normalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

            if (sellingPrice < normalPrice) {
                var price_html = '<span class="itemNormalPrice itemPrice">¥ ' + normalPrice + '<span class="tax">(税込)</span></span><span class="itemSalePrice itemPrice"><span class="sale">特別価格</span> ¥ ' + sellingPrice + '<span class="tax">(税込)</span></span>'
            } else {
                var price_html = '<span class="itemPrice">¥ ' + sellingPrice + '<span class="tax">(税込)</span></span>'
            }

            modalProductHtml = modalProductHtml + '<li class="relatedProductItem"><a href="https://shirai-store.net/c/series/' + seriesCode + '/' + productUrl + '"><img data-src="' + 'https://shiraistore.itembox.design/product/' + zeroPadding(item_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbNumber + '-s.jpg" alt="instagramPost_' + id + ' ' + productName + '" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazyload"></a><p><a href="https://shirai-store.net/c/series/' + seriesCode + '/' + productUrl + '" class="itemName">' + productName + '</a>' + icon_html + averageRating_html + price_html + '</li>'

        }


        modalHtml = modalHtml + '<ul id="relatedProductList">' + modalProductHtml + '</ul>';

        $('.modal-content_inner').html(modalHtml);
        $('.modal-content_inner').fadeIn(300);

        var prevPost = $('#postedList').children('[data-postid=' + id + ']').prev('li').data('postid');
        var nextPost = $('#postedList').children('[data-postid=' + id + ']').next('li').data('postid');

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
};

/* modal
========================================================================== */

function modal() {
    // ウィンドウを開く
    $('.modal-open').on('click', function () {
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




/* soldout
========================================================================== */

function soldout() {
    if ($('.fs-c-productNotice--outOfStock').length && $('.mark-soldout').length) {
        $('.fs-c-productNotice--outOfStock').html('完売しました。<span>次回の入荷はございません。</span>');
    }
};

/* SearchFilter tnl
========================================================================== */
function searchFilterTnl() {
    if ($('#fs_ProductSearch').length || $('.fs-body-category-tnl').length) {

        var param = decodeURIComponent(location.search).replace('?', '');
        params = param.split(/\+|=|&/);
        //console.log(params);

        if ($.inArray('search-tnl', params) > 0 || $('.fs-body-category-tnl').length) {
            $('#fs_ProductSearch h1').text('タナリオ サイズ絞り込み検索');
            $('.fs-c-breadcrumb__listItem:last-child').text('タナリオ サイズ絞り込み検索');
            $('.fs-c-productList__list').before('<div id="productSearchBox" class="tnl"><h4>サイズで絞り込む</h4><select id="tnl-width"><option value="">横幅</option><option value="幅31cm">幅31cm</option><option value="幅44cm">幅44cm</option><option value="幅59cm">幅59cm</option><option value="幅87cm">幅87cm</option><option value="幅117cm">幅117cm</option></select><select id="tnl-height"><option value="">高さ</option><option value="高さ60cm">高さ60cm</option><option value="高さ90cm">高さ90cm</option><option value="高さ120cm">高さ120cm</option><option value="高さ150cm">高さ150cm</option><option value="高さ180cm">高さ180cm</option><option value="高さ198cm">高さ198cm</option></select><button>絞り込む</button></div>');

            var selectedWidth = '',
                selectedHeight = '';

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

            $('#productSearchBox.tnl #tnl-width').val(selectedWidth);
            $('#productSearchBox.tnl #tnl-height').val(selectedHeight);

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
                    type = '';
                if (width) {
                    type = '+' + width;
                }
                if (height) {
                    type = type + '+' + height;
                }
                window.location.href = 'https://shirai-store.net/p/search?tag=search-tnl&keyword=%E3%82%BF%E3%83%8A%E3%83%AA%E3%82%AA' + type + '&sort=price_low';

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
        if (optionName == 'ADIS-00') {
            $('.fs-c-productSelection').slideUp();
        }
        $('.fs-c-productSelection .fs-c-productSelection__field').append('<img src="https://shiraistore.itembox.design/item/src/product_detail/detail-doorOpeningDirection.png">');
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
                $('#option_1').append($('<option>').html("組立サービスのみ指定可").val("組立サービスのみ指定可"));
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
        //console.log('seriseCode:', seriseCode);

        if (seriseCode.indexOf('tnl-t') != -1) {
            $('.fs-c-productPostage').after('<div class="tnlSizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div><a href="/f/sizeOrder/tnl-emts">横幅1cm単位でご注文はこちら</a></div></div>');
        } else if (seriseCode.indexOf('tnl-198') != -1 || seriseCode.indexOf('tnl-18') != -1) {
            $('.fs-c-productPostage').after('<div class="tnlSizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div></span><a href="/f/sizeOrder/tnl-em-introduction">横幅1cm単位でご注文はこちら</a><a href="/f/sizeOrder/tnl-emu">上置きのご注文はこちら</a></span></div></div>');
        } else if (seriseCode.indexOf('tnl-') != -1) {
            $('.fs-c-productPostage').after('<div class="tnlSizeOrder_bannar"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><div><a href="/f/sizeOrder/tnl-em-introduction">横幅1cm単位でご注文はこちら</a></div></div>');
        }

        // 
        // if (seriseCode == 'tnl') {
        //     $('.fs-c-productPostage').after('<div class="tnlSizeOrder_bannar"><a href="/f/tnl-em"><img src="https://shiraistore.itembox.design/item/src/icon-sizeOrder.svg" width="30"><span>横幅1cm単位でご注文はこちら</a></span></div>');
        // }


    }
    //カテゴリページ制御
    if ($('body[class*="fs-body-category-"]').length) {
        //シリーズ商品一覧メイン画像
        var seriesUrl = location.pathname.replace('/c/series/', '');
        //console.log(seriesUrl);
        if (seriesUrl != 'wlk' && seriesUrl != 'mdl') {
            $('#category-series-visual').html('<img src="https://shiraistore.itembox.design/item/src/series/main-' + seriesUrl + '.jpg" alt="">');
        }
    }

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
            }
        });

        var orderDetails = '', orderType = '', orderHeight = '', orderWidth = '', orderDepth = '', orderColor = '';

        $('.sizeOrder').each(function () {
            orderDetails = $(this).find('.fs-c-listedOptionPrice__option__value').html();
            //(orderDetails);
            if (orderDetails.indexOf('本体') >= 0) {
                orderType = 'TNL-EM';
                orderHeight = orderDetails.replace(/.*高さ([0-9]+)cm.*/g, '$1');
                if (orderHeight < 100) {
                    orderType = 'TNL-EM0';
                }
            } else if (orderDetails.indexOf('上置き') >= 0) {
                orderType = 'TNL-EMU';
                orderHeight = "";
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

            //var thumbnail = orderType + orderHeight + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg';

            $(this).find('img').attr('src', '/assets/img/product/sizeOrder/tnl-em/thum/' + thumbnail);

            //console.log('order:', orderType + orderHeight + orderWidth + orderDepth + '-' + orderColor + '_thum.jpg');

        });
    }
};



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
        var priceOffValue = Math.round(((1 - (salePrice / normalPrice)) * 100) * 10) / 10;
        $('.fs-c-productPrice--member .fs-c-productPrice__addon__label').before('<span class="priceOffValue">' + priceOffValue + '% OFF</span>');

        //ビッグセール用在庫表示
        /*
        $('.fs-c-productStock__label').text('限定数');
        $('.fs-c-productStock').css('display', 'inline-block');
        */

        //スモールセール用在庫表示
        if (stockValue <= 3) {
            $('body.fs-body-product .fs-c-productStock').text('残りわずか');
            $('body.fs-body-product .fs-c-productStock').addClass('leftOver')
        } else {
            $('body.fs-body-product .fs-c-productStock').text('在庫あり');
        }
        $('body.fs-body-product .fs-c-productStock').css('display', 'inline-block');

    } else {
        var stockValue = $('.fs-c-productStock__number').text();
        if (stockValue <= 3) {
            $('body.fs-body-product .fs-c-productStock').text('残りわずか');
            $('body.fs-body-product .fs-c-productStock').addClass('leftOver')
        } else {
            $('body.fs-body-product .fs-c-productStock').text('在庫あり');
        }
        $('body.fs-body-product .fs-c-productStock').css('display', 'inline-block');
    }

};

/* RewriteDOM load
========================================================================== */
function rewriteDOMLoad() {
    if ($('body[class*="fs-body-category-"]').length) {
        //商品一覧：カテゴリランキングMoreButtonLinkアンカー制御
        var categoryUrl = location.pathname.replace('/c/category/', '');
        $('#content-ranking .more-button a').attr('href', '/f/ranking#' + categoryUrl);
    }
};

/* featureMamihapiSeries_slider
========================================================================== */
function featureMamihapiSeries_slider() {
    if ($('#feature-mamihapi-series').length) {
        $('.product-image').each(function (i) {
            var $_t = $(this);

            $_t.find('.product-slider').addClass('product-slider' + i).slick({
                asNavFor: '.product-item-thum' + i,
                adaptiveHeight: true
            });

            $_t.find('.product-item-thum').addClass('product-item-thum' + i).slick({
                asNavFor: '.product-slider' + i,
                vertical: true,
                slidesToShow: 5,
                focusOnSelect: true,
                centerMode: true,
                verticalSwiping: true,
                arrows: false
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
        var htmlSource;

        $(this).parents('.product-right *').each(function () {
            if ($(this).is('.variationItemSelect select option') == false) {
                htmlSource = $(this).html();
                $(this).html(htmlSource.replace(new RegExp(nowProductcode_Upper, 'g'), productcode_Upper));
            }

        });

        $(this).parents('.product-right *').each(function () {
            if ($(this).is('.variationItemSelect select option') == false) {
                htmlSource = $(this).html();
                $(this).html(htmlSource.replace(new RegExp(nowProductcode_Lower, 'g'), productcode_Lower));
            }
        });

        $('.variationItemSelect select').val(productcode_Lower);

    });
}

/* featureMamihapibyages_slider
========================================================================== */
function featureMamihapibyage_slider() {
    if ($('#feature-mamihapi-byage').length) {
        $('.product-image').each(function (i) {
            var $_t = $(this);

            $_t.find('.product-slider').addClass('product-slider' + i).slick({
                asNavFor: '.product-item-thum' + i,
                adaptiveHeight: true
            });

            $_t.find('.product-item-thum').addClass('product-item-thum' + i).slick({
                asNavFor: '.product-slider' + i,
                vertical: true,
                slidesToShow: 4,
                focusOnSelect: true,
                centerMode: true,
                verticalSwiping: true,
                arrows: false
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
            $(this).parents('.productActionButton').find('.blanketQuantity').each(function () {
                var basequantity = $(this).data('basequantity');
                $(this).val(blanketQuantitySelectVal * basequantity);
            });
        });

        $(document).on('change', '.blanketADISSelect', function () {
            var blanketADISSelectVal = $(this).val();
            $(this).parents('.productActionButton').find('.blanketADIS').each(function () {
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
        var imgsrc = $('.fs-c-productPlainImage--0 img').data('layzr').replace('-l.jpg', '-xl.jpg').replace(/\?t=.*/g, '');
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

                var reviewScoreToFixed = multipleReviewList[i].rating;

                //レビュースコアの閾値を設定
                if (reviewScore < 0.5) {
                    reviewScore = "0";
                } else if (reviewScore < 1.0) {
                    reviewScore = "0.5";
                } else if (reviewScore < 1.5) {
                    reviewScore = "1.0";
                } else if (reviewScore < 2.0) {
                    reviewScore = "1.5";
                } else if (reviewScore < 2.5) {
                    reviewScore = "2.0";
                } else if (reviewScore < 3.0) {
                    reviewScore = "2.5";
                } else if (reviewScore < 3.5) {
                    reviewScore = "3.0";
                } else if (reviewScore < 4.0) {
                    reviewScore = "3.5";
                } else if (reviewScore < 4.5) {
                    reviewScore = "4.0";
                } else if (reviewScore < 5) {
                    reviewScore = "4.5";
                } else if (reviewScore == 5) {
                    reviewScore = "5.0";
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

                var commentHTML = '<div class="fs-c-reviewList__item__body fs-c-reviewBody">' + reviewBody + '</div>'

                var imageHTML = '<div class="reviewImage"><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img data-original="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-xs.jpg" alt="" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazy" ></a></div>'

                var h = '<li class="fs-c-reviewList__item reviewScore-' + reviewScoreToFixed + '">'
                    + imageHTML
                    + '<div class="reviewContent">'
                    + reviewerHTML
                    + profHTML
                    + dateHTML
                    + colorHTML
                    + commentHTML
                    + '</div></li>';

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

                var rate = Math.round(score_count / score_length * 100)

                $('.score' + j + ' .bar-info').attr('data-total', rate);
                $('.score' + j + ' .rating').html(rate + '%');
                score_count = 0;
            }

            function skillSet() {
                $('.bar-info').each(function () {
                    total = $(this).data("total");
                    $(this).css("width", total + "%");
                });
                $('.percent').each(function () {
                    var $this = $(this);
                    $({
                        Counter: 10
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) + "%");
                        }
                    });
                });
            };
            setTimeout(skillSet, 400);


            //平均レビュースコアの設定と表示
            var totalScore = reviewScore_ary.reduce(function (sum, element) {
                return sum + element;
            }, 0);
            var averageScore = Math.round((totalScore / reviewScore_ary.length) * 10) / 10;
            var averageScore_star = averageScore;

            if (averageScore_star < 0.5) {
                averageScore_star = "0";
            } else if (averageScore_star < 1.0) {
                averageScore_star = "0.5";
            } else if (averageScore_star < 1.5) {
                averageScore_star = "1.0";
            } else if (averageScore_star < 2.0) {
                averageScore_star = "1.5";
            } else if (averageScore_star < 2.5) {
                averageScore_star = "2.0";
            } else if (averageScore_star < 3.0) {
                averageScore_star = "2.5";
            } else if (averageScore_star < 3.5) {
                averageScore_star = "3.0";
            } else if (averageScore_star < 4.0) {
                averageScore_star = "3.5";
            } else if (averageScore_star < 4.5) {
                averageScore_star = "4.0";
            } else if (averageScore_star < 5) {
                averageScore_star = "4.5";
            } else if (averageScore_star == 5) {
                averageScore_star = "5.0";
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
                var modelName = 'この商品の'
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
                threshold: 200
            });
        });
    }
};


/* productListAddData
========================================================================== */

function productListAddData() {
    if ($('#fs_ProductCategory').length || $('#fs_ProductSearch').length) {
        //$(function () {
        $.getJSON("https://cdn.shirai-store.net/assets/json/common/dataForProductList_v2_0.json", function (data) {
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
                    var normalPriceHTML = '<div class="fs-c-productPrice fs-c-productPrice--selling"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span> <span class="fs-c-price__value">' + normalPrice + '</span></span></span> <span class="fs-c-productPrice__addon"><span class="fs-c-productPrice__addon__label">税込</span></span></div>';
                    $(this).find('.fs-c-productPrice--selling').before(normalPriceHTML);
                }

                var result_reviewRating = data.reviewRating.find(function (v) {
                    return v.productUrl == url;
                });
                //console.log('result_reviewRating:', result_reviewRating)


                if (result_reviewRating != undefined) {
                    var reviewScore = result_reviewRating.averageRating;

                    if (reviewScore < 0.5) {
                        reviewScore = "0";
                    } else if (reviewScore < 1.0) {
                        reviewScore = "0.5";
                    } else if (reviewScore < 1.5) {
                        reviewScore = "1.0";
                    } else if (reviewScore < 2.0) {
                        reviewScore = "1.5";
                    } else if (reviewScore < 2.5) {
                        reviewScore = "2.0";
                    } else if (reviewScore < 3.0) {
                        reviewScore = "2.5";
                    } else if (reviewScore < 3.5) {
                        reviewScore = "3.0";
                    } else if (reviewScore < 4.0) {
                        reviewScore = "3.5";
                    } else if (reviewScore < 4.5) {
                        reviewScore = "4.0";
                    } else if (reviewScore < 5) {
                        reviewScore = "4.5";
                    } else if (reviewScore == 5) {
                        reviewScore = "5.0";
                    }

                    var reviewHTML = ""

                    if (reviewScore != 0) {
                        reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="/f/reviewList?modelCode=' + url + '">（' + result_reviewRating.reviewCount + '）</a></div>';
                    } else {
                        reviewHTML = "";
                    }

                    $(this).find('.fs-c-productPrices').before(reviewHTML);
                }
            });
        });
        //});
    };
};

/* productDetailAddData
========================================================================== */

function productDetailAddData() {
    if ($('#fs_ProductDetails').length) {
        var url = location.pathname;
        var modelCode = url.split('/').pop();

        // 商品詳細ページにテキストを表示
        $('.fs-c-productPlainImage img').each(function () {
            var text = $(this).attr('alt');
            if (text[0] == '「') {
                text = text.slice(1)
                var text_ary = text.split('」');

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
                $('#productImageBoxSlider').after('<div id="showRoom"><div class="modal-open">360°ビュー</div><div class="modal-container"><div class="modal-body"><div class="modal-close">×</div><div class="modal-content"><iframe loading="lazy" src="https://1tap-showroom.dendoh.co.jp/embed/?key=' + srcPath + '" title="ワンタップショールーム" frameborder="0" width="100%" height="600px"></iframe></div></div></div></div>');
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





        //console.log('modelCode:',modelCode);

        var dataForProductDetailUrl = 'https://cdn.shirai-store.net/assets/json/productDetail/dataForProductDetail_' + modelCode + '_v2_1.json';

        //console.log(dataForProductDetailUrl);


        $.getJSON(dataForProductDetailUrl, function (data) {
            //console.log(data);

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
                        sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    } else {
                        sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    }

                    var icon_ary = icon.split(',');

                    var iconHtml = "";
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
                        }
                    }

                    reviewScore = reviewScoreThreshold(reviewScore);

                    var reviewHTML = ""

                    if (reviewScore != 0) {
                        reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
                    } else {
                        reviewHTML = "";
                    }

                    var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h3>'
                        + productName + '</h3></a>'
                        + '<div class="productMarks">' + iconHtml + '</div>'
                        + '<div class="productSize">' + size + '</div>'
                        + reviewHTML
                        + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                        + '</a></li>';

                    $('.productTop10Slider.ranking ul').append(h);


                    var urlPath = location.pathname
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

                $('.productTop10Slider.ranking').after('<div class="fs-c-buttonContainer more-button"><a href="/f/ranking_' + categoryUrl + '" class="fs-c-button--standard">もっと見る</a></div>');

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

                    productName = productName.length > 36 ? (productName).slice(0, 36) + "…" : productName;

                    if (sellingPrice < normalPrice) {
                        sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    } else {
                        sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    }

                    //console.log(icon)
                    var comparisonIconHtml = "";
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

                    var reviewHTML = ""

                    if (reviewScore != 0) {
                        reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
                    } else {
                        reviewHTML = "評価がありません";
                    }

                    if (!seriesCode.indexOf('tl')) {
                        seriesCode = 'tl';
                    }

                    if (i == 0) {
                        comparisonImage += '<td><div class="displayProduct">表示中</div><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="" >' + comparisonIconHtml + productName + '</td>';
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

            console.log(data.ranking[0]);
            if (data.ranking[0] != undefined) {
                var iconHtml = '<li class="fs-c-productMark__item"><a class="mark-categoryRank fs-c-productMark__mark--0 fs-c-productMark__mark" href="/f/ranking_' + data.ranking[0].categoryUrl + '"><span class="fs-c-productMark__label">' + data.ranking[0].categoryName + ' ' + data.ranking[0].categoryRanking + '位' + '</span></a></li>';
                if ($('.fs-c-productMarks').length) {
                    $('.fs-c-productMark').append(iconHtml);
                } else {
                    $('.fs-c-productPrices').before('<div class="fs-c-productMarks"><ul class="fs-c-productMark">' + iconHtml + '</ul></div>');
                }
            }


            console.log(data.price[0]);
            if (data.price[0] != undefined) {
                var salePrice = $('.fs-c-productPrice--selling .fs-c-price__value').text().replace(',', '');
                console.log(salePrice);
                //console.log('salePrice:' + salePrice);
                if (data.price[0].normalPrice != salePrice) {
                    $('body').addClass('time-sale');
                    $('.fs-c-productPrice--selling').addClass('salePrice');

                    var normalPrice = data.price[0].normalPrice;
                    //console.log(normalPrice);
                    var priceOffValue = Math.round(((1 - (salePrice / normalPrice)) * 100) * 10) / 10;
                    $('.fs-c-productPrice--selling.salePrice .fs-c-productPrice__addon__label').before('<span class="priceOffValue">' + priceOffValue + '% OFF</span>');
                    //console.log(normalPrice);
                    normalPrice = String(normalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
                    var normalPriceHTML = '<div class="fs-c-productPrice fs-c-productPrice--selling"><span class="fs-c-productPrice__main"><span class="fs-c-productPrice__main__price fs-c-price"><span class="fs-c-price__currencyMark">¥</span><span class="fs-c-price__value">' + normalPrice + '</span></span></span><span class="fs-c-productPrice__addon"><span class="fs-c-productPrice__addon__label">税込</span></span></div>';
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

                var commentHTML = '<div class="fs-c-reviewList__item__body fs-c-reviewBody">' + reviewBody + '</div>'

                var imageHTML = '<div class="reviewImage"><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-xs.jpg" alt="" ></a></div>';

                var h = '<li class="fs-c-reviewList__item reviewScore-' + reviewScoreToFixed + '">'
                    + imageHTML
                    + '<div class="reviewContent">'
                    + reviewerHTML
                    + profHTML
                    + dateHTML
                    + colorHTML
                    + commentHTML
                    + '</div></li>';

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

                var rate = Math.round(ratingCount / reviewCount * 100);

                $('.score' + j + ' .bar-info').attr('data-total', rate);
                $('.score' + j + ' .rating').html(rate + '%');
                score_count = 0;
            }

            function skillSet() {
                $('.bar-info').each(function () {
                    total = $(this).data("total");
                    $(this).css("width", total + "%");
                });
                $('.percent').each(function () {
                    var $this = $(this);
                    $({
                        Counter: 10
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) + "%");
                        }
                    });
                });
            };
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

                //レビュー件数が3件以下ならレビュー詳細ボタンを削除
                if (reviewCount < 4) {
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
                        sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    } else {
                        sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
                    }

                    var iconHtml = "";

                    if (icon != null) {
                        var icon_ary = icon.split(',');


                        for (var j = 0; j < icon_ary.length; j++) {
                            if (icon_ary[j] != '') {
                                icon_ary[j] = icon_ary[j].split(':');

                                if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 11) {
                                    categoryName = categoryNameShorter(categoryName);
                                    iconHtml += '<a href="/f/ranking_' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
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

                    reviewScore = reviewScoreThreshold(reviewScore)
                    //console.log('reviewScore:',reviewScore)

                    var reviewHTML = ""

                    if (reviewScore != 0) {
                        reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
                    } else {
                        reviewHTML = "";
                    }

                    if (iconHtml == undefined) {
                        iconHtml = '';
                    }

                    var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h3>'
                        + productName + '</h3></a>'
                        + '<div class="productMarks">' + iconHtml + '</div>'
                        + '<div class="productSize">' + size + '</div>'
                        + reviewHTML
                        + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                        + '</a></li>';

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
        });
    };
};





// productTop10Slider
var recommend_top10Slider;
var ranking_top10Slider;
var productDetail_top10Slider;
var newLife_top10Slider1, newLife_top10Slider2, newLife_top10Slider3, newLife_top10Slider4, newLife_top10Slider5, newLife_top10Slider6, newLife_top10Slider7, newLife_top10Slider8, newLife_top10Slider9, newLife_top10Slider10, newLife_top10Slider11, newLife_top10Slider12, newLife_top10Slider13;
var top10Slider_option1 = { infiniteLoop: false, pager: false, hideControlOnEnd: true, touchEnabled: false, minSlides: 5, maxSlides: 5, slideWidth: 203, slideMargin: 8, controls: false };
var top10Slider_option2 = { infiniteLoop: false, pager: false, hideControlOnEnd: true, touchEnabled: false, minSlides: 5, maxSlides: 5, slideWidth: 203, slideMargin: 8 };

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
        reviewScore = "0";
    } else if (reviewScore < 1.0) {
        reviewScore = "0.5";
    } else if (reviewScore < 1.5) {
        reviewScore = "1.0";
    } else if (reviewScore < 2.0) {
        reviewScore = "1.5";
    } else if (reviewScore < 2.5) {
        reviewScore = "2.0";
    } else if (reviewScore < 3.0) {
        reviewScore = "2.5";
    } else if (reviewScore < 3.5) {
        reviewScore = "3.0";
    } else if (reviewScore < 4.0) {
        reviewScore = "3.5";
    } else if (reviewScore < 4.5) {
        reviewScore = "4.0";
    } else if (reviewScore < 5) {
        reviewScore = "4.5";
    } else if (reviewScore == 5) {
        reviewScore = "5.0";
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
    $.getJSON("https://cdn.shirai-store.net/assets/json/recommend/recommend_v2_0.json", function (recommendList) {
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
            }

            //console.log(thumb);



            if (sellingPrice < normalPrice) {
                sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            } else {
                sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            }

            var icon_ary = icon.split(',');

            var iconHtml = "";
            for (var j = 0; j < icon_ary.length; j++) {
                if (icon_ary[j] != '') {
                    icon_ary[j] = icon_ary[j].split(':');

                    if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 4) {
                        categoryName = categoryNameShorter(categoryName);
                        iconHtml += '<a href="/f/ranking_' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
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
                reviewScore = "0";
            } else if (reviewScore < 1.0) {
                reviewScore = "0.5";
            } else if (reviewScore < 1.5) {
                reviewScore = "1.0";
            } else if (reviewScore < 2.0) {
                reviewScore = "1.5";
            } else if (reviewScore < 2.5) {
                reviewScore = "2.0";
            } else if (reviewScore < 3.0) {
                reviewScore = "2.5";
            } else if (reviewScore < 3.5) {
                reviewScore = "3.0";
            } else if (reviewScore < 4.0) {
                reviewScore = "3.5";
            } else if (reviewScore < 4.5) {
                reviewScore = "4.0";
            } else if (reviewScore < 5) {
                reviewScore = "4.5";
            } else if (reviewScore == 5) {
                reviewScore = "5.0";
            }

            var reviewHTML = ""

            if (reviewScore != 0) {
                reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
            } else {
                reviewHTML = "";
            }

            var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h3>'
                + productName + '</h3></a>'
                + '<div class="productMarks">' + iconHtml + '</div>'
                + '<div class="productSize">' + size + '</div>'
                + reviewHTML
                + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                + '</a></li>';

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
            }

            if (sellingPrice < normalPrice) {
                sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            } else {
                sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            }

            var icon_ary = icon.split(',');

            var iconHtml = "";
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
                reviewScore = "0";
            } else if (reviewScore < 1.0) {
                reviewScore = "0.5";
            } else if (reviewScore < 1.5) {
                reviewScore = "1.0";
            } else if (reviewScore < 2.0) {
                reviewScore = "1.5";
            } else if (reviewScore < 2.5) {
                reviewScore = "2.0";
            } else if (reviewScore < 3.0) {
                reviewScore = "2.5";
            } else if (reviewScore < 3.5) {
                reviewScore = "3.0";
            } else if (reviewScore < 4.0) {
                reviewScore = "3.5";
            } else if (reviewScore < 4.5) {
                reviewScore = "4.0";
            } else if (reviewScore < 5) {
                reviewScore = "4.5";
            } else if (reviewScore == 5) {
                reviewScore = "5.0";
            }

            var reviewHTML = ""

            if (reviewScore != 0) {
                reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
            } else {
                reviewHTML = "";
            }

            var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h3>'
                + productName + '</h3></a>'
                + '<div class="productMarks">' + iconHtml + '</div>'
                + '<div class="productSize">' + size + '</div>'
                + reviewHTML
                + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                + '</a></li>';

            $('.productTop10Slider.ranking ul').append(h);


            var urlPath = location.pathname
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
    $.getJSON("https://cdn.shirai-store.net/assets/json/recommend/recommend_v2_0.json", function (recommendList) {
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
            }

            //console.log(thumb);



            if (sellingPrice < normalPrice) {
                sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            } else {
                sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            }

            var icon_ary = icon.split(',');

            var iconHtml = "";
            for (var j = 0; j < icon_ary.length; j++) {
                if (icon_ary[j] != '') {
                    icon_ary[j] = icon_ary[j].split(':');

                    if (icon_ary[j][0] == 'mark-categoryRank' && icon_ary[j][1] < 4) {
                        categoryName = categoryNameShorter(categoryName);
                        iconHtml += '<a href="/f/ranking_' + categoryUrl + '" class="mark-catRank">' + categoryName + ' ' + icon_ary[j][1] + '位</a>';
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
                reviewScore = "0";
            } else if (reviewScore < 1.0) {
                reviewScore = "0.5";
            } else if (reviewScore < 1.5) {
                reviewScore = "1.0";
            } else if (reviewScore < 2.0) {
                reviewScore = "1.5";
            } else if (reviewScore < 2.5) {
                reviewScore = "2.0";
            } else if (reviewScore < 3.0) {
                reviewScore = "2.5";
            } else if (reviewScore < 3.5) {
                reviewScore = "3.0";
            } else if (reviewScore < 4.0) {
                reviewScore = "3.5";
            } else if (reviewScore < 4.5) {
                reviewScore = "4.0";
            } else if (reviewScore < 5) {
                reviewScore = "4.5";
            } else if (reviewScore == 5) {
                reviewScore = "5.0";
            }

            var reviewHTML = ""

            if (reviewScore != 0) {
                reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
            } else {
                reviewHTML = "";
            }

            var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h2>'
                + productName + '</h2></a>'
                + '<div class="productMarks">' + iconHtml + '</div>'
                + '<div class="productSize">' + size + '</div>'
                + reviewHTML
                + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                + '</a></li>';

            $('#recommendList ul').append(h);

            $('img.lazy').lazyload({
                threshold: 200
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
            }

            if (sellingPrice < normalPrice) {
                sellingPrice = '<p class="priceBox salePriceBox"><span class="price">¥ ' + normalPrice.toLocaleString() + '<span class="tax">(税込)</span></span><span class="memberPrice"><span class="sale">特別価格</span> ¥' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            } else {
                sellingPrice = '<p class="priceBox"><span class="price">¥ ' + sellingPrice.toLocaleString() + '<span class="tax">(税込)</span></span></p>'
            }

            var icon_ary = icon.split(',');

            var iconHtml = "";
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
                reviewScore = "0";
            } else if (reviewScore < 1.0) {
                reviewScore = "0.5";
            } else if (reviewScore < 1.5) {
                reviewScore = "1.0";
            } else if (reviewScore < 2.0) {
                reviewScore = "1.5";
            } else if (reviewScore < 2.5) {
                reviewScore = "2.0";
            } else if (reviewScore < 3.0) {
                reviewScore = "2.5";
            } else if (reviewScore < 3.5) {
                reviewScore = "3.0";
            } else if (reviewScore < 4.0) {
                reviewScore = "3.5";
            } else if (reviewScore < 4.5) {
                reviewScore = "4.0";
            } else if (reviewScore < 5) {
                reviewScore = "4.5";
            } else if (reviewScore == 5) {
                reviewScore = "5.0";
            }

            var reviewHTML = ""

            if (reviewScore != 0) {
                reviewHTML = '<div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="' + reviewScore + '"><a href="https://shirai-store.net/f/reviewList?modelCode=' + productUrl + '">（' + reviewCount + '）</a></div>';
            } else {
                reviewHTML = "";
            }

            var h = '<li><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img src="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-m.jpg" alt="' + productName + '" ><h2>'
                + productName + '</h2></a>'
                + '<div class="productMarks">' + iconHtml + '</div>'
                + '<div class="productSize">' + size + '</div>'
                + reviewHTML
                + '<a href="/c/series/' + seriesCode + '/' + productUrl + '">' + sellingPrice
                + '</a></li>';

            $('#rankingList ul').append(h);

            $('img.lazy').lazyload({
                threshold: 200
            });
        }
    });
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
                    reviewScore = "0";
                } else if (reviewScore < 1.0) {
                    reviewScore = "0.5";
                } else if (reviewScore < 1.5) {
                    reviewScore = "1.0";
                } else if (reviewScore < 2.0) {
                    reviewScore = "1.5";
                } else if (reviewScore < 2.5) {
                    reviewScore = "2.0";
                } else if (reviewScore < 3.0) {
                    reviewScore = "2.5";
                } else if (reviewScore < 3.5) {
                    reviewScore = "3.0";
                } else if (reviewScore < 4.0) {
                    reviewScore = "3.5";
                } else if (reviewScore < 4.5) {
                    reviewScore = "4.0";
                } else if (reviewScore < 5) {
                    reviewScore = "4.5";
                } else if (reviewScore == 5) {
                    reviewScore = "5.0";
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

                var commentHTML = '<div class="fs-c-reviewList__item__body fs-c-reviewBody">' + reviewBody + '</div>'

                var imageHTML = '<div class="reviewImage"><a href="/c/series/' + seriesCode + '/' + productUrl + '"><img data-original="https://shiraistore.itembox.design/product/' + zeroPadding(product_image_group, 3) + '/' + productId_12Len + '/' + productId_12Len + '-' + thumbnail + '-xs.jpg" alt="" src="https://shiraistore.itembox.design/item/src/loading.svg" class="lazy" ></a></div>'

                var h = '<li class="fs-c-reviewList__item reviewScore-' + reviewScoreToFixed + '">'
                    //+ imageHTML
                    + '<div class="reviewContent">'
                    + reviewerHTML
                    + profHTML
                    + dateHTML
                    + colorHTML
                    + commentHTML
                    + '</div></li>';

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

                var rate = Math.round(score_count / score_length * 100)

                $('.score' + j + ' .bar-info').attr('data-total', rate);
                $('.score' + j + ' .rating').html(rate + '%');
                score_count = 0;
            }

            function skillSet() {
                $('.bar-info').each(function () {
                    total = $(this).data("total");
                    $(this).css("width", total + "%");
                });
                $('.percent').each(function () {
                    var $this = $(this);
                    $({
                        Counter: 10
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) + "%");
                        }
                    });
                });
            };
            setTimeout(skillSet, 400);


            //平均レビュースコアの設定と表示
            var totalScore = reviewScore_ary.reduce(function (sum, element) {
                return sum + element;
            }, 0);
            var averageScore = Math.round((totalScore / reviewScore_ary.length) * 10) / 10;
            var averageScore_star = averageScore;

            if (averageScore_star < 0.5) {
                averageScore_star = "0";
            } else if (averageScore_star < 1.0) {
                averageScore_star = "0.5";
            } else if (averageScore_star < 1.5) {
                averageScore_star = "1.0";
            } else if (averageScore_star < 2.0) {
                averageScore_star = "1.5";
            } else if (averageScore_star < 2.5) {
                averageScore_star = "2.0";
            } else if (averageScore_star < 3.0) {
                averageScore_star = "2.5";
            } else if (averageScore_star < 3.5) {
                averageScore_star = "3.0";
            } else if (averageScore_star < 4.0) {
                averageScore_star = "3.5";
            } else if (averageScore_star < 4.5) {
                averageScore_star = "4.0";
            } else if (averageScore_star < 5) {
                averageScore_star = "4.5";
            } else if (averageScore_star == 5) {
                averageScore_star = "5.0";
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
                threshold: 200
            });
        });
    }
}

function tnl_em_select() {
    if ($('#tnl_em').length) {
        $.getJSON('https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_0.json', function (priceArray) {
            //console.log(priceArray);

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
                    optioncolorname = $('#tnl_em [name=tnl_em_optionColor]:checked').data('colorname'),
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
                var adjustableSize = 9;//梱包サイズの調整（cm）
                var totalSize = Number(optionHeight) + Number(optionWidth) + optionDepthSize + adjustableSize;
                //console.log(totalSize);

                var selectADISHtml = '<option data-typename="なし" value="ADIS-00">なし</option><option data-typename="組立宅配" value="ADIS-01">組立宅配</option><option data-typename="組立設置" value="ADIS-02">組立設置</option>';

                $('#tnl_em [name=tnl_em_optionADIS]').html(selectADISHtml);
                //console.log(optionADIS);

                if (Number(optionHeight) + 3 > 200 && totalSize > 260) {
                    //console.log('A');
                    $('#tnl_em [name=tnl_em_optionADIS]').val('ADIS-00');
                    $('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-01"]').remove();
                    $('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-02"]').remove();
                } else if (Number(optionHeight) + 3 > 200) {
                    //console.log('B');
                    $('#tnl_em [name=tnl_em_optionADIS] option[value="ADIS-02"]').remove();
                    if (optionADIS == 'ADIS-02') {
                        $('#tnl_em [name=tnl_em_optionADIS]').val('ADIS-00');
                    } else {
                        $('#tnl_em [name=tnl_em_optionADIS]').val(optionADIS);
                    }

                } else if (totalSize > 260) {
                    //console.log('C');
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
                    optioncolorname = $('#tnl_em [name=tnl_em_optionColor]:checked').data('colorname');
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
                $('#tnl_em_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optioncolorname + '</span>');

                readyMadeFlag_check = readyMadeFlag_width + readyMadeFlag_depth + readyMadeFlag_strength + readyMadeFlag_material + readyMadeFlag_color;

                //console.log('readyMadeFlag_check:', readyMadeFlag_check)

                if (readyMadeFlag_check == 5) {
                    $('#readyMadeMessage').text('お選びのサイズ・カラーは既製品です。');
                    if (Number(optionHeight) > 100 && Number(optionHeight) < 198) {
                        optionHeight = optionHeight / 10;
                    }
                    $('#tnl_em_selectedProduct').text('TNL-' + Number(optionHeight) + Number(optionWidth) + '-' + optionColor);

                    var productURL = 'TNL-' + Number(optionHeight) + Number(optionWidth) + '-' + optionColor;
                    var optionCode = productURL;

                    //console.log('productURL:', productURL);
                    //console.log('optionCode:', optionCode);

                    var price = priceArray.find((v) => v.productNumber === productURL);
                    $('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
                    $('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
                    $('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

                    //$.post('https://script.google.com/macros/s/AKfycbx14GP9FV2j1SPS-SoXCh3X6yycuZkqlv9JBrjJflQ2DI7Dmo98yOW5WPSpml1yUss/exec', `{"productURL":"${productURL}","productNumber":"${optionCode}","color":"${optionColor}","price":"${price.sellingPrice}","postege":"${price.postage}","optionADIS":"${optionADIS}"}`).done(function (data) { console.log(data.form); });

                    if (Number(optionHeight) < 198) {
                        var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[1].id" value="1"/><select name="products[' + productURL + '].productOptionsWithPrice[1].value"><option value="' + optionADIS + '"></option></select><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
                    } else {
                        var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
                    }


                } else {
                    $('#readyMadeMessage').text('');
                    var productURL = 'TNL-EM' + optionHeight + optionWidth + optionDepth;
                    var optionCode = 'TNL-EM' + optionHeight + optionWidth + optionDepth + optionStrength + optionMaterial;

                    $('#tnl_em_selectedProduct').text(optionCode + '-' + optionColor);
                    var price = priceArray.find((v) => v.productNumber === optionCode);
                    $('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
                    $('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
                    $('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

                    var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[1].id" value="1"><select name="products[' + productURL + '].productOptionsWithPrice[1].value"><option value="' + optionCode + '"></option></select><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[2].id" value="2"><select name="products[' + productURL + '].productOptionsWithPrice[2].value"><option value="' + optionColor + '"></option></select><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[3].id" value="3"><select name="products[' + productURL + '].productOptionsWithPrice[3].value"><option value="' + optionADIS + '"></option></select><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
                }

                $('#tnl_em_selectedProductButton').html(html);

                //<div id="tnl_em_selectedProduct-innerSize" style="background: #878376;color: #fff;text-align: center;margin: 8px 0;"></div>

                var innerWidth;
                //console.log(optionDepth)
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
                    var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`
                } else {
                    innerWidth = Number(optionWidth) - 3.6;
                    var innerSizeHTML = `【内寸】高さ:${innerHeight}cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`
                }

                $('#tnl_em_selectedProduct-innerSize').html(innerSizeHTML);
            }
        });
    }
}


function tnl_emu_select() {
    if ($('#tnl_emu').length) {
        $.getJSON('https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_0.json', function (priceArray) {
            //console.log(priceArray);
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
                    optioncolorname = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname'),
                    optionColor_length = $('#tnl_emu input[name=tnl_emu_optionColor]').length,
                    optionADIS = $('#tnl_emu [name=tnl_emu_optionADIS]').val(),
                    optionADISName = $('#tnl_emu [name=tnl_emu_optionADIS] option:selected').data('typename'),
                    arraySizeRange = ['015_034', '035_044', '045_060', '061_070', '071_080', '081_090'],
                    arraySizeRangeValue = arraySizeRange[$('#tnl_emu [name=tnl_emu_optionWidth] option:selected').data('digit2') - 1],
                    productSizeImage = 0;

                optionColor = $('#tnl_emu [name=tnl_emu_optionColor]:checked').val();
                optioncolorname = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname');

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
                    optioncolorname = $('#tnl_emu [name=tnl_emu_optionColor]:checked').data('colorname');
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
                $('#tnl_emu_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optioncolorname + '</span>');

                $('#tnl_emu_selectedProduct').text('TNL-EM035' + optionWidth + 'U' + optionDepth + optionMaterial + '-' + optionColor);

                var productURL = 'TNL-EMU' + optionWidth + optionDepth;
                var optionCode = 'TNL-EM035' + optionWidth + 'U' + optionDepth + optionMaterial;

                var price = priceArray.find((v) => v.productNumber === optionCode);
                $('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
                $('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
                $('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

                var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[1].id" value="1"><select name="products[' + productURL + '].productOptionsWithPrice[1].value"><option value="' + optionCode + '"></option></select><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[2].id" value="2"><select name="products[' + productURL + '].productOptionsWithPrice[2].value"><option value="' + optionColor + '"></option></select><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[3].id" value="3"><select name="products[' + productURL + '].productOptionsWithPrice[3].value"><option value="' + optionADIS + '"></option></select><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';

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
                    var innerSizeHTML = `【内寸】高さ:25.4cm　幅左:${innerWidth}cm 幅右:${innerWidth}cm　奥行:${innerDepth}cm`
                } else {
                    innerWidth = Number(optionWidth) - 3.6;
                    var innerSizeHTML = `【内寸】高さ:25.4cm　幅:${innerWidth}cm　奥行:${innerDepth}cm`
                }



                $('#tnl_emu_selectedProduct-innerSize').html(innerSizeHTML)
            }
        });
    }
}


function tnl_emts_select() {
    if ($('#tnl_emts').length) {
        $.getJSON('https://cdn.shirai-store.net/assets/json/common/tnlSizeOrderPrice_v1_0.json', function (priceArray) {
            //console.log(priceArray);
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
                    optioncolorname = $('#tnl_emts [name=tnl_emts_optionColor]:checked').data('colorname'),
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
                    optioncolorname = $('#tnl_emts [name=tnl_emts_optionColor]:checked').data('colorname');
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
                $('#tnl_emts_selectedProductWidthImage').html('<img src="/assets/img/product/sizeOrder/tnl-em/' + 'tnl-emts_width' + arraySizeRangeValue + '.png">');
                $('#tnl_emts_selectedWidth').text(Number(optionWidth) + 'cm');
                $('#tnl_emts_selectedDepth').text(optionDepthName);
                $('#tnl_emts_selectedStrength').text(optionStrengthName);
                $('#tnl_emts_selectedMaterial').text(optionMaterialName);
                if (optionColor == 'NA' || optionColor == 'NB' || optionColor == 'WH' || optionColor == 'WT') {
                    var optionTextInversion = 'textColorInversion';
                } else {
                    var optionTextInversion = '';
                }
                $('#tnl_emts_selectedColor').html('<img src="/assets/img/product/sizeOrder/tnl-em/thum/tnl-em_color_' + optionColor.toLowerCase() + '_thum.jpg"><span class="colorName ' + optionTextInversion + '">' + optioncolorname + '</span>');

                readyMadeFlag_check = readyMadeFlag_width + readyMadeFlag_depth + readyMadeFlag_strength + readyMadeFlag_material + readyMadeFlag_color;

                //console.log('readyMadeFlag_check:', readyMadeFlag_check)

                if (readyMadeFlag_check == 5) {
                    $('#tnl_emts_selectedProduct').text('TNL-T' + Number(optionWidth) + 'A-' + optionColor);
                    $('#readyMadeMessage').text('お選びのサイズ・カラーは既製品です。');

                    var productURL = 'TNL-T' + Number(optionWidth) + 'A-' + optionColor;
                    var optionCode = productURL;

                    var price = priceArray.find((v) => v.productNumber === productURL);
                    $('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
                    $('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
                    $('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

                    //$.post('https://script.google.com/macros/s/AKfycbx14GP9FV2j1SPS-SoXCh3X6yycuZkqlv9JBrjJflQ2DI7Dmo98yOW5WPSpml1yUss/exec', `{"productURL":"${productURL}","productNumber":"${optionCode}","color":"${optionColor}","price":"${price.sellingPrice}","postege":"${price.postage}"}`).done(function (data) { console.log(data.form); });

                    //console.log('productURL:', productURL)
                    var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
                } else {
                    $('#tnl_emts_selectedProduct').text('TNL-EM' + optionStrength + optionWidth + optionDepth + optionMaterial + '-' + optionColor);

                    $('#readyMadeMessage').text('');

                    var productURL = 'TNL-EMTS' + optionWidth;
                    var optionCode = 'TNL-EM' + optionStrength + optionWidth + optionDepth + optionMaterial;

                    // console.log('CCCCC');

                    // console.log('productURL:', productURL);
                    // console.log('optionCode:', optionCode);

                    var price = priceArray.find((v) => v.productNumber === optionCode);
                    $('#productPriceBox .fs-c-price__value').text(price.sellingPrice.toLocaleString());
                    $('#productPriceBox .fs-c-productPointDisplay__quantity').text(Math.round(price.sellingPrice / 100));
                    $('.fs-c-productPostage .fs-c-price__value').text(price.postage.toLocaleString());

                    //$.post('https://script.google.com/macros/s/AKfycbx14GP9FV2j1SPS-SoXCh3X6yycuZkqlv9JBrjJflQ2DI7Dmo98yOW5WPSpml1yUss/exec', `{"productURL":"${productURL}","productNumber":"${optionCode}","color":"${optionColor}","price":"${price.sellingPrice}","postege":"${price.postage}"}`).done(function (data) { console.log(data.form); });

                    var html = '<form action="https://shirai-store.net/p/cart/add" method="post"><div style="display:none"><input type="hidden" name="products[' + productURL + '].productNo" value="' + productURL + '"><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[1].id" value="1"><select name="products[' + productURL + '].productOptionsWithPrice[1].value"><option value="' + optionCode + '"></option></select><input type="hidden" name="products[' + productURL + '].productOptionsWithPrice[2].id" value="2"><select name="products[' + productURL + '].productOptionsWithPrice[2].value"><option value="' + optionColor + '"></option></select><input name="products[' + productURL + '].quantity" type="text" value="1" size="5"></div><button type="submit">カートに入れる</button></form>';
                }
                $('#tnl_em_selectedProductButton').html(html);
            }
        });
    }
}

/* checkout sizeOrderDisplayThum
========================================================================== */
function sizeOrderDisplayThum() {
    if ($('#fs_Checkout,#fs_CheckoutWithAmazon').length) {
        setInterval(function () {
            $('.fs-c-cartTable__dataCell').each(function () {
                if ($(this).find('.fs-c-listedProductName__name').text().indexOf('サイズオーダー') >= 0) {
                    $(this).find('.fs-c-cartTable__product').addClass('sizeOrder');
                }
            });

            var orderDetails = '', orderType = '', orderHeight = '', orderWidth = '', orderDepth = '', orderColor = '';
            if ($('.sizeOrder').length) {
                if ($('.sizeOrder').find('.fs-c-productImage__image').attr('src').indexOf('xs.jpg') >= 0) {
                    //console.log('A')
                    $('.sizeOrder').each(function () {
                        //console.log('B')
                        orderDetails = $(this).find('.fs-c-listedOptionPrice__option__value').html();
                        //console.log(orderDetails);
                        if (orderDetails.indexOf('本体') >= 0) {
                            orderType = 'TNL-EM';
                            orderHeight = orderDetails.replace(/.*高さ([0-9]+)cm.*/g, '$1');
                            if (orderHeight < 100) {
                                orderType = 'TNL-EM0';
                            }
                        } else if (orderDetails.indexOf('上置き') >= 0) {
                            orderType = 'TNL-EMU';
                            orderHeight = "";
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

                        // console.log(thumbnail)



                        $(this).find('img').attr('src', '/assets/img/product/sizeOrder/tnl-em/thum/' + thumbnail);
                    });
                }
            }
        }, 1000);
    }
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
    calObj[0].daysClass["2021/12/28"] = 'Holyday';
    calObj[0].daysClass["2021/12/29"] = 'Holyday';
    calObj[0].daysClass["2021/12/30"] = 'Holyday';
    calObj[0].daysClass["2021/12/31"] = 'Holyday';
    calObj[0].daysClass["2022/1/3"] = 'Holyday';
    calObj[0].daysClass["2022/1/4"] = 'Holyday';
    calObj[0].daysClass["2022/1/10"] = 'Holyday';
    calObj[0].daysClass["2022/2/11"] = 'Holyday';
    calObj[0].daysClass["2022/2/23"] = 'Holyday';
    calObj[0].daysClass["2022/3/21"] = 'Holyday';
    calObj[0].daysClass["2022/4/29"] = 'Holyday';
    calObj[0].daysClass["2022/5/2"] = 'Holyday';
    calObj[0].daysClass["2022/5/3"] = 'Holyday';
    calObj[0].daysClass["2022/5/4"] = 'Holyday';
    calObj[0].daysClass["2022/5/5"] = 'Holyday';
    calObj[0].daysClass["2022/7/18"] = 'Holyday';
    calObj[0].daysClass["2022/8/11"] = 'Holyday';
    calObj[0].daysClass["2022/8/12"] = 'Holyday';
    calObj[0].daysClass["2022/8/15"] = 'Holyday';
    calObj[0].daysClass["2022/8/16"] = 'Holyday';
    calObj[0].daysClass["2022/9/19"] = 'Holyday';
    calObj[0].daysClass["2022/9/23"] = 'Holyday';
    calObj[0].daysClass["2022/10/10"] = 'Holyday';
    calObj[0].daysClass["2022/11/3"] = 'Holyday';
    calObj[0].daysClass["2022/11/23"] = 'Holyday';
    calObj[0].daysClass["2022/12/28"] = 'Holyday';
    calObj[0].daysClass["2022/12/29"] = 'Holyday';
    calObj[0].daysClass["2022/12/30"] = 'Holyday';
    calObj[0].daysClass["2023/1/1"] = 'Holyday';
    calObj[0].daysClass["2023/1/2"] = 'Holyday';
    calObj[0].daysClass["2023/1/9"] = 'Holyday';
    calObj[0].daysClass["2023/2/11"] = 'Holyday';
    calObj[0].daysClass["2023/2/23"] = 'Holyday';
    calObj[0].daysClass["2023/3/21"] = 'Holyday';
    calObj[0].daysClass["2023/4/29"] = 'Holyday';
    calObj[0].daysClass["2023/5/3"] = 'Holyday';
    calObj[0].daysClass["2023/5/4"] = 'Holyday';
    calObj[0].daysClass["2023/5/5"] = 'Holyday';
    calObj[0].daysClass["2023/7/17"] = 'Holyday';
    calObj[0].daysClass["2023/8/11"] = 'Holyday';
    calObj[0].daysClass["2023/9/18"] = 'Holyday';
    calObj[0].daysClass["2023/9/23"] = 'Holyday';
    calObj[0].daysClass["2023/10/9"] = 'Holyday';
    calObj[0].daysClass["2023/11/3"] = 'Holyday';
    calObj[0].daysClass["2023/11/23"] = 'Holyday';
    calObj[0].daysClass["2024/1/1"] = 'Holyday';
    calObj[0].daysClass["2024/1/8"] = 'Holyday';
    calObj[0].daysClass["2024/2/11"] = 'Holyday';
    calObj[0].daysClass["2024/2/12"] = 'Holyday';
    calObj[0].daysClass["2024/2/23"] = 'Holyday';
    calObj[0].daysClass["2024/3/20"] = 'Holyday';
    calObj[0].daysClass["2024/4/29"] = 'Holyday';
    calObj[0].daysClass["2024/5/3"] = 'Holyday';
    calObj[0].daysClass["2024/5/4"] = 'Holyday';
    calObj[0].daysClass["2024/5/5"] = 'Holyday';
    calObj[0].daysClass["2024/5/6"] = 'Holyday';
    calObj[0].daysClass["2024/7/15"] = 'Holyday';
    calObj[0].daysClass["2024/8/11"] = 'Holyday';
    calObj[0].daysClass["2024/8/12"] = 'Holyday';
    calObj[0].daysClass["2024/9/16"] = 'Holyday';
    calObj[0].daysClass["2024/9/22"] = 'Holyday';
    calObj[0].daysClass["2024/9/23"] = 'Holyday';
    calObj[0].daysClass["2024/10/14"] = 'Holyday';
    calObj[0].daysClass["2024/11/3"] = 'Holyday';
    calObj[0].daysClass["2024/11/4"] = 'Holyday';
    calObj[0].daysClass["2024/11/23"] = 'Holyday';
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
    calObj[0].week[0] = "Holyday"; // Sun
    calObj[0].week[1]; // Mon
    calObj[0].week[2]; // Tue
    calObj[0].week[3]; // Wed
    calObj[0].week[4]; // Thu
    calObj[0].week[5]; // Fri
    calObj[0].week[6] = "Holyday"; // Sat

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
    calObj[0].clickClassName = "";

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
    calObj.weekName = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
    calObj.monthName = new Array('', '/01', '/02', '/03', '/04', '/05', '/06', '/07', '/08', '/09', '/10', '/11', '/12');
    calObj.date = new Date();
    calObj.date = new Date(calObj.date.getFullYear() + "/" + (calObj.date.getMonth() + 1) + "/" + calObj.date.getDate() + " 00:00:00");
    calObj.day = calObj.date.getDate();
    calObj.month = calObj.date.getMonth() + 1;
    calObj.year = calObj.date.getFullYear();
    calObj.currentList = null;

    function cal_init() {
        var d = window.document;
        var tagObj = d.getElementsByTagName("div");
        var calToday = new Date();
        for (var i = 0; i < tagObj.length; i++) {
            if (tagObj[i].className == "cal_wrapper") {
                var calId = Number(tagObj[i].id.substring(3, tagObj[i].id.length));
                calObj.calendars.push(calId);
                if (0 < (calObj.month + calObj[calId].defaultMonth) && (calObj.month + calObj[calId].defaultMonth) < 13)
                    calObj[calId].currentMonth = new Date(calObj.year + "/" + (calObj.month + calObj[calId].defaultMonth) + "/" + "1 00:00:00");
                else
                    calObj[calId].currentMonth = new Date((calObj.year + 1) + "/" + ((calObj.month + calObj[calId].defaultMonth) % 12) + "/" + "1 00:00:00");
                cal_create(calId);
            };
        };
    };
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
                }
                else {
                    bisDay = 1;
                };
            }
            else if (year % 4 == 0) {
                bisDay = 1;
            }
            else {
                bisDay = 0;
            };
        };
        MonthDays += bisDay;
        var calHTML = "<table border='0' cellspacing='0' cellpadding='0' class='cal'>";
        calHTML += "<tr><th colspan='7'>";
        calHTML += "<div class='cal_ui'>";
        calHTML += "<input type='button' onclick='cal_move(" + calId + ",-1);' value='&lt; prev' />";
        calHTML += "<input type='button' onclick='cal_move(" + calId + ",null);' value='-' />";
        calHTML += "<input type='button' onclick='cal_move(" + calId + ",1);' value='next &gt;' />";
        calHTML += "</div>";
        calHTML += "<p>" + year + calObj.monthName[month] + "</p></th></tr>";
        calHTML += "<tr class='headline'>";
        for (var i = 0; i < 7; i++) {
            var w = (calObj[calId].weekStart + i) % 7;
            calHTML += "<td>" + calObj.weekName[w] + "</td>";
        };
        calHTML += "</tr><tr>";
        var weekBreak = (calObj[calId].weekStart - 1) % 7;
        if (weekBreak < 0) {
            weekBreak = 6;
        };
        var ws = week;
        var i = 0;
        var weekBlank = [];
        while (ws != calObj[calId].weekStart) {
            var t = new Date(time - ((i + 1) * (60 * 60 * 24 * 1000)));
            weekBlank.unshift('<td><div class="backward">' + t.getDate() + "</div></td>");
            i++;
            ws--;
            if (ws < 0) {
                ws = 6;
            };
        };
        calHTML += weekBlank.join('');

        for (dayCnt = 1; dayCnt <= (calObj.days[month] + bisDay); dayCnt++) {
            var dayStr = year + "/" + month + "/" + dayCnt;
            var dayStrN = month + "/" + dayCnt;
            if (WeekCnt[week] == undefined)
                WeekCnt[week] = 0;
            WeekCnt[week]++;

            var monStr = '' + month + '-' + week + '-' + WeekCnt[week];
            var weekStr = '' + week + '-' + WeekCnt[week];

            var dayClass = new Object();
            var dayClassText = new Object();
            var currentDayDate = new Date(year + "/" + month + "/" + dayCnt + " 00:00:00");
            var laterDay = Math.floor((currentDayDate.getTime() - calObj.date.getTime()) / 1000 / (60 * 60 * 24));
            var tdId = "td_" + calId + "_" + year + "_" + month + "_" + dayCnt;

            // backward
            if (calObj[calId].backward != null && currentDayDate.getTime() < calObj.date.getTime())
                dayClass["backward"] = calObj[calId].backward;

            // week
            if (calObj[calId].month[weekStr] != undefined)
                dayClass["week"] = calObj[calId].month[weekStr];
            else if (calObj[calId].month[monStr] != undefined)
                dayClass["week"] = calObj[calId].month[monStr];
            else if (calObj[calId].week[week] != undefined) {
                if (typeof (calObj[calId].week[week]) == "object" && calObj[calId].week[week][WeekCnt[week]] != undefined) {
                    dayClass["week"] = calObj[calId].week[week][WeekCnt[week]];
                }
                else if (calObj[calId].week[week] != undefined && typeof (calObj[calId].week[week]) != "object")
                    dayClass["week"] = calObj[calId].week[week];
            }
            // xDay
            if (calObj[calId].xDays[dayCnt] != undefined)
                dayClass["xDay"] = calObj[calId].xDays[dayCnt];

            // xDaysLater
            if (calObj[calId].xDaysLater[laterDay] != undefined)
                dayClass["xDaysLater"] = calObj[calId].xDaysLater[laterDay];

            // day
            if (calObj[calId].daysClass[dayStr] != undefined)
                dayClass["day"] = calObj[calId].daysClass[dayStr];
            else if (calObj[calId].daysClass[dayStrN] != undefined)
                dayClass["day"] = calObj[calId].daysClass[dayStrN];

            var tdClassArr = new Array();
            var tdTextArr = new Array();
            var tdLinkArr = new Array();
            var tdClassStr = "";
            var tdTextStr = "";
            var tdMouse = "";
            var tdClassNames = new Object();
            for (var ci = 0; ci < calObj[calId].priority.length; ci++) {
                if (dayClass[calObj[calId].priority[ci]] != undefined) {
                    var splitArr = new Array();
                    splitArr = dayClass[calObj[calId].priority[ci]].split(';');
                    tdClassArr.push(splitArr[0]);
                    tdClassNames[splitArr[0]] = true;
                    if (splitArr[1] != undefined) {
                        tdTextArr.push(splitArr[1]);
                        var tdTextListLink = "";
                        if (splitArr[2] != undefined)
                            tdTextListLink = " onclick=\"cal_open(\'" + splitArr[2] + "\')\"";
                        tdTextListArr.push('<ol><li id="' + tdId + '_li" onmouseover="cal_list2day_over(this)" onmouseout="cal_list2day_out(this)" value="' + dayCnt + '"' + tdTextListLink + '>' + splitArr[1] + '</li></ol>');
                    }
                    if (splitArr[2] != undefined)
                        tdLinkArr.push(splitArr[2]);
                }
            }
            if (tdTextArr.length > 0) {
                tdTextStr = "<span id='" + tdId + "'>";
                for (var i = 0; i < tdTextArr.length; i++) {
                    tdTextStr += tdTextArr[i] + "<br />";
                }
                tdTextStr += "</span>";
                tdMouse = " onmouseover=\"cal_disp_text(\'" + tdId + "\')\" onmouseout=\"cal_hide_text(\'" + tdId + "\')\"";
                tdClassArr.push('pointer');
            }
            if (tdLinkArr.length > 0)
                tdMouse += " onclick=\"cal_open(\'" + tdLinkArr[0] + "\')\"";
            else if (calObj[calId].click) {
                var clickOpenURI = calObj[calId].clickURI;
                clickOpenURI = clickOpenURI.replace(/_YEAR_/ig, year);
                clickOpenURI = clickOpenURI.replace(/_MONTH_/ig, month);
                clickOpenURI = clickOpenURI.replace(/_DAY_/ig, dayCnt);
                if ((calObj[calId].clickClassName != "" && tdClassNames[calObj[calId].clickClassName]) || calObj[calId].clickClassName == "") {
                    tdMouse += " onclick=\"cal_open(\'" + clickOpenURI + "\')\"";
                    tdClassArr.push('pointer');
                }
            }
            if (tdClassArr.length > 0)
                tdClassStr = " class='" + tdClassArr.join(' ') + "'";
            calHTML += "<td id='" + tdId + "_td'><div" + tdClassStr + tdMouse + ">" + dayCnt + tdTextStr + "</div></td>";
            if (week == weekBreak) {
                calHTML += "</tr>";
                if (dayCnt < calObj.days[month]) {
                    calHTML += "<tr>";
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
        };
        calHTML += "</table>";
        d.getElementById('cal' + calId).innerHTML = calHTML;

        if (d.getElementById('schedule' + calId)) {
            d.getElementById('schedule' + calId).innerHTML = "";
            if (tdTextListArr.length > 0 && d.getElementById('schedule' + calId)) {
                d.getElementById('schedule' + calId).innerHTML = tdTextListArr.join('');
            }
        }
    }
    function cal_list2day_over(obj) {
        var d = window.document;
        var dayId = obj.id.substring(0, obj.id.indexOf('_li'));
        if (d.getElementById(calObj.currentList))
            d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
        calObj.currentList = dayId + '_td';
        if (d.getElementById(dayId + '_td'))
            d.getElementById(dayId + '_td').style.backgroundColor = '#CCC';
    }
    function cal_list2day_out(obj) {
        var d = window.document;
        var dayId = obj.id.substring(0, obj.id.indexOf('_li'));
        if (d.getElementById(calObj.currentList))
            d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
    }
    function cal_open(uri) {
        window.open(uri);
    }
    function cal_disp_text(textId) {
        var d = window.document;
        if (navigator.userAgent.indexOf('MSIE') == -1)
            d.getElementById(textId).style.display = "block";
    }
    function cal_hide_text(textId) {
        var d = window.document;
        d.getElementById(textId).style.display = "none";
    }

    function cal_move(calId, m) {
        if (m == null)
            calObj[calId].currentMonth = new Date(calObj.year + "/" + (calObj.month) + "/" + "1 00:00:00");
        else {
            var day = calObj[calId].currentMonth.getDate();
            var month = calObj[calId].currentMonth.getMonth() + 1;
            var year = calObj[calId].currentMonth.getFullYear();
            if (0 < month + m && month + m < 13)
                calObj[calId].currentMonth = new Date(year + "/" + (month + m) + "/" + "1 00:00:00");
            else if ((month + m) < 1) {
                year--;
                month = 12;
                calObj[calId].currentMonth = new Date(year + "/" + (month) + "/" + "1 00:00:00");
            }
            else {
                year++;
                month = 1;
                calObj[calId].currentMonth = new Date(year + "/" + (month) + "/" + "1 00:00:00");
            }
        }
        cal_create(calId);
    }
    function cal_clone(obj) {
        var dest;
        if (typeof obj == 'object') {
            if (obj instanceof Array) {
                dest = new Array();
                for (i = 0; i < obj.length; i++)
                    dest[i] = cal_clone(obj[i]);
            }
            else {
                dest = new Object();
                for (prop in obj)
                    dest[prop] = cal_clone(obj[prop]);
            }
        }
        else
            dest = obj;
        return dest;
    }
    function cal_getMonth() {

    }
    cal_init();
}

/* GlobalNavi
========================================================================== */
function globalNavi() {
    $('.dropDown').hover(function () {
        $(this).children('div').hide().stop().fadeIn(200);
        $('#globalNavi-overlay').hide().stop().fadeIn(200);
    }, function () {
        $(this).children('div').stop().fadeOut(200);
        $('#globalNavi-overlay').stop().fadeOut(200);
    });
    $('.globalNavi-productLevel1 span').on('click', function () {
        var i = $(this).data('catgory-tab'),
            target = '.data-catgory-area' + i;
        $('[class^="data-catgory-area"]').not(target).slideUp(200);
        $(target).slideDown(200);
    });
    $('#header-keywordSearch form').after($('.slideNavi-list-category-item').prop('outerHTML'));
};

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
    if (grobal_lastInnerWidth >= 768) {
        $('#header-keywordSearch').css('display', 'flex');
    } else {
        $('#header-keywordSearch').css('display', 'none');
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
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 88;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });

    var url = $(location).attr('href');
    if (url.indexOf("#&") == -1) {
        if (url.indexOf("#") != -1) {
            var anchor = url.split("#");
            var target = $('#' + anchor[anchor.length - 1]);
            if (target.length) {
                var pos = Math.floor(target.offset().top) - $('.fs-l-header').height();
                $("html, body").animate({ scrollTop: pos }, 0);
            }
        }
    }
};
function sp_searchOpen() {
    $('#searchOpenButton').on('click', function () {
        if ($('#header-keywordSearch').css('display') == 'none') {
            $('#header-keywordSearch').css('display', 'flex');
            $('#header-keywordSearch .slideNavi-list-category-item').css('display', 'block');
        } else {
            $('#header-keywordSearch').css('display', 'none');
        }
    });

    $('#header-keywordSearch .close').on('click', function () {
        $('#header-keywordSearch').css('display', 'none');
    });
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
            $('#slideNavi-list-mypage').css('display', 'block')
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
                    $('#slideNavi').animate({ 'left': '-100%' });
                } else {
                    $('#slideNavi').animate({ 'left': '-50%' });
                }
                $('#slideNavi-overlay').fadeOut();
            } else {
                $(this).addClass('active');
                $('html').css('overflow', 'hidden');
                $('#slideNavi').addClass('open');
                $('#slideNavi').animate({ 'left': '0' });
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
                $('#slideNavi').animate({ 'left': '-100%' });
                $('html').css('overflow', 'scroll');
            } else {
                $('#slideNavi').animate({ 'left': '-50%' });
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
function cartRegistBranch() {
    if ($('#fs_ShoppingCart').length) {
        $('.fs-c-buttonContainer--unregisteredUserPurchase span').html('<span class="textDecoration">会員登録せずにお買い物する</span>');
        $('.fs-c-buttonContainer--unregisteredUserPurchase a').after('<span>【ご注意】送料無料&各種割引クーポンをご利用いただくには会員登録が必要です。</span>');
        $('.fs-c-buttonContainer--loginAndPurchase').after('<div class="fs-c-cartPayment__button fs-c-buttonContainer fs-c-buttonContainer--newUserPurchase"> <a href="/p/register?route=fromCart" class="fs-c-button--unregisteredUserPurchase fs-c-button--secondary click-fromCart"> <span class="fs-c-button__label">会員登録<span class="small-text">（無料）</span>してお買い物する</a> </div>');
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