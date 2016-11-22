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

    for (let i = 0; i < days; i++) {
      let level = rand(0,4);

      if(i%2 == 0) {
         $(cells[i]).addClass('odd')
      }

      $(cells[i]).removeClass('u-hidden').addClass('green-'+ Math.floor(level).toString());

    }

    //update month name
    $month.find('.month-name').text(date.format('MMMM'));

    $month.removeClass('month-container').addClass('month');

    $container.append($month);
  }

  return {
    renderYear : ()=> {
      let year = moment().year();
      for (let month = 1; month <=12 ; month++){
        let monthString = month.toString();

        if (month < 10) {
          monthString = '0'+ monthString;
        }
        renderMonth( year.toString() + '-' + monthString, $container);
      }
    }
  };
}