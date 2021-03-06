import $ from 'jquery';
import cookie from 'cookies-js';
import Modal from './Modal';
import EntryForm from './EntryForm';
import FBinit from './FBUtil';
import CalendarView from './CalendarView';
import TimelineView from './TimelineView';
import ApiUtil from './apiUtil';
import Landing from './Landing';

let api = ApiUtil();

function Nav() {
    //initialize nav
    $('nav .username').text('Hi ' + api.getName().split(' ')[0] + '!');

    $('.toggle-calendar').bind('click touchstart',function(e){
        e.preventDefault();
        $('.toggle-calendar .fa-calendar').toggleClass('u-hidden');
        $('.toggle-calendar .fa-list-ul').toggleClass('u-hidden');

        $('.timeline-view').toggleClass('u-hidden');
        $('.calendar-view').toggleClass('u-hidden');
    });
}

(function($){
    $(document).ready(function(){
    	let calendar = CalendarView('.calendar-container');
        let timeline = TimelineView('.timeline-view');
        let newEntry = new Modal('.new-entry', '.newpost', timeline, calendar);
        FBinit();
        EntryForm();

        if ($('nav').length){
           Nav(); 
        }

        if (calendar.container.length){
            calendar.renderYear();
        }

        if (timeline.container.length){
            timeline.renderRecentEntries();
        }
        
        let name = cookie.get('response-name');

        if (name) {
        	console.log('cookie successfully set: ' + name);
        }
    });
})($);