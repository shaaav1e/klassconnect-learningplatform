import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"; // ✅ Corrected auth imports
import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore"; // ✅ Corrected Firestore importsports
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

// _______________1) SHOWING COURSES ON DASHBOARD____________________________________

const coursesButton = document.querySelector(".sidebar-btn.dash.course");

coursesButton.addEventListener("click", loadCourses);

async function loadCourses() {
  try {
    document.querySelector(".dashboard-content").innerHTML =
      "<p>Loading courses...</p>";

    // Use window.location.origin to create an absolute URL that works in all environments
    const indexUrl = new URL("/index.html", window.location.origin).href;
    console.log("Fetching courses from:", indexUrl);

    const response = await fetch(indexUrl, {
      // Add cache control to avoid stale content
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const coursesSection = doc.querySelector("section.courses");

    if (!coursesSection) {
      throw new Error("Could not find courses section in the HTML");
    }

    const heading = coursesSection.querySelector(".course-text h2");
    const paragraph = coursesSection.querySelector(".course-text p");

    if (heading) heading.remove();
    if (paragraph) paragraph.remove();
    coursesSection.classList.remove("pt-2");

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

    // Provide a helpful error message and fallback UI for the user
    document.querySelector(".dashboard-content").innerHTML = `
      <div class="error-container" style="text-align: center; padding: 2rem;">
        <h3>Could not load courses</h3>
        <p>${error.message}</p>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
        <button class="retry-btn" style="padding: 0.5rem 1rem; margin-top: 1rem;">Retry Loading Courses</button>
      </div>
    `;

    // Add retry functionality
    document
      .querySelector(".retry-btn")
      ?.addEventListener("click", loadCourses);
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
  if (!user) {
    // If no user is logged in, redirect to login page
    window.location.href = "/index.html";
  } else {
    // Update user profile display with actual user info
    updateUserProfile(user);
  }
});

// Function to update user profile display
async function updateUserProfile(user) {
  try {
    const userProfileContainer = document.querySelector(".user-profile");
    const userNameElement = document.querySelector(".user-name");

    // Check if we have the profile elements
    if (!userProfileContainer || !userNameElement) return;

    // Find existing photo element or create a placeholder
    let userPhotoElement = userProfileContainer.querySelector(".login-photo");
    if (!userPhotoElement) {
      // Create container for the user photo/icon
      userPhotoElement = document.createElement("div");
      userPhotoElement.className = "login-photo";
      userProfileContainer.insertBefore(userPhotoElement, userNameElement);
    }

    // Set user profile picture - use actual photo or default icon
    if (user.photoURL) {
      userPhotoElement.innerHTML = `<img src="${user.photoURL}" alt="User" class="user-img">`;
    } else {
      // Use ion-icon as fallback
      userPhotoElement.innerHTML = `<ion-icon name="person" class="profile-icon"></ion-icon>`;
    }

    // Get user name (either from auth or Firestore)
    let displayName = user.displayName;

    // If no display name in auth object, try to get it from Firestore
    if (!displayName) {
      const userDocRef = doc(db, "users", user.email.toLowerCase());
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Try to get name from Firestore document
        displayName =
          userDoc.data().name || userDoc.data().email?.split("@")[0];
      }

      if (!displayName) {
        // Last resort: use email as fallback for name
        displayName = user.email.split("@")[0]; // Just use part before @
      }
    }

    // Update name display
    userNameElement.textContent = displayName;

    console.log("Updated profile display for", displayName);
  } catch (error) {
    console.error("Error updating user profile display:", error);
  }
}

// _______________3) DASHBOARD NAVIGATION BUTTONS________________________

// Assignment button functionality
const assignmentsBtn = document.getElementById("assignmentsBtn");
assignmentsBtn.addEventListener("click", function () {
  document.querySelector(".dashboard-content").innerHTML = `
    <div class="coming-soon-container">
      <div class="blur-bg">
        <h2>Your Assignments</h2>
        <div class="assignment-grid">
          <div class="assignment-card">
            <h3>HTML Basics Quiz</h3>
            <p>Due: October 15, 2023</p>
            <div class="assignment-progress">
              <div class="progress-fill high"></div>
            </div>
          </div>
          <div class="assignment-card">
            <h3>CSS Layout Challenge</h3>
            <p>Due: October 20, 2023</p>
            <div class="assignment-progress">
              <div class="progress-fill medium"></div>
            </div>
          </div>
          <div class="assignment-card">
            <h3>JavaScript Functions</h3>
            <p>Due: October 25, 2023</p>
            <div class="assignment-progress">
              <div class="progress-fill low"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="coming-soon-overlay">
        <span>COMING SOON</span>
        <p>We're working on the assignments feature</p>
      </div>
    </div>
  `;
});

// Stats button functionality
const statsBtn = document.getElementById("statsBtn");
statsBtn.addEventListener("click", function () {
  document.querySelector(".dashboard-content").innerHTML = `
    <div class="coming-soon-container">
      <div class="blur-bg">
        <h2>Your Learning Statistics</h2>
        <div class="stats-charts">
          <div class="chart-column">
            <!-- Bar chart placeholder -->
            <div class="chart-bar bar-1"></div>
            <div class="chart-bar bar-2"></div>
            <div class="chart-bar bar-3"></div>
            <div class="chart-bar bar-4"></div>
          </div>
          <div class="pie-container">
            <!-- Pie chart placeholder -->
            <div class="pie-chart"></div>
          </div>
        </div>
        <div class="activity-section">
          <h3>Recent Activity</h3>
          <div class="activity-box"></div>
        </div>
      </div>
      <div class="coming-soon-overlay">
        <span>COMING SOON</span>
        <p>We're building analytics to help track your progress</p>
      </div>
    </div>
  `;
});

// Enrolled Courses button functionality
const enrolledBtn = document.getElementById("enrolledBtn");
enrolledBtn.addEventListener("click", function () {
  document.querySelector(".dashboard-content").innerHTML = `
    <div class="coming-soon-container">
      <div class="blur-bg">
        <h2>Your Enrolled Courses</h2>
        <div class="course-grid">
          <div class="course-card">
            <h3>HTML & CSS Fundamentals</h3>
            <p>Progress: 65%</p>
            <div class="course-progress">
              <div class="progress-fill html"></div>
            </div>
            <button class="continue-button html">Continue</button>
          </div>
          <div class="course-card">
            <h3>JavaScript Essentials</h3>
            <p>Progress: 20%</p>
            <div class="course-progress">
              <div class="progress-fill js"></div>
            </div>
            <button class="continue-button js">Continue</button>
          </div>
        </div>
      </div>
      <div class="coming-soon-overlay">
        <span>COMING SOON</span>
        <p>Your enrolled courses will be displayed here</p>
      </div>
    </div>
  `;
});

// Dashboard Home button functionality (show default content)
const dashboardBtn = document.getElementById("dashboardBtn");
dashboardBtn.addEventListener("click", function () {
  showDashboardHome();
});

// Function to show dashboard home content
function showDashboardHome() {
  document.querySelector(".dashboard-content").innerHTML = `
    <div class="dashboard-home">
      <h2>Welcome to Your Dashboard</h2>
      <p class="dashboard-intro">Access your courses and track your learning progress.</p>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Courses Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Assignments Submitted</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Hours Spent Learning</div>
        </div>
      </div>
      
      <h3>Continue Learning</h3>
      <div class="continue-learning">
        <button class="html-btn continue-btn">Go to HTML & CSS Course</button>
      </div>
    </div>
  `;

  // Re-add event listener for HTML course button
  const htmlButtons = document.querySelectorAll(".html-btn");
  htmlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "/htmlcourse.html";
    });
  });
}

// Initialize dashboard with default view when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Trigger dashboard home view by default
  showDashboardHome();
});
