import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // STATE: hold the input values and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  // FUNCTION:runs when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); 

    try {
      //  send a POST request to backend
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      // if successful, save the token via context, and go to dashboard
      login(response.data.token, response.data.username);
      navigate('/dashboard'); 
    } catch (err) {
      // if the backend sends an error,  show it
      setError(err.response?.data?.message || 'Invalid username or password.');
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {/* I show the error message if it exists */}
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