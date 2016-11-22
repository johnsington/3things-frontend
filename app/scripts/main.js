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


(function($){
    $(document).ready(function(){
    	let calendar = CalendarView('.calendar-container');
        let timeline = TimelineView('.timeline-view');
        let newEntry = new Modal('.new-entry', '.newpost');
        FBinit();
        EntryForm();
        
        if (calendar){
            calendar.renderYear();
        }

        if (timeline){
            timeline.renderRecentEntries();
        }
        
        let name = cookie.get('response-name');

        if (name) {
        	console.log('cookie successfully set: ' + name);
        }

        //initialize nav
        $('nav .username').text('Hi ' + api.getName().split(' ')[0] + '!');

        $('.toggle-calendar').click(function(e){
        	e.preventDefault();
        	$('.timeline-view').toggleClass('u-hidden');
        	$('.calendar-view').toggleClass('u-hidden');
        })
    });
})($);