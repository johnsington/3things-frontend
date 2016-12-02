import $ from 'jquery';
import ApiUtil from './apiUtil';
import {delayAnimate} from './util/animation'
import moment from 'moment'

let api = ApiUtil();

export default function(container) {
	let $container = $(container);
	let $timeline = $('.timeline-container');
	let $entryContainer = $($container.find('.timeline-block-container').clone().removeClass('timeline-block-container'));
	let $memoryContainer = $($container.find('.memory-block-container').clone().removeClass('memory-block-container'));
	let hasToday = false;

	function renderEntry(entry){
		let $entry = $($entryContainer.clone()).addClass('timeline-block');

		let date = moment(entry.date, 'DD-MM-YYYY').format('MMMM D');

		$entry.find('p.timeline-date').text(date);

		if (date == moment().format('MMMM D')){
			hasToday = true;
		}
		
		if (!entry.memories.length) {
			return;
		}

		entry.memories.forEach((memory)=>{
			let $memory = $($memoryContainer.clone());

			if(memory.text == '') {
				return;
			}

			$memory.addClass('memory-block');
			$memory.find('p').text(memory.text);
			$entry.append($memory);
		});

		$timeline.append($entry);
	}

	return {
		container: $container,
		renderRecentEntries: ()=>{
			$timeline.empty();
			api.getEntries(null,(response)=>{
				if (!response.daily_entries.length){
					$('.no-post').removeClass('u-hidden').animateCss('fadeInUp');
				}
				else {
					$('.no-post').addClass('u-hidden');
				}

				response.daily_entries.forEach((entry)=>{
					renderEntry(entry);
				});

				if (hasToday) {
					$('.newpost').addClass('done');
				}
			});
		}
	}
}