import $ from 'jquery';
import Modal from './Modal';
import FBinit from './FBUtil';

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
        var newEntry = new Modal('.new-entry', '.newpost');
        FBinit();
    });

})($);