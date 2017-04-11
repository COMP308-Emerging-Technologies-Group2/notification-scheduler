let request = require('request');
let app_id = '9906cb18-3cc8-4f29-8552-0667c86525a1';
let API_KEY = 'NzAxN2VmNmEtMmU5Zi00ZDkzLTg2ODgtMTNhMGVlNGQzZDli'

module.exports = class {

	static sendMessage(fbuid, message) {
		let onesignalId;
		this.getOneSignalIdByFBid(fbuid).then(id => {
			this.sendMessageToPhone(id, message);
		});
	}

	static sendMessageToPhone(onesignalId, message) {
		console.log('sending message');
		request(
			{
				method: 'POST',
				uri: 'https://onesignal.com/api/v1/notifications',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + API_KEY
				},
				body: {
					'app_id': app_id,
					'filters': [
						{ 'field': 'tag', 'key': 'fbuid', 'relation': '=', 'value': onesignalId }
					],
					'data': { 'imdbId': 'tttest' },
					'contents': { 'en': message }
				},
				json: true
			},
			(error, response, body) => {
				if(error){
					console.log(error);
				}
				else{
					console.log(body);
				}
			}
		)
	}

	/**
	 * 
	 * @param {string} fbuid 
	 */
	static getOneSignalIdByFBid(fbuid) {
		return new Promise((resolve, reject) => {
			request({
				method: 'GET',
				uri: 'https://onesignal.com/api/v1/players?app_id=' + app_id,
				headers: {
					'Authorization': 'Basic ' + API_KEY
				}
			},
				(error, response, body) => {
					if (error) { console.log(error); }
					else {
						let players = (JSON.parse(body)['players']);
						for (let i = 0; i < players.length; i++) {
							let device = players[i];
							if (device['tags']['fbuid'] === fbuid) {
								resolve(device['id']);
							}

						}
					}
				});
		});

	}//getOneSignalIdByFBid

}
