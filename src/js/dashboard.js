import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"; // ✅ Corrected auth imports
import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore"; // ✅ Corrected Firestore imports
import '../css/style.css';

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



// const coursesButton = document.querySelector('.sidebar-btn.dash.course');

// coursesButton.addEventListener('click', async () => {
//   try {
//     // Show loading state (optional)
//     document.querySelector('.dashboard-content').innerHTML = '<p>Loading...</p>';

//     // Fetch index.html and extract the courses section
//     const response = await fetch('index.html');
//     const html = await response.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const coursesSection = doc.querySelector('section.courses');

//     if (coursesSection) {
//       // Remove unwanted heading and paragraph elements
//       const heading = coursesSection.querySelector('.course-text h2');
//       const paragraph = coursesSection.querySelector('.course-text p');

//       if (heading) heading.remove();
//       if (paragraph) paragraph.remove();
//       coursesSection.classList.remove('pt-2');
//     }

//     // Inject the modified courses section into dashboard.html
//     document.querySelector('.dashboard-content').innerHTML = coursesSection.outerHTML;

//     // Update URL without reloading (optional)
//     history.pushState({}, '', '#courses');
//     document.querySelector('.dashboard-content').addEventListener('click', (event) => {
//       if (event.target.classList.contains('html-btn')) {
//         window.location.href = '/htmlcourse.html'; // Redirect to htmlcourse.html
//       }
//     });

//   } catch (error) {
//     console.error('Failed to load courses:', error);
//     document.querySelector('.dashboard-content').innerHTML = '<p>Error loading content.</p>';
//   }
// });



const coursesButton = document.querySelector('.sidebar-btn.dash.course');

coursesButton.addEventListener('click', loadCourses);

async function loadCourses() {
  try {
    document.querySelector(".dashboard-content").innerHTML = "<p>Loading...</p>";

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

    document.querySelector(".dashboard-content").innerHTML = coursesSection.outerHTML;

    // Attach enroll button listeners
    attachEnrollEventListeners();

  } catch (error) {
    console.error("Failed to load courses:", error);
    document.querySelector(".dashboard-content").innerHTML = "<p>Error loading content.</p>";
  }
}

function attachEnrollEventListeners() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    let enrolledCourses = [];

    if (userDoc.exists()) {
      enrolledCourses = userDoc.data().enrolledCourses || [];
    }

    document.querySelector(".dashboard-content").addEventListener("click", async (event) => {
      if (event.target.classList.contains("enroll-btn")) {
        const courseName = event.target.dataset.course;

        if (!enrolledCourses.includes(courseName)) {
          // Enroll user in the course
          await updateDoc(userDocRef, {
            enrolledCourses: arrayUnion(courseName),
          });

          enrolledCourses.push(courseName); // Update local state

          event.target.textContent = "Access Course";
          event.target.classList.add("access-course");

          moveToEnrolledSection(courseName);
        } else {
          window.location.href = `/${courseName.toLowerCase()}.html`;
        }
      }
    });
  });
}

function moveToEnrolledSection(courseName) {
  const enrolledSection = document.querySelector(".dashboard-content");
  const enrolledDiv = document.createElement("div");
  enrolledDiv.classList.add("enrolled-course");
  enrolledDiv.innerHTML = `
    <p>${courseName}</p>
    <button class="access-course-btn" data-course="${courseName}">Access Course</button>
  `;

  enrolledSection.appendChild(enrolledDiv);

  enrolledDiv.querySelector(".access-course-btn").addEventListener("click", () => {
    window.location.href = `/${courseName.toLowerCase()}.html`;
  });
}

// Load Enrolled Courses on Page Load
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userId = user.uid;
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists() && userDoc.data().enrolledCourses) {
    userDoc.data().enrolledCourses.forEach(moveToEnrolledSection);
  }
});

// Ensure loadCourses function runs when button exists
const loadCoursesBtn = document.querySelector("#loadCourses");
if (loadCoursesBtn) {
  loadCoursesBtn.addEventListener("click", loadCourses);
}







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
// const logouttext=document.querySelector('.logout-text')
// logouttext.addEventListener('click', () =>
// {
//   window.location.href="/index.html";
// })
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
