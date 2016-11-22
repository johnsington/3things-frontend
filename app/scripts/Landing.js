import $ from 'jquery';
import {delayAnimate} from './util/animation';

$(document).ready(()=>{
	delayAnimate($('.titles').children(), 'fadeInUp');
});