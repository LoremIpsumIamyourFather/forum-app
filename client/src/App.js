/* 
 * This is the root component. It uses React Router to define the navigation paths. 
 * It wraps the entire app in the AuthProvider to make the login state globally accessible.
 * A ProtectedRoute component ensures the dashboard cannot be accessed without logging in.
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

// This wrapper component protects the dashboard route.
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  // Redirects to the login page if no token exists.
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;