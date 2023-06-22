import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopupMessage } from './usePopupMessage';

export const _API = `http://localhost:8000`;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = _API;
axios.defaults.timeout = 6000;

export const axiosInstance = axios.create();

export const useAxios = (auth) => {
   // if auth is true then make req with jwt
   const axiosFun = auth ? axiosInstance : axios;

   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();
   const navigate = useNavigate();

   const fetchData = async (method) => {
      setLoading(true);
      setReady(false);
      setError(null);
      try {
         const res = await axiosFun.request(method);
         setReady(true);
         setData(res.data);
         // show message only if there is a message in respond
         if (res.data?.message) successMsg(res.data.message);
      } catch (error) {
         if (error.request.status === 0) return navigate('/server-down');
         setError(error.response.data.message);
         errorMsg(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, data, setData, error, loading, setLoading, ready, contextHolder };
};
