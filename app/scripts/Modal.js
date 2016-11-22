import $ from 'jquery';
import ApiUtil from './apiUtil';
import {delayAnimate} from './util/animation'

let api = ApiUtil();

export default function(elt, openerClass){
    var maxChar=170;
    this.active = false;
    this.$modal = $(elt);
    this.response = {};
    this.$opener = $(openerClass);
    this.$clone = this.$modal.clone(true);
    this.$submit = this.$modal.find('input[type="button"]').first();

    $('#complete').text('Thanks for writing '+ api.getName().split(' ')[0] +'!');

    this.registerOpener = ()=> {
        this.$opener.click(this.showModal);
    }

    this.$submit.click((e)=>{
        let $modal = this.$modal;
        e.preventDefault();

        var t1 = $('#ta1').val();
        var t2 = $('#ta2').val();
        var t3 = $('#ta3').val();


        if(t1.length==0 || t2.length==0||t3.length==0){
            $('#err').html('Please write your 3 entries');
            return;
        }

        //check lengths
        if((maxChar-t1.length)<0){
            $('#err').html('First entry exceeds max length');
            return;
        }
        else if((maxChar-t2.length)<0){
            $('#err').html('Second entry exceeds max length');
            return;
        }
        else if((maxChar-t3.length)<0){
            $('#err').html('Third entry exceeds max length');
            return;
        }


        //code injection avoidance convert to html entities
        t1 = removeInject(t1);
        t2 = removeInject(t2);
        t3 = removeInject(t3);

        var allEntries ={
            'entry1': t1,
            'entry2': t2,
            'entry3': t3
        };
        
        //clear text
        $('#err').empty();
        $('#ta1').val('');
        $('#ta2').val('');
        $('#ta3').val('');

        //validate form here
        api.postEntry(allEntries, function(response){
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
        
        
    });

    function removeInject( html ) {
        return $( $.parseHTML(html) ).text();
    }

    this.showModal = ()=> {
        let $modal = this.$modal;

        this.$modal.removeClass('u-hidden');
        delayAnimate(this.$modal.children(), 'fadeInUp');
        delayAnimate(this.$modal.find('form > *'), 'fadeInUp', 250);

        setTimeout(function(){
            $modal.find('.hint').removeClass('u-invisible');
            delayAnimate($modal.find('.hint'), 'fadeInUp');
        }, 3000);
    }

    //initialize modal
    this.registerOpener();
};