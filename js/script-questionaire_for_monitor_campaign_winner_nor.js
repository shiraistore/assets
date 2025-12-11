$(function () {
    questionaire_for_monitor_campaign_winner();
});

function questionaire_for_monitor_campaign_winner() {
    $('#questionaire_for_monitor_campaign_winner_nor form').validate({
        rules: {
            field_5404795: { required: true, email: true },
            field_5404797: { required: true },
            field_5404798: { required: true },
            field_5404820: { required: true},
            field_5404821: { required: true},
            field_5404800: {required: true},
            field_5404801: {required: true},
            field_5404802: {required: true},
            field_5404803: { required: true },
            field_5404804: { required: true },
            field_5404806: { required: true },
            field_5404807: { required: true },
            field_5404808: { required: true },
            field_5404809: { required: true },
        },
        messages: {
            field_5404795: {
                required: 'メールアドレスを入力してください',
                email: '正しいメールアドレスを入力してください'
            },
            field_5404797: { required: '選択してください' },
            field_5404798: { required: '選択してください' },
            field_5404820: { required: '入力してください' },
            field_5404821: { required: '入力してください' },
            field_5404800: { required: '入力してください' },
            field_5404801: { required: '入力してください' },
            field_5404802: { required: '入力してください' },
            field_5404803: { required: '入力してください' },
            field_5404804: { required: '入力してください' },
            field_5404806: { required: '入力してください' },
            field_5404807: { required: '入力してください' },
            field_5404808: { required: '入力してください' },
            field_5404809: { required: '選択してください' },
        },
        errorPlacement: function (error, element) {
            element.closest('td').append(error);
        }
    });   
}