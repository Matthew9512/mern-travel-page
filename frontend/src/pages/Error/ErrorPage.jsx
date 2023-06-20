import { Link } from 'react-router-dom';
import './ErrorPage.css';

export const ErrorPage = () => {
   return (
      <section className='error__page'>
         <img className='error-img' src='/404-robot.jpg' alt='error-page-img' />
         <div className='error-text-wrapper'>
            <Link className='btn error-btn' to='/'>
               Go Back
            </Link>
            <p className='error-text'>
               We have a little problem called 404.
               <br />
               Looks like the page that you are were looking for doesn't exist.
               <br />
               You may have mistyped the address or page may have moved.
            </p>
         </div>
         <p className='attribution'>
            <a href='https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7906233.htm#page=2&query=404%20error&position=24&from_view=search&track=ais'>
               Image by storyset
            </a>{' '}
            on Freepik
         </p>
      </section>
   );
};
