import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import "./services/i18n.ts";
import { ViewProvider } from './context/ViewContext.tsx';

function updateVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('load', updateVH);
window.addEventListener('resize', updateVH);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ViewProvider>
        <App />
      </ViewProvider>
    </Router>
  </StrictMode>
);
