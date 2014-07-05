var wait_jquery_timer = setInterval(function () {
	if ('undefined' !== typeof $) {
		clearInterval(wait_jquery_timer);
		$.getJSON('/post/recruitment_oss.json', {}, function (data) {
			var template = $("#tpl-recruitment").html();
			var html = Mustache.to_html(template, data);
			$("#div-siderbar").html(html);
		});
	}
}, 10);