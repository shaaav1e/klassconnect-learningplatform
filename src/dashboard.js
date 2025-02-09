import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"; // ✅ Corrected auth imports
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // ✅ Corrected Firestore imports
import '/src/style.css';

//  Firebase configuration of project
const firebaseConfig = {
  apiKey: "AIzaSyDcOpTdhSxtH8PCDYBzVvEGbOl25wNB-nE",
  authDomain: "klassconnect-4dca2.firebaseapp.com",
  projectId: "klassconnect-4dca2",
  storageBucket: "klassconnect-4dca2.firebasestorage.app",
  messagingSenderId: "645807821561",
  appId: "1:645807821561:web:3827d1a6bf67c7ff2f8828",
  measurementId: "G-SQRVFFJ6Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//For Authentication
const auth = getAuth(app);

//For Google Authentication
const provider = new GoogleAuthProvider();

//For db - Firestore
const db=getFirestore(app);




// _______________1) SHOWING COURSES ON DASHBOARD____________________________________
const coursesButton = document.querySelector('.btn.dash.course');

coursesButton.addEventListener('click', async () => {
  try {
    // Show loading state (optional)
    document.querySelector('.dashboard-content').innerHTML = '<p>Loading...</p>';

    // Fetch index.html and extract the courses section
    const response = await fetch('index.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const coursesSection = doc.querySelector('section.courses');

    // Inject the courses section into dashboard.html
    document.querySelector('.dashboard-content').innerHTML = coursesSection.outerHTML;

    // Update URL without reloading (optional but recommended for UX)
    history.pushState({}, '', '#courses'); 

    // Re-initialize any JS/CSS needed for the courses section (if required)
    // Example: Re-attach event listeners or re-run animations
  } catch (error) {
    console.error('Failed to load courses:', error);
    document.querySelector('.dashboard-content').innerHTML = '<p>Error loading content.</p>';
  }
});




// _______________2) LOGOUT BUTTON________________________


const logout=document.getElementById('logout');
logout.addEventListener('click',(e)=>{
  e.stopPropagation();
  document.querySelector('.logout-modal').classList.toggle("show");
});

// Hide modal when clicked outside
document.addEventListener('click', (e) => {
  if (!document.querySelector(".user-profile").contains(e.target)) {
    document.querySelector(".logout-modal").classList.remove("show");
  }
});

const logouttext=document.querySelector('.logout-text');
logouttext.addEventListener("click", async () => {
  try {
    await signOut(auth); // Logs the user out
    window.location.href = "/index.html"; // Redirects to login page
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

// Check if user is logged in (for security)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is logged in, redirect to login page
    window.location.href = "/index.html";
  }
});




// _______________3) SHOWING ENROLLED COURSES ON DASHBOARD________________________
