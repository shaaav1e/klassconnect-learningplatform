import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // ✅ Corrected auth imports
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDoc,
  setDoc,
} from "firebase/firestore"; // Added setDoc for user creation
import "../css/style.css";
import "../js/cursor.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcOpTdhSxtH8PCDYBzVvEGbOl25wNB-nE",
  authDomain: "klassconnect-4dca2.firebaseapp.com",
  projectId: "klassconnect-4dca2",
  storageBucket: "klassconnect-4dca2.firebasestorage.app",
  messagingSenderId: "645807821561",
  appId: "1:645807821561:web:3827d1a6bf67c7ff2f8828",
  measurementId: "G-SQRVFFJ6Z6",
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

// Check if we're on a page with the login button
const googleLoginButton = document.getElementById("google-login");
if (googleLoginButton) {
  googleLoginButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevents unwanted refresh

    // Show loading state
    const authMessage = document.getElementById("authMessage");
    authMessage.style.display = "block";
    authMessage.className = "auth-message info";
    authMessage.textContent = "Connecting to Google... Please wait";

    // Disable buttons during auth
    toggleAuthButtons(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in with Google:", user);

      authMessage.className = "auth-message success";
      authMessage.textContent = "Success! Redirecting...";

      // Create or update user in Firestore with default role "Student"
      await setDoc(
        doc(db, "users", user.email.toLowerCase()),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email.toLowerCase(),
          profilePic: user.photoURL,
          role: "Student", // Default role for Google sign-ins
          createdAt: new Date(),
        },
        { merge: true }
      ); // merge: true to not overwrite existing data

      // Redirect Google users to dashboard
      window.location.href = "/dashboard.html";
    } catch (error) {
      console.error("Error during Google login:", error);

      authMessage.className = "auth-message error";
      authMessage.textContent = "Login failed: " + error.message;

      // Re-enable buttons
      toggleAuthButtons(false);
    }
  });
}

// Function to toggle auth buttons enabled/disabled state
function toggleAuthButtons(disabled) {
  const googleBtn = document.getElementById("google-login");
  const emailBtn = document.getElementById("email-login");

  if (googleBtn) googleBtn.disabled = disabled;
  if (emailBtn) emailBtn.disabled = disabled;

  // Add visual indication of disabled state
  if (googleBtn) googleBtn.style.opacity = disabled ? "0.7" : "1";
  if (emailBtn) emailBtn.style.opacity = disabled ? "0.7" : "1";
}

// Fix login button issue - add event listener for login buttons to prevent accidental navigation
document.addEventListener("DOMContentLoaded", function () {
  // Fix login buttons if they exist on the current page
  const allLoginButtons = document.querySelectorAll(".login-btn");

  allLoginButtons.forEach((button) => {
    // Remove any existing hover events that might be causing issues
    button.style.pointerEvents = "auto";

    // Ensure clicks work properly
    if (button.getAttribute("href") === "/login.html") {
      button.addEventListener("click", function (e) {
        // Only allow deliberate clicks to navigate
        if (e.type === "click") {
          window.location.href = "/login.html";
        } else {
          e.preventDefault();
        }
      });
    }
  });

  // Improve back button functionality
  if (document.referrer && !window.location.pathname.includes("index.html")) {
    window.history.replaceState(null, "", window.location.href);
  }
});

// Modified to check user role before redirecting
// Only run this check if we're not on the login page to prevent redirect loops
if (!window.location.pathname.includes("login.html")) {
  onAuthStateChanged(auth, async (user) => {
    // Skip automatic redirection on login page
    if (window.location.pathname.includes("login.html")) {
      return;
    }

    if (user) {
      console.log("User is logged in:", user.email);

      try {
        // Check user role from Firestore
        const userDocRef = doc(db, "users", user.email.toLowerCase());
        const userDoc = await getDoc(userDocRef);

        // Only redirect if not already on the correct page
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role?.trim() || "Student"; // Default to Student if no role

          const currentPath = window.location.pathname;

          if (userRole === "Teacher" && !currentPath.includes("quiz.html")) {
            window.location.href = "/quiz.html";
          } else if (
            userRole === "Student" &&
            !currentPath.includes("dashboard.html")
          ) {
            window.location.href = "/dashboard.html";
          } else if (
            userRole === "Admin" &&
            !currentPath.includes("admin.html")
          ) {
            window.location.href = "/admin.html";
          }
        } else {
          console.warn(
            "User document not found in Firestore. Creating new record."
          );
          // Create basic user document
          await setDoc(doc(db, "users", user.email.toLowerCase()), {
            uid: user.uid,
            email: user.email.toLowerCase(),
            role: "Student", // Default role
            createdAt: new Date(),
          });

          // Default to dashboard for new users
          window.location.href = "/dashboard.html";
        }
      } catch (error) {
        console.error("Error retrieving user role:", error);
      }
    } else if (
      !window.location.pathname.includes("index.html") &&
      !window.location.pathname.includes("login.html")
    ) {
      // Redirect to login only if not already on index or login page
      window.location.href = "/login.html";
    }
  });
}

