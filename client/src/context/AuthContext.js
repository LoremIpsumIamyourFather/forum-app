/* 
 * FILE PURPOSE: 
 * This file manages the global authentication state for the app. 
 * It uses React Context to avoid prop drilling, making the user's token and username 
 * available to any component. It also syncs with localStorage to persist sessions on refresh.
 */

import { createContext, useState, useContext } from 'react';

// Creates the global data container.
const AuthContext = createContext();

// This component wraps the app and provides the global state to all children.
export function AuthProvider({ children }) {
  // The state stores the user's login token and username, initialized from localStorage.
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // This function saves the token and username when the user logs in.
  function login(newToken, newUsername) {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken); 
    localStorage.setItem('username', newUsername);
  }

  // This function clears the token and username when the user logs out.
  function logout() {
    setToken(null);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A custom hook that allows components to easily consume the AuthContext.
export function useAuth() {
  return useContext(AuthContext);
}