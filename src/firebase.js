import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAyX5VFSqSyAC0zPveG3jNGXd5bEbHdLqo",
  authDomain: "manageusers-e1134.firebaseapp.com",
  databaseURL: "https://manageusers-e1134.firebaseio.com",
  projectId: "manageusers-e1134",
  storageBucket: "",
  messagingSenderId: "176141685933"
};
firebase.initializeApp(config);

export default firebase;