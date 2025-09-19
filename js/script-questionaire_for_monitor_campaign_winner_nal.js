$(function () {
    questionaire_for_monitor_campaign_winner();
});

function questionaire_for_monitor_campaign_winner() {
    $('#questionaire_for_monitor_campaign_winner_nal form').validate({
        rules: {
            field_5339204: { required: true, email: true },
            field_5339206: { required: true },
            field_5339207: { required: true },
            field_5339209: { required: true},
            field_5339210: { required: true},
            field_5339211: { required: true},
            field_5339212: {required: true},
            field_5339214: {required: true},
            field_5339215: {required: true},
            field_5339220: { required: true },
            field_5339216: { required: true },
            field_5339217: { required: true },
            field_5339218: { required: true },
        },
        messages: {
            field_5339204: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5339206: { required: '選択してください' },
            field_5339207: { required: '選択してください' },
            field_5339209: { required: '入力してください' },
            field_5339210: { required: '入力してください' },
            field_5339211: { required: '入力してください' },
            field_5339212: { required: '入力してください' },
            field_5339214: { required: '入力してください' },
            field_5339215: { required: '入力してください' },
            field_5339220: { required: '入力してください' },
            field_5339216: { required: '入力してください' },
            field_5339217: { required: '入力してください' },
            field_5339218: { required: '選択してください' },
        },
        errorPlacement: function (error, element) {
            element.closest('td').append(error);
        }
    });   
}