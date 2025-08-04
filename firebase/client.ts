// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvliIdFOtizBiGlfss8UyRb3yF6NGOWas',
  authDomain: 'interviews-32d61.firebaseapp.com',
  projectId: 'interviews-32d61',
  storageBucket: 'interviews-32d61.firebasestorage.app',
  messagingSenderId: '514754190124',
  appId: '1:514754190124:web:849c0a99aef229162c6a89',
  measurementId: 'G-3L5N56P33W',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
