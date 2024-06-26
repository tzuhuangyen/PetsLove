import React, { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/all.scss';
// import Home from './assets/pages/Home';
import Index from './assets/pages/Index';
import Header from './assets/pages/component/Header';
import Shop from './assets/pages/Shop';
import BlogDetail from './assets/pages/BlogDetail';
import SignUp from './assets/pages/SignUp';
import Login from './assets/pages/Login';
import MemberIndex from './assets/pages/MemberIndex';
import MemberProfile from './assets/pages/MemberProfile';

import MemberWishlist from './assets/pages/MemberWishlist';
import Footer from './assets/pages/component/Footer';
import AdminIndex from './assets/pages/AdminIndex';
import AdminProducts from './assets/pages/AdminProducts';
import AdminProductUpload from './assets/pages/AdminProductUpload';
import AdminProductUpdate from './assets/pages/AdminProductUpdate';
import AdminOrders from './assets/pages/AdminOrders';
import AdminAnalysis from './assets/pages/AdminAnalysis';
import ProductDetail from './assets/pages/ProductDetail';
import IndexBlog from './assets/pages/component/IndexBlog';
import ForgotPsw from './assets/pages/component/ForgotPsw';
import ResetPsw from './assets/pages/component/ResetPsw';
import { AuthProvider } from './assets/pages/Context/AuthContext';
import { CartProvider } from './assets/pages/Context/CartContext';
import PaymentRoutes from './PaymentRoutes';
import { MemberOrders } from './assets/pages/MemberOrders';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route exact path='/' element={<Index />} />
            <Route path='/shop' element={<Shop />} />
            <Route
              path='/shop/product/:productId'
              element={<ProductDetail />}
            />
            <Route path='/users/signup' element={<SignUp />} />
            <Route path='/users/login' element={<Login />} />
            <Route path='/users/forgotPsw' element={<ForgotPsw />} />
            <Route path='/users/resetPsw' element={<ResetPsw />} />

            <Route path='/users/member' element={<MemberIndex />}>
              <Route index element={<MemberProfile />} />
              <Route path='myProfile' element={<MemberProfile />} />
              <Route path='myOrders' element={<MemberOrders />} />
              <Route path='myWishlist' element={<MemberWishlist />} />
              <Route path='/users/member/*' element={<PaymentRoutes />} />
            </Route>

            {/* <Route path="/favorite" element={<Favorite />} /> */}
            <Route path='/blog' element={<IndexBlog />} />
            <Route path='/blog/blogDetail' element={<BlogDetail />} />
            <Route path='/admin' element={<AdminIndex />}>
              <Route path='/admin/products' element={<AdminProducts />}></Route>
              <Route
                path='/admin/products/uploadProduct'
                element={<AdminProductUpload />}
              ></Route>
              <Route path='/admin/orders' element={<AdminOrders />}></Route>
              <Route path='/admin/analysis' element={<AdminAnalysis />}></Route>
            </Route>

            <Route
              path='/admin/products/updatedProduct'
              element={<AdminProductUpdate />}
            ></Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
