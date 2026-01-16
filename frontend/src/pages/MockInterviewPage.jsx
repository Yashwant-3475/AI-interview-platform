import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiVideo, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const MockInterviewPage = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Fetch interview questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/interview/questions'
                );
                setQuestions(response.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load interview questions.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleFinishInterview = async () => {
        try {
            setSubmitting(true);

            const totalQuestions = questions.length;
            const attemptedQuestions = questions.length;
            const correctAnswers = questions.length; // TEMP (logic later)
            const score = correctAnswers;
            const accuracy = Math.round(
                (correctAnswers / totalQuestions) * 100
            );

            await axios.post('http://localhost:5000/api/results', {
                score,
                totalQuestions,
                correctAnswers,
                attemptedQuestions,
                accuracy,
            });

            // Redirect to dashboard after saving
            navigate('/');
        } catch (err) {
            console.error('Failed to save result:', err);
            alert('Failed to save interview result.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted fw-semibold">Loading interview questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger d-flex align-items-center">
                <FiAlertCircle className="me-2" size={24} />
                {error}
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="alert alert-info d-flex align-items-center">
                <FiAlertCircle className="me-2" size={24} />
                No interview questions available.
            </div>
        );
    }

    const isLastQuestion = currentIndex === questions.length - 1;
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-8">
                    <div className="text-center mb-4">
                        <div className="d-inline-block p-3 rounded-circle mb-3"
                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <FiVideo size={32} color="white" />
                        </div>
                        <h2 className="fw-bold gradient-text">Mock Interview</h2>
                        <p className="text-muted">
                            Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong>
                        </p>

                        {/* Progress bar */}
                        <div className="progress" style={{ height: '8px' }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5">
                            <div className="d-flex align-items-start mb-4">
                                <div className="me-3 mt-1">
                                    <div className="d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        }}>
                                        <span className="text-white fw-bold">Q</span>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h4 className="mb-0 fw-semibold" style={{ lineHeight: '1.6' }}>
                                        {currentQuestion}
                                    </h4>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-5 pt-4 border-top">
                                {!isLastQuestion ? (
                                    <button
                                        className="btn btn-primary btn-lg d-flex align-items-center"
                                        onClick={handleNext}
                                    >
                                        Next Question
                                        <FiArrowRight className="ms-2" size={20} />
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-success btn-lg d-flex align-items-center"
                                        onClick={handleFinishInterview}
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <FiCheckCircle className="me-2" size={20} />
                                                Finish Interview
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockInterviewPage;
