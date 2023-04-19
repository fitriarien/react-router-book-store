// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-LVRDJfO2KbxJ1RyssxxQfKmdAtX11XE",
  authDomain: "uploadingbookcover.firebaseapp.com",
  projectId: "uploadingbookcover",
  storageBucket: "uploadingbookcover.appspot.com",
  messagingSenderId: "246328432800",
  appId: "1:246328432800:web:4f9d0b7b859dc1b74ed1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
