import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlacesItem } from '../components/PlacesItem/PlacesItem';
import { ErrorFallback } from '../components/ErrorFallback/ErrorFallback';
import { SkeletonLoader } from '../components/SkeletonLoader/SkeletonLoader';

export const SingleItem = () => {
   const { id } = useParams();
   const [state, setState] = useState([]);
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
         if (res.status !== 200) {
            throw new Error(`Wrong id, redirecting to home page`);
         } else {
            const data = await res.json();
            setState([data]);
         }
      } catch (error) {
         console.error(error.message);
         alert(error.message);
         setTimeout(() => {
            navigate('/');
         }, 1000);
      }
   };

   // return <>{<SkeletonLoader /> || <PlacesItem data={state} />}</>;
   return <>{!state.length ? <SkeletonLoader /> : <PlacesItem data={state} />}</>;
   // return <>{!state.length ? <ErrorFallback error={state} /> : <PlacesItem data={state} />}</>;
};
