import $ from 'jquery';

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (callback){
                callback();
                $(this).off(animationEnd);
            }
        });
    }
});

export function delayAnimate($items, animation, interval = 0) {
    var delay = 0;

    $items.addClass('u-invisible');

    $.each($items, function(i, item) {
        setTimeout(function() {
            $(item).removeClass('u-invisible');
            $(item).animateCss(animation);
        }, delay);
        delay+= interval;
    })
}