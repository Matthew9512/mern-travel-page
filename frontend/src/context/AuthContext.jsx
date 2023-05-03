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

   const [wasTravelRated, setWasTravelRated] = useState(() => {
      const lsItems = localStorage.getItem('travel__rate__stars');
      if (!lsItems) return [];

      return JSON.parse(lsItems);
   });

   useEffect(() => {
      localStorage.setItem('travel__user', JSON.stringify(userData));
      localStorage.setItem('travel__likes', JSON.stringify(rateIconStyle));
      localStorage.setItem('travel__rate__stars', JSON.stringify(wasTravelRated));
   }, [userData]);

   return (
      <AuthContext.Provider value={{ userData, setUserData, rateIconStyle, setRateIconStyle, wasTravelRated, setWasTravelRated }}>
         {children}
      </AuthContext.Provider>
   );
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
