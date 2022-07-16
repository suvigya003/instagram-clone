// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { initializeApp } from 'firebase/app';
// import { getFirestore} from 'firebase/firestore/lite';
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyBR6TTE-BDMt99o3ZQuOUnIYNBxrCmxg4g",
//   authDomain: "instagram-clone-3c230.firebaseapp.com",
//   projectId: "instagram-clone-3c230",
//   storageBucket: "instagram-clone-3c230.appspot.com",
//   messagingSenderId: "252352970015",
//   appId: "1:252352970015:web:eaae0a21e362848632842a",
//   measurementId: "G-3EGB9JXNDM"
// };

// const app = !firebaseConfig.apps.length ? initializeApp(firebaseConfig) : firebaseConfig.app();
// const db = getDatabase(app);
// const auth =getAuth(app);
// const storage = getStorage(app);


// // const db =firebaseApp.firestore();
// // const auth =firebaseApp.auth();
// // const storage = firebaseApp.storage();

// export { db,auth,storage};

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 
const firebaseConfig = {
  apiKey: "AIzaSyBR6TTE-BDMt99o3ZQuOUnIYNBxrCmxg4g",
  authDomain: "instagram-clone-3c230.firebaseapp.com",
  projectId: "instagram-clone-3c230",
  storageBucket: "instagram-clone-3c230.appspot.com",
  messagingSenderId: "252352970015",
  appId: "1:252352970015:web:eaae0a21e362848632842a",
  measurementId: "G-3EGB9JXNDM"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, db, storage };