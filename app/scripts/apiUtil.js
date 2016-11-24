import $ from 'jquery';
import request from 'request';
import moment from 'moment';
import cookie from 'cookies-js';

export default function () {
	// const url = 'https://sheltered-escarpment-22682.herokuapp.com';
	const url = 'https://cryptic-earth-35727.herokuapp.com';
	const clientUrl = 'http://localhost:9000/';

	function formatEntryResponses(body){
		body.memories.forEach((memory)=>{
			memory.text = $.parseJSON(memory.text)[1];
		})
	}

	return {
		postUser : (data)=> {
			let req = {
				name: data
			};

			request.post(url+'/user', {form:{name:'john'}} ,
				function(err, response, body) {
					console.log(response.statusCode) // 200
					console.log(response.headers['content-type']); // 'image/png'

					var bodyJSON = $.parseJSON(body);
					console.log(bodyJSON);
					console.log(bodyJSON.id);
				}
			);
		},
		postEntry : (data, cb)=> {
			let req = {
				date: moment().format('DD-MM-YYYY'),
				user_id: cookie.get('user-id'),
				session_token: cookie.get('session-token'),
				memories: [data.entry1, data.entry2, data.entry3]
			};

			request.post(url+'/daily_entry', {form:req} ,
				function(err, response, body) {
					console.log(response.statusCode) // 200

					var bodyJSON = formatEntryResponses($.parseJSON(body));

					if (cb){
						cb(bodyJSON);
					};
				}
			);
		},
		getEntries : (data, cb)=> {
			let req = {
				start_date: moment().subtract(1, 'months').format('DD-MM-YYYY'),
				end_date: moment().format('DD-MM-YYYY'), 
				user_id: cookie.get('user-id'),
				session_token: cookie.get('session-token'),
			};

			if (data) {
				req.start_date = data.start_date;
				req.end_date = data.end_date;
			}

			request.get({
					url: url+'/daily_entry',
					headers: { 
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36'
					},
					qs: req
				}, function(err, response, body) {
					if (err) {
						console.log(err);
						console.log(response);
						console.log(body)
						return;
					}
					console.log(response.statusCode) // 200

					var bodyJSON = $.parseJSON(body);

					bodyJSON.daily_entries.reverse();
					bodyJSON.daily_entries.forEach((entry)=>{
						formatEntryResponses(entry);
					});

					console.log(bodyJSON);

					if (cb){
						cb(bodyJSON);
					};
				}
			);
		},
		login : (data, cb)=> {

			try {
				if (!data) {
					throw new Error('argument passed is NULL');
				}			

				if (!data.name) {
					throw new Error('argument has no name field defined');
				}

				request.post(url+'/session', {form:data} ,
					function(err, response, body) {

						if (err) {
							console.log(err);
							return;
						}

						console.log(response.statusCode) // 200
						console.log(response.headers['content-type']); // 'image/png'

						var bodyJSON = $.parseJSON(body);
						console.log(bodyJSON);

						cookie.set('session-id', bodyJSON.id);
						cookie.set('session-token', bodyJSON.token);
						cookie.set('user-id', bodyJSON.user.id);
						cookie.set('user-full-name', data.name);

						if (cb) {
							cb();
						}
					}
				);
			} catch (e) {
				console.log(e.message);
			}
		},
		getName : ()=> {
			return cookie.get('user-full-name');
		},
		getClientUrl : ()=> {
			return clientUrl;
		}
	};
};