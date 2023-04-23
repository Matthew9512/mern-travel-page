import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { Navbar } from './components/Navbar/Navbar';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { TravelPage } from './pages/Travel/TravelPage';
import { ErrorPage } from './pages/Error/ErrorPage';
import { UserPage } from './pages/User/UserPage';
import { BookingsPage } from './pages/Bookings/BookingsPage';

export const App = () => {
   return (
      <>
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route path={'/'} element={<HomePage />}></Route>
               <Route path={'/login'} element={<LoginPage />}></Route>
               <Route path={'/signin'} element={<RegisterPage />}></Route>
               <Route path={'/search/:id'} element={<TravelPage />}></Route>
               <Route path={'/user'} element={<UserPage />}></Route>
               <Route path={'/user/bookings'} element={<BookingsPage />}></Route>
               <Route path={'*'} element={<ErrorPage />}></Route>
            </Routes>
         </BrowserRouter>
      </>
   );
};
