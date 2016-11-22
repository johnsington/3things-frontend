import $ from 'jquery';
import validator from 'validator';

export default function(){
    //console.log('\'Allo \'Allo!');

    var currId;
    var maxChar=170;
    /*var observe;

    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on'+event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }*/

    /*function resize (val) {
        console.log('resize');
        val.style.height = 'auto';
        val.style.height = val.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    /*function delayedResize (val) {
        console.log('here delay');
        window.setTimeout(function() {
        resize(val);
        },0);
    }*/


    /*function init (id) {
        var text = document.getElementById(id);
        console.log(id);
        function resize (var) {
            console.log("here");
            text.style.height = 'auto';
            text.style.height = text.scrollHeight+'px';
        }
        /* 0-timeout to get the already changed text */
     /*   function delayedResize () {
            console.log("here delay");
            window.setTimeout(resize, 0);
        }

        observe(text, 'change',  resize);
        observe(text, 'cut',     delayedResize);
        observe(text, 'paste',   delayedResize);
        observe(text, 'drop',    delayedResize);
        observe(text, 'keydown', delayedResize);

        $("#"+id).focus();
        $("#"+id).select();
        resize();
    }*/
    /*
    $( document ).ready(function() {
        init("ta1");
        init("ta2");
        init("ta3");
    });*/

   
    function updateCharCount(val){
       if(currId!=null){
            $('.char-count#c'+currId).text(val);
       }
       //console.log('.char-count#'+currId);
    }
    
    $('.inactive').on('focus', function activeArea() { 
        var selectedTextArea = document.activeElement;
        currId=selectedTextArea.id;
        $('.number-inactive#n'+currId).toggleClass('number-active');
        updateCharCount(maxChar-this.value.length);
    });


    $('.inactive').on('focusout', function inactiveArea() {
        $('.number-inactive#n'+currId).toggleClass('number-active');
        updateCharCount('');
    });
    
    $('.inactive').on('keyup', function countChar() {
        updateCharCount(maxChar-this.value.length);
    });
    //comment
}



