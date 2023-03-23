import React, { useState } from 'react';
import '../PostsSection/PostsSection';

export const EvaluatePost = () => {
   const [count, setCount] = useState(0);

   const increase = () => setCount((prev) => prev + 1);

   const decrease = () => (count === 0 ? '' : setCount((prev) => prev - 1));

   return (
      <div className='evaluate'>
         <i onClick={increase} className='fa-solid fa-plus'></i>
         {count}
         <i onClick={decrease} className='fa-solid fa-minus'></i>
      </div>
   );
};
