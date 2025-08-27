$(function () {
    questionaire_for_monitor_campaign_winner();
});

function questionaire_for_monitor_campaign_winner() {
    $('#questionaire_for_monitor_campaign_winner_tan form').validate({
        rules: {
            field_5311243: { required: true, email: true },
            field_5311245: { required: true },
            field_5311246: { required: true },
            field_5311248: { required: true},
            field_5311251: { required: true},
            field_5311264: { required: true},
            field_5311265: {required: true},
            field_5311268: {required: true},
            field_5311252: {required: true},
            field_5311253: { required: true },
            field_5196298: { required: true },
            field_5311270: { required: true },
            field_5311272: { required: true },
            field_5311255: { required: true }
        },
        messages: {
            field_5311243: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5311245: { required: '選択してください' },
            field_5311246: { required: '選択してください' },
            field_5311248: { required: '入力してください' },
            field_5311251: { required: '入力してください' },
            field_5311264: { required: '入力してください' },
            field_5311265: { required: '入力してください' },
            field_5311268: { required: '入力してください' },
            field_5311252: { required: '入力してください' },
            field_5311253: { required: '入力してください' },
            field_5196298: { required: '入力してください' },
            field_5311270: { required: '入力してください' },
            field_5311272: { required: '入力してください' },
            field_5311255: { required: '選択してください' }
        },
        errorPlacement: function (error, element) {
            element.closest('td').append(error);
        }
    });   
}