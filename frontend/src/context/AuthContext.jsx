import { createContext, useEffect, useState } from 'react';
import { useFetch } from '../api/useFetch';

/**
 * @todo fetch user here on useEffect then save in ls when state change
 */

// take user obj from ls
const getLS = () => (localStorage.getItem('travel__user') ? JSON.parse(localStorage.getItem('travel__user')) : {});

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
   const { fetchData, data } = useFetch();
   const [userID, setUserID] = useState(null);
   const [userData, setUserData] = useState({
      username: null,
      email: null,
      id: null,
      createdAt: null,
      bookings: null,
   });

   useEffect(() => {
      console.log(`auth effect`);
      const { username, email, id, createdAt, bookings } = getLS();
      if (!username) setUserData(localStorage.setItem('travel__user', JSON.stringify({ username: 'Log in' })));
      setUserData({ username, email, id, createdAt, bookings });

      if (!userID) return;
      else fetchData(`/user/${userID}`);
   }, [userID]);

   useEffect(() => {
      if (!data) return;
      console.log(`tt`);
      localStorage.setItem('travel__user', JSON.stringify(data.user));
      const { username, email, id, createdAt, bookings } = getLS();
      setUserData({ username, email, id, createdAt, bookings });
   }, [data]);

   return <AuthContext.Provider value={{ setUserID, userData, setUserData }}>{children}</AuthContext.Provider>;
};
// import { createContext, useEffect, useState } from 'react';

// /**
//  * @todo fetch user here on useEffect then save in ls when state change
//  */

// // take user obj from ls
// const getLS = () => (localStorage.getItem('travel__user') ? JSON.parse(localStorage.getItem('travel__user')) : {});

// export const AuthContext = createContext({});

// export const AuthContextProvider = ({ children }) => {
//    const [auth, setAuth] = useState('Log in');
//    const [userData, setUserData] = useState({
//       username: null,
//       email: null,
//       id: null,
//       createdAt: null,
//       bookings: null,
//    });

//    useEffect(() => {
//       console.log(`auth effect`);
//       const { username, email, id, createdAt, bookings } = getLS();

//       if (!username) setAuth(localStorage.setItem('travel__user', JSON.stringify({ username: 'Log in' })));
//       setAuth(username);
//       // data of user used in user profile page
//       setUserData({ username, email, id, createdAt, bookings });
//    }, [auth]);

//    return <AuthContext.Provider value={{ auth, setAuth, userData, setUserData }}>{children}</AuthContext.Provider>;
// };
