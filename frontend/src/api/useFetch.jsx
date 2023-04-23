import { useEffect, useState } from 'react';
import { usePopupMessage } from './usePopupMessage';
import { PopupMessage } from '../components/PopupMessage/PopupMessage';

/**
 * @todo success popup message
 */

export const API = `http://localhost:8000`;

/**
 * @todo useEffect waiting for endpoint change to activate function?
 */

export const useFetch = () => {
   const { contextHolder, successMsg, errorMsg } = usePopupMessage();
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [ready, setReady] = useState(false);

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

         setData(resData);
         // <PopupMessage ready={ready} />;
         // successMsg(resData.message || resData.at(0)?.message);
         setReady(true);
      } catch (err) {
         errorMsg(err.message);
         setError(err.message);
      }
      setLoading(false);
   };

   return { fetchData, data, loading, error, ready, contextHolder };
};
