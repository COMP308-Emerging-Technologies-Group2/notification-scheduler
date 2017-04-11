let imdb = require('imdb-api');

module.exports = class {
	constructor() {
		this.media;
		this.userId;
	}

	/**
	 * @param {string} mediaId 
	 * @param {string} userId 
	 */
	setMediaId(mediaId, userId) {
		return new Promise((resolve, reject) => {
			imdb.getById(mediaId).then(things => {
				this.userId = userId;
				this.media = things;
				resolve(true);
			});
		});
	}


	/**
	 * Gets the release name
	 */
	getReleaseName() {
		return new Promise((resolve, reject) => {
			if (this.isTv()) {
				this.media.episodes((err, episodes) => {
					resolve(getEpisodeReleaseDate(episodes));
				});
			}
		});
	}

	getEpisodeReleaseDate(episodes) {
		for (let i = 0; i < episodes.length; i++) {
			let element = episodes[i];
			let date = element['released']
			if (!element['name'].startsWith('Episode #')) {
				if (date.toDateString() === (new Date).toDateString()) {
					// console.log(this.media['title']+' '+element['name']);
					return element['name'];
				}
			}
		}
	}

	/**
	 * Gets the a bool
	 * @returns boolean 
	 */
	isTv() {
		return this.media['type'] === 'series' ? true : false;
	}
}
