import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCKsYWcl14vwu5zoy3upBWdUuksN0FnXc4",
    authDomain: "homeio-test.firebaseapp.com",
    databaseURL: "https://homeio-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "homeio-test",
    storageBucket: "homeio-test.appspot.com",
    messagingSenderId: "78266375154",
    appId: "1:78266375154:web:fa51ecee8a6ea573e7296b",
    measurementId: "G-HHHFKHQ2QQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app



