import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Navbar } from '../components/Navbar/Navbar';
import { RenderPlacesList } from '../components/RenderPlacesList/RenderPlacesList';
import { UserInputs } from '../components/UserInputs/UserInputs';

export const Home = () => {
  return (
    <section className=''>
      <Navbar /> {/* navbar with react portal? */}
      <Hero />
      <UserInputs />
      <RenderPlacesList />
    </section>
  );
};
