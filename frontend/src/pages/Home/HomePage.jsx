import { useEffect, useState } from 'react';
import { Hero } from './Components/Hero/Hero';
import { Inputs } from './Components/Inputs/Inputs';
import { FeaturedTravels } from './Components/FeaturedTravels/FeaturedTravels';
import { useAxios } from '../../api/useAxios';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export const HomePage = () => {
   // main loading
   const [isLoading, setIsLoading] = useState(true);
   const { fetchData, data, loading, error } = useAxios(false);

   const fetchTravelData = async (inputData, value) => {
      // data from inputs
      const body = inputData();
      // scroll to travels list
      document.querySelector('#offer').scrollIntoView({ top: 0 });
      // request full offer
      if (value)
         await fetchData(
            `/q?price=${body.price}&startDate=${body.startDate}&endDate=${body.endDate}&city=${body.city}`
         );
      // request offer based on inputs value
      else await fetchData('/search');
   };

   useEffect(() => {
      // main loading
      setTimeout(() => {
         setIsLoading(false);
      }, 500);

      fetchData({
         url: `/featured`,
      });
   }, []);

   return (
      <>
         {isLoading ? (
            <LoadingSpinner loading={isLoading} />
         ) : (
            <>
               <Hero />
               <Inputs fetchTravelData={fetchTravelData} />
               <FeaturedTravels data={data} error={error} loading={loading} />
            </>
         )}
      </>
   );
};
