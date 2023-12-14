// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjwxHSD-V7Xm6cTjZsiep3TRGbmAiRXxc",
  authDomain: "trabalho2-9bbb9.firebaseapp.com",
  projectId: "trabalho2-9bbb9",
  storageBucket: "trabalho2-9bbb9.appspot.com",
  messagingSenderId: "718977221782",
  appId: "1:718977221782:web:e825bf15f91cdba618eeb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };