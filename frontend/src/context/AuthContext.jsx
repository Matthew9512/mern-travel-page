import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../api/authUser';
/**
 * @todo fetch user here on useEffect then save in ls when state change
 */

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [userData, setUserData] = useState(null);
   const [fetchUser, setFetchUser] = useState();

   useEffect(() => {
      const token = JSON.parse(localStorage.getItem('access__token')) || '';
      if (!token) return;
      const { userID } = jwtDecode(token);

      const getUser = async (userID) => {
         try {
            const res = await axiosInstance.get(`/user/${userID}`);
            console.log(res.data);
            setUserData(res.data);
         } catch (error) {
            console.log(error);
         }
      };
      getUser(userID);
   }, [fetchUser]);

   return <AuthContext.Provider value={{ userData, setUserData, setFetchUser }}>{children}</AuthContext.Provider>;
};
