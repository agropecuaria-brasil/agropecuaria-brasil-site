import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

console.log('%c MKT&PLAY ', 'background: #C6F058; color: #1E232B; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);