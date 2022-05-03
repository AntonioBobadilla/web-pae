import { useEffect, useState } from "react";

const Cell = (props: any) => {
  // creo un Stateless Functional Component

  const handleClick = () => {
    console.log("diste click en: ", cellValue);  
  }

  const [cellValue, setCellValue] = useState('');
  if (props.value){
      useEffect( () => {
            setCellValue(props.value);
      },[props.value]);
  }
  return (
    <td className='data' id={cellValue} onClick={handleClick}></td>
  );
};

export default Cell; // exporto la función
