$(function () {
    monitor_campaign_validate();
});

function monitor_campaign_validate() {
        // 選択肢の変更時に制御
        $("select[name='field_5274845'], select[name='field_5274846']").on("change", function () {
            //updateSelectOptions();
            //checkProductSelection();
            $(this).removeClass('error');
        });

        $("input[name='field_5274856_0'], input[name='field_5274856_1']").on('change', function () {
            check_company_popularity();
        });
    
        function updateSelectOptions() {
            let selectedValues = [];
            $("select[name='field_5274845'], select[name='field_5274846']").each(function () {
                let val = $(this).val();
                if (val !== '' && val !== '4') {
                    selectedValues.push(val);
                }
            });
    
            $("select[name='field_5274845'], select[name='field_5274846']").each(function () {
                let currentVal = $(this).val();
                let $this = $(this);
    
                $this.find("option").prop("disabled", false);
    
                $this.find('option').each(function () {
                    if (selectedValues.includes($(this).val()) && $(this).val() !== currentVal && $(this).val() !== '4') {
                        $(this).prop('disabled', true);
                    }
                });
            });
        }

    $('#monitor_campaign_tan form').validate({
        rules: {
            field_5274843: { required: true },
            field_5274844: { required: true },
            field_5274845: { required: true },
            field_5274846: { required: true },
            field_5274847: { required: true},
            field_5274849: { required: true},
            field_5274852: { required: true},
            field_5274857: { required: true, email: true },
            field_5274858: { required: true },
            field_5274887: { required: true },
            field_5274856_0: {required: true},
            field_5274856_1: {required: true}
        },
        messages: {
            field_5274843: { required: '選択してください' },
            field_5274844: { required: '選択してください' },
            field_5274845: { required: '選択してください' },
            field_5274846: { required: '選択してください' },
            field_5274847: { required: '選択してください' },
            field_5274849: { required: '選択してください' },
            field_5274852: { required: '選択してください' },
            field_5274857: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5274858: { required: '入力してください' },
            field_5274887: { required: '入力してください' },
            field_5274856_0: { required: '' },
            field_5274856_1: { required: '' }
        },
        errorPlacement: function (error, element) {
            if (element.is("input[name='field_5274856_0']") ||element.is("input[name='field_5274856_1']")){
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

// function checkProductSelection() {
//     let isAnyEmpty = false;
//     $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
//         if ($(this).val() === '') {
//             isAnyEmpty = true;
//         }
//     });

//     let errorContainer = $('.product-selection-error');

//     if (isAnyEmpty) {
//         errorContainer.html('<label class="error">すべての希望商品を選択してください</label>');
//         return false;
//     } else {
//         errorContainer.html('');
//         return true;
//     }
// }

function check_company_popularity() {
    let isField0Checked = $("input[name='field_5274856_0']:checked").length > 0;
    let isField1Checked = $("input[name='field_5274856_1']:checked").length > 0;
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