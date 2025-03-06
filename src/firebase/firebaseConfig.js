
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  // apiKey: "AIzaSyBmsw1ijPlw7hazZQ7pmcB9qph6dJBF8hw",
  authDomain: "penpulse-a70eb.firebaseapp.com",
  projectId: "penpulse-a70eb",
  storageBucket: "penpulse-a70eb.appspot.com",
  messagingSenderId: "647732614981",
  appId: "1:647732614981:web:b2226e92849de8f96b902c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
