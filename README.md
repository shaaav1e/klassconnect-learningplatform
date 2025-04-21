# KlassConnect

KlassConnect is an educational consisting of updated course content delivery and AI-powered quiz generation. Primarily designed for learning purposes, along with vibe coding during times when I had no idea how specific things were meant to be implemented.

## Tech Stack

- **Frontend:**
  - Vanilla JavaScript
  - Vanilla CSS for styling
  - Vite for build tooling and development server
- **Backend:**
  - Flask (Python) for server-side operations
  - OpenRouter API for AI-powered quiz generation
- **Authentication & Storage:**
  - Firebase Authentication for user management
  - Firestore for database storage
- **Deployment:**
  - Frontend deployed on Netlify
  - Backend hosted on Render

## Features

- **User Authentication:** Secure signup and login functionality
- **Course Content:** Relevant course modules (needs some work)
- **AI-Powered Quizzes:** Generate quizzes from PDF content using OpenRouter API

## Educational Purpose

This project is primarily designed as a learning tool to demonstrate:

- How to implement signup/login functionality in web applications
- Database integration with Firebase Firestore
- Frontend and backend separation and hosting
- API integration (OpenRouter for AI capabilities)
- Building responsive web applications with vanilla technologies (responsiveness needs work)

## Local Development

### Prerequisites

- Node.js
- Python 3.8+
- OpenRouter API key

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/KlassConnect.git
cd KlassConnect
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:

```
OPENROUTER_API_KEY=your_api_key_here
FLASK_ENV=development
PORT=10000
```

5. Start the development server:

```bash
# In the main directory
npm run dev

# In a separate terminal, start the backend
cd backend
python app.py
```

6. Access the application at `http://localhost:5176`

## Project Structure

- `/src/` - Frontend source code
  - `/css/` - Styling for different components
  - `/js/` - JavaScript functionality
- `/backend/` - Flask server and API integration
- `/public/` - Static assets

## License

This project is open-source and available under the MIT License.
