$(function () {
    questionaire_for_winner_atmona_campaign_validate();
});

function questionaire_for_winner_atmona_campaign_validate() {
    var additional_row = $("tr.additional");
    
    // 初期状態のチェック
    var $selected = $('input[name="field_5196344"]:checked');
    if ($selected.length > 0 && $selected.val() === "7") {
        additional_row.show();
    } else {
        additional_row.hide();
    }
    
    // 変更イベントの設定
    $('input[name="field_5196344"]').on("change", function() {
        if ($(this).val() === "7") {
            additional_row.show();
        } else {
            additional_row.hide();
        }
    });

    $('#questionaire_for_winner_atmona_campaign form').validate({
        rules: {
            field_5196279: { required: true, email: true },
            field_5196266: { required: true },
            field_5196289: { required: true },
            field_5196293: { required: true },
            field_5196344: { required: true},
            field_5198822: { required: true},
            field_5196295: { required: true},
            field_5196296: {required: true},
            field_5196299: {required: true},
            field_5196343: {required: true}
        },
        messages: {
            field_5196279: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5196266: { required: '選択してください' },
            field_5196289: { required: '選択してください' },
            field_5196293: { required: '入力してください' },
            field_5196344: { required: '選択してください' },
            field_5198822: { required: '入力してください' },
            field_5196295: { required: '入力してください' },
            field_5196296: { required: '入力してください' },
            field_5196299: { required: '選択してください' },
            field_5196343: { required: '選択してください' }
        },
        errorPlacement: function (error, element) {
            element.closest('td').append(error);
        }
    });   
}