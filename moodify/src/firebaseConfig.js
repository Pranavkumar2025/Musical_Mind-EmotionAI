
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXPJQU5q_NhtdwBeE2FE35jrhCkcouPVQ",
  authDomain: "app-20c69.firebaseapp.com",
  databaseURL: "https://app-20c69-default-rtdb.firebaseio.com",
  projectId: "app-20c69",
  storageBucket: "app-20c69.firebasestorage.app",
  messagingSenderId: "462767198461",
  appId: "1:462767198461:web:0cc7afc94a27f7b4a72e94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
