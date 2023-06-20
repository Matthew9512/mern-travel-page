import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../api/useAxios';
import { FontAwesome } from '../../utils/icons';
import { LoadingButton } from '../../components/LoadingButton';
import './LoginPage.css';

export const LoginPage = () => {
   const formRef = useRef();
   const navigate = useNavigate();
   const [disabledBtn, setDisabledBtn] = useState(true);
   const { setFetchUser } = useContext(AuthContext);
   const { fetchData, data, loading, ready, contextHolder } = useAxios(false);

   // check inputs for disabling btn
   const verifyFrom = () => {
      if (!formRef.current.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || formRef.current.password.value.length < 3)
         return setDisabledBtn(true);
      setDisabledBtn(false);
   };

   const authUser = async (e) => {
      e.preventDefault();

      await fetchData({
         method: `POST`,
         url: `/user/login`,
         data: { email: formRef.current.email.value, password: formRef.current.password.value },
      });
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (!ready) return;
      const accessToken = JSON.stringify(data.accessToken);
      localStorage.setItem('access__token', accessToken);
      setFetchUser(data.accessToken);
      navigate('/');
   }, [ready]);

   return (
      <section className='auth__container'>
         {contextHolder}
         <video className='hero__video' src='/hero4.mp4' muted loop></video>
         <div className='login'>
            <p className='auth__header'>
               <span>
                  <FontAwesome iconName='earth-americas' />
               </span>
               Travello
            </p>
            <p>Log into your account</p>
            <form ref={formRef} onChange={verifyFrom} className='login__wrapper'>
               <label htmlFor='email'>Email:</label>
               <input type='email' name='email' id='email' />
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
                     Log in
                  </button>
               )}
            </form>
            <Link to='/signin'>
               <p>
                  Don't have an account?
                  <span className='signin-span'>Sign Up</span>
               </p>
            </Link>
         </div>
      </section>
   );
};
