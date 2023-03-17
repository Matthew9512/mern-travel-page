import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const SingleItem = () => {
  const { id } = useParams();
  const [state, setState] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/search/${id}`);
      const data = await res.json();
      console.log(data);
      if (!data) throw new Error(`Sorry we couldn't find anything that matches your question ;( `);
      setState(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className='single'>
      <div className='single__wrapper'>
        <img src={state.image} alt='' className='single__img' />
        <div className='destination__details'>
          <div>
            <p className='destinations-name'>{state.city}</p>
            <p className='destinations-country'>
              <i className='fa-solid fa-location-dot'></i> {state.country}
            </p>
            {/* <p className='destinations-start-date'>start: {state.startDate.slice(0, 10)}</p> */}
            <p className='destinations-end-date'>end: {state.endDate}</p>
          </div>
          <div className='destinations__item-details'>
            <p className='destinations-category'>{state.type}</p>
            <p className='destinations-price'>{state.price}</p>
          </div>
        </div>
      </div>
      <p className='destinations-description'>{state.description}</p>
      <Link to={'/'} className='btn'>
        Go Back
      </Link>
    </section>
  );
};
