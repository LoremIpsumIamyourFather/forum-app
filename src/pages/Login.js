/* 
 * This component renders the Login screen. It captures credentials, 
 * sends a POST request to the Express backend, and upon success, saves the JWT token 
 * to the global context and navigates the user to the Dashboard.
 */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // State stores the input values and error messages.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  // This function runs when the form is submitted.
  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); 

    try {
      // Sends a POST request to the backend API.
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      // Saves the token via context and redirects to the dashboard on success.
      login(response.data.token, response.data.username);
      navigate('/dashboard'); 
    } catch (err) {
      // Displays the error message returned by the backend.
      setError(err.response?.data?.message || 'Invalid username or password.');
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {/* Conditionally renders the error message if it exists. */}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}