import firebase from 'firebase';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

if (!firebase.apps.length) {
    console.log('initialize firebase.', config);
    firebase.initializeApp(config);
}

export default firebase;
export const auth = firebase.auth();
export const database = firebase.database();