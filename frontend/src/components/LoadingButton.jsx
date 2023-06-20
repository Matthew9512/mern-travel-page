export const LoadingButton = ({ customClass }) => {
   return (
      <div className={`loading-button ${customClass}`}>
         <span className='spinner'></span> Loading...
      </div>
   );
};
