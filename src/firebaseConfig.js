// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkZ9QWeRtJgQZF3XnStp1NRBfXF2iY9p0",
  authDomain: "bapp-633d8.firebaseapp.com",
  projectId: "bapp-633d8",
  storageBucket: "bapp-633d8.firebasestorage.app",
  messagingSenderId: "749748428032",
  appId: "1:749748428032:web:1aba70d7a591bacdc067e5",
};

// Initialize Firebase
const appConfig = initializeApp(firebaseConfig);

export default appConfig;

