$(function () {
    monitor_campaign_atomona_validate();
});

function monitor_campaign_atomona_validate() {
        // 選択肢の変更時に制御
        $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").on("change", function () {
            updateSelectOptions();
            checkProductSelection();
            $(this).removeClass('error');
        });

        $("input[name='field_5134817_0'], input[name='field_5134817_1']").on('change', function () {
            checkCompanyPopularity();
        });
    
        function updateSelectOptions() {
            let selectedValues = [];
            $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
                let val = $(this).val();
                if (val !== '' && val !== '4') {
                    selectedValues.push(val);
                }
            });
    
            $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
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

    $("input[name='field_5134815']").on("change", function () {
        if ($("input[name='field_5134815']:checked").length > 3) {
            alert("最大3つまで選択可能です");
            this.checked = false;
        }
    });

    $('#monitor_campaign_atomona form').validate({
        rules: {
            field_5134805: { required: true },
            field_5134791: { required: true },
            field_5134806: { required: true },
            field_5134807: { required: true },
            field_5134808: { required: true},
            field_5134815: { required: true},
            field_5134816: { required: true},
            field_5134790: { required: true, email: true },
            field_5141573: { required: true, depends: checkProductSelection },
            field_5141575: { required: true, depends: checkProductSelection },
            field_5141586: { required: true, depends: checkProductSelection },
            field_5141587: { required: true, depends: checkProductSelection },
            field_5134817_0: {required: true},
            field_5134817_1: {required: true}
        },
        messages: {
            field_5134805: { required: '選択してください' },
            field_5134791: { required: '選択してください' },
            field_5134806: { required: '選択してください' },
            field_5134807: { required: '選択してください' },
            field_5134808: { required: '選択してください' },
            field_5134815: { required: '選択してください（最大3つ）' },
            field_5134816: { required: '選択してください' },
            field_5134790: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5141573: { required: '選択してください' },
            field_5141575: { required: '選択してください' },
            field_5141586: { required: '選択してください' },
            field_5141587: { required: '選択してください' },
            field_5134817_0: { required: '' },
            field_5134817_1: { required: '' }
        },
        errorPlacement: function (error, element) {
            if (element.is("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']")) {
                return;
            } else if (element.is("input[name='field_5134817_0'], input[name='field_5134817_1']")){
                $('.company-popularity-error').html('<label class="error">選択してください。</label>');
            }
            element.closest('td').append(error);
        },
        submitHandler: function (form) {
            if (!checkProductSelection()) {
                return false;
            } else if (!checkCompanyPopularity()){
                return false;
            }
            form.submit();
        }
    });    
}

function checkProductSelection() {
    let isAnyEmpty = false;
    $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
        if ($(this).val() === '') {
            isAnyEmpty = true;
        }
    });

    let errorContainer = $('.product-selection-error');

    if (isAnyEmpty) {
        errorContainer.html('<label class="error">すべての希望商品を選択してください</label>');
        return false;
    } else {
        errorContainer.html('');
        return true;
    }
}

function checkCompanyPopularity() {
    let isField0Checked = $("input[name='field_5134817_0']:checked").length > 0;
    let isField1Checked = $("input[name='field_5134817_1']:checked").length > 0;
    let errorContainer = $('.company-popularity-error');

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