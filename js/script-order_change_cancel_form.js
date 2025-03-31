$(function () {
    inputValue();
    contacts_form();
    contact_form_validate();
});

function inputValue(){
    const code = getParam('on');
    document.getElementById('orderCode').value = code;
}

$(document).ready(function() {
    contacts_form();

    $('#select_case').change(function() {
        contacts_form();
        toggleProductChangeCaption();
    });

    toggleProductChangeCaption();
});

function toggleProductChangeCaption() {
    var selectedValue = $('#select_case').val();
    if (selectedValue === "1") {
        $('#product_change_caption').css('display', 'block');
    } else {
        $('#product_change_caption').css('display', 'none');
    }
}

function contacts_form() {
    if ($('#order_change_cancel').length) {
        var value = $('[name=case]').val();

        // すべてのフォームを非表示
        $('#contacts form').hide();

        var activeForm;
        
        // 選択されたフォームのみ表示
        switch (value) {
            case "0":
            case "1":
                activeForm = $('#orderCancel').show();
                break;
            case "2":
                activeForm = $('#adress_time_change').show();
                break;
            case "3":
                activeForm = $('#orderChange').show();
                break;
        }

        // **エラー表示をリセット**
        resetValidationErrors();

        // バリデーションを適用
        contact_form_validate(activeForm);

        // チェックボックスのクリック処理
        $('li:has(input[type=checkbox])').on('click', function(e){
            $(this).find('input[type=checkbox]').click();
        });

        $('li input[type=checkbox]').on('click', function(e){
            e.stopPropagation();
        });

        // URLパラメータで orderCode がある場合は各フォームの該当フィールドに適用
        var orderCode = getParam('orderCode');
        if (orderCode !== '') {
            $('.orderCode').each(function () {
                $(this).val(orderCode);
            });
        }
    }
}

// **エラーメッセージとエラークラスをリセット**
function resetValidationErrors() {
    $('#contacts table td input, #contacts table td textarea, #contacts table td select').removeClass('error');
    $('#contacts table td label.error').remove();  // バリデーションメッセージも削除
}

// フォームごとに異なるバリデーションを適用
function contact_form_validate(activeForm) {
    // 既存のバリデーションを削除
    $('#contacts form').each(function () {
        $(this).validate().destroy();
        $(this).validate().destroy();
    });

    // 表示されているフォームに対してのみバリデーションを適用
    if (activeForm) {
        activeForm.validate({
            rules: getValidationRules(activeForm),
            messages: getValidationMessages(activeForm)
        });
    }
}

// 各フォームごとのバリデーションルール
function getValidationRules(activeForm) {
    if (activeForm.is('#contacts_form_input')) {
        return {
            field_3056000_sei: { required: true },
            field_3056000_mei: { required: true },
            field_3056001: { required: true, email: true },
            field_3056002: { required: true }
        };
    } else if (activeForm.is('#receipt_form')) {
        return {
            field_4559439_sei: { required: true },
            field_4559439_mei: { required: true },
            field_4552323: { required: true, email: true },
            field_4553669: { required: true }
        };
    } else if (activeForm.is('#orderCancel')) {
        return {
            field_3939641_sei: { required: true },
            field_3939641_mei: { required: true },
            field_3939642: { required: true, email: true },
            field_3939643: { required: true },
            field_3939644: { required: true }
        };
    } else if (activeForm.is('#adress_time_change')) {
        return {
            field_5155061_sei: { required: true },
            field_5155061_mei: { required: true },
            field_5155062: { required: true, email: true },
            field_5155063: { required: true },
            field_5155072_zip: { required: true, digits: true, maxlength: 7 },
            field_5155072_pref: { required: true },
            field_5155072_city: { required: true },
            field_5155072_block: { required: true },
            field_5155105: { required: true }
        };
    } else if (activeForm.is('#orderChange')) {
        return {
            field_3938796_sei: { required: true },
            field_3938796_mei: { required: true },
            field_3938797: { required: true, email: true },
            field_3938802: { required: true },
            field_3938799: { required: true }
        };
    } else if (activeForm.is('#tnl_color_sample_form')) {
        return {
            field_5171100_sei: { required: true },
            field_5171100_mei: { required: true },
            field_5171103_zip: { required: true },
            field_5171103_pref: { required: true },
            field_5171103_city: { required: true },
            field_5171103_block: { required: true },
            field_5171121: { required: true },
            field_5171101: { required: true, email: true },
            field_5171123: { required: true }
        };
    }
    return {};
}

// 各フォームごとのバリデーションメッセージ
function getValidationMessages(activeForm) {
    return {
        field_24437_sei: {
            required: '姓を入力してください'
        },
        field_24437_mei: {
            required: '名を入力してください'
        },
        field_24438: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_24443: {
            required: '内容を入力してください'
        },
        field_24455: {
            required: '選択してください'
        },

        field_3056000_sei: {
            required: '姓を入力してください'
        },
        field_3056000_mei: {
            required: '名を入力してください'
        },
        field_3056001: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_3056002: {
            required: '内容を入力してください'
        },
        field_3056003: {
            required: '選択してください'
        },

        field_24437_sei: {
            required: '姓を入力してください'
        },
        field_24437_mei: {
            required: '名を入力してください'
        },
        field_24438: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_24443: {
            required: '内容を入力してください'
        },
        field_24455: {
            required: '選択してください'
        },

        field_4559439_sei: {
            required: '姓を入力してください'
        },
        field_4559439_mei: {
            required: '名を入力してください'
        },
        field_4552323: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_4553669: {
            required: '宛名を入力してください'
        },

        field_3938796_sei: {
            required: '姓を入力してください'
        },
        field_3938796_mei: {
            required: '名を入力してください'
        },
        field_3938797: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_3938802: {
            required: '注文コードを入力してください'
        },
        field_3938799: {
            required: '変更内容を入力してください'
        },

        field_3939641_sei: {
            required: '姓を入力してください'
        },
        field_3939641_mei: {
            required: '名を入力してください'
        },
        field_3939642: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_3939643: {
            required: '注文コードを入力してください'
        },
        field_3939644: {
            required: 'キャンセル理由を入力してください'
        },

        field_5155061_sei: {
            required: '姓を入力してください'
        },
        field_5155061_mei: {
            required: '名を入力してください'
        },
        field_5155062: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_5155063: {
            required: '注文コードを入力してください'
        },
        field_5155072_zip: {
            required: '郵便番号を入力してください',
            digits: '半角数字のみで入力してください',
            maxlength: '7桁の半角数字で入力してください'
        },
        field_5155072_pref: {
            required: '都道府県を選択してください'
        },
        field_5155072_city: {
            required: '市町村を入力してください'
        },
        field_5155072_block: {
            required: '番地を入力してください'
        },
        field_5155072_building: {
            required: 'マンション・ビル名を入力してください'
        },
        field_5155105: {
            required: 'お届け時間帯を選択してください'
        },

        field_5171100_sei: {
            required: '姓を入力してください'
        },
        field_5171100_mei: {
            required: '名を入力してください'
        },
        field_5171103_zip: {
            required: '郵便番号を入力してください'
        },
        field_5171103_pref: {
            required: '都道府県を選択してください'
        },
        field_5171103_city: {
            required: '市町村を入力してください'
        },
        field_5171103_block: {
            required: '番地を入力してください'
        },
        field_5171121: {
            required: '電話番号を入力してください'
        },
        field_5171101: {
            required: 'メールアドレスを入力してください',
            email: 'メールアドレスを正確に入力してください'
        },
        field_5171123: {
            required: 'ご希望の色見本を選択してください'
        }
    };
}