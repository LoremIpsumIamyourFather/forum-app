/* 
 * FILE PURPOSE: 
 * This component renders the main authenticated view. It features a header with 
 * user details and a logout button, a scrolling sidebar of categories, and a main content area. 
 * It fetches questions from the backend and filters them based on the selected category.
 */


import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Combined into one line
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  // State stores the list of questions and the selected category.
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  // Array defines the categories for the forum.
  const categories = ['Painting', 'Digital Art', 'Sculpture', 'Photography'];

  // This function fetches all questions from the backend.
  async function fetchQuestions() {
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    }
  }

  // useEffect runs this fetch operation once when the component mounts.
  useEffect(() => {
    fetchQuestions();
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Filters the questions based on the selected category.
  const displayedQuestions = selectedCategory ? questions.filter(q => q.category === selectedCategory) : [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>ArtSphere</h1>
        <div className="user-info">
          <span>Welcome, {username}</span>
          <Link to="/login" onClick={handleLogout} className="logout-btn">Logout</Link>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <h3>Categories</h3>
          {categories.map(cat => (
            <div key={cat} className={`category-item ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </div>
          ))}
        </aside>

        <main className="content-area">
          {!selectedCategory ? (
            <p className="placeholder-text">Select a Category to view its questions.</p>
          ) : (
            <div>
              <h2>{selectedCategory} Questions</h2>
              {displayedQuestions.length === 0 ? <p>No questions yet in this category.</p> : (
                <ul className="question-list">
                  {displayedQuestions.map(q => (
                    <li key={q._id} className="question-item">
                      <h4>{q.title}</h4>
                      <p>{q.body}</p>
                      <small>Asked by {q.author}</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}