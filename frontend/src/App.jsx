import './assets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SingleItem } from './pages/SingleItem';
import { Error } from './pages/Error';
import { GlobalContextProvider } from './context/GlobalContext';
import { SpinnerContextProvider } from './context/SpinnerContext';
import { AuthContextProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Auth } from './pages/Auth';

export const App = () => {
   return (
      <GlobalContextProvider>
         <SpinnerContextProvider>
            <AuthContextProvider>
               <Navbar /> {/* navbar with react portal? */}
               <BrowserRouter>
                  <Routes>
                     <Route path={'/'} element={<Home />}></Route>
                     <Route path={'/search/:id'} element={<SingleItem />}></Route>
                     <Route path={'/auth'} element={<Auth />}></Route>
                     <Route path={'*'} element={<Error />}></Route>
                  </Routes>
               </BrowserRouter>
               <Footer />
            </AuthContextProvider>
         </SpinnerContextProvider>
      </GlobalContextProvider>
   );
};
