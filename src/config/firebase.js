import { initializeApp } from "firebase/app";
import {getFirestore}  from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDiK9BMdLEPMV8XPKSA9CrV12xVSwE77Jw",
  authDomain: "fir-963c1.firebaseapp.com",
  projectId: "fir-963c1",
  storageBucket: "fir-963c1.appspot.com",
  messagingSenderId: "473389010600",
  appId: "1:473389010600:web:71e6af463cf62796897c9d",
  measurementId: "G-08K3JZZN75"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);