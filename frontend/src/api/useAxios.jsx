import axios from 'axios';
import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const axiosInstance = axios.create({
   headers: {
      //   Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

// const here = () => {
//     fetchData({
//        method: 'GET',
//        url: '/search/6425fc3cd0d0ce889418046f',
//     });
//  };

export const useAxios = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();

   const fetchData = async (options) => {
      setLoading(true);
      try {
         const res = await axios.request(options);
         console.log(res);
         console.log(res.data);
      } catch (error) {}
   };

   return { fetchData, data, error, loading, ready, contextHolder };
};
