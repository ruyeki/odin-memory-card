import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'

// Create the root element where the app will be rendered
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);