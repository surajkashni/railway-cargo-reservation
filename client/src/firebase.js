import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt2eBIaQJAvam5tkO1EkQwQaZE6bU57kE",
  authDomain: "railway-resrvation.firebaseapp.com",
  projectId: "railway-resrvation",
  storageBucket: "railway-resrvation.appspot.com",
  messagingSenderId: "802519899859",
  appId: "1:802519899859:web:dbaa796ed1de29aefd7e26",
  measurementId: "G-E14730TCHQ"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
