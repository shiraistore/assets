$(function () {
    monitor_campaign_atomona_validate();
});

function monitor_campaign_atomona_validate() {
    $("input[name='field_5134815[]']").on("change", function () {
        if ($("input[name='field_5134815[]']:checked").length > 3) {
            alert("最大3つまで選択可能です");
            this.checked = false;
        }
    });

    $('#monitor_campaign_atomona form').validate({
        rules: {
            field_5134805: {
                required: true
            },
            field_5134791: {
                required: true
            },
            field_5134806: {
                required: true
            },
            field_5134807: {
                required: true
            },
            field_5134815: {
                required: true
            },
            field_5134790: {
                required: true,
                email: true
            }
        },
        messages: {
            field_5134805: {
                required: '選択してください'
            },
            field_5134791: {
                required: '選択してください'
            },
            field_5134806: {
                required: '選択してください'
            },
            field_5134807: {
                required: '選択してください'
            },
            field_5134815: {
                required: '選択してください'
            },
            field_5134790: {
                required: '入力してください',
                email: 'メールアドレスを正しく入力してください'
            }
        },
        errorPlacement: function (error, element) {
            element.closest('td').append(error);
        }
    });

    $(document).ready(function () {
        // 選択肢の変更時に制御
        $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").on("change", function () {
            updateSelectOptions();
        });
    
        function updateSelectOptions() {
            // 全ての選択肢の値を取得
            let selectedValues = [];
            $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
                let val = $(this).val();
                if (val !== "" && val !== "4") { // 「希望しない」(value="4") は除外
                    selectedValues.push(val);
                }
            });
    
            // 各セレクトボックスを更新
            $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").each(function () {
                let currentVal = $(this).val();
                let $this = $(this);
    
                // 一度すべての選択肢を有効にする
                $this.find("option").prop("disabled", false);
    
                // 他のセレクトで選ばれている値を無効化
                $this.find("option").each(function () {
                    if (selectedValues.includes($(this).val()) && $(this).val() !== currentVal && $(this).val() !== "4") {
                        $(this).prop("disabled", true);
                    }
                });
            });
        }
    });
    
}