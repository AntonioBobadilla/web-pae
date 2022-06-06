import { useEffect, useState } from "react";

const Cell = (props: any) => {
  // creo un Stateless Functional Component

  const handleClick = () => {
    props.function(cellValue);
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
