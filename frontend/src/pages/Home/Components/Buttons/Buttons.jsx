import React from 'react';

export const Buttons = ({ fetchTravelData, inputData }) => {
   return (
      <div className='btns'>
         <button onClick={() => fetchTravelData(inputData, true)} className='btn btn-save'>
            Search
         </button>
         <p>or</p>
         <button onClick={() => fetchTravelData(inputData, false)} className='btn btn-save'>
            See full offer
         </button>
      </div>
   );
};
