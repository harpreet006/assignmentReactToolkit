// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importing auth
import { getFirestore } from "firebase/firestore"; // Importing Firestore
// console.log(import.meta.env.VITE_FIRE_BASE_URL, "ddddddddddddddd");
console.log(
  import.meta.env.VITE_FIRE_BASE_API_KEY,
  import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  import.meta.env.VITE_FIRE_BASE_PROJECT_ID,
  import.meta.env.VITE_FIRE_BASE_STORE_BUCKET,
  import.meta.env.VITE_FIRE_BASE_MESSAGING_SENDER_ID,
  import.meta.env.VITE_FIRE_BASE_APP_ID,
  import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID
);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_BASE_STORE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
