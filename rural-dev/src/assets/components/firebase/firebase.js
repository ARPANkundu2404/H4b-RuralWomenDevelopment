// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0wq7rpSUf5Kfbg9rTrPpengCDcrOfSmc",
  authDomain: "rural-dev-app.firebaseapp.com",
  projectId: "rural-dev-app",
  storageBucket: "rural-dev-app.firebasestorage.app",
  messagingSenderId: "571189122335",
  appId: "1:571189122335:web:61bef79fa2c1dbcaf98c2a",
  measurementId: "G-S0DS4XPR6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export{app,auth,googleProvider};