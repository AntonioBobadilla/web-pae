// Siempre se importa react
import progressBarStyles from '@/css-components/progressBarHours.module.css';
import React from 'react';

const ProgressBarHours = (props: { progress: number; total: number }) => {
  const { progress } = props; // descomposición del objeto props
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
      />
    </div>
  );
};

export default ProgressBarHours; // exporto la función
// <p className={progressBarStyles.barText}> {progress}/3 </p>
