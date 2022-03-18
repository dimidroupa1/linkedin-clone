import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwP0OxAxX-gYurETgAI0YkqRl9R7ZAqz4",
    authDomain: "linkedin-clone-973fb.firebaseapp.com",
    projectId: "linkedin-clone-973fb",
    storageBucket: "linkedin-clone-973fb.appspot.com",
    messagingSenderId: "609456685867",
    appId: "1:609456685867:web:45fefd861db9afcf49bb6e"
};

// const app = !firebase.apps.length
//     ? firebase.initializeApp(firebaseConfig)
//     : firebase.app();
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;