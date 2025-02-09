import '/src/style.css';

let mcqs = [];
let userAnswers = [];

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Get the buttons by their new IDs
  const startQuizButton = document.getElementById('startQuizButton');
  const finishQuizButton = document.getElementById('finishQuizButton');

  // Attach event listeners to the buttons
  startQuizButton.addEventListener('click', function () {
    console.log('Start Quiz button clicked');
    uploadfile(); // Assuming uploadfile() starts the quiz generation
    finishQuizButton.style.display = 'block'; // Show submit button after quiz starts
    startQuizButton.style.display = 'none';  // Hide the start button
  });

  finishQuizButton.addEventListener('click', function () {
    console.log('Finish Quiz button clicked');
    submitQuiz(); // Assuming submitQuiz() handles quiz submission
  });
});

// Function to handle file upload and quiz generation
function uploadfile() {
  const fileInput = document.getElementById('pdfFile');
  const numQuestionsInput = document.getElementById('noofquestions');
  const file = fileInput.files[0];  // Get the uploaded file
  const numQuestions = numQuestionsInput.value || 5;  // Default to 5 if no input

  // Check if a file is selected
  if (!file) {
    alert("Please select a PDF file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_questions', numQuestions);  // Add number of questions

  // Make sure the Flask server is running at the correct URL
  fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: formData,  // Send form data (file + number of questions)
  })
    .then(response => response.json())
    .then(data => {
      if (data.mcqs) {
        mcqs = data.mcqs;  // Store MCQs received from Flask

        // Hide the upload section and show the quiz container
        document.querySelector('.flex-column').style.display = 'none';
        document.getElementById('mcqContainer').style.display = 'block';
        document.getElementById('finishQuizButton').style.display = 'inline-block';

        displayMCQs(mcqs);  // Display MCQs on the page
      } else {
        alert("Error generating quiz: " + data.error);
      }
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
}

// Function to display the MCQs in the container
function displayMCQs(mcqs) {
  const container = document.getElementById('mcqContainer');
  container.innerHTML = '';  // Clear existing content

  mcqs.forEach((mcq, index) => {
    const mcqDiv = document.createElement('div');
    mcqDiv.classList.add('mcq');

    mcqDiv.innerHTML = `
      <p><strong>${index + 1}. ${mcq.question}</strong></p>
      ${mcq.options.map((option, i) => `
        <label>
          <input type="radio" name="question${index}" value="${option}" onclick="saveAnswer(${index}, '${option}')">
          ${option}
        </label><br>
      `).join('')}
    `;
    container.appendChild(mcqDiv);
  });
}

// Function to save the selected answer for each question
function saveAnswer(questionIndex, selectedAnswer) {
  userAnswers[questionIndex] = { question: mcqs[questionIndex].question, selectedAnswer };
}

// Function to submit the quiz and check answers
function submitQuiz() {
  fetch('http://127.0.0.1:5000/submit_quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers: userAnswers })  // Send answers as JSON
  })
    .then(response => response.json())
    .then(data => {
      const resultContainer = document.getElementById('resultContainer');
      let resultHtml = `<p>Your score: ${data.score}/${mcqs.length}</p>`;

      data.result.forEach(result => {
        resultHtml += `
          <div>
            <p><strong>${result.question}</strong></p>
            <p>Your answer: ${result.userAnswer} <span style="color: ${result.isCorrect ? 'green' : 'red'};">(${result.isCorrect ? 'Correct' : 'Incorrect'})</span></p>
            <p>Correct answer: ${result.correctAnswer}</p>
          </div>
        `;
      });

      resultContainer.innerHTML = resultHtml;  // Show results
    })
    .catch(error => {
      console.error('Error submitting quiz:', error);
    });
}
