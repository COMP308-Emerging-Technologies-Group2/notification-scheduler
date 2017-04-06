let imdb = require('imdb-api');

let mediaInfo = class {
	constructor() {
		this.media;
	}

	setId(id) {
		return new Promise((resolve, reject) => {
			imdb.getById(id).then(things => {
				this.media = things;
				resolve(true);
			});
		});
	}

	isTv() {
		return this.media['type'] === 'series' ? true : false;
	}
}

module.exports = mediaInfo;