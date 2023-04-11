import './assets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SingleItem } from './pages/SingleItem';
import { Error } from './pages/Error';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Auth } from './pages/Auth';
import { UserPanel } from './pages/UserPanel';

export const App = () => {
   return (
      <>
         <BrowserRouter>
            <Navbar /> {/* navbar with react portal? */}
            <Routes>
               <Route path={'/'} element={<Home />}></Route>
               <Route path={'/search/:id'} element={<SingleItem />}></Route>
               <Route path={'/auth'} element={<Auth />}></Route>
               <Route path={'/user'} element={<UserPanel />}></Route>
               <Route path={'*'} element={<Error />}></Route>
            </Routes>
         </BrowserRouter>
         <Footer />
      </>
   );
};
