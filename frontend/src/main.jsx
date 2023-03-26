import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { GlobalContextProvider } from './context/GlobalContext';
import { AuthContextProvider } from './context/AuthContext';
import { PopupContextProvider } from './context/PopupContext';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <GlobalContextProvider>
         <AuthContextProvider>
            <PopupContextProvider>
               <App />
            </PopupContextProvider>
         </AuthContextProvider>
      </GlobalContextProvider>
   </React.StrictMode>
);