// LOGGING IN WITH EMAIL AND PASSWORD - STORED IN FIRESTORE
const emailLoginButton = document.getElementById("email-login");
if (emailLoginButton) {
  emailLoginButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value.trim().toLowerCase(); // Normalize email
    const password = document.getElementById("password").value;
    const selectedRole = document.getElementById("role").value.trim();
    const authMessage = document.getElementById("authMessage");

    if (!email || !password) {
      authMessage.style.display = "block";
      authMessage.className = "auth-message error";
      authMessage.textContent = "Please enter both email and password";
      return;
    }

    // Show loading state
    authMessage.style.display = "block";
    authMessage.className = "auth-message info";
    authMessage.textContent = "Authenticating... Please wait";

    // Disable buttons during auth
    toggleAuthButtons(true);

    try {
      console.log(
        "🔄 Attempting login for:",
        email,
        "with role:",
        selectedRole
      );

      // Step 1: Authenticate User
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("✅ Firebase Authentication Successful:", user.email);

      // Show success message
      authMessage.className = "auth-message success";
      authMessage.textContent =
        "Authentication successful! Checking permissions...";

      // Normalize Firestore Document ID (Email)
      const userDocRef = doc(db, "users", email.toLowerCase());
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.warn(
          "User authenticated but not found in Firestore. Creating document with selected role."
        );

        authMessage.textContent =
          "First login detected. Setting up your account...";

        // Create user document with selected role
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email.toLowerCase(),
          role: selectedRole,
          createdAt: new Date(),
        });

        console.log(`✅ Created new user document with role: ${selectedRole}`);
        authMessage.textContent =
          "Account created successfully! Redirecting...";
      } else {
        const userData = userDoc.data();
        const storedRole = userData.role?.trim() || "";
        console.log("📌 Firestore Role Found:", storedRole);

        if (storedRole && storedRole !== selectedRole) {
          console.warn(
            `🚨 Role Mismatch! Selected: ${selectedRole}, Firestore: ${storedRole}`
          );
          authMessage.className = "auth-message warning";
          authMessage.textContent = `Note: Your actual role is "${storedRole}". Redirecting to the appropriate page...`;

          // Redirect based on the stored role, not the selected one
          setTimeout(() => {
            if (storedRole === "Teacher") {
              window.location.href = "/quiz.html";
            } else if (storedRole === "Student") {
              window.location.href = "/dashboard.html";
            } else if (storedRole === "Admin") {
              window.location.href = "/admin.html";
            }
          }, 1500); // Short delay to show the message
          return;
        }
      }

      console.log(
        `✅ Role Check Passed. Redirecting to ${selectedRole} interface`
      );
      authMessage.textContent = `Welcome! Redirecting to your ${selectedRole} dashboard...`;

      // Slight delay for better UX - shows the success message before redirecting
      setTimeout(() => {
        if (selectedRole === "Teacher") {
          window.location.href = "/quiz.html";
        } else if (selectedRole === "Student") {
          window.location.href = "/dashboard.html";
        } else if (selectedRole === "Admin") {
          window.location.href = "/admin.html";
        }
      }, 1000);
    } catch (error) {
      console.error("🚨 Login Failed:", error.message);

      authMessage.className = "auth-message error";
      authMessage.textContent = "Login failed: " + error.message;

      // Re-enable buttons
      toggleAuthButtons(false);
    }
  });
}

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
