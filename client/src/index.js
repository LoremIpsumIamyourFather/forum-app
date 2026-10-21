/* 
 * FILE PURPOSE: 
 * This is the entry point for the React application. It connects the React 
 * component tree to the actual HTML document by targeting the <div id="root"> 
 * found in public/index.html. It also initializes the app in StrictMode.
 */

// Imports the core React library.
import React from 'react';

// Imports the ReactDOM library, which provides the specific methods needed to interact with the browser's DOM.
import ReactDOM from 'react-dom/client';

// Imports the main App component, which contains all the routing and page logic.
import App from './App';

// Creates a React root at the DOM element with the ID of 'root'. 
// The 'root' variable acts as the anchor point for the entire React application.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renders the App component into the root. 
// <React.StrictMode> is a wrapper that activates additional checks and warnings for development purposes.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);