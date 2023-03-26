import { createContext, useState } from 'react';
// import { initialValue, reducer } from '../reducer/reducer';

export const PopupContext = createContext({});

export const PopupContextProvider = ({ children }) => {
   const [message, setMessage] = useState('');

   return <PopupContext.Provider value={{ message, setMessage }}>{children}</PopupContext.Provider>;
};
