import { useState, useEffect } from 'react';

export const usePersist = (persistDataName) => {
   const [persistData, setPersistData] = useState(JSON.parse(sessionStorage.getItem(persistDataName)) || false);

   useEffect(() => {
      sessionStorage.setItem(persistDataName, JSON.stringify(persistData));
   }, [persistData]);

   return { persistData, setPersistData, persistDataName };
};
