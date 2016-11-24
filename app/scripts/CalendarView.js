import $ from 'jquery';
import ApiUtil from './apiUtil';
import {delayAnimate} from './util/animation'
import moment from 'moment'

let api = ApiUtil();

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

export default function(container) {
  let $container = $(container);

  function renderMonth(month, $container) {
    let $month = $($('.month-container').clone());
    let cells = $month.find('.cell');
    let date = moment(month, 'YYYY-MM');

    //update days
    let days = date.daysInMonth();
    let firstDay = date.date(1).format('d');

    for (let offset=0; offset < firstDay; offset++){
      let emptyCell = $(cells[0]).clone();

      $(emptyCell).removeClass('u-hidden').addClass('u-invisible');

      $($month.find('.grid-container')).prepend(emptyCell);
    }

    for (let i = 0; i < days; i++) {
      let level = rand(0,4);

      if(i%2 == 0) {
         $(cells[i]).addClass('odd');
      }

      $(cells[i]).removeClass('u-hidden').attr('data-date', date.date(i+1).format('DD-MM-YYYY'))
    }

    //update month name
    $month.find('.month-name').text(date.format('MMMM'));

    $month.removeClass('month-container').addClass('month');

    $container.append($month);
  }

  function updateCalendar() {
    api.getEntries(null,(response)=>{
      response.daily_entries.forEach((entry)=>{
        let date = entry.date;

        let $day = $('.cell[data-date="' + date + '"]');

        if (entry.memories.length > 0) {
          $day.addClass('green-' + entry.memories.length);
        }
      })
    });
  }

  return {
    update: updateCalendar,
    container : $container,
    renderYear : ()=> {
      let year = moment().year();
      for (let month = 1; month <=12 ; month++){
        let monthString = month.toString();

        if (month < 10) {
          monthString = '0'+ monthString;
        }
        renderMonth( year.toString() + '-' + monthString, $container);
      }
      updateCalendar();
    }
  };
}