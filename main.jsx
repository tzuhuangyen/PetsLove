import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 导入 HashRouter

import App from './src/App.jsx';
import './src/index.css';
import ShopContextProvider from './src/assets/pages/Context/ShopContext.jsx';
// import './assets/all.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/MERN-PetsLove'>
    <App />
  </BrowserRouter>
);
