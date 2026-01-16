import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { FiTrendingUp, FiTarget, FiCheckCircle, FiVideo, FiFileText } from 'react-icons/fi';

// Dashboard page that shows basic performance stats
// - Fetches past mock interview results from the backend
// - Shows latest score and accuracy
// - Displays a simple bar chart of recent attempts
// - Shows CTA buttons when no attempts exist
const DashboardPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results');
        setResults(response.data || []);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load performance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading performance data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  // ✅ NO RESULTS → SHOW CTA BUTTONS
  if (!results.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FiTrendingUp />
        </div>
        <h1 className="mb-3 gradient-text">Welcome to Your Dashboard</h1>
        <p className="lead text-muted mb-4">
          No interview attempts yet. Start your journey to ace your interviews!
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <button
            className="btn btn-success btn-lg d-flex align-items-center"
            onClick={() => navigate('/mock-interview')}
          >
            <FiVideo className="me-2" size={20} />
            Start Mock Interview
          </button>

          <button
            className="btn btn-primary btn-lg d-flex align-items-center"
            onClick={() => navigate('/resume-analyzer')}
          >
            <FiFileText className="me-2" size={20} />
            Analyze Resume
          </button>
        </div>
      </div>
    );
  }

  // Use the most recent result for quick stats
  const latest = results[0];

  // Prepare simple chart data (show up to last 5 attempts)
  const chartData = results
    .slice(0, 5)
    .map((r, index) => ({
      name: `Attempt ${results.length - index}`,
      score: r.score,
      accuracy: r.accuracy,
    }))
    .reverse();

  const attemptedVsCorrect = {
    attempted: latest.attemptedQuestions,
    correct: latest.correctAnswers,
  };

  return (
    <div>
      <h1 className="mb-4 text-center gradient-text fw-bold">Performance Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card stat-card">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1 fw-semibold">Last Score</h6>
                <h2 className="mb-0 fw-bold" style={{ color: '#667eea' }}>
                  {latest.score}/{latest.totalQuestions}
                </h2>
              </div>
              <div>
                <FiTrendingUp size={40} style={{ color: '#667eea', opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card stat-card" style={{ borderLeftColor: '#10b981' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1 fw-semibold">Accuracy</h6>
                <h2 className="mb-0 fw-bold" style={{ color: '#10b981' }}>
                  {latest.accuracy}%
                </h2>
              </div>
              <div>
                <FiTarget size={40} style={{ color: '#10b981', opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card stat-card" style={{ borderLeftColor: '#f59e0b' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1 fw-semibold">Questions</h6>
                <p className="mb-1 fw-semibold" style={{ color: '#374151' }}>
                  Attempted: <span className="fw-bold" style={{ color: '#f59e0b' }}>{attemptedVsCorrect.attempted}</span>
                </p>
                <p className="mb-0 fw-semibold" style={{ color: '#374151' }}>
                  Correct: <span className="fw-bold" style={{ color: '#10b981' }}>{attemptedVsCorrect.correct}</span>
                </p>
              </div>
              <div>
                <FiCheckCircle size={40} style={{ color: '#f59e0b', opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center mb-4 fw-bold">Recent Attempts Performance</h5>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="score" fill="#667eea" name="Score" radius={[8, 8, 0, 0]} />
                <Bar dataKey="accuracy" fill="#10b981" name="Accuracy (%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
