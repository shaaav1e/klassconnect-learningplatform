// Explicitly set backend URL to use the Render deployment
const BACKEND_URL = "https://klassconnect-backend.onrender.com";
let isBackendOnline = false;

document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.getElementById("uploadForm");
  const quizSection = document.getElementById("quizSection");
  const quizForm = document.getElementById("quizForm");
  const submitQuizButton = document.getElementById("submitQuiz");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const resultsSection = document.getElementById("resultsSection");
  const retakeQuizButton = document.getElementById("retakeQuiz");
  const backendStatusElement = document.getElementById("backendStatus");

  console.log("Using BACKEND_URL:", BACKEND_URL);

  // Simplify the backend status check to avoid CORS issues
  checkBackendStatus();

  // Function to check backend status
  function checkBackendStatus() {
    backendStatusElement.style.display = "block";
    backendStatusElement.style.backgroundColor = "#ffffcc";
    backendStatusElement.textContent = "Checking connection to server...";

    // Use a timeout to handle very slow connections
    let timeoutId = setTimeout(() => {
      backendStatusElement.textContent = "❌ Server connection timed out";
      backendStatusElement.style.backgroundColor = "#ffcccc";
      displayOfflineWarning();
    }, 15000);

    fetch(`${BACKEND_URL}/status`, {
      method: "GET",
      mode: "cors",
      // Disable credentials completely to avoid CORS preflight
      credentials: "omit",
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`Status check failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Backend status:", data);
        backendStatusElement.textContent = "✅ Connected to server";
        backendStatusElement.style.backgroundColor = "#ccffcc";
        isBackendOnline = true;
        setTimeout(() => {
          backendStatusElement.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error("Backend connectivity issue:", error);
        backendStatusElement.textContent = "❌ Could not connect to server";
        backendStatusElement.style.backgroundColor = "#ffcccc";
        displayOfflineWarning();
      });
  }

  function displayOfflineWarning() {
    isBackendOnline = false;
    const container = document.querySelector(".container");

    // Check if warning already exists
    if (!document.getElementById("offlineWarning")) {
      const warning = document.createElement("div");
      warning.id = "offlineWarning";
      warning.className = "alert";
      warning.style.backgroundColor = "#ffcccc";
      warning.style.padding = "10px";
      warning.style.marginBottom = "15px";
      warning.style.borderRadius = "5px";
      warning.innerHTML = `
        <p><strong>Warning:</strong> Could not connect to the server. Quiz functionality will not work.</p>
        <p>Possible reasons:</p>
        <ul>
          <li>The server might be temporarily down or starting up (Render free tier can take up to 5 minutes to start)</li>
          <li>There may be a network connectivity issue</li>
          <li>CORS policy might be blocking requests</li>
        </ul>
        <button id="retryConnection" style="margin-top: 10px; padding: 5px 10px;">Retry Connection</button>
      `;
      // Insert before the form
      container.insertBefore(warning, uploadForm);

      // Add retry button functionality
      document
        .getElementById("retryConnection")
        .addEventListener("click", function () {
          document.getElementById("offlineWarning").remove();
          checkBackendStatus();
        });

      // Disable the upload form
      document.querySelector(
        "#uploadForm button[type='submit']"
      ).disabled = true;
    }
  }

  let currentQuiz = [];

  // Handle form submission for PDF upload
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check if backend is online before proceeding
    if (!isBackendOnline) {
      alert(
        "Cannot upload PDF: The server is currently offline. Please try again later."
      );
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = "flex";

    const formData = new FormData(uploadForm);

    // Log what's being uploaded for debugging
    console.log("Uploading file:", formData.get("file").name);
    console.log("Number of questions:", formData.get("num_questions"));

    fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
      mode: "cors",
      credentials: "omit", // Changed from "same-origin" to avoid credential issues across domains
    })
      .then(async (response) => {
        // Handle only 2xx responses as successful
        if (!response.ok) {
          // Try to get response text for debugging
          const responseText = await response.text();
          console.log("Error response:", responseText);

          // Try to parse as JSON if possible
          try {
            const errorData = JSON.parse(responseText);
            throw new Error(
              errorData.error || `Server returned ${response.status}`
            );
          } catch (e) {
            // If parsing fails, just use the status
            throw new Error(
              `Server returned ${response.status}: ${
                response.statusText || "Unknown error"
              }`
            );
          }
        }

        return response.json();
      })
      .then((data) => {
        // Hide loading spinner
        loadingSpinner.style.display = "none";

        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        currentQuiz = data.mcqs;
        displayQuiz(currentQuiz);

        // Show quiz section
        quizSection.style.display = "block";

        // Scroll to the quiz section
        quizSection.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => {
        loadingSpinner.style.display = "none";
        console.error("Upload Error:", error);
        alert(
          `Error connecting to server: ${error.message}. Please check your internet connection and try again. If this persists, the backend server may be down or experiencing issues.`
        );
      });
  });

  // Function to display quiz questions
  function displayQuiz(questions) {
    quizForm.innerHTML = "";

    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "quiz-question";

      const questionLabel = document.createElement("label");
      questionLabel.textContent = `${index + 1}. ${q.question}`;
      questionDiv.appendChild(questionLabel);

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "quiz-options";

      // Create radio buttons for each option
      q.options.forEach((option, optIndex) => {
        const optionItem = document.createElement("div");
        optionItem.className = "option-item";

        // Create a wrapper for the radio button and label to ensure proper alignment
        const radioWrapper = document.createElement("div");
        radioWrapper.style.display = "flex";
        radioWrapper.style.alignItems = "center";
        radioWrapper.style.width = "100%";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question-${index}`;
        radio.value = option;
        radio.id = `q${index}-opt${optIndex}`;
        radio.setAttribute("data-question", q.question);
        radio.style.marginRight = "10px";

        const optionLabel = document.createElement("label");
        optionLabel.textContent = option;
        optionLabel.htmlFor = `q${index}-opt${optIndex}`;
        optionLabel.style.flex = "1";
        optionLabel.style.margin = "0";
        optionLabel.style.cursor = "pointer";

        radioWrapper.appendChild(radio);
        radioWrapper.appendChild(optionLabel);
        optionItem.appendChild(radioWrapper);

        optionsDiv.appendChild(optionItem);
      });

      questionDiv.appendChild(optionsDiv);
      quizForm.appendChild(questionDiv);
    });
  }

  // Handle quiz submission with updated fetch configuration
  submitQuizButton.addEventListener("click", function () {
    // Collect user answers
    const userAnswers = [];

    currentQuiz.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      userAnswers.push({
        question: q.question,
        selectedAnswer: selectedOption ? selectedOption.value : null,
      });
    });

    // Check if all questions are answered
    const unansweredCount = userAnswers.filter(
      (a) => a.selectedAnswer === null
    ).length;
    if (unansweredCount > 0) {
      if (
        !confirm(
          `You have ${unansweredCount} unanswered question(s). Do you want to submit anyway?`
        )
      ) {
        return;
      }
    }

    // Submit answers to the server with improved headers
    fetch(`${BACKEND_URL}/submit_quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ answers: userAnswers }),
      // Updated CORS settings
      mode: "cors",
      credentials: "omit", // Changed from "same-origin" to avoid credential issues
    })
      .then(async (response) => {
        // Improved error handling with attempt to get JSON error
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(
              errorData.error ||
                `Server returned ${response.status}: ${response.statusText}`
            );
          } else {
            throw new Error(
              `Server returned ${response.status}: ${response.statusText}`
            );
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        // Display the results
        displayResults(data);

        // Hide quiz, show results
        quizSection.style.display = "none";
        resultsSection.style.display = "block";

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Submit Error:", error);
        alert(
          `Error submitting quiz: ${error.message}. Please check your internet connection and try again.`
        );
      });
  });

  // Function to display quiz results
  function displayResults(data) {
    const score = data.score;
    const totalQuestions = data.result.length;

    document.getElementById("userScore").textContent = score;
    document.getElementById("totalQuestions").textContent = totalQuestions;

    // Display detailed results
    const resultDetails = document.getElementById("resultDetails");
    resultDetails.innerHTML = "";

    data.result.forEach((item, index) => {
      const resultItem = document.createElement("div");
      resultItem.className = `result-item ${
        item.isCorrect ? "correct" : "incorrect"
      }`;

      const resultContent = `
        <h3>Question ${index + 1}</h3>
        <p><strong>Question:</strong> ${item.question}</p>
        <p><strong>Your Answer:</strong> ${
          item.userAnswer || "Not answered"
        }</p>
        <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
      `;

      resultItem.innerHTML = resultContent;
      resultDetails.appendChild(resultItem);
    });
  }

  // Handle retake quiz button
  retakeQuizButton.addEventListener("click", function () {
    // Reset the form and hide results
    uploadForm.reset();
    resultsSection.style.display = "none";
    quizSection.style.display = "none";

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
