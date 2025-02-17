// src/main.js
import axios from "axios";

const form = document.getElementById("uploadForm");
const quizSection = document.getElementById("quizSection");
const quizForm = document.getElementById("quizForm");
const submitQuizBtn = document.getElementById("submitQuiz");

// Handle form submission (upload PDF)
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = document.getElementById("fileInput");
  const numQuestions = document.getElementById("num_questions").value;

  formData.append("file", fileInput.files[0]);
  formData.append("num_questions", numQuestions);

  try {
    // Send file to Flask backend
    const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle the response containing MCQs
    const mcqs = response.data.mcqs;
    if (mcqs) {
      displayQuiz(mcqs);
    } else {
      alert("Failed to generate quiz");
    }
  } catch (error) {
    console.error("Error during upload:", error);
    alert("There was an error with the upload.");
  }
});

// Function to display the quiz
function displayQuiz(mcqs) {
  quizSection.style.display = "block";
  quizForm.innerHTML = ""; // Clear any previous form

  mcqs.forEach((mcq, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
      <p>${index + 1}. ${mcq.question}</p>
      ${mcq.options
        .map(
          (option, i) => `
        <label>
          <input type="radio" name="question${index}" value="${option}" required />
          ${option}
        </label>
      `
        )
        .join("")}
    `;
    quizForm.appendChild(questionElement);
  });
}

// Handle quiz submission
submitQuizBtn.addEventListener("click", async () => {
  const userAnswers = [];

  // Collect user's answers from the form
  const quizElements = quizForm.elements;
  for (let i = 0; i < quizElements.length; i++) {
    const questionIndex = quizElements[i].name.replace("question", "");
    if (quizElements[i].checked) {
      userAnswers.push({
        question: mcqs[questionIndex].question,
        selectedAnswer: quizElements[i].value,
      });
    }
  }

  // Send the user's answers to Flask to check the result
  try {
    const resultResponse = await axios.post(
      "http://127.0.0.1:5000/submit_quiz",
      { answers: userAnswers },
      { headers: { "Content-Type": "application/json" } }
    );
    const result = resultResponse.data;
    alert(`Your score: ${result.score}`);
  } catch (error) {
    console.error("Error submitting quiz:", error);
    alert("There was an error submitting the quiz.");
  }
});
