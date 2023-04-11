import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserPlaces } from '../UserPlaces/UserPlaces';

export const DisplayUserData = ({ ready }) => {
   const { auth, setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      localStorage.removeItem('travel__user');
      setAuth('Log in');
      navigate('/');
   };

   return (
      <div className='user__bookings'>
         {ready ? (
            <>
               <h1>ready</h1>
               <p>username {auth}</p>
               <button onClick={logOut} className='btn'>
                  Log Out
               </button>
            </>
         ) : (
            <UserPlaces />
         )}
      </div>
   );
};
