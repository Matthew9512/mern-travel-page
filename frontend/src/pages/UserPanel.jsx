import React, { useState } from 'react';
import { DisplayUserData } from '../components/DisplayUserData/DisplayUserData';

export const UserPanel = () => {
   const [ready, setReady] = useState(true);

   return (
      <section className='user__panel'>
         <div className='user__panel-btns'>
            <button onClick={() => setReady(true)} className='btn'>
               My profile
            </button>
            <button onClick={() => setReady(false)} className='btn'>
               My bookings
            </button>
         </div>
         <DisplayUserData ready={ready} />
      </section>
   );
};
