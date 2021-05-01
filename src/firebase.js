// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsjpOYCkg6RHcF2fWfvkNRSNcQ6vQlBxQ",
  authDomain: "chat-app-d4570.firebaseapp.com",
  projectId: "chat-app-d4570",
  storageBucket: "chat-app-d4570.appspot.com",
  messagingSenderId: "1008252235752",
  appId: "1:1008252235752:web:bbdad52e74ec34beb4be5d",
  measurementId: "G-75QL4WF29N"
};
  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  


  export{auth,provider};
  export default db ;