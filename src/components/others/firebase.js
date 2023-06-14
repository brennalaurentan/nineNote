import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBORy9LcE01m18CBjMQH2mJuPbKeNTLjjQ",
  authDomain: "ninenote-c7000.firebaseapp.com",
  projectId: "ninenote-c7000",
  storageBucket: "ninenote-c7000.appspot.com",
  messagingSenderId: "827448693438",
  appId: "1:827448693438:web:f33f898e62ba5e72da44ef",
  measurementId: "G-JMKYF33T1V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

//firebase.initializeApp(firebaseConfig);

//export default firebase;