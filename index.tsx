import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Log de depuração para confirmar atualização
console.log('%c AGROPECUÁRIA BRASIL - VERSÃO ATUALIZADA (v2.2) ', 'background: #24902C; color: #fff; font-size: 14px; padding: 4px; border-radius: 4px;');
console.log('Build Timestamp: ' + new Date().toISOString());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);