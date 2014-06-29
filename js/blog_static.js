$(function() {
    $('body').ajaxError(function(event, request, settings, err) {
        console.log(event);
    });
    $.ajaxSetup({
        cache: false
    });

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
	//ceshi

    var blog = {};
    blog.views = {};
    blog.helper = {};

    //修改多说最近评论
    blog.helper.build_sidebar_duoshuo = function(data){
        var result = {};
        var messages = [];
        for(var i = 0;i<=data.length;i++){
            var message = data[i];
            messages[i] = {"data-post-id":message.post_id,"author_url":message.author_url,"author_name":message.author_name,
                            "avatar_url":message.author.avatar_url,"created_at":message.created_at,
                            "thread_key":message.thread_key,"message":message.thread.message};
        }

        result.messages=messages;
        return result;
    };
    
    //代码高亮
    blog.helper.highlight = function () {
        return $('pre code').each(function(i, e) {
            return hljs.highlightBlock(e, '    ');
        });
    };    
});