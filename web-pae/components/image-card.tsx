import React from 'react';
import imageCardStyles from '../css/components/imageCard.module.css';
import { useState } from 'react';
import Link from 'next/link';

const ImageCard = (props: {
  image: string;
  description: string;
  path: string;
}) => {
  const { image } = props; //descomposición del objeto props
  const { description } = props;
  const { path } = props;
  // creo un Stateless Functional Component
  const [isToggled, setIsToggled] = useState(false); //used to store the state of the toggle button

  const clicked = () => {
    setIsToggled(!isToggled);
  };
  return (
    <Link href={path}>
      <div className={imageCardStyles.box} onClick={clicked}>
        <img
          className={
            isToggled ? imageCardStyles.selected : imageCardStyles.image
          } //terneario
          src={props.image}
        />
        <p className={imageCardStyles.description}> {props.description} </p>
      </div>
    </Link>
  );
};

export default ImageCard; // exporto la función
