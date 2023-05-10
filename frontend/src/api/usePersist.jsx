import { useState, useEffect } from 'react';

export const usePersist = (persistDataName) => {
   const [persistData, setPersistData] = useState(JSON.parse(localStorage.getItem(persistDataName)) || false);

   useEffect(() => {
      localStorage.setItem(persistDataName, JSON.stringify(persistData));
   }, [persistData]);

   return { persistData, setPersistData, persistDataName };
};
