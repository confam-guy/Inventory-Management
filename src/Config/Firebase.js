// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_EchEBSiWpQCuUbp05cUJoCOJAKqoams",
  authDomain: "inventory-management-sys-9162b.firebaseapp.com",
  projectId: "inventory-management-sys-9162b",
  storageBucket: "inventory-management-sys-9162b.firebasestorage.app",
  messagingSenderId: "1060003631340",
  appId: "1:1060003631340:web:14ee23cb1985b04b8455c9",
  measurementId: "G-0HPH2CFTGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(app);

// Export the auth instance as a NAMED export
export { auth };