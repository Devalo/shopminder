/* eslint-disable import/no-unresolved */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fire = firebase.initializeApp({
  apiKey: "AIzaSyDvkyovniztbn-Xkfru-yBDIAi0i-1qjLo",
  authDomain: "shopminders-db3a8.firebaseapp.com",
  projectId: "shopminders-db3a8",
  storageBucket: "shopminders-db3a8.appspot.com",
  messagingSenderId: "655543777214",
  appId: "1:655543777214:web:6ed19c5253b2deaf8a2bef"
});

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};
