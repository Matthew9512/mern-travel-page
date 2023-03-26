import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlacesItem } from '../components/PlacesItem/PlacesItem';

export const SingleItem = () => {
   const { id } = useParams();
   const [state, setState] = useState(null);
   const navigate = useNavigate();

   const controller = new AbortController();
   const signal = controller.signal;

   useEffect(() => {
      fetchData();

      return () => controller.abort();
   }, []);

   const fetchData = async () => {
      try {
         const res = await fetch(`http://localhost:8000/search/${id}`, signal);
         if (res.status !== 200) navigate('*');
         else {
            const data = await res.json();
            setState(data);
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   return <>{<p>Loading</p> && <PlacesItem data={state} />}</>;
   // return <>{!state.length ? <SkeletonLoader /> : <PlacesItem data={state} />}</>;
};
