import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAH06wBEtt2xfzqqg4lzI6GQiCzoFIXQ1U",
  authDomain: "mini-blog-testing.firebaseapp.com",
  projectId: "mini-blog-testing",
  storageBucket: "mini-blog-testing.firebasestorage.app",
  messagingSenderId: "215847721046",
  appId: "1:215847721046:web:d086457bb4fe98896443f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
