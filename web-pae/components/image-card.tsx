import React from 'react';
import imageCardStyles from '../css/components/imageCard.module.css';
import { useState } from 'react';
import { useTranslation } from 'next-i18next'; //////////translate

const ImageCard = (props: { image: string; description: string }) => {
  const { image } = props; //descomposición del objeto props
  const { description } = props;
  // creo un Stateless Functional Component
  const [isToggled, setIsToggled] = useState(false); //used to store the state of the toggle button
  const { t } = useTranslation('student-home'); //////////translate
  const clicked = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className={imageCardStyles.box} onClick={clicked}>
      <img
        className={isToggled ? imageCardStyles.selected : imageCardStyles.image} //terneario
        src={props.image}
      />
      <p className={imageCardStyles.description}> {t(props.description)} </p>
    </div>
  );
};

export default ImageCard; // exporto la función
