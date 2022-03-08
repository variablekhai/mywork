import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzf2Q24CkEyw6EjObF8WV5C0y47QPID6I",
  authDomain: "mywork-56bdd.firebaseapp.com",
  projectId: "mywork-56bdd",
  storageBucket: "mywork-56bdd.appspot.com",
  messagingSenderId: "1033327800803",
  appId: "1:1033327800803:web:cd4ed4745f5c72bcb1f0d6",
  measurementId: "G-VWLQT8QG1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;