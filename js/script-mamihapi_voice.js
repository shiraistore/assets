$(function () {
	get_instagram_post();
	review_modal();
});

/* get_instagram_post
========================================================================== */

function get_instagram_post() {
	var url = 'https://h15yyu8zof.execute-api.ap-northeast-1.amazonaws.com/prod/get_instagram_post';

	var group_names = [];
	$('.instagram_post_list').each(function () {
		group_names.push($(this).data('instagram_post_group_name'));
	});

	console.log('送信するセクション一覧:', group_names);

	var request = {
		group_names: group_names
	};

	$.ajax({
		type: 'POST',
		url: url,
		async: true,
		data: JSON.stringify(request),
		contentType: 'application/json',
		dataType: 'json',
		success: function (response) {
			if (!response || !response.items || !Array.isArray(response.items)) {
				console.warn('無効なレスポンス形式:', response);
				return;
			}

			response.items.forEach(function (groupData) {
				var groupName = groupData.group_name;
				var posts = groupData.data.posts;

				var $target = $('.instagram_post_list[data-instagram_post_group_name="' + groupName + '"]');

				if ($target.length) {
					var $ul = $('<ul></ul>');

					posts.forEach(function (post) {
						try {
							var data = typeof post.data === 'string' ? JSON.parse(post.data) : post.data;
							var thumbnailUrl = data.thumbnail_url;
							var postId = post.post_id;
							var instagramLink = 'https://www.instagram.com/p/' + postId;

							if (thumbnailUrl && postId) {
								var $li = $('<li></li>');
								var $a = $('<a></a>').attr('href', instagramLink).attr('target', '_blank');
								var $img = $('<img>').attr('src', thumbnailUrl).attr('alt', postId);
								$a.append($img);
								$li.append($a);
								$ul.append($li);
							}
						} catch (e) {
							console.warn('JSON parse error or missing data:', post);
						}
					});

					$target.append($ul);
				}
			});
		},
		error: function (xhr, status, error) {
			console.error('エラー発生:', xhr.responseText);
		},
	});
}

/* review_modal
========================================================================== */

function review_modal() {
		// $('.modal_button_01').on('click', function () {
		// 	$('.modal_content_01').fadeIn(300);
		// 	$('#modal_content_overlay').fadeIn(300);
		// 	return false;
		// });

		// $('.modal_button_02').on('click', function () {
		// 	$('.modal_content_02').fadeIn(300);
		// 	$('#modal_content_overlay').fadeIn(300);
		// 	return false;
		// });

		// $('.modal_button_03').on('click', function () {
		// 	$('.modal_content_03').fadeIn(300);
		// 	$('#modal_content_overlay').fadeIn(300);
		// 	return false;
		// });

		// $('.modal_button_04').on('click', function () {
		// 	$('.modal_content_04').fadeIn(300);
		// 	$('#modal_content_overlay').fadeIn(300);
		// 	return false;
		// });

		// $('.modal_button_05').on('click', function () {
		// 	$('.modal_content_05').fadeIn(300);
		// 	$('#modal_content_overlay').fadeIn(300);
		// 	return false;
		// });

		// $('#modal_content_overlay, .modal_close span').on('click', function () {
		// 	$('.modal_content_01,.modal_content_02,.modal_content_03,.modal_content_04,.modal_content_05').fadeOut(300);
		// 	$('#modal_content_overlay').fadeOut(300);
		// 	return false;
		// });

		// $('.open_modal').click(function() {
		// 	var btnIndex = $(this).index(); 
		// 	//何番目のモーダルボタンかを取得
		// 	$('.modalArea').eq(btnIndex).addClass('is-open'); 
		// 	//クリックしたモーダルボタンと同じ番目のモーダルを表示する。addClassでis-openクラスを追加して表示する
		// 	$('html, body').css('overflow', 'hidden'); 
		// 	// overflow:hidden;の追加で背景のスクロール禁止に
		// });
		// $('.closeModal, .modalBg').click(function() { //closeModalかmodalBgをクリックした時に
		// 	$('.modalArea').removeClass('is-open'); 
		// 	//モーダルを非表示にする。removeClassでis-openクラスを削除して非表示にする
		// 	$('html, body').removeAttr('style'); 
		// 	//追加したoverflow:hidden;を削除
		// });


		$(document).on('click', '.open_modal', function () {
			const item = $(this).closest('.fs-c-reviewList__item').clone();
			const body = item.find('.fs-c-reviewBody').html();

			// .excerpt を .fs-c-reviewBody の内容で置換
			item.find('.excerpt').replaceWith(`<p class="excerpt">${body}</p>`);

			// モーダルに表示
			$('#review_modal .review_modal_content').html(item);
			$('#review_modal').fadeIn(300);
		});

		// モーダルの閉じる処理
		$(document).on('click', '.review_modal_overlay', function () {
			$('#review_modal').fadeOut(300);
		});
}