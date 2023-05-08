import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';
import { axiosInstance } from './authUser';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const useAuthUser = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();

   const authUser = async (options) => {
      console.log(options);
      setLoading(true);
      try {
         const res = await axiosInstance.patch(`/comments/:id`, {});
         console.log(res);
         console.log(res.data);
      } catch (error) {}
   };

   return { authUser, data, error, loading, ready, contextHolder };
};
