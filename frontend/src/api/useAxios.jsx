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
   //
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
         successMsg(res.data.message);
         console.log(res.data);
      } catch (error) {
         console.log(error);
         if (error.request.status === 0) return navigate('/server-down');
         setError(error.response.data.message);
         errorMsg(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, data, setData, error, loading, setLoading, ready, contextHolder };
};
// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { usePopupMessage } from './usePopupMessage';

// export const _API = `http://localhost:8000`;

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = _API;
// axios.defaults.timeout = 6000;

// export const axiosInstance = axios.create();

// export const useAxios = () => {
//    const [data, setData] = useState([]);
//    const [error, setError] = useState(null);
//    const [loading, setLoading] = useState(false);
//    const [ready, setReady] = useState(false);
//    const { contextHolder, successMsg, errorMsg } = usePopupMessage();
//    const navigate = useNavigate();

//    const fetchData = async (method) => {
//       setLoading(true);
//       setReady(false);
//       setError(null);
//       try {
//          const res = await axios.request(method);
//          setReady(true);
//          setData(res.data);
//          successMsg(res.data.message);
//          // console.log(res.data);
//       } catch (error) {
//          if (error.request.status === 0) return navigate('/server-down');
//          setError(error.response.data.message);
//          errorMsg(error.response.data.message);
//       } finally {
//          setLoading(false);
//       }
//    };

//    return { fetchData, data, setData, error, loading, ready, contextHolder };
// };
