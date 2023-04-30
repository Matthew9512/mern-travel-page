import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';

export const API = `http://localhost:8000`;

/**
 * @todo useEffect waiting for endpoint change to activate function?
 * @todo abort controller
 */

export const useFetch = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();

   const fetchData = async (endpoint, method = 'GET', body = null) => {
      setLoading(true);
      setError(null);
      setReady(false);
      try {
         const res = await fetch(`${API}${endpoint}`, {
            method,
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: !body ? null : JSON.stringify(body),
         });
         const resData = await res.json();
         console.log(resData);
         if (!res.ok) throw new Error(resData.message);

         setReady(true);
         setData(resData);
         successMsg(resData.message);
      } catch (err) {
         setError(err.message);
         errorMsg(err.message);
      }
      setLoading(false);
   };

   return { fetchData, data, error, loading, ready, contextHolder };
};
