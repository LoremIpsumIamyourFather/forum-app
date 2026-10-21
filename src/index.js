// 1. IMPORT REACT: The core library
import React from 'react';
// 2. IMPORT REACTDOM: The library that connects React to the browser's DOM
import ReactDOM from 'react-dom/client';
// 3. IMPORT APP: The main component of my application
import App from './App';

// 4. CREATE ROOT: I find the <div id="root"> in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// 5. RENDER: I tell React to display the <App /> component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);