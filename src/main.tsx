import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initMetrikaTracking } from './utils/metrika';

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

setTimeout(() => {
  initMetrikaTracking();
}, 1000);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}