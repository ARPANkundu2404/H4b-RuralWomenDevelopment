import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAoF7u5ZrEClVpBEftPWcgqngm2f91f3TE",
  authDomain: "ruraldev-b78b5.firebaseapp.com",
  projectId: "ruraldev-b78b5",
  storageBucket: "ruraldev-b78b5.appspot.com",
  messagingSenderId: "347370620633",
  appId: "1:347370620633:web:6362c3c6658df816f4a0c8",
  measurementId: "G-03FK5LB92G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db, analytics };
