import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [auth, setAuth] = useLocalStorage();
   if (auth === '') setAuth('Log in');

   return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
