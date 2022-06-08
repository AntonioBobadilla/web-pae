// Siempre se importa react
import progressBarStyles from '@/css-components/progressBar.module.css';
import React, { useEffect, useState } from 'react';

const ProgressBar = (props: { progress: number }) => {
  const { progress } = props; // descomposición del objeto props
  const [style, setStyle] = useState('');

  useEffect(() => {
    if (progress === 0) setStyle('progress_bar0');
    else if (progress === 1) setStyle('progress_bar1');
    else if (progress === 2) setStyle('progress_bar2');
    else if (progress === 3) setStyle('progress_bar3');
  }, [progress]);

  return (
    <div className={progressBarStyles.progressContainer}>
      <div className={progressBarStyles.progress_bar_container}>
        <div className={progressBarStyles[`progress_bar${progress}`]} />
      </div>
    </div>
  );
};

export default ProgressBar; // exporto la función
// <p className={progressBarStyles.barText}> {progress}/3 </p>
