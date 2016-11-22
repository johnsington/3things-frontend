import $ from 'jquery';
import {delayAnimate} from './util/animation';

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

$(document).ready(()=>{
	$('.titles').removeClass('u-invisible');
	delayAnimate($('.titles').children(), 'fadeInUp');

	$('.puppet').each((i, puppet)=>{

		setTimeout(function(){
			$(puppet).addClass('animated bounce infinite');
		}, rand(0,200));
	});
});