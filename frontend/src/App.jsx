// import { Suspense } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Navbar } from './components/Navbar/Navbar';
// import { lazyLoad } from './utils/lazyLoad';
// import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

// const HomePage = lazyLoad('../pages/Home/HomePage', 'HomePage');
// const LoginPage = lazyLoad('../pages/Login/LoginPage', 'LoginPage');
// const RegisterPage = lazyLoad('../pages/Register/RegisterPage', 'RegisterPage');
// const TravelPage = lazyLoad('../pages/Travel/TravelPage', 'TravelPage');
// const UserPage = lazyLoad('../pages/User/UserPage', 'UserPage');
// const UserBookings = lazyLoad('./pages/User/Components/UserBookings/UserBookings', 'UserBookings');
// const ErrorPage = lazyLoad('../pages/Error/ErrorPage', 'ErrorPage');

// export const App = () => {
//    return (
//       <>
//          <BrowserRouter>
//             <Suspense fallback={<LoadingSpinner />}>
//                <Navbar />
//                <Routes>
//                   <Route path={'/'} element={<HomePage />}></Route>
//                   <Route path={'/login'} element={<LoginPage />}></Route>
//                   <Route path={'/signin'} element={<RegisterPage />}></Route>
//                   <Route path={'/search/:id'} element={<TravelPage />}></Route>
//                   <Route path={'/user'} element={<UserPage />}></Route>
//                   <Route path={'/user/bookings'} element={<UserBookings />}></Route>
//                   <Route path={'*'} element={<ErrorPage />}></Route>
//                </Routes>
//             </Suspense>
//          </BrowserRouter>
//       </>
//    );
// };
// ===========================
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
               <Route element={<Layout />}>
                  <Route path='/' element={<HomePage />}></Route>
                  <Route path='/login' element={<LoginPage />}></Route>
                  <Route path='/signin' element={<RegisterPage />}></Route>
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
