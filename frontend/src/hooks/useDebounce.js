// import { useState, useEffect } from 'react';

// export const useDebounce = (value, delay) => {
//    const [debouncedValue, setDebouncedValue] = useState(value);

//    useEffect(() => {
//       const timer = setTimeout(() => {
//          setDebouncedValue(value);
//       }, delay);

//       return () => {
//          clearTimeout(timer);
//       };
//    }, [value, delay]);

//    return debouncedValue;
// };
// // ===================================
// export const debounce = function (fn, deley = 1000) {
//    let id;
//    return (...args) => {
//       if (id) clearInterval(id);
//       id = setTimeout(() => {
//          fn(...args);
//       }, deley);
//    };
// };
