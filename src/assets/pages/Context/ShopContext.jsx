import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../../../config';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [initData, setInitData] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  // 取得資料 Use useEffect to set the initial state
  const getAllData = () => {
    axios
      .get(`${backendUrl}/api/admin/products`)
      .then((res) => {
        console.log('All Data:', res.data);
        setInitData(res.data.data);
        console.log(res.data.data);
        setProductTypes(res.data.data); // 初始化时展示所有商品
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const contextValue = { getAllData };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
