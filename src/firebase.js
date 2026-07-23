import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNmsky5meJ8V70R60uVpL77QnQcZMZhRg",
  authDomain: "c-e-r-db.firebaseapp.com",
  projectId: "c-e-r-db",
  storageBucket: "c-e-r-db.firebasestorage.app",
  messagingSenderId: "406157367221",
  appId: "1:406157367221:web:4ddd1b413672afaa856bfc",
  measurementId: "G-KBRL55LFB6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;