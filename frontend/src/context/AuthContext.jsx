import { createContext, useEffect, useState } from 'react';

/**
 * @todo fetch user here on useEffect then save in ls when state change
 */

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [userData, setUserData] = useState(() => {
      const lsItems = localStorage.getItem('travel__user');
      if (!lsItems) return [];

      return JSON.parse(lsItems);
   });

   useEffect(() => {
      localStorage.setItem('travel__user', JSON.stringify(userData));
   }, [userData]);

   return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
};
// import { createContext, useEffect, useState } from 'react';

// /**
//  * @todo fetch user here on useEffect then save in ls when state change
//  */

// // take user obj from ls
// const getLS = () => (localStorage.getItem('travel__user') ? JSON.parse(localStorage.getItem('travel__user')) : {});

// export const AuthContext = createContext({});

// export const AuthContextProvider = ({ children }) => {
//    const [auth, setAuth] = useState('Log in');
//    const [userData, setUserData] = useState({
//       username: null,
//       email: null,
//       id: null,
//       createdAt: null,
//       bookings: null,
//    });

//    useEffect(() => {
//       console.log(`auth effect`);
//       const { username, email, id, createdAt, bookings } = getLS();

//       if (!username) setAuth(localStorage.setItem('travel__user', JSON.stringify({ username: 'Log in' })));
//       setAuth(username);
//       // data of user used in user profile page
//       setUserData({ username, email, id, createdAt, bookings });
//    }, [auth]);

//    return <AuthContext.Provider value={{ auth, setAuth, userData, setUserData }}>{children}</AuthContext.Provider>;
// };
