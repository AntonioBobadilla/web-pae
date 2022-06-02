import React, { useState } from 'react';
import imageCardStyles from '../css/components/imageCard.module.css';
import { useTranslation } from 'next-i18next';

const ImageCard = (props: { image: string; description: string }) => {
  const { t } = useTranslation('student-forgot-password');
  const { image } = props; //descomposición del objeto props
  const { description } = props;
  // creo un Stateless Functional Component
  const [isToggled, setIsToggled] = useState(false); //used to store the state of the toggle button
  const clicked = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className={imageCardStyles.box} onClick={clicked}>
      <img
        className={isToggled ? imageCardStyles.selected : imageCardStyles.image} //terneario
        src={props.image}
      />
      <p className={imageCardStyles.description}> {t('Password recovery')} </p>
    </div>
  );
};

export default ImageCard; // exporto la función
