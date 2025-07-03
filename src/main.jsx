import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import emailjs from '@emailjs/browser';

emailjs.init('7Ba6Ij1877lqULeWr'); // Replace with your EmailJS Public Key

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);