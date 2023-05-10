import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';
import { axiosInstance } from './useAxios';

export const useAuthUser = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();

   const authUser = async (method) => {
      setLoading(true);
      setReady(false);
      setError(null);
      try {
         const res = await axiosInstance.request(method);
         setReady(true);
         setData(res.data);
         successMsg(res.data.message);
         console.log(res.data);
      } catch (error) {
         setError(error.response.data.message);
         errorMsg(error.response.data.message);
         console.log(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { authUser, data, error, loading, ready, contextHolder };
};
