import React, { useState, useEffect } from 'react';
// Custom hook for local storage management

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === 'undefined') {
        return initialValue; // 返回初始值而不是尝试解析
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading localStorage key "', key, '"', error);
      return initialValue;
    }
  });
  // 使用 useEffect 來監聽 storedValue 和 key 的變化
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
