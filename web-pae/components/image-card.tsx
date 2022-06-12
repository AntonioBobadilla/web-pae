/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import Link from 'next/link';
import React, { useState } from 'react';
import imageCardStyles from '../css/components/imageCard.module.css';
import { useTranslation } from 'next-i18next';

const ImageCard = (props: {
  image: string;
  description: string;
  path: string;
}) => {
  const { image } = props; // descomposición del objeto props
  const { description } = props;
  const { path } = props;
  // creo un Stateless Functional Component
  const [isToggled, setIsToggled] = useState(false); //used to store the state of the toggle button

  const { t } = useTranslation('student-home'); //////////translate
  const clicked = () => {
    setIsToggled(!isToggled);
  };
  return (
    <Link href={path} passHref>
      <div className={imageCardStyles.box} onClick={clicked} role="button">
        <img
          className={
            isToggled ? imageCardStyles.selected : imageCardStyles.image
          } // terneario
          src={image}
        />
        <p className={imageCardStyles.description}> {t(props.description)} </p>
      </div>
    </Link>
  );
};

export default ImageCard; // exporto la función
