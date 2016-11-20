import $ from 'jquery';
import cookie from 'cookies-js';
import Modal from './Modal';
import FBinit from './FBUtil';
import {delayAnimate} from './util/animation'
import CalendarView from './CalendarView'



(function($){
    $(document).ready(function(){
    	let calendar = CalendarView('.calendar-container');
        let newEntry = new Modal('.new-entry', '.newpost');
        FBinit();

        calendar.renderYear();

        delayAnimate($('.titles').children(), 'fadeInUp');

        let name = cookie.get('response-name');

        if (name) {
        	console.log('cookie successfully set: ' + name);
        }

    });

})($);