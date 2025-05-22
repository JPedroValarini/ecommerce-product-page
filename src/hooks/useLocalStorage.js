import { useState } from 'react';

export const useLocalStorage = (key, initialValue, ttl = 15 * 60 * 1000) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsedItem = JSON.parse(item);
      if (Date.now() > parsedItem.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      
      return parsedItem.value;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      const item = {
        value: valueToStore,
        expiry: Date.now() + ttl
      };
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};