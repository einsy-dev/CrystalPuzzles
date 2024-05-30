// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBY8GCQFK8OB2R7FIZ-wpmMhWRH10rM3u8',
	authDomain: 'notification-d0faf.firebaseapp.com',
	projectId: 'notification-d0faf',
	storageBucket: 'notification-d0faf.appspot.com',
	messagingSenderId: '489613364454',
	appId: '1:489613364454:web:d4582af88feec1b7efbf27',
	measurementId: 'G-FGMXF70E3Y'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
