let request = require('request');
let APP_ID = '9906cb18-3cc8-4f29-8552-0667c86525a1';
let API_KEY = 'NzAxN2VmNmEtMmU5Zi00ZDkzLTg2ODgtMTNhMGVlNGQzZDli'

module.exports = class {

	/**
	 * 
	 * @param {*} fbuid 
	 * @param {*} message 
	 */
	sendMessage(fbuid, message) {
		let options = {
			method: 'POST',
			url: 'https://onesignal.com/api/v1/notifications',
			headers:
			{
				authorization: 'Basic ' + API_KEY,
				'content-type': 'application/json'
			},
			body:
			{
				app_id: APP_ID,
				filters:
				[{ field: 'tag', key: 'fbuid', relation: '=', value: fbuid }],
				data: { foo: 'bar' },
				contents: { en: message }
			},
			json: true
		};

		request(options, function (error, response, body) {
			if (error){ throw new Error(error);}
			console.log(body);
		});

	}

}
