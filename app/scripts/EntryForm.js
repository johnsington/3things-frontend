import $ from 'jquery';
import validator from 'validator';

export default function(){
    var currId;
    var maxChar=170;
   
    function updateCharCount(val){
       if(currId!=null){
            $('.char-count#c'+currId).text(val);
       }
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
}



