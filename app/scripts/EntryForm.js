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
        console.log(selectedTextArea);
        console.log(selectedTextArea.id);
        currId=selectedTextArea.id;
        $('.number-inactive#n'+currId).toggleClass('number-active');
        console.log('.number-inactive#n'+currId);
        updateCharCount(maxChar-this.value.length);
    });


    $('.inactive').on('focusout', function inactiveArea() {
        console.log(currId);
        $('.number-inactive#n'+currId).toggleClass('number-active');
        updateCharCount('');
    });
    
    $('.inactive').on('keyup', function countChar() {
        updateCharCount(maxChar-this.value.length);
    });

    $('#submit').click(function submitForm(){
        //check input boxes
        console.log('here submit');
        var t1 = document.getElementById('ta1');
        var t2 = document.getElementById('ta2');
        var t3 = document.getElementById('ta3');

        console.log(t1);
        console.log(t2);
        console.log(t3);

        var regexp=/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;

        if(t1.value==null||t2.value==null||t3.value==null){
            //output error message
            document.getElementById('err').innerHTML = 'Please fill in 3 entries';
        }
        else if((maxChar-t1.value.length)<0){
            document.getElementById('err').innerHTML = 'First entry exceeds max length';
        }
        else if((maxChar-t2.value.length)<0){
            document.getElementById('err').innerHTML = 'Second entry exceeds max length';
        }
        else if((maxChar-t3.value.length)<0){
            document.getElementById('err').innerHTML = 'Third entry exceeds max length';
        }
        else if(!validator.isAlphanumeric(t1.value)){
            console.log('invalid chars1');
            document.getElementById('err').innerHTML = 'First entry contains invalid characters';
        }
        else if(!validator.isAlphanumeric(t2.value)){
            console.log('invalid chars2');
            document.getElementById('err').innerHTML = 'Second entry contains invalid characters';
        }
        else if(!validator.isAlphanumeric(t3.value)){
            console.log('invalid chars3');
            document.getElementById('err').innerHTML = 'Third entry contains invalid characters';
        }
        else{
            var allentries = [];//{t1.value, t2.value, t3.value};
            allentries.push(t1.value);
            allentries.push(t2.value);
            allentries.push(t3.value);
            document.getElementById('err').innerHTML = '';
            document.getElementById('ta1').innerHTML ='';
            document.getElementById('ta2').innerHTML ='';
            document.getElementById('ta3').innerHTML ='';
            return allentries;
        }

        //var regexp=/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
        //if regexp.test(t1.value)
    });
}



