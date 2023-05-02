import { createContext, useEffect, useState } from 'react';

/**
 * @todo fetch user here on useEffect then save in ls when state change
 */

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [rateIconStyle, setRateIconStyle] = useState(() => {
      const lsItems = localStorage.getItem('travel__likes');
      if (!lsItems) return [];

      return JSON.parse(lsItems);
   });

   const [userData, setUserData] = useState(() => {
      const lsItems = localStorage.getItem('travel__user');
      if (!lsItems) return [];

      return JSON.parse(lsItems);
   });

   useEffect(() => {
      localStorage.setItem('travel__user', JSON.stringify(userData));
      localStorage.setItem('travel__likes', JSON.stringify(rateIconStyle));
   }, [userData]);

   return <AuthContext.Provider value={{ userData, setUserData, rateIconStyle, setRateIconStyle }}>{children}</AuthContext.Provider>;
};
// import { createContext, useEffect, useState } from 'react';

// /**
//  * @todo fetch user here on useEffect then save in ls when state change
//  */

// export const AuthContext = createContext({});

// export const AuthContextProvider = ({ children }) => {
//    const [userData, setUserData] = useState(() => {
//       const lsItems = localStorage.getItem('travel__user');
//       if (!lsItems) return [];

//       return JSON.parse(lsItems);
//    });

//    useEffect(() => {
//       localStorage.setItem('travel__user', JSON.stringify(userData));
//    }, [userData]);

//    return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
// };
