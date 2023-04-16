import { createContext, useEffect, useState } from 'react';

// take user obj from ls
const getLS = () => (localStorage.getItem('travel__user') ? JSON.parse(localStorage.getItem('travel__user')) : {});

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [auth, setAuth] = useState('Log in');
   const [userData, setUserData] = useState({
      username: null,
      id: null,
      createdAt: null,
   });

   useEffect(() => {
      const { username, id, createdAt } = getLS();

      if (!username) setAuth(localStorage.setItem('travel__user', JSON.stringify({ username: 'Log in' })));
      setAuth(username);

      // data of user used in user profile page
      setUserData({ username, id, createdAt });
   }, []);

   return <AuthContext.Provider value={{ auth, setAuth, userData }}>{children}</AuthContext.Provider>;
};
