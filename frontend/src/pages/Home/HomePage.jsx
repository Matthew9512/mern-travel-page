import React, { useEffect } from 'react';
import '../../assets/App.css';
import { Hero } from './Components/Hero/Hero';
import { Inputs } from './Components/Inputs/Inputs';
import { useFetch } from '../../api/useFetch';
import { FeaturedTravels } from './Components/FeaturedTravels/FeaturedTravels';
import { Footer } from '../../components/Footer/Footer';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export const HomePage = () => {
   const { fetchData, data, loading, error } = useFetch();

   useEffect(() => {
      console.log('Home page effect');
      fetchData('/featured');
   }, []);

   const fetchTravelData = async (inputData, value) => {
      const body = inputData();

      // request full offer
      if (value) await fetchData(`/q?price=${body.price}&startDate=${body.startDate}&endDate=${body.endDate}&city=${body.city}`);
      // request offer based on inputs value
      else await fetchData('/search');
   };

   if (!data) return <LoadingSpinner loading={loading} />;

   return (
      <main className='container'>
         <Hero />
         <Inputs fetchTravelData={fetchTravelData} />
         <FeaturedTravels data={data} error={error} loading={loading} />
         <Footer />
      </main>
   );
};
