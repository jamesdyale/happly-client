// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCl0OG3eBxxxSbudvl9t6QFqLroJ6sDR9Y',
  authDomain: 'happly-5c322.firebaseapp.com',
  projectId: 'happly-5c322',
  storageBucket: 'happly-5c322.appspot.com',
  messagingSenderId: '629862532573',
  appId: '1:629862532573:web:0dfdfed4b790de8fa9a234'
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)


