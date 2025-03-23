// PaymentRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  MemberCart,
  OrderSummary,
  Finalization,
  PaymentSecurity,
} from './assets/pages/CartPaymentProgressBar';
import { ProgressProvider } from './assets/pages/Context/ProgressContext';

const PaymentRoutes = () => {
  console.log('PaymentRoutes组件被渲染'); // 添加调试信息

  return (
    <ProgressProvider>
      <Routes>
        <Route path='' element={<MemberCart />} /> {/* 默認路由 */}
        <Route path='cart' element={<MemberCart />} />
        <Route path='order-summary' element={<OrderSummary />} />
        <Route path='order-PaymentSecurity' element={<PaymentSecurity />} />
        <Route path='order-finalization' element={<Finalization />} />
      </Routes>
    </ProgressProvider>
  );
};
export default PaymentRoutes;
