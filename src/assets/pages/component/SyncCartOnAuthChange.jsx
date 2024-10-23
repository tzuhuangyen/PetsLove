import React, { useEffect } from 'react';
import { useAuth } from '../../pages/Context/AuthContext';
import { useCartManager } from '../../pages/component/useCartManager';

const SyncCartOnAuthChange = () => {
  const { authState } = useAuth();
  const { syncUserCartWithServer } = useCartManager();

  useEffect(() => {
    syncUserCartWithServer(); // 確保這裡的函數是最新的
  }, [syncUserCartWithServer]);
};

export default SyncCartOnAuthChange;
