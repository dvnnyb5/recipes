import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCcU9oIHrEee1oe5_2zkY7uTMJb89g9cEQ",
  authDomain: "pantry-vault.firebaseapp.com",
  projectId: "pantry-vault",
  storageBucket: "pantry-vault.appspot.com",
  messagingSenderId: "280395747456",
  appId: "1:280395747456:web:cfa05fe0bb49c640671665",
  measurementId: "G-HW2HG8ZEZZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics };

export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
