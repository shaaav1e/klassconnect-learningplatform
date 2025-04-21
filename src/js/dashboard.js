import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"; // ✅ Corrected auth imports
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore"; // Added doc importports
import "../css/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyDcOpTdhSxtH8PCDYBzVvEGbOl25wNB-nE",
  authDomain: "klassconnect-4dca2.firebaseapp.com",
  projectId: "klassconnect-4dca2",
  storageBucket: "klassconnect-4dca2.firebasestorage.app",
  messagingSenderId: "645807821561",
  appId: "1:645807821561:web:3827d1a6bf67c7ff2f8828",
  measurementId: "G-SQRVFFJ6Z6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//For Authentication
const auth = getAuth(app);

//For Google Authentication
const provider = new GoogleAuthProvider();

//For db - Firestore
const db = getFirestore(app);

// Mobile Sidebar Toggle Functionality
document.addEventListener("DOMContentLoaded", function() {
  // Create mobile sidebar toggle button if it doesn't exist
  const dashboardContainer = document.querySelector('.dashboard');
  const leftSection = document.querySelector('.left-section');
  
  if (dashboardContainer && leftSection && !document.querySelector('.mobile-sidebar-toggle')) {
    // Create mobile toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-sidebar-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle sidebar menu');
    
    // Create hamburger icon
    const span = document.createElement('span');
    toggleButton.appendChild(span);
    
    // Add the toggle before the dashboard container
    dashboardContainer.parentNode.insertBefore(toggleButton, dashboardContainer);
    
    // Add click event to toggle sidebar
    toggleButton.addEventListener('click', function() {
      leftSection.classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Close sidebar when clicking anywhere in the right section
    const rightSection = document.querySelector('.right-sec');
    if (rightSection) {
      rightSection.addEventListener('click', function() {
        if (leftSection.classList.contains('active') && window.innerWidth <= 768) {
          leftSection.classList.remove('active');
          toggleButton.classList.remove('active');
        }
      });
    }
    
    // Close sidebar when sidebar links are clicked on mobile
    const sidebarLinks = leftSection.querySelectorAll('.sidebar-btn');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          leftSection.classList.remove('active');
          toggleButton.classList.remove('active');
        }
      });
    });
  }
});

// _______________1) SHOWING COURSES ON DASHBOARD____________________________________

const coursesButton = document.querySelector(".sidebar-btn.dash.course");

coursesButton.addEventListener("click", loadCourses);

async function loadCourses() {
  try {
    document.querySelector(".dashboard-content").innerHTML =
      "<p>Loading...</p>";

    const response = await fetch("index.html");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const coursesSection = doc.querySelector("section.courses");

    if (coursesSection) {
      const heading = coursesSection.querySelector(".course-text h2");
      const paragraph = coursesSection.querySelector(".course-text p");

      if (heading) heading.remove();
      if (paragraph) paragraph.remove();
      coursesSection.classList.remove("pt-2");
    }

    document.querySelector(".dashboard-content").innerHTML =
      coursesSection.outerHTML;

    // Add direct event listeners for HTML course buttons instead of using database enrollment
    const htmlButtons = document.querySelectorAll(".html-btn");
    htmlButtons.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = "/htmlcourse.html";
      });
    });
  } catch (error) {
    console.error("Failed to load courses:", error);
    document.querySelector(".dashboard-content").innerHTML =
      "<p>Error loading content.</p>";
  }
}

// Add handlers for other dashboard buttons
document.addEventListener("DOMContentLoaded", function () {
  // Dashboard button
  const dashboardBtn = document.querySelector("#dashboardBtn");
  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", loadDashboardContent);
  }

  // Assignments button
  const assignmentsBtn = document.querySelector("#assignmentsBtn");
  if (assignmentsBtn) {
    assignmentsBtn.addEventListener("click", loadAssignmentsContent);
  }

  // Stats button
  const statsBtn = document.querySelector("#statsBtn");
  if (statsBtn) {
    statsBtn.addEventListener("click", loadStatsContent);
  }

  // Enrolled courses button
  const enrolledBtn = document.querySelector("#enrolledBtn");
  if (enrolledBtn) {
    enrolledBtn.addEventListener("click", loadEnrolledCoursesContent);
  }

  // Ensure the courses button works
  const loadCoursesBtn = document.querySelector("#loadCourses");
  if (loadCoursesBtn) {
    loadCoursesBtn.addEventListener("click", loadCourses);
  }

  // Load dashboard content by default
  loadDashboardContent();
});

