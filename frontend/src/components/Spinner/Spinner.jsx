import React, { useContext } from 'react';
import { Spin } from 'antd';
import { SpinnerContext } from '../../context/SpinnerContext';
import './Spinner.css';

export const Spinner = () => {
  const { loading } = useContext(SpinnerContext);
  return (
    <div className={`example ${loading ? 'hidden' : ''} `}>
      <Spin />
    </div>
  );
};
