import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { SpinnerContext } from '../../context/SpinnerContext';

export const Buttons = ({ usersInput }) => {
  const { setState } = useContext(GlobalContext);
  const { setLoading } = useContext(SpinnerContext);

  useEffect(() => {
    fetchData();
  }, []);

  // fetch most popular cat
  const fetchData = async (value) => {
    // setLoading(false);
    const fetchOpt = value ? '/search' : '';

    try {
      const res = await fetch(`http://localhost:8000${fetchOpt}`);
      const data = await res.json();
      if (!data.length) throw new Error(`Sorry we couldn't find anything that matches your question ;( `);
      setState(data);
      // setTimeout(() => {
      //   setLoading(true);
      // }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='btns'>
      <button onClick={usersInput} className='btn btn-save'>
        Search
      </button>
      <p>or</p>
      <button onClick={() => fetchData(true)} className='btn btn-save'>
        See full offer
      </button>
    </div>
  );
};
