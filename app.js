#!/usr/bin/env node
let request = require("request");
let firebase = require('firebase');
let admin = require("firebase-admin");
let MediaInfo = require('./mediaInfo');
let Onesignal = require('./onesignal');

let m = new MediaInfo();

// let onesignal = new Onesignal();
// onesignal.sendMessage('kAuC5VPQPvf7MUeExQ7xNUUrTwI3', 'Hello world Apr 13, 2017');


// m.setMediaId('tt4630562').then(setId => {
// 	m.getReleaseName().then(value => {
// 		console.log('movie name');
// 		console.log(value);
// 	}).catch(err => {
// 		console.log(err);
// 	}).catch(err => {
// 		console.log(err);
// 	})
// });

// Fetch the service account key JSON file contents
let serviceAccount = require('./moviestvlist-firebase-adminsdk-bv6f0-ee0ba8f2c7.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	// credential: admin.credential.cert(serviceAccount),
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://moviestvlist.firebaseio.com/"
});

let db = admin.database();
let ref = db.ref("/users-favorites");

// get contents of database
ref.once("value", function (snapshot) {
	let favoritesDb = snapshot.val();
	// iterate through all users in the favorite db 
	loopUserFav(favoritesDb)

}, errorObject => {
	console.log(errorObject.code);
});

let loopUserFav = (favoritesDb) => {
	for (let userId in favoritesDb) {
		if (favoritesDb.hasOwnProperty(userId)) {
			let imdbObject = favoritesDb[userId];
			loopIds(imdbObject);
		}
	}
}


let loopIds = (imdbObject) => {
	for (let k in imdbObject) {
		let id = imdbObject[k]['imdbID'];
		m.setMediaId(id).then(setId => {
			m.getReleaseName().then(value => {
				console.log('media name ' + id);
				console.log(value);
			}).catch(err => {
				console.log(err);
			});
		}).catch(err => {
			console.log(err);
		})
	}
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

