import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">NewsImpact Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome, {user?.name || user?.username}!</h2>
          <p className="text-slate-600 mb-6">
            Your subscription tier: <span className="font-semibold text-blue-600 uppercase">{user?.subscriptionTier}</span>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🚀 Coming Soon</h3>
            <p className="text-blue-800">
              Your personalized news feed is being prepared. Check back soon!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">📰 Real-time News</h4>
              <p className="text-sm text-slate-600">Get instant alerts on market-moving news</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">🤖 AI Analysis</h4>
              <p className="text-sm text-slate-600">Sentiment analysis powered by machine learning</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">📊 Analytics</h4>
              <p className="text-sm text-slate-600">Track market impact and trends</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">⚡ Premium Features</h4>
              <p className="text-sm text-slate-600">Unlock with a premium subscription</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
