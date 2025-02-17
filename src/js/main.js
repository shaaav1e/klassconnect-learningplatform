import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,signInWithEmailAndPassword, signOut } from "firebase/auth"; // ✅ Corrected auth imports
import { getFirestore, doc, collection, addDoc, getDoc } from "firebase/firestore"; // ✅ Corrected Firestore imports
import '../css/style.css';
import "../js/cursor.js";


const firebaseConfig = {
  apiKey: "AIzaSyDcOpTdhSxtH8PCDYBzVvEGbOl25wNB-nE",
  authDomain: "klassconnect-4dca2.firebaseapp.com",
  projectId: "klassconnect-4dca2",
  storageBucket: "klassconnect-4dca2.firebasestorage.app",
  messagingSenderId: "645807821561",
  appId: "1:645807821561:web:3827d1a6bf67c7ff2f8828",
  measurementId: "G-SQRVFFJ6Z6"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

//For Authentication
const auth = getAuth(app);

//For Google Authentication
const provider = new GoogleAuthProvider();

//For db - Firestore
const db = getFirestore(app);


//___________LOGGING IN WITH GOOGLE_______________________

const googleLoginButton = document.getElementById("google-login");
googleLoginButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevents unwanted refresh
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    console.log("User signed in:", user);

    // Redirect to dashboard after successful login
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Error during Google login:", error);
  }
});

// Check if the user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
    window.location.href = "/dashboard.html"; // Redirect if already logged in
  }
});




// LOGGING IN WITH EMAIL AND PASSWORD - STORED IN FIRESTORE

document.getElementById("email-login").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value.trim().toLowerCase(); // Normalize email
  const password = document.getElementById("password").value;
  const selectedRole = document.getElementById("role").value.trim();

  try {
      console.log("🔄 Attempting login for:", email);

      // Step 1: Authenticate User
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ Firebase Authentication Successful:", user.email);

      // Normalize Firestore Document ID (Email)
      const userDocRef = doc(db, "users", email.toLowerCase()); // Ensure lowercase email
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
          console.error("❌ User document not found in Firestore!");
          alert("User not found in Firestore. Contact Admin.");
          await signOut(auth);
          return;
      }

      const userData = userDoc.data();
      const storedRole = userData.role.trim();
      console.log("📌 Firestore Role Found:", storedRole);

      if (storedRole !== selectedRole) {
          console.warn(`🚨 Role Mismatch! Selected: ${selectedRole}, Firestore: ${storedRole}`);
          alert("Incorrect role selected. Logging out...");
          await signOut(auth);
          return;
      }

      console.log(`✅ Role Matched! Redirecting to ${selectedRole}.html`);

      if (selectedRole === "Teacher") {
          window.location.href = "/quiz.html";
      } else if (selectedRole === "Student") {
          window.location.href = "/dashboard.html";
      } else if (selectedRole === "Admin") {
          window.location.href = "/admin.html";
      }
  } catch (error) {
      console.error("🚨 Login Failed:", error.message);
      alert("Invalid email or password.");
  }
});




// ____________SAVING INFO TO DATABASE___________

// async function addUserToDatabase(user) {
//   try {
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       profilePic: user.photoURL,
//       createdAt: new Date()
//     });
//     console.log("User added to database!");
//   } catch (error) {
//     console.error("Error adding user:", error);
//   }
// }

