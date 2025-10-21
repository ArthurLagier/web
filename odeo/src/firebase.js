import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe-yB_W-qi2SMOSNDN5uiI-QT7melXSSw",
  authDomain: "wbfd-458ae.firebaseapp.com",
  projectId: "wbfd-458ae",
  storageBucket: "wbfd-458ae.firebasestorage.app",
  messagingSenderId: "11702928705",
  appId: "1:11702928705:web:8fda9ec8cccfa5ac3ecdc0",
  measurementId: "G-2QNQTL7YFG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);