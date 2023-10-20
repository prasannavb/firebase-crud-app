import { initializeApp } from "firebase/app";
import {getFirestore}  from "@firebase/firestore"
const firebaseConfig = {
<!-- YOUR AUTH DETAILS -->
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
