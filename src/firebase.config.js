// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFireStore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const db = getFireStore()