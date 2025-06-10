// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyATMkGaNJO66mOPqSAu3XGS1_3UZrXGNik",
//   authDomain: "sndpp-cas.firebaseapp.com",
//   projectId: "sndpp-cas",
//   storageBucket: "sndpp-cas.firebasestorage.app",
//   messagingSenderId: "655530300350",
//   appId: "1:655530300350:web:9abfd43365566f065ddfef"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ This was missing

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATMkGaNJO66mOPqSAu3XGS1_3UZrXGNik",
  authDomain: "sndpp-cas.firebaseapp.com",
  projectId: "sndpp-cas",
  storageBucket: "sndpp-cas.appspot.com", // ✅ Corrected domain (.app should be .appspot.com)
  messagingSenderId: "655530300350",
  appId: "1:655530300350:web:9abfd43365566f065ddfef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Named export
