/* 
 * This file manages the global authentication state for an app. 
 * Instead of passing the user's login token and username down through every single component (prop drilling), 
 * use React Context to make them available anywhere in the app. 
 * Also use localStorage so the user stays logged in if they refresh the page.
 */




import { createContext, useState, useContext } from 'react';

// 1. CREATE CONTEXT: create a global data container
const AuthContext = createContext();

// 2. CREATE PROVIDER: This component wraps my app and provides global state
export function AuthProvider({ children }) {
  // STATE: I hold the user's login token and username
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // FUNCTION: save the token and username when the user logs in
  function login(newToken, newUsername) {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken); // I save to browser storage
    localStorage.setItem('username', newUsername);
  }

  // FUNCTION:  clear the token and username when the user logs out
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

// 3. CUSTOM HOOK: A shortcut so components can easily use this context
export function useAuth() {
  return useContext(AuthContext);
}