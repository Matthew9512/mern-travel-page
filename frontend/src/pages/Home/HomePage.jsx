import React, { useEffect } from 'react';
import { Hero } from './Components/Hero/Hero';
import { Inputs } from './Components/Inputs/Inputs';
import { useAxios } from '../../api/useAxios';
import { usePersist } from '../../api/usePersist';
import { FeaturedTravels } from './Components/FeaturedTravels/FeaturedTravels';
import { Footer } from '../../components/Footer/Footer';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import '../../assets/App.css';

export const HomePage = () => {
   const { fetchData, data, setData, loading, error, ready } = useAxios();
   const { persistData, setPersistData } = usePersist('travel__list');

   useEffect(() => {
      console.log('Home page effect');
      // if there is 'travel__list' inside LS then display this data else fetch data
      if (!persistData)
         fetchData({
            url: `/featured`,
         });
      setData(persistData);
   }, []);

   useEffect(() => {
      if (!ready) return;
      // save fetch data inside LS
      setPersistData(data);
   }, [data]);

   const fetchTravelData = async (inputData, value) => {
      const body = inputData();

      // request full offer
      if (value) await fetchData(`/q?price=${body.price}&startDate=${body.startDate}&endDate=${body.endDate}&city=${body.city}`);
      // request offer based on inputs value
      else await fetchData('/search');
   };

   if (!data.length) return <LoadingSpinner loading={loading} />;

   return (
      <main className='container'>
         <Hero />
         <Inputs fetchTravelData={fetchTravelData} />
         <FeaturedTravels data={data} error={error} loading={loading} />
         <Footer />
      </main>
   );
};
