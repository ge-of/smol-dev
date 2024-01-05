import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../types/index';

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(config);

const auth = firebase.auth();

function signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

function logout(): Promise<void> {
  return auth.signOut();
}

function onAuthStateChanged(callback: (user: User | null) => void): void {
  auth.onAuthStateChanged(user => {
    if (user) {
      const { uid, email, displayName } = user;
      callback({ id: uid, email: email || '', displayName: displayName || '' });
    } else {
      callback(null);
    }
  });
}

export {
  signup,
  login,
  logout,
  onAuthStateChanged
};