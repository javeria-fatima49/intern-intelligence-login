// Firebase ka SDK import karo
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase ka config object
const firebaseConfig = {
  apiKey: "AIzaSyB5eEjw_GADXJ904R3BI7ldiU2F53uWDo8",
  authDomain: "my-login-page-e3c41.firebaseapp.com",
  projectId: "my-login-page-e3c41",
  storageBucket: "my-login-page-e3c41.firebasestorage.app",
  messagingSenderId: "876138244861",
  appId: "1:876138244861:web:baf788393d4ae8e6246c94",
   measurementId: "G-5LLK2C5MN2"
};

// Firebase initialize karo
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
