import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../../api/useAxios';
import { FontAwesome } from '../../utils/icons';
import { LoadingButton } from '../../components/LoadingButton';
import '../Login/LoginPage';

export const RegisterPage = () => {
   const formRef = useRef();
   const [disabledBtn, setDisabledBtn] = useState(true);
   const { fetchData, loading, ready, contextHolder } = useAxios(false);
   const navigate = useNavigate();

   // check inputs for disabling btn
   const verifyFrom = () => {
      if (
         !formRef.current.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
         formRef.current.password.value.length < 3 ||
         formRef.current.username.value.length < 3
      )
         return setDisabledBtn(true);
      setDisabledBtn(false);
   };

   const authUser = async (e) => {
      e.preventDefault();

      // register new user
      await fetchData({
         method: `POST`,
         url: `/user/signin`,
         data: {
            email: formRef.current.email.value,
            username: formRef.current.username.value,
            password: formRef.current.password.value,
         },
      });
   };

   useEffect(() => {
      if (!ready) return;
      // navigate after message ends
      setTimeout(() => {
         navigate('/login');
      }, 2000);
   }, [ready]);

   return (
      <section className='auth__container'>
         <video className='hero__video' src='/hero4.mp4' autoPlay muted loop></video>
         <div className='login'>
            {contextHolder}
            <p className='auth__header'>
               <span>
                  <FontAwesome iconName='earth-americas' />
               </span>
               Travello
            </p>
            <p>Sign up your account</p>
            <form onChange={verifyFrom} ref={formRef} className='login__wrapper'>
               <label htmlFor='emailRef'>Email:</label>
               <input type='email' name='email' id='emailRef' />
               <label htmlFor='username'>Username:</label>
               <input type='text' name='username' id='username' minLength={3} />
               <label htmlFor='password'>Password:</label>
               <input type='password' name='password' id='password' minLength={3} />
               {loading ? (
                  <LoadingButton customClass={`btn auth-btn`} />
               ) : (
                  <button
                     onClick={authUser}
                     disabled={disabledBtn}
                     className={`btn auth-btn ${disabledBtn ? 'disabled' : ''}`}
                  >
                     Sign up
                  </button>
               )}
            </form>
            <Link to='/login'>
               <p>
                  Have an account?
                  <span className='signin-span'>Log in</span>
               </p>
            </Link>
         </div>
      </section>
   );
};
