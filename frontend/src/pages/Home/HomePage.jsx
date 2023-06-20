import { useEffect, useState } from 'react';
import { Hero } from './Components/Hero/Hero';
import { Inputs } from './Components/Inputs/Inputs';
import { FeaturedTravels } from './Components/FeaturedTravels/FeaturedTravels';
import { useAxios } from '../../api/useAxios';
import { usePersist } from '../../api/usePersist';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Slider } from './Components/Slider/Slider';

export const HomePage = () => {
   // main loading
   const [isLoading, setIsLoading] = useState(true);
   const { fetchData, data, loading, setData, error, ready } = useAxios(false);
   const { persistData, setPersistData } = usePersist('travel__list');

   const fetchTravelData = async (inputData, value) => {
      const body = inputData();

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
      }, 1000);
      // if there is 'travel__list' inside LS then display this data else fetch data
      if (!persistData) {
         fetchData({
            url: `/featured`,
         });
      }
      setData(persistData);
   }, []);

   useEffect(() => {
      if (!ready) return;
      // save fetch data inside LS
      setPersistData(data);
   }, [data]);

   // if (!data.length) return <LoadingSpinner loading={loading} />;

   return (
      <>
         {isLoading ? (
            <LoadingSpinner loading={isLoading} />
         ) : (
            <>
               <Hero />
               <Inputs fetchTravelData={fetchTravelData} />
               <FeaturedTravels data={data} error={error} loading={loading} />
               {/* <Slider /> */}
            </>
         )}
      </>
   );
};
