import axios from 'axios';
import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';

export const API = `http://localhost:8000`;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${API}`;

export const axiosInstance = axios.create({
   headers: {
      //   Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

export const useAxios = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();

   const fetchData = async (method) => {
      setLoading(true);
      setReady(false);
      setError(null);
      try {
         const res = await axios.request(method);
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

   return { fetchData, data, error, loading, ready, contextHolder };
};
