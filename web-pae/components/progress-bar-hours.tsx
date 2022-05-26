//Siempre se importa react
import progressBarStyles from '../css/components/progressBarHours.module.css';
import { useState } from 'react';
import React, { useEffect } from 'react';

const ProgressBar = (props: { progress: number; total: number }) => {
  const { progress } = props; //descomposición del objeto props
  const { total } = props;
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue((progress / total) * 100);
  });
  return (
    <div className={progressBarStyles.progress_bar_container}>
      <div
        style={{
          width: `${value}%`,
          backgroundColor: '#2ED477',
          height: '100%',
          borderRadius: '10px',
          transition: '1s ease-in-out',
          transitionDelay: '0.6s'
        }}
      ></div>
    </div>
  );
};

export default ProgressBar; // exporto la función
//<p className={progressBarStyles.barText}> {progress}/3 </p>