// Function to load dashboard content
function loadDashboardContent() {
  const dashboardContent = document.querySelector(".dashboard-content");
  dashboardContent.innerHTML = `
    <div class="welcome-dashboard">
      <h2>Welcome to your Dashboard</h2>
      <p>Here you can manage your courses, track progress, and more.</p>
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Courses Enrolled</h3>
          <p>0</p>
        </div>
        <div class="stat-card">
          <h3>Assignments</h3>
          <p>0</p>
        </div>
        <div class="stat-card">
          <h3>Progress</h3>
          <p>0%</p>
        </div>
      </div>
    </div>
  `;
}

// Function to load assignments content
function loadAssignmentsContent() {
  const dashboardContent = document.querySelector(".dashboard-content");
  dashboardContent.innerHTML = `
    <div class="assignments-section">
      <h2>Your Assignments</h2>
      <p>No assignments available yet.</p>
    </div>
  `;
}

// Function to load stats content
function loadStatsContent() {
  const dashboardContent = document.querySelector(".dashboard-content");
  dashboardContent.innerHTML = `
    <div class="stats-section">
      <h2>Your Statistics</h2>
      <p>No statistics available yet.</p>
    </div>
  `;
}

// Function to load enrolled courses content
function loadEnrolledCoursesContent() {
  const dashboardContent = document.querySelector(".dashboard-content");
  dashboardContent.innerHTML = `
    <div class="enrolled-courses-section">
      <h2>Your Enrolled Courses</h2>
      <p>You haven't enrolled in any courses yet.</p>
      <button id="browseCourses" class="btn">Browse Courses</button>
    </div>
  `;

  // Add event listener for the browse courses button
  const browseCourses = document.querySelector("#browseCourses");
  if (browseCourses) {
    browseCourses.addEventListener("click", loadCourses);
  }
}

// Ensure loadCourses function runs when button exists
const loadCoursesBtn = document.querySelector("#loadCourses");
if (loadCoursesBtn) {
  loadCoursesBtn.addEventListener("click", loadCourses);
}

// _______________2) LOGOUT BUTTON________________________

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  e.stopPropagation();
  document.querySelector(".logout-modal").classList.toggle("show");
});

// Hide modal when clicked outside
document.addEventListener("click", (e) => {
  if (!document.querySelector(".user-profile").contains(e.target)) {
    document.querySelector(".logout-modal").classList.remove("show");
  }
});
// const logouttext=document.querySelector('.logout-text')
// logouttext.addEventListener('click', () =>
// {
//   window.location.href="/index.html";
// })
const logouttext = document.querySelector(".logout-text");
logouttext.addEventListener("click", async () => {
  try {
    await signOut(auth); // Logs the user out
    window.location.href = "/index.html"; // Redirects to login page
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

// Check if user is logged in (for security)
onAuthStateChanged(auth, async (user) => {
  // Only redirect if we're on the dashboard page
  if (!user && window.location.pathname.includes("dashboard.html")) {
    // If no user is logged in, redirect to login page
    window.location.href = "/login.html";
  } else if (user) {
    // User is logged in, update UI with their information
    try {
      // Get user document from Firestore to check for additional profile data
      const userDocRef = doc(db, "users", user.email.toLowerCase());
      const userDoc = await getDoc(userDocRef);

      // Update the UI with user information
      updateUserUI(user, userDoc.exists() ? userDoc.data() : null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Still show basic user information even if Firestore fetch fails
      updateUserUI(user);
    }
  }
});

// Function to update UI with user information
function updateUserUI(user, userData = null) {
  const userNameElement = document.querySelector(".user-name");
  const userProfileElement = document.querySelector(".user-profile");

  if (userNameElement) {
    // Use display name from auth or name from Firestore
    const displayName =
      user.displayName || userData?.name || user.email.split("@")[0];
    userNameElement.textContent = displayName;
  }

  // Check if we already added a profile image
  if (
    userProfileElement &&
    !userProfileElement.querySelector(".profile-image")
  ) {
    // Create and add profile image if user has one
    if (user.photoURL || userData?.profilePic) {
      const profilePic = document.createElement("img");
      profilePic.src = user.photoURL || userData?.profilePic;
      profilePic.alt = "Profile";
      profilePic.className = "profile-image";
      profilePic.style.width = "32px";
      profilePic.style.height = "32px";
      profilePic.style.borderRadius = "50%";
      profilePic.style.marginRight = "8px";

      // Insert the profile image before the user name
      userProfileElement.insertBefore(profilePic, userNameElement);
    } else {
      // If no profile image, add a default icon
      const defaultIcon = document.createElement("ion-icon");
      defaultIcon.setAttribute("name", "person-circle-outline");
      defaultIcon.className = "profile-image";
      defaultIcon.style.fontSize = "28px";
      defaultIcon.style.marginRight = "8px";

      // Insert the default icon before the user name
      userProfileElement.insertBefore(defaultIcon, userNameElement);
    }
  }
}

// _______________3) SHOWING ENROLLED COURSES ON DASHBOARD________________________
