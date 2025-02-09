import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"; // ✅ Corrected auth imports
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // ✅ Corrected Firestore imports
import '/src/style.css';


//  Firebase configuration
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


// Grab the Google login button
const googleLoginButton = document.getElementById("google-login");

// Function to handle the Google login
googleLoginButton.addEventListener("click", async () => {
  try {
    // Sign in with a Google account using popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Redirect to dashboard after successful login
    window.location.href = "/dashboard.html"; // Redirect to dashboard
  } catch (error) {
    console.error("Error during Google login:", error);
  }
});

// Check if a user is already signed in when the page loads
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Redirect to dashboard when the user is already logged in
    window.location.href = "/dashboard.html"; // Redirect to dashboard
  } else {
    // If no user, show login button
    googleLoginButton.style.display = "block";
  }
});


//__________________________LOGGING OUT________________________


// const logoutButton = document.getElementById("logout");

// // Function to handle logout
// logoutButton.addEventListener("click", async () => {
//   try {
//     await signOut(auth); // Logs the user out
//     window.location.href = "/index.html"; // Redirects to login page
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// });

// // Check if user is logged in (for security)
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     // If no user is logged in, redirect to login page
//     window.location.href = "/index.html";
//   }
// });




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

