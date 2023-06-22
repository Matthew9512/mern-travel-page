import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { TravelPage } from './pages/Travel/TravelPage';
import { ErrorPage } from './pages/Error/ErrorPage';
import { ServerDownPage } from './pages/ServerDown/ServerDownPage';
import { UserPage } from './pages/User/UserPage';
import { UserBookings } from './pages/User/Components/UserBookings/UserBookings';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Layout } from './components/Layout';
import './utils/icons';

export const App = () => {
   return (
      <main className='container'>
         <BrowserRouter>
            <Routes>
               <Route path='/login' element={<LoginPage />}></Route>
               <Route path='/signin' element={<RegisterPage />}></Route>
               <Route element={<Layout />}>
                  <Route path='/' element={<HomePage />}></Route>
                  <Route path='/search/:id' element={<TravelPage />}></Route>
                  <Route
                     path='/user'
                     element={
                        <ProtectedRoutes>
                           <UserPage />
                        </ProtectedRoutes>
                     }
                  ></Route>
                  <Route
                     path='/user/bookings'
                     element={
                        <ProtectedRoutes>
                           <UserBookings />
                        </ProtectedRoutes>
                     }
                  ></Route>
               </Route>
               <Route path='/server-down' element={<ServerDownPage />}></Route>
               <Route path='*' element={<ErrorPage />}></Route>
            </Routes>
         </BrowserRouter>
      </main>
   );
};
