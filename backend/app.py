from flask import Flask, render_template, request, jsonify
import pdfplumber
import requests
import json
import os
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



API_KEY = "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" 
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route('/')
def home():
    return 'Flask is running!'


correct_answers = [] 

def generate_quiz_from_text(text, num_questions=5):
    prompt = (
        f"Generate {num_questions} MCQs from this text for university students.\n"
        f"Each question should have 4 options and indicate the correct answer.\n\n"
        f"Text:\n{text[:2000]}\n\n"
        f"Return JSON with 'question', 'options' (list of 4), and 'answer'."
    )

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(OPENROUTER_URL, headers=headers, json=data)
        print(response.text)
        response_data = response.json()

        if "choices" not in response_data:
            return f"Error in API response: {response_data}"

        mcqs = response_data["choices"][0]["message"]["content"]
        
        # Fix JSON parsing issue with Markdown formatting
        mcqs = re.sub(r"^```json|```$", "", mcqs).strip()

        mcq_list = json.loads(mcqs)  

        global correct_answers
        correct_answers = [{"question": mcq["question"], "answer": mcq["answer"]} for mcq in mcq_list]

        for mcq in mcq_list:
            mcq["correctAnswer"] = mcq.pop("answer")

        return mcq_list

    except Exception as e:
        return f"Error generating quiz: {str(e)}"

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    num_questions = int(request.form.get('num_questions', 5))

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    print(f"File uploaded: {file.filename}")  # Debugging print

    temp_pdf_path = os.path.join(app.root_path, 'temp.pdf')
    file.save(temp_pdf_path)

    extracted_text = extract_text_from_pdf(temp_pdf_path)
    if not extracted_text:
        return jsonify({"error": "Failed to extract text from PDF"}), 400

    mcqs = generate_quiz_from_text(extracted_text, num_questions)
    if isinstance(mcqs, str):
        return jsonify({"error": mcqs}), 400

    return jsonify({"mcqs": mcqs})




# -----------------Submit Quiz-------------------------
@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    data = request.get_json()
    if not data or "answers" not in data:
        return jsonify({"error": "Invalid data"}), 400

    score = 0
    results = []

    for user_answer in data["answers"]:
        question = user_answer["question"]
        selected_answer = user_answer["selectedAnswer"]

        # Find the correct answer
        correct = next((item for item in correct_answers if item["question"] == question), None)

        if correct:
            is_correct = selected_answer == correct["answer"]
            if is_correct:
                score += 1

            results.append({
                "question": question,
                "userAnswer": selected_answer,
                "correctAnswer": correct["answer"],
                "isCorrect": is_correct
            })

    return jsonify({"score": score, "result": results})


if __name__ == '__main__':
    app.run(debug=True)
