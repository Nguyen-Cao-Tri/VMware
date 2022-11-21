import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
// import { LogProvider } from './hooks/logProvider/logProvider';
import { worker } from './mocks/browser';
console.log(process.env.REACT_APP_ENVIRONMENT);

if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .then(() => {})
    .catch(() => {});
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Router>
    <App />
  </Router>,
);
reportWebVitals();
