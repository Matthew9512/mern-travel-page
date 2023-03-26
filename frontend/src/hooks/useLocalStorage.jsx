import { useState, useEffect } from 'react';

export const useLocalStorage = function (initialValue) {
   const [storedValue, setStoredValue] = useState(() => {
      try {
         const item = localStorage.getItem('travel__user');
         return item ? JSON.parse(item) : initialValue;
      } catch (error) {
         console.error(error);
         return initialValue;
      }
   });

   useEffect(() => {
      try {
         const valueToStore = storedValue instanceof Function ? storedValue() : storedValue;
         localStorage.setItem('travel__user', JSON.stringify(valueToStore));
      } catch (error) {
         console.error(error);
      }
   }, [storedValue]);

   return [storedValue, setStoredValue];
};
