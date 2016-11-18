console.log('\'Allo \'Allo!');

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

function activeArea(val) { 
    var selectedTextArea = document.activeElement;
    console.log(selectedTextArea);
    console.log(selectedTextArea.id);
    currId=selectedTextArea.id;
    $('.number-inactive#'+currId).toggleClass('number-active');
    updateCharCount(maxChar-val.value.length);
}

function inactiveArea() {
    console.log(currId);
    $('.number-inactive#'+currId).toggleClass('number-active');
    updateCharCount('');
}

function countChar(val) {
    updateCharCount(maxChar-val.value.length);
}

function updateCharCount(val){
    $('.char-count#'+currId).text(val);
}

function submitForm(){
    //check input boxes
    var t1 = document.getElementById("ta1");
    var t2 = document.getElementById("ta2");
    var t3 = document.getElementById("ta3");

    if(t1.value==null||t2.value==null||t3.value==null){
        //output error message
        console.log('nope bye');
    }
}



