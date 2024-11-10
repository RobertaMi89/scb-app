import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAyRt9sGBAI-4OThaiKdKcRoVY0DrBw2A8",
  authDomain: "scb-app-ee4cd.firebaseapp.com",
  databaseURL:
    "https://scb-app-ee4cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scb-app-ee4cd",
  storageBucket: "scb-app-ee4cd.firebasestorage.app",
  messagingSenderId: "360377707654",
  appId: "1:360377707654:web:981a5d06933659b4973507",
  measurementId: "G-BEXMN79TGC",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }; 
