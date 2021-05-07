import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXbufgh1IG7J2idrQEJOqf_oSm6Lx-TIM",
    authDomain: "weatherrock-300ad.firebaseapp.com",
    projectId: "weatherrock-300ad",
    storageBucket: "weatherrock-300ad.appspot.com",
    messagingSenderId: "512226869530",
    appId: "1:512226869530:web:b53c21216c68feacaaaca3",
    measurementId: "G-QLV67WF172"
};

const firebase = Firebase.initializeApp(firebaseConfig);


export default firebase