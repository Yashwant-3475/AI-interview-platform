import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MockInterviewPage from './pages/MockInterviewPage.jsx';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import { FiHome, FiLogOut, FiLogIn, FiUserPlus, FiFileText, FiVideo } from 'react-icons/fi';
import './App.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 sticky-top">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <FiHome className="me-2" size={24} />
                    Interview Prep
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <a className="nav-link d-flex align-items-center" href="/mock-interview">
                                    <FiVideo className="me-1" size={18} />
                                    Mock Interview
                                </a>
                                <a className="nav-link d-flex align-items-center" href="/resume-analyzer">
                                    <FiFileText className="me-1" size={18} />
                                    Resume Analyzer
                                </a>
                                <button
                                    className="btn btn-outline-danger ms-2 d-flex align-items-center"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut className="me-1" size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a className="nav-link d-flex align-items-center" href="/login">
                                    <FiLogIn className="me-1" size={18} />
                                    Login
                                </a>
                                <a className="nav-link d-flex align-items-center" href="/register">
                                    <FiUserPlus className="me-1" size={18} />
                                    Register
                                </a>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    );
};

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/mock-interview"
                        element={
                            <ProtectedRoute>
                                <MockInterviewPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/resume-analyzer"
                        element={
                            <ProtectedRoute>
                                <ResumeAnalyzerPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

export default App;
