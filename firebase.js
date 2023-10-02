// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOTMVan-lyuWkDgFPV2q4Hj05OKe2MtwU",
  authDomain: "talking-docs---ai.firebaseapp.com",
  projectId: "talking-docs---ai",
  storageBucket: "talking-docs---ai.appspot.com",
  messagingSenderId: "634368024929",
  appId: "1:634368024929:web:199dca6b5502495d1a6520",
  measurementId: "G-ZQYYDFXKT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

module.exports = {app,analytics,db,storage};