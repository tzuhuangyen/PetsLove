import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 导入 HashRouter

import App from './src/App.jsx';
import './src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/PetsLove'>
    <App />
  </BrowserRouter>
);
