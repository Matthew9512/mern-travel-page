import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { RenderPlacesList } from '../components/RenderPlacesList/RenderPlacesList';
import { UserInputs } from '../components/UserInputs/UserInputs';

export const Home = () => {
   return (
      <section className=''>
         <Hero />
         <UserInputs />
         <RenderPlacesList />
      </section>
   );
};
