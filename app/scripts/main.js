(function($){

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    var Modal = function ($elt){
        this.active = false;
        this.$modal = $elt;
        this.response = {};
        this.$submit = this.$modal.find('input[type="button"]').first();

        this.$submit.click((e)=>{
            e.preventDefault();
            this.$modal.addClass('u-hidden');
        });

        function delayAnimate($items, animation, interval = 0) {
            var delay = 0;

            $items.addClass('u-invisible');

            console.log('delaying now');

            $.each($items, function(i, item) {
                setTimeout(function() {
                    $(item).removeClass('u-invisible');
                    $(item).animateCss(animation);
                }, delay);
                delay+= interval;
            })
        }

        return {
            showModal : ()=>{
                console.log('clicked');
                this.$modal.removeClass('u-hidden');
                delayAnimate(this.$modal.children(), 'fadeInUp');
                delayAnimate(this.$modal.find('form > *'), 'fadeInUp', 250);
            }
        };
    };

    $(document).ready(function(){
        var newEntry = new Modal($('.new-entry'));

        $('.newpost').click(newEntry.showModal);
    });

})(jQuery);