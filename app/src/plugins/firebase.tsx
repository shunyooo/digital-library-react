import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DEV_FIREBASE_APP_API_KEY,
  authDomain: process.env.REACT_APP_DEV_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  console.log('initialize firebase.', firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();