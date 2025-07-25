// frontend/imnbg/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
