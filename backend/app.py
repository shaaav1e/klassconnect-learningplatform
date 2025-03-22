from flask import Flask, render_template, request, jsonify
import pdfplumber
import requests
import json
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Simplified env loading - revert to a more reliable approach
load_dotenv()  # This will look for .env in the current directory

# Set up the Flask app
app = Flask(__name__,
            static_folder="../",  # This points to your main directory where static files are (Vite folder)
            template_folder="../")  # This points to your main directory where HTML templates are (Vite folder)

# Enable CORS - Update the port to match the frontend's port (5176)
CORS(app, origins=["http://localhost:5176", "https://klassconnect.netlify.app"])

# OpenRouter API Key - Use the hardcoded value as fallback if env variable fails
API_KEY = os.environ.get("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# Store the correct answers globally (for simplicity)
correct_answers = []

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    """Extract text from the uploaded PDF."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text.strip()

def generate_quiz_from_text(text, num_questions=5):
    """Generate MCQs using OpenRouter API."""
    prompt = (
        f"Generate {num_questions} multiple-choice questions (MCQs) from the following text. Extract important topics and make appropriate questions. The pdf content is a course outline and design quiz for university level students.\n"
        f"Each question should have 4 answer options and clearly indicate the correct answer.\n\n"
        f"Text:\n{text[:2000]} \n\n"
        f"Format: Return a JSON array with 'question', 'options' (list of 4), and 'answer'."  # 'answer' should be the correct answer
    )

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "openai/gpt-3.5-turbo",  # You can change to "mistral" for a free alternative
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(OPENROUTER_URL, headers=headers, json=data)
        response_data = response.json()

        # Debugging: Print the API response
        print("API Response:", response_data)

        if "choices" not in response_data:
            return f"Error in API response: {response_data}"

        mcqs = response_data["choices"][0]["message"]["content"]

        try:
            mcq_list = json.loads(mcqs)  # Convert AI response to JSON
        except json.JSONDecodeError:
            return f"Error parsing MCQs. AI response:\n{mcqs}"

        # Save the correct answers properly (with question and answer)
        global correct_answers
        correct_answers = [{"question": mcq["question"], "answer": mcq["answer"]} for mcq in mcq_list]
        print("Correct Answers:", correct_answers)

        # Include correct answers in the response
        for mcq in mcq_list:
            mcq["correctAnswer"] = mcq["answer"]

        return mcq_list

    except Exception as e:
        return f"Error generating quiz: {str(e)}"


# Quiz generation route
@app.route('/upload', methods=['POST'])
def upload_pdf():
    """Handle PDF upload and generate MCQs."""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    num_questions = int(request.form.get('num_questions', 5))

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save PDF temporarily in a secure location
    temp_pdf_path = os.path.join(app.root_path, 'temp.pdf')
    file.save(temp_pdf_path)

    # Extract text from the PDF
    extracted_text = extract_text_from_pdf(temp_pdf_path)

    if not extracted_text:
        return jsonify({"error": "Failed to extract text from PDF"}), 400

    # Generate MCQs based on the extracted text
    mcqs = generate_quiz_from_text(extracted_text, num_questions)

    if isinstance(mcqs, str):  # If an error message is returned
        return jsonify({"error": mcqs}), 400

    return jsonify({"mcqs": mcqs})

# Route to submit quiz answers
@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    data = request.get_json()  # Use get_json() to properly parse JSON data
    if not data:
        return jsonify({"error": "No data received"}), 400
    
    user_answers = data.get("answers", [])
    if not user_answers:
        return jsonify({"error": "No answers provided"}), 400

    result = []
    score = 0

    for user_answer in user_answers:
        # Retrieve the correct answer based on the user's question
        correct_answer = next(
            (ca["answer"] for ca in correct_answers if ca.get("question") == user_answer.get("question")),
            None  # Return None if no matching question is found
        )

        # Debugging: Check if correct_answer is found
        print(f"Question: {user_answer.get('question')}, Correct Answer: {correct_answer}")

        # Ensure user_answer["selectedAnswer"] exists and is a valid string before comparison
        if correct_answer and user_answer.get("selectedAnswer"):
            if correct_answer.strip().lower() == user_answer["selectedAnswer"].strip().lower():
                score += 1
                result.append({
                    "question": user_answer.get("question"),
                    "userAnswer": user_answer["selectedAnswer"],
                    "correctAnswer": correct_answer,
                    "isCorrect": True
                })
            else:
                result.append({
                    "question": user_answer.get("question"),
                    "userAnswer": user_answer["selectedAnswer"],
                    "correctAnswer": correct_answer,
                    "isCorrect": False
                })
        else:
            # Handle case where no answer is provided or valid
            result.append({
                "question": user_answer.get("question"),
                "userAnswer": user_answer.get("selectedAnswer", "No answer provided"),
                "correctAnswer": correct_answer,
                "isCorrect": False
            })

    # Return the score and the result (questions with answers)
    return jsonify({
        "score": score,
        "result": result
    })

# Default route to indicate the backend is running
@app.route('/')
def index():
    return jsonify({"message": "Backend is running. Use the API endpoints for functionality."})

# Run the app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
