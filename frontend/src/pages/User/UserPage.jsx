import React, { useContext } from 'react';
import './UserPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPageNav } from './Components/UserPageNav/UserPageNav';

export const UserPage = () => {
   const { userData, setUserData, setRateIconStyle } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      localStorage.removeItem('travel__user');
      localStorage.removeItem('travel__likes');
      setUserData([]);
      setRateIconStyle([]);
      // go back to previous page
      navigate(-1);
   };

   return (
      <section className='user__panel'>
         <UserPageNav />
         <div className='user__bookings'>
            <p>username: {userData.at(0)?.username}</p>
            <p>active email: {userData.at(0)?.email}</p>
            <p>joined: {userData.at(0)?.createdAt}</p>
            <button onClick={logOut} className='btn'>
               Log Out
            </button>
         </div>
      </section>
   );
};
