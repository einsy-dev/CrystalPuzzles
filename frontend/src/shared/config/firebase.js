import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyBY8GCQFK8OB2R7FIZ-wpmMhWRH10rM3u8',
	authDomain: 'notification-d0faf.firebaseapp.com',
	projectId: 'notification-d0faf',
	storageBucket: 'notification-d0faf.appspot.com',
	messagingSenderId: '489613364454',
	appId: '1:489613364454:web:d4582af88feec1b7efbf27',
	measurementId: 'G-FGMXF70E3Y'
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
	// The method getToken(): Promise<string> allows FCM to use the VAPID key credential
	// when sending message requests to different push services
	return getToken(messaging, {
		vapidKey: `BH8CROZIK8ZYd4pHcdPiWvuwp3o2nhRXPzqBK4Qpp08T3ix1pOChjH_u7eiL8CXqeurjh_EFQUkX2vZ3F0QIrtY`
	}) //to authorize send requests to supported web push services
		.then((currentToken) => {
			if (currentToken) {
				if (
					localStorage.getItem('fcmToken') &&
					currentToken !== localStorage.getItem('fcmToken')
				) {
					localStorage.setItem('fcmToken', currentToken);
				} else if (!localStorage.getItem('fcmToken')) {
					localStorage.setItem('fcmToken', currentToken);
				}
			}
		})
		.catch(() => null);
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
