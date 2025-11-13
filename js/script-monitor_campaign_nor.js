$(function () {
    monitor_campaign_validate();
});

function monitor_campaign_validate() {
        // 選択肢の変更時に制御
        $("select[name='field_5376421']").on("change", function () {
            //checkProductSelection();
            $(this).removeClass('error');
        });

        $("input[name='field_5376426_0'], input[name='field_5376426_1']").on('change', function () {
            check_company_popularity();
        });

    $('#monitor_campaign_nor form').validate({
        rules: {
            field_5376415: { required: true },
            field_5376416: { required: true },
            field_5376417: { required: true },
            field_5376418: { required: true },
            field_5376419: { required: true},
            field_5376420: { required: true},
            field_5376421: { required: true },
            field_5376424: { required: true },
            field_5376425: { required: true },
            field_5376426_0: { required: true },
            field_5376426_1: { required: true },
            field_5376427: { required: true }
        },
        messages: {
            field_5376415: { required: '選択してください' },
            field_5376416: { required: '選択してください' },
            field_5376417: { required: '選択してください' },
            field_5376418: { required: '選択してください' },
            field_5376419: { required: '選択してください' },
            field_5376420: { required: '選択してください' },
            field_5376421: { required: '選択してください' },
            field_5376424: { required: '入力してください' },
            field_5376425: { required: '入力してください' },
            field_5376426_0: { required: '' },
            field_5376426_1: { required: '' },
            field_5376427: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            }
        },
        errorPlacement: function (error, element) {
            if (element.is("input[name='field_5376426_0']") ||element.is("input[name='field_5376426_1']")){
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
    let isField0Checked = $("input[name='field_5376426_0']:checked").length > 0;
    let isField1Checked = $("input[name='field_5376426_1']:checked").length > 0;
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
