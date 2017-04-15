let imdb = require('imdb-api');

module.exports = class {
	constructor() {
		this.media;
		this.userId;
	}

	/**
 * @param {*} mediaId 
 * @param {*} userId 
 */
	setMediaId(mediaId, userId) {
		return new Promise((resolve, reject) => {
			imdb.getById(mediaId).then(things => {
				this.userId = userId;
				this.media = things;
				resolve(true);
			}).catch(err => {
				console.log(err);
			});
		});
	}

	/**
	 * Get the name of the release 
	 */
	getReleaseName() {
		console.log(this.media['title']);
		return new Promise((resolve, reject) => {
			if (this.isTv()) {
				this._getEpisodeTitle().then(title => {
					resolve(title);
				});
			}
			else {
				if (this.media['released'].toDateString() === (new Date).toDateString()) {
					resolve(this.media['title'])
				}
			}
		});
	}
	/**
	 * ************************************
	 * Parse TV
	 * ************************************
	 */


	_episodeToady(episode) {
		let date = episode['released'];

		if (date.toDateString() === (new Date).toDateString()) {
			return true;
		}
		else {
			return false
		}
	}

	_getEpisodeTitle() {
		return new Promise((resolve, reject) => {
			this.media.episodes((err, episodes) => {

				episodes.forEach((episode) => {
					if (this._episodeToady(episode)) {
						resolve(episode['name']);
					}

				}, this);
				resolve(false)
			});
		});

	}


	/**
	 * Gets the a bool
	 * @returns boolean 
	 */
	isTv() {
		return this.media['type'] === 'series' ? true : false;
	}


	/**
	 * ************************************
	 * Parse Movies
	 * ************************************
	 */

	_getMovieName() {

	}


}
