// Determine backend URL based on environment
const isProd = window.location.hostname !== "localhost";
const BACKEND_URL = isProd
  ? import.meta.env.VITE_BACKEND_URL_PROD ||
    "https://klassconnect-backend.onrender.com"
  : import.meta.env.VITE_BACKEND_URL_DEV || "http://localhost:10000";

document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.getElementById("uploadForm");
  const quizSection = document.getElementById("quizSection");
  const quizForm = document.getElementById("quizForm");
  const submitQuizButton = document.getElementById("submitQuiz");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const resultsSection = document.getElementById("resultsSection");
  const retakeQuizButton = document.getElementById("retakeQuiz");

  console.log("Using BACKEND_URL:", BACKEND_URL);

  let currentQuiz = [];

  // Handle form submission for PDF upload
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading spinner
    loadingSpinner.style.display = "flex";

    const formData = new FormData(uploadForm);

    fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        alert("Error: " + error.message);
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

  // Handle quiz submission
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

    // Submit answers to the server
    fetch(`${BACKEND_URL}/submit_quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: userAnswers }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        alert("Error submitting quiz: " + error.message);
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
