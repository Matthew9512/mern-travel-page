import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../api/useAxios';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [userData, setUserData] = useState(null);
   const [fetchUser, setFetchUser] = useState();

   useEffect(() => {
      console.log(`userAuthEffect`);
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
