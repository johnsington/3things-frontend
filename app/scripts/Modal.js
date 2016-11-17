import $ from 'jquery';
import ApiUtil from './apiUtil';

let api = ApiUtil();

export default function(elt, openerClass){
    this.active = false;
    this.$modal = $(elt);
    this.response = {};
    this.$opener = $(openerClass);
    this.$clone = this.$modal.clone(true);
    this.$submit = this.$modal.find('input[type="button"]').first();

    this.registerOpener = ()=> {
        this.$opener.click(this.showModal);
    }

    this.$submit.click((e)=>{
        let $modal = this.$modal;
        e.preventDefault();

        //validate form here
        api.postUser('Joanne');

        $modal.find('.form-container').addClass('u-hidden');
        $modal.find('.success').removeClass('u-hidden');
        delayAnimate($modal.find('.success').children(), 'fadeInUp');

        setTimeout(function(){

            $modal.animateCss('fadeOut', function() {
                $modal.addClass('u-hidden');
                $modal.find('.form-container').removeClass('u-hidden');
                $modal.find('.success').addClass('u-hidden');
            });
        }, 1050);
        
    });

    function delayAnimate($items, animation, interval = 0) {
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

    this.showModal = ()=> {
        this.$modal.removeClass('u-hidden');
        delayAnimate(this.$modal.children(), 'fadeInUp');
        delayAnimate(this.$modal.find('form > *'), 'fadeInUp', 250);
    }

    //initialize modal
    this.registerOpener();
};