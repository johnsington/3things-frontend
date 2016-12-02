import $ from 'jquery';
import request from 'request';
import moment from 'moment';
import cookie from 'cookies-js';

export default function () {
	const url = 'https://cryptic-earth-35727.herokuapp.com';
	const clientUrl = 'http://localhost:9000/';

	function formatEntryResponses(body){
		body.memories.forEach((memory)=>{
			memory.text = $.parseJSON(memory.text)[1];
		})
	}

	return {
		//serves as a debugging method to validate server connection
		postUser : (data)=> {
			let req = {
				name: data
			};

			request.post(url+'/user', {form:{name:'john'}} ,
				function(err, response, body) {
					console.log(response.statusCode) // 200

					var bodyJSON = $.parseJSON(body);
					console.log(bodyJSON);
				}
			);
		},
		//sends a POST daily_entry to server and runs callback on response
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
		//sends a GET daily_entry to server and runs callback on response
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
		//sends login request to server and runs callback on response
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

						var bodyJSON = $.parseJSON(body);
						console.log(bodyJSON);

						//set cookies necessary to persist session on browser client 
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
		//gets user's name provided by Facebook, persisted on browser client
		getName : ()=> {
			return cookie.get('user-full-name');
		},
		//gets client URL
		getClientUrl : ()=> {
			return clientUrl;
		}
	};
};