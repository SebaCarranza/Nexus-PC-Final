import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCv_iXgQAGhvf7vS8yNVv9jzqM2N2EkyuA",
  authDomain: "nexuspc-4db67.firebaseapp.com",
  projectId: "nexuspc-4db67",
  storageBucket: "nexuspc-4db67.firebasestorage.app",
  messagingSenderId: "543648965952",
  appId: "1:543648965952:web:98fbe55daac9b2ae4846a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);