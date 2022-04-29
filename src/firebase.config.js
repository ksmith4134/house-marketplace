import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYGsozUOC0KNItefVIq4EFZwszl5Rd0vs",
  authDomain: "house-marketplace-app-f48e7.firebaseapp.com",
  projectId: "house-marketplace-app-f48e7",
  storageBucket: "house-marketplace-app-f48e7.appspot.com",
  messagingSenderId: "967884751916",
  appId: "1:967884751916:web:6819a48645fe9393723d89"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()