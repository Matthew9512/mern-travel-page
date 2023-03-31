import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalContext';
import { usePopupMessage } from './usePopupMessage';

/**
 * @todo abort controller
 * @todo DRY?
 * @todo rename
 * @todo split
 * @todo scroll
 * @todo client side validation
 * @todo signin/login
 */

export const API = `http://localhost:8000`;

// const controller = new AbortController();
// const signal = controller.signal;

//
export const useGetFetch = () => {
   const { setState } = useContext(GlobalContext);

   const fetchData = async (value) => {
      const fetchOpt = value ? '/search' : '';
      try {
         const res = await fetch(`${API}${fetchOpt}`);
         const data = await res.json();
         setState(data);

         // if (value) document.querySelector('.destinations__header').scrollIntoView();
      } catch (err) {
         console.log(err.message);
      }
   };

   return fetchData;
};

// fetch data based on values of inputs
export const fetchInputData = () => {
   const { setState } = useContext(GlobalContext);

   //   fetch data based on users input
   const getUsersInput = async (cityRef, priceRef, userDates) => {
      // obj with input info for request
      const values = {
         city: cityRef.current.value.toLowerCase().trim(),
         price: +priceRef.current.value,
         startDate: !userDates ? '' : userDates?.[0].format('DD/MM/YYYY'),
         endDate: !userDates ? '' : userDates?.[1].format('DD/MM/YYYY'),
      };

      try {
         const res = await fetch(
            `${API}/q?price=${values.price}&startDate=${values.startDate}&endDate=${values.endDate}&city=${values.city}`
         );
         const data = await res.json();
         // throw error when theres no data in res
         console.log(data);
         if (res.status !== 200) throw new Error(data.message);

         setState(data);

         // document.querySelector('.destinations__header').scrollIntoView();
      } catch (error) {
         console.error(error.message);
         setState(error);
      }
   };

   return getUsersInput;
};

// fetch post data
export const fetchPostData = () => {
   const [post, setPost] = useState([]);

   const fetchData = async (id) => {
      try {
         const res = await fetch(`${API}/search/${id}/comments`);
         if (res.status !== 200) {
            throw new Error(`Wrong id, redirecting to home page`);
         } else {
            const data = await res.json();
            setPost(data);
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   return { fetchData, post };
};

// create new post
export const postComment = () => {
   const { auth } = useContext(AuthContext);
   const { contextHolder, success, error, info } = usePopupMessage();

   const sendComment = async (id, update, commentRef) => {
      if (auth === 'Log in') return;
      // if (auth === 'Log in') return info(`You need to be logged in in order to post comments`);
      const { username } = JSON.parse(localStorage.getItem('travel__user'));

      try {
         const res = await fetch(`${API}/search/${id}/comments`, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id,
               username,
               post: commentRef.current.value,
            }),
         });
         const data = await res.json();
         success(data.message);
         commentRef.current.value = '';
         document.querySelector('.comment__section-header').scrollIntoView();
         setTimeout(() => {
            update();
         }, 1000);
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return { sendComment, contextHolder, auth };
};

// likes on post
export const patchPostLikes = () => {
   const { contextHolder, success, error, info } = usePopupMessage();

   const updatePostLikes = async function (e, likesAmount) {
      const id = e.target.closest('.post').id;

      try {
         const res = await fetch(`${API}/search/likes`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, likes: +likesAmount.current.innerHTML }),
         });

         const data = await res.json();
         console.log(data);
         console.log(res);
         success(data.message);
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return { updatePostLikes, contextHolder, info };
};

// login/signin
export const authUser = (usernameRef, passwordRef) => {
   const { setAuth } = useContext(AuthContext);
   const { contextHolder, success, error } = usePopupMessage();
   const [login, setLogin] = useState(true);
   const navigate = useNavigate();

   const setting = {
      header: login ? 'Log in to' : 'Sign up',
      btn: login ? 'Log in' : 'Sign up',
      footer: login ? `Don't have an account? ` : `Have an account? `,
      footerBtn: login ? 'Sign Up' : 'Log in',
   };

   const logIn = async (e) => {
      e.preventDefault();

      try {
         const endpoint = login ? 'login' : 'signin';
         const res = await fetch(`${API}/users/${endpoint}`, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               username: usernameRef.current.value,
               password: passwordRef.current.value,
            }),
         });
         const data = await res.json();
         console.log(data);
         if (res.ok && endpoint === 'login') {
            setAuth(usernameRef.current.value);
            localStorage.setItem('travel__user', JSON.stringify({ username: usernameRef.current.value, id: data.id }));
            // localStorage.setItem('travel__user', JSON.stringify(usernameRef.current.value));
            // localStorage.setItem('travel__user', JSON.stringify([usernameRef.current.value, data.id]));
            success(data.message);
            setTimeout(() => {
               navigate('/');
            }, 1000);
         } else throw new Error(data.message);
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }

      usernameRef.current.value = '';
      passwordRef.current.value = '';
   };

   return { logIn, setting, setLogin, contextHolder };
};

//
export const postBtnsController = () => {
   const { contextHolder, success, error } = usePopupMessage();

   const deletePost = async (e, setUpdatePage) => {
      const id = e.target.closest('.post').id;

      try {
         const res = await fetch(`${API}/search/delete`, {
            method: 'DELETE',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
         });

         const data = await res.json();
         if (res.status === 200) {
            success(data.message);
            setTimeout(() => {
               setUpdatePage((prev) => !prev);
            }, 1000);
         }
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   const updatePost = async (post, id) => {
      try {
         const res = await fetch(`${API}/search/:id/comments`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post, id }),
         });

         const data = await res.json();
         if (res.status === 200) {
            success(data.message);
         }
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return { deletePost, updatePost, contextHolder };
};

//
export const bookTravel = () => {
   const { contextHolder, success, error } = usePopupMessage();
   const [calc, setCalc] = useState(false);

   const booking = async (travelID, inpRef) => {
      try {
         const res = await fetch(`http://localhost:8000/places`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               places: inpRef.current.value,
               id: travelID,
            }),
         });
         const data = await res.json();
         if (!data.data) throw new Error(data.message);
         else {
            await updateUserProfile(travelID, success, error);
            setCalc(true);
            inpRef.current.value = '';
         }
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return { booking, contextHolder, calc };
};

//
const updateUserProfile = async (travelID, success, error) => {
   const { id } = JSON.parse(localStorage.getItem('travel__user'));

   try {
      const res = await fetch(`http://localhost:8000/users/bookings`, {
         method: 'PATCH',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            userID: id,
            travelID,
         }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      success(data.message);
   } catch (err) {
      console.log(err.message);
      error(err.message);
   }
};
