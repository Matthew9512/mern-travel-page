import React, { useContext } from 'react';
import './UserPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPageNav } from './Components/UserPageNav/UserPageNav';
import { removeToken } from '../../api/authUser';

export const UserPage = () => {
   const { userData, setUserData } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      setUserData(null);
      removeToken();
      // go back to previous page
      navigate(-1);
   };

   return (
      <section className='user__panel'>
         <UserPageNav />
         <div className='user__bookings'>
            <p>username: {userData?.username}</p>
            <p>active email: {userData?.email}</p>
            <p>joined: {userData?.createdAt}</p>
            <button onClick={logOut} className='btn'>
               Log Out
            </button>
         </div>
      </section>
   );
};
