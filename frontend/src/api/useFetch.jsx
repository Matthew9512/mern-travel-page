import { useState } from 'react';
import { usePopupMessage } from './usePopupMessage';

/**
 * @todo success popup message
 */

export const API = `http://localhost:8000`;

export const useFetch = () => {
   const { contextHolder, success, error } = usePopupMessage();
   const [data, setData] = useState(null);
   const [errors, setErrors] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);

   const fetchData = async (endpoint, method = 'GET', body = null) => {
      setLoading(true);
      setErrors(null);
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

         setData(resData);
         // success(resData.at(0)?.message);
         setReady(true);
      } catch (err) {
         error(err.message);
         setErrors(err.message);
      }
      setLoading(false);
   };

   return { fetchData, data, loading, errors, ready, contextHolder };
};
