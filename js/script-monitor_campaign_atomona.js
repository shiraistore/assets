$(function () {
    monitor_campaign_atomona_validate();
});

function monitor_campaign_atomona_validate() {
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
            field_5134808: {
                required: true
            },
            field_5134815: {
                required: true
            },
            field_5134816: {
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
            field_5134808: {
                required: '選択してください'
            },
            field_5134815: {
                required: '選択してください'
            },
            field_5134816: {
                required: '選択してください'
            },
            field_5134790: {
                required: '選択してください',
                email: 'メールアドレスを正しく入力してください'
            }
        }
    });
}