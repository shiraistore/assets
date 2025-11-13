$(function () {
	// getReviews();
});

/* getReviews
========================================================================== */

function getReviews() {
	var url = 'https://chf394ul5c.execute-api.ap-northeast-1.amazonaws.com/prod/getReviewsForProductsList';

	var sort_by = function (field, reverse, primer) {
		reverse = reverse ? -1 : 1;
		return function (a, b) {
			a = a[field];
			b = b[field];
			if (typeof primer != 'undefined') {
				a = primer(a);
				b = primer(b);
			}
			if (a < b) return reverse * -1;
			if (a > b) return reverse * 1;
			return 0;
		};
	};

	$('.fs-c-productReview__reviewList').each(function () {
		var request = [];
		var products = $(this).data('products').split(',');
		// console.log(products);
		$(this).empty();
		for (product of products) {
			for (let i = 1; i < 4; i++) {
				request.push({ product_number: product, review_number: i });
			}
		}

		// console.log(request);

		request;

		var results = $.ajax({
			type: 'post',
			url: url,
			async: false,
			data: JSON.stringify(request),
			contentType: 'application/json',
			dataType: 'json',
			scriptCharset: 'utf-8',
			success: function (results) {
				// Success
				//console.log(JSON.stringify(response));
			},
			error: function (results) {
				// Error
				//console.log(JSON.stringify(response));
			},
		}).responseText;

		if (results != '[]') {
			results = results.replace(/\r?\n/g, '<br>');

			results = JSON.parse(results);

			$.each(results, function (i, item) {
				var changeDate = results[i].updated_at.replace(/-/g, '').replace(/T.+/, '');
				results[i].updated_at = changeDate;
			});

			results.sort(sort_by('updated_at', true, parseInt));
			// console.log(results);

			var reviewsHtml = '';
			for (const review of results) {
				const productId12Length = zeroPadding(review.product_id, 12);
				const productGroup = Math.floor(review.product_id / 100);
				const productGroup3Length = zeroPadding(productGroup, 3);
				const productThumbnailNumber2Length = zeroPadding(review.product_thumbnail_number, 2);

				//console.log(review.product_number);
				const productNumber = review.product_number;
				let productUrl;

				// let upDate = review.updated_at.split('T');
				let upDate = review.updated_at.substr(0, 4) + '/' + review.updated_at.substr(4, 2) + '/' + review.updated_at.substr(6, 2);
				// upDate = upDate[0].replace(/-/g, '/');

				reviewsHtml += `<li class="fs-c-reviewList__item reviewScore-${review.rating}"><div class="reviewContent"><div class="fs-c-reviewList__item__info fs-c-reviewInfo"><div class="fs-c-reviewInfo__reviewer fs-c-reviewer"><div class="fs-c-reviewer__name"><span class="fs-c-reviewer__name__nickname">${review.nickname}</span></div><div class="fs-c-reviewer__status"><span class="fs-c-reviewerStatus">購入者</span></div><div class="fs-c-reviewer__profile"></div></div><dl class="fs-c-reviewInfo__date"><dt>投稿日</dt><dd><time datetime="${review.updated_at}" class="fs-c-time">${upDate}</time></dd></dl><div class="fs-c-reviewRating"><div class="fs-c-rating__stars fs-c-reviewStars" data-ratingcount="${review.rating}.0"></div></div></div><div class="color">${review.product_color}</div><div class="fs-c-reviewList__item__body fs-c-reviewBody">${review.body}</div></div></li>`;
			}
			$(this).html(reviewsHtml);
		}
	});
}
