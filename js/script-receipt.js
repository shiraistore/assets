$(function () {
    inputValue();
    receiptFormValidate();
});

function inputValue(){
    const code = getParam('on');
    document.getElementById("orderCode").value = code;
}

function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function receiptFormValidate() {
    $('#receiptForm form').validate({
        rules: {
            field_24437_sei: {
                required: true
            },
            field_24437_mei: {
                required: true
            },
            field_24438: {
                required: true,
                email: true
            },
            field_24443: {
                required: true
            },
            field_24455: {
                required: true
            },
            
            field_4559439_sei: {
                required: true
            },
            field_4559439_mei: {
                required: true
            },
            field_4552323: {
                required: true,
                email: true
            },
            field_4553669: {
                required: true
            },
        },

        messages: {
            field_24437_sei: {
                required: '姓を入力してください'
            },
            field_24437_mei: {
                required: '名を入力してください'
            },
            field_24438: {
                required: 'メールアドレスを入力してください',
                email: 'メールアドレスを正確に入力してください'
            },
            field_24443: {
                required: '内容を入力してください'
            },
            field_24455: {
                required: '選択してください'
            },

            field_4559439_sei: {
                required: '姓を入力してください'
            },
            field_4559439_mei: {
                required: '名を入力してください'
            },
            field_4552323: {
                required: 'メールアドレスを入力してください',
                email: 'メールアドレスを正確に入力してください'
            },
            field_4553669: {
                required: '宛名を入力してください'
            }
        }
    });
}