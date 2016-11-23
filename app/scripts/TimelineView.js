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

	// let data = api.getEntries(function);

	function renderEntry(entry){
		let $entry = $($entryContainer.clone()).addClass('timeline-block');

		$entry.find('p.timeline-date').text(moment(entry.date, 'DD-MM-YYYY').format('MMMM D'));
		
		if (!entry.memories.length) {
			return;
		}

		entry.memories.forEach((memory)=>{
			let $memory = $($memoryContainer.clone());

			$memory.addClass('memory-block');
			$memory.find('p').text(memory.text);
			$entry.append($memory);
		});

		$timeline.append($entry);
	}

	return {
		renderRecentEntries: ()=>{
			api.getEntries(null,(response)=>{
				response.daily_entries.forEach((entry)=>{
					renderEntry(entry);
				});
			});
		}
	}
}