// Import the necessary functions from the modular Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfzdXtuyYFt2zMRO10a6mWudckgc2Tm8w",
    authDomain: "olx-clone-e45f7.firebaseapp.com",
    projectId: "olx-clone-e45f7",
    storageBucket: "olx-clone-e45f7.appspot.com",
    messagingSenderId: "305053227530",
    appId: "1:305053227530:web:2a5c1631690f033be0ddf3",
    measurementId: "G-SRY406R7PH"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage }; // Make sure 'storage' is exported

