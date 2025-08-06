import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDxTF2_eOAq1mXtHQv28-hv3ksnie6ZF_o',
  authDomain: 'interviews-c527d.firebaseapp.com',
  projectId: 'interviews-c527d',
  storageBucket: 'interviews-c527d.firebasestorage.app',
  messagingSenderId: '397327175693',
  appId: '1:397327175693:web:96b1c0307f22d2d9800544',
  measurementId: 'G-R6RWN48VPC',
};


const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app)
export const db = getFirestore(app)
