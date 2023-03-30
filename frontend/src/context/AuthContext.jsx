import { createContext, useEffect, useState } from 'react';

const getLS = () => (localStorage.getItem('travel__user') ? JSON.parse(localStorage.getItem('travel__user')) : {});

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [auth, setAuth] = useState('Log in');

   useEffect(() => {
      const { username } = getLS();
      if (!username) setAuth(localStorage.setItem('travel__user', JSON.stringify({ username: 'Log in' })));
      setAuth(username);
   }, []);

   return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
