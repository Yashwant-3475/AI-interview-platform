## MERN Interview Prep App (Beginner-Friendly)

This project is a **beginner-friendly MERN application** that combines:

- **Authentication** (register/login with JWT)
- **Mock interview module** (MCQs + timer + scoring)
- **Performance dashboard** (scores, accuracy, charts)
- **AI HR answer evaluation** (via OpenAI API)
- **Resume skill analyzer** (PDF upload + keyword-based skills)

Everything is kept as simple and readable as possible, with comments explaining the main logic.

---

### Folder Structure

- **frontend/** – React + Webpack app (UI)
  - `src/`
    - `index.jsx` – React entry
    - `App.jsx` – routing and layout
    - `pages/` – pages like `LoginPage`, `RegisterPage`, `DashboardPage`, `MockInterviewPage`, `ResumeAnalyzerPage`
  - `public/`
    - `index.html` – HTML template
- **backend/** – Node.js + Express + MongoDB API
  - `src/`
    - `index.js` – Express entry point
    - `models/` – `User`, `Question`, `Result`, `Evaluation`
    - `controllers/` – auth, questions, results, AI evaluation, resume analyzer
    - `routes/` – route files that connect URLs to controllers
  - `config/`
    - `db.js` – MongoDB connection (mongoose)
    - `aiClient.js` – OpenAI client setup

---

### Prerequisites

- **Node.js** (LTS recommended)
- **npm**
- **MongoDB Atlas** (or any reachable MongoDB instance)
- **OpenAI API key** (for AI evaluation)

---

### Backend: Setup and Run

From the project root:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key   # required for AI evaluation endpoint
```

Then start the backend:

```bash
npm start
```

The API will run on **`http://localhost:5000`** and supports CORS so the React frontend (port 3000) can call it.

Key API endpoints:

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Questions: `GET /api/questions`
- Results: `POST /api/results`, `GET /api/results`
- AI Evaluation: `POST /api/evaluations`, `GET /api/evaluations`
- Resume Analyzer: `POST /api/resume/analyze` (PDF upload, field name: `resume`)

---

### Frontend: Setup and Run

From the project root:

```bash
cd frontend
npm install
npm start
```

The frontend will be available at **`http://localhost:3000`**.

Main pages (in the navbar):

- **Dashboard** – shows recent performance (score, accuracy, attempts + chart)
- **Login / Register** – basic authentication forms
- **Mock Interview** – MCQ test with timer, auto-submit, and score
- **Resume Analyzer** – upload PDF resume, see matched/missing skills

---

### Demo Flow (Suggested)

1. **Register and log in** using the frontend (or just register and you’ll be auto-logged in).
2. Go to **Mock Interview** and complete a test.
3. Visit **Dashboard** to see:
   - Last score
   - Accuracy
   - Attempted vs correct
   - Bar chart of recent attempts (score + accuracy)
4. (Optional) Use the **AI evaluation API** (`POST /api/evaluations`) with an HR-style answer.
5. Go to **Resume Analyzer**, upload a **PDF resume**, and review matched vs missing skills.

---

### Notes for Instructors / Demo

- Code is intentionally **beginner-friendly**:
  - No advanced state management libraries
  - Simple controllers and routes
  - Clear comments on key functions
- The app aims to show a **full MERN flow**:
  - Frontend forms and pages
  - Backend APIs with MongoDB
  - Basic charts and visualization
  - Optional AI-assisted evaluation

You can extend this project with more advanced validation, protected routes, and role-based access once you are comfortable with the basics.


