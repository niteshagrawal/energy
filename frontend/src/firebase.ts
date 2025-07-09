import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcrs-vBjqrbXWfAxF8wya_7yLTC0omqic",
  authDomain: "energy-19895.firebaseapp.com",
  projectId: "energy-19895",
  storageBucket: "energy-19895.firebasestorage.app",
  messagingSenderId: "668275864926",
  appId: "1:668275864926:web:e7dc5d370855bdbf500bcf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { auth };