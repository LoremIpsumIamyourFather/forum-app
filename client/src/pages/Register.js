/* 
 * FILE PURPOSE: 
 * This component renders the Registration screen. It performs client-side validation 
 * (password length, matching passwords, terms checkbox) before sending the data to the backend API.
 * Error messages are displayed next to the invalid fields.
 */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  // State stores the form fields and validation errors.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let newErrors = {};

    // Validates password requirements (8 chars, 1 number).
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Invalid password. Enter a password that is at least 8 characters long and contains a number.";
    }

    // Validates password match.
    if (password !== repeatPassword) {
      newErrors.repeatPassword = "The two passwords do not match.";
    }

    // Validates the checkbox.
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms and Conditions.";
    }

    // Stops submission if validation errors exist.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      navigate('/login'); 
    } catch (err) {
      setErrors({ username: err.response?.data?.message || "Registration failed." });
    }
  }

  return (
    <div className="auth-container">
      <h2>Register user</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Username" value={username} 
            // Clears the error when the user types.
            onChange={(e) => { setUsername(e.target.value); setErrors({...errors, username: ''}); }} required />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <input type="password" placeholder="Password" value={password} 
            onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: ''}); }} required />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input type="password" placeholder="Repeat Password" value={repeatPassword} 
            onChange={(e) => { setRepeatPassword(e.target.value); setErrors({...errors, repeatPassword: ''}); }} required />
          {errors.repeatPassword && <span className="error-text">{errors.repeatPassword}</span>}
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" checked={agreeTerms} 
            onChange={(e) => { setAgreeTerms(e.target.checked); setErrors({...errors, agreeTerms: ''}); }} />
          <label>I agree to the Terms and Conditions and Privacy Policy</label>
          {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}