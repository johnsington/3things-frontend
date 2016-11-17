import Modal from './Modal';

(function($){

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

    $(document).ready(function(){
        var newEntry = new Modal( jQuery, '.new-entry', '.newpost');
    });

})(jQuery);