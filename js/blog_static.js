$(document).ready(function () {
	// 添加评论列表
	function addDiscuzList(_div) {

        var _discuz_title = document.createElement('h3');
        _discuz_title.innerHTML="最新评论";
        _div.append(_discuz_title);

        var el = document.createElement('ul');
        el.setAttribute('data-num-items', "10");

        el.setAttribute('data-excerpt-length',"70");
        el.setAttribute('data-show-title', "0");
        DUOSHUO.RecentComments(el);
        _div.append(el);
    }
	 //近期访客
	function addDiscuzUsers(_div) {
		var _discuz_title = document.createElement('h3');
		_discuz_title.innerHTML="近期访客";
		_div.append(_discuz_title);

		var el = document.createElement('ul');
		el.setAttribute('data-num-items', "10");
		el.setAttribute('data-excerpt-length',"70");
		el.setAttribute('data-show-title', "0");

		DUOSHUO.RecentVisitors(el);
		_div.append(el);
    }
	//添加多说评论
	function addDiscuz(_div, file, title){
		var url = location.protocol + '//' + location.host + location.pathname;
        var el = document.createElement('div');//该div不需要设置class="ds-thread"
        el.setAttribute('data-thread-key', file);//必选参数
        el.setAttribute('data-url', url);//必选参数
        el.setAttribute('data-title', title);//必选参数
        DUOSHUO.EmbedThread(el);
        _div.append(el);
    }
	
	var duoshuo_interval_id = setInterval(function () {
		if (typeof DUOSHUO !== 'undefined') {
			clearInterval(duoshuo_interval_id);
			addDiscuzList($(".sidebar-comment"));
			addDiscuzUsers($(".sidebar-users"));
			
			//当前不是列表页是才用显示评论
			var without_param = location.protocol + '//' + location.host + location.pathname;
			var article_view_prefix = location.protocol + '//' + location.host  + '/article/';
			if (without_param >= article_view_prefix) {
				if (without_param.substring(0, article_view_prefix.length) === article_view_prefix) {
					var article = without_param.substring(article_view_prefix.length, without_param.length - '.html'.length);
					addDiscuz($(".article-content"), article, "");
				}
			}
		}
	}, 20);
	
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '100', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: 'Top', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});
	  
	 // 代码高亮
	 $('pre code').each(function(i, e) {
         return hljs.highlightBlock(e, '    ');
     });
});