import React from 'react';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider> 
);

reportWebVitals();
