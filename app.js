#!/usr/bin/env node
let request = require("request");
let firebase = require('firebase');
let admin = require("firebase-admin");
let MediaInfo = require('./mediaInfo');
let Onesignal = require('./onesignal');


Onesignal.sendMessage('sPiIKVuf6iOegJ1mcenc8AsVKkg2', 'Hello world');

let m = new MediaInfo();
m.setId('tt3107288').then(value => {
	console.log(m.isTv());
});

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
ref.once("value", function (snapshot) {
	let object = snapshot.val();
	for (let key in object) {
		if (object.hasOwnProperty(key)) {
			console.log('fbuid: '+ key);
			let imdbObject = object[key];

			for(let k in imdbObject){
				let imdbID = imdbObject[k]['imdbID'];
				let media = new MediaInfo();
				media.setMediaId(imdbID).then(value =>{
					media.getReleaseDate();
				});
				// console.log(imdbID);
				// imdb.getById(imdbID).then(things =>{
				// 	console.log(things);
				// });
			}
		}
	}
}, errorObject => {
	console.log(errorObject.code);
});
