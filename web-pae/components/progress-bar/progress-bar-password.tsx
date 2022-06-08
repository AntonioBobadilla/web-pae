/* eslint-disable @typescript-eslint/no-explicit-any */
// Siempre se importa react
import progressBarStyles from '@/css-components/progressBarHours.module.css';
import React from 'react';

const ProgressBarPassword = (props: {
  progress: number;
  backgroundColor: string;
}) => {
  const { progress, backgroundColor } = props; // descomposición del objeto props

  return (
    <div className={progressBarStyles.progress_bar_container}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor,
          height: '100%',
          borderRadius: '10px',
          transition: '0.5s ease-in-out',
          transitionDelay: '0.1s'
        }}
      />
    </div>
  );
};

export default ProgressBarPassword; // exporto la función
// <p className={progressBarStyles.barText}> {progress}/3 </p>
