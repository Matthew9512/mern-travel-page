import { createContext, useState } from 'react';

export const SpinnerContext = createContext({});

export const SpinnerContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return <SpinnerContext.Provider value={{ loading, setLoading }}>{children}</SpinnerContext.Provider>;
};
