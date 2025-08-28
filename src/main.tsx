import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
if (!root) throw new Error('Cannot render application without root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
