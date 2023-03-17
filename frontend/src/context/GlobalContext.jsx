import { createContext, useReducer, useState } from 'react';
// import { initialValue, reducer } from '../reducer/reducer';

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return <GlobalContext.Provider value={{ state, setState }}>{children}</GlobalContext.Provider>;
};

// // ===== useReducer ===== //
// import { createContext, useReducer } from 'react';
// import { initialValue, reducer } from '../reducer/reducer';

// export const GlobalContext = createContext({});

// export const GlobalContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialValue);

//   return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
// };
