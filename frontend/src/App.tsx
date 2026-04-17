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
    <div className="min-h-screen bg-sf-white">
      {/* Navigation */}
      <nav className="border-b border-sf-gray bg-sf-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-black text-sf-dark" style={{ fontWeight: 800 }}>
            NewsImpact
          </h1>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-sm text-sf-gray-dark">Logged in as</p>
              <p className="text-base font-medium text-sf-dark">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-sm font-medium text-sf-dark border border-sf-dark px-6 py-2 hover:bg-sf-dark hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-sf-dark mb-2" style={{ fontWeight: 800 }}>
            Welcome, {user?.name || user?.username}
          </h2>
          <p className="text-lg text-sf-gray-dark font-light">
            Your tier: <span className="font-semibold text-sf-orange uppercase">{user?.subscriptionTier}</span>
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-sf-light border border-sf-gray p-8 mb-12">
          <h3 className="text-xl font-semibold text-sf-dark mb-2">🚀 Coming Soon</h3>
          <p className="text-sf-gray-dark font-light">
            Your personalized news feed is being prepared. Real-time market intelligence powered by AI will appear here shortly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-sf-gray p-8 hover:border-sf-orange transition-colors">
            <h4 className="text-lg font-semibold text-sf-dark mb-2">📰 Real-time News</h4>
            <p className="text-sf-gray-dark font-light">Get instant alerts on market-moving news and analysis</p>
          </div>

          <div className="border border-sf-gray p-8 hover:border-sf-orange transition-colors">
            <h4 className="text-lg font-semibold text-sf-dark mb-2">🤖 AI Sentiment Analysis</h4>
            <p className="text-sf-gray-dark font-light">Sentiment analysis powered by machine learning algorithms</p>
          </div>

          <div className="border border-sf-gray p-8 hover:border-sf-orange transition-colors">
            <h4 className="text-lg font-semibold text-sf-dark mb-2">📊 Market Analytics</h4>
            <p className="text-sf-gray-dark font-light">Track market impact and identify emerging trends</p>
          </div>

          <div className="border border-sf-gray p-8 hover:border-sf-orange transition-colors">
            <h4 className="text-lg font-semibold text-sf-dark mb-2">⚡ Premium Features</h4>
            <p className="text-sf-gray-dark font-light">Unlock advanced insights with a premium subscription</p>
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
