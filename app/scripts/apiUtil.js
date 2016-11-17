import $ from 'jquery';
import request from 'request';

export default function () {
	const url = 'https://sheltered-escarpment-22682.herokuapp.com/';

	return {
		postUser : (data)=> {
			let req = {
				name: data
			};

			console.log('try sending data?');

			request.post(url+'user', {form:{name:'john'}})
			.on('response', function(response) {
				console.log(response.statusCode) // 200
				console.log(response.headers['content-type']) // 'image/png'
				console.log(response);
			});
		}
	};
};