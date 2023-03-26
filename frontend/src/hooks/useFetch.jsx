// import { useEffect, useState } from 'react';

// export const useFetch = (url) => {
//    console.log(`usefetch`);
//    const [data, setData] = useState([]);
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState(false);

//    useEffect(() => {
//       const getData = async () => {
//          setLoading(true);
//          try {
//             const res = await fetch(url);
//             const data = await res.json();
//             setData(data);
//          } catch (err) {
//             setError(err);
//          }
//          setLoading(false);
//       };
//       getData();
//    }, []);

//    const fetchData = async (value) => {
//       setLoading(true);
//       try {
//          const res = await fetch(value);
//          const data = await res.json();
//          setData(data);
//       } catch (err) {
//          setError(err);
//       }
//       setLoading(false);
//    };

//    return { data, loading, error, fetchData };
// };

// export const postOptions = {
//    method: 'POST',
//    headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//    },
// };

// const body = {
//    body: JSON.stringify(req)
// }

// export const fetchData = async (url, postOptions, body) => {
//    const res = await fetch(url, options, data);
//    const data = res.json()

//    return data
// }

// export const fetchData = async (url, method, payload) => {
//    const options = {
//       method: method,
//       headers: {
//          Accept: 'application/json',
//          'Content-Type': 'application/json',
//       },
//    };
//    // if (method === 'GET') options.body = '';
//    // if (method === 'POST') {
//    //    options.body = JSON.stringify(payload);
//    //    const res = await fetch(url, options, payload);
//    //    const data = await res.json();
//    //    return { res, data };
//    // }

//    try {
//       console.log(url);
//       const res = await fetch(url);
//       const data = await res.json();
//       console.log(data);
//       return { res, data };
//    } catch (error) {
//       console.log(error.message);
//    }
//    // if (!method) {
//    // }

//    // return { res, data };
// };
