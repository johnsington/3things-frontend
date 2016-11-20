import $ from 'jquery';
import request from 'request';

export default function () {
	const url = 'https://sheltered-escarpment-22682.herokuapp.com';
	const clientUrl = 'http://localhost:9000/';

	return {
		postUser : (data)=> {
			let req = {
				name: data
			};

			console.log('try sending data?');

			request.post(url+'/user', {form:{name:'john'}})
			.on('response', function(response) {
				console.log(response.statusCode) // 200
				console.log(response.headers['content-type']) // 'image/png'
				console.log(response);
			});
		},
		login : (obj)=> {
			try {
				if (!obj) {
					throw new Error('argument passed is NULL');
				}			

				if (!obj.name || !obj.email) {
					throw new Error('argument has no email or name field defined');
				}

				console.log(obj);
			} catch (e) {
				console.log(e.message);
			}
		},
		getClientUrl : ()=> {
			return clientUrl;
		}
	};
};