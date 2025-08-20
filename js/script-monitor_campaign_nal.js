$(function () {
    monitor_campaign_validate();
    monitor_campaign_toggle_tr();
});

function monitor_campaign_validate() {
        // 選択肢の変更時に制御
        $("select[name='field_5306086'], select[name='field_5306087']").on("change", function () {
            //checkProductSelection();
            $(this).removeClass('error');
        });

        $("input[name='field_5306093_0'], input[name='field_5306093_1']").on('change', function () {
            check_company_popularity();
        });

        function needs_tv_size() {
            return $("select[name='field_5306090']").val() === "0"; // テレビ台
        }

        function needs_rack_size() {
            return $("select[name='field_5306090']").val() === "1"; // ディスプレイラック
        }


    $('#monitor_campaign_nal form').validate({
        rules: {
            field_5306084: { required: true },
            field_5306085: { required: true },
            field_5306086: { required: true },
            field_5306087: { required: true },
            field_5306088: { required: true},
            field_5306089: { required: true},
            field_5306090: { required: true },
            field_5309371: { required: needs_tv_size },
            field_5309373: { required: needs_rack_size },
            field_5306094: { required: true, email: true },
            field_5306091: { required: true },
            field_5306092: { required: true },
            field_5306093_0: {required: true},
            field_5306093_1: {required: true}
        },
        messages: {
            field_5306084: { required: '選択してください' },
            field_5306085: { required: '選択してください' },
            field_5306086: { required: '選択してください' },
            field_5306087: { required: '選択してください' },
            field_5306088: { required: '選択してください' },
            field_5306089: { required: '選択してください' },
            field_5306090: { required: '選択してください' },
            field_5309371: { required: 'サイズ・カラーを選択してください' },
            field_5309373: { required: 'サイズ・カラーを選択してください' },
            field_5306094: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5306091: { required: '入力してください' },
            field_5306092: { required: '入力してください' },
            field_5306093_0: { required: '' },
            field_5306093_1: { required: '' }
        },
        errorPlacement: function (error, element) {
            if (element.is("input[name='field_5306093_0']") ||element.is("input[name='field_5306093_1']")){
                //$('.company-popularity-error').find('label.error').remove();

                $('.company-popularity-error').html('<label class="error">選択してください。</label>');
                
            } else {
                element.closest('td').append(error);
            }
        },
        submitHandler: function (form) {
            if (!check_company_popularity()) {
                return false;
            }

            form.submit();
        }
    });    
}

function check_company_popularity() {
    let isField0Checked = $("input[name='field_5306093_0']:checked").length > 0;
    let isField1Checked = $("input[name='field_5306093_1']:checked").length > 0;
    let errorContainer = $('.company-popularity-error');

    //errorContainer.find('label.error').remove();

    if (!isField0Checked && !isField1Checked) {
        errorContainer.html('<label class="error">選択してください。</label>');
        return false;
    } else if (!isField0Checked || !isField1Checked) {
        errorContainer.html('<label class="error">選択してください。</label>');
        return false;
    } else {
        errorContainer.html('');
        return true;
    }
}

function monitor_campaign_toggle_tr() {
    let tv_tr = $("select[name='field_5309371']").closest("tr");
    let rack_tr = $("select[name='field_5309373']").closest("tr");

    function toggle_tr() {
        let selected_val = $("select[name='field_5306090']").val();

        if (selected_val === "0") { // テレビ台
            tv_tr.show();
            rack_tr.hide();
            $("select[name='field_5309373']").val(""); // 不要側リセット
        } else if (selected_val === "1") { // ディスプレイラック
            rack_tr.show();
            tv_tr.hide();
            $("select[name='field_5309371']").val(""); // 不要側リセット
        } else {
            tv_tr.hide();
            rack_tr.hide();
            $("select[name='field_5309371'], select[name='field_5309373']").val("");
        }
    }

    // 初期状態
    toggle_tr();

    // 選択変更時に切り替え
    $("select[name='field_5306090']").on("change", function () {
        toggle_tr();
    });
}