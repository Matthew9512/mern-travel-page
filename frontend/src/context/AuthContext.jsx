import { createContext, useEffect, useState } from 'react';
import { axiosInstance } from '../api/useAxios';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const [userData, setUserData] = useState(null);
   const [fetchUser, setFetchUser] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const token = JSON.parse(localStorage.getItem('access__token')) || '';
      if (!token) return;
      const { userID } = jwtDecode(token);

      const getUser = async (userID) => {
         setLoading(true);
         try {
            const res = await axiosInstance.get(`/user/${userID}`);
            setUserData(res.data);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };
      getUser(userID);
   }, [fetchUser]);

   return <AuthContext.Provider value={{ userData, setUserData, setFetchUser, loading }}>{children}</AuthContext.Provider>;
};
