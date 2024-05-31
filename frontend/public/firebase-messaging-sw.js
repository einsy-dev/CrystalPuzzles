// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: 'AIzaSyBY8GCQFK8OB2R7FIZ-wpmMhWRH10rM3u8',
	authDomain: 'notification-d0faf.firebaseapp.com',
	projectId: 'notification-d0faf',
	storageBucket: 'notification-d0faf.appspot.com',
	messagingSenderId: '489613364454',
	appId: '1:489613364454:web:d4582af88feec1b7efbf27',
	measurementId: 'G-FGMXF70E3Y'
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
