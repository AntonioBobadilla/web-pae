import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import editAsesorStyles from '../../css/components/dialogs/edit-asesor.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';
import cx from 'classnames';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void,
  setAsesor: any;
};

const EditAsesor = ({ visible, setVisible, setAsesor }: ModifyLanguageProps) => {

  const [asesorActual, setAsesorActual] = useState('');

  const onClickSave = () => {
    setVisible(false);
  };


  let dummyData = [
    { name: "Antonio", apellidos:"Bobadilla garcia", carrera: "ITC", matricula: "A01734433", horas:23},
    { name: "Salvador", apellidos:"Gaytan Ibañez", carrera: "ITC", matricula: "A017346753", horas:80},
    { name: "Karen", apellidos:"Rugerio Armenta", carrera: "ITC", matricula: "A01734f33", horas:80}
  ]

  const clearAllBorders = () => {
    let wrapper = document.querySelector('#wrapper');
    let asesores = wrapper.childNodes;
    asesores.forEach(item => {
      item.style.border = '1px solid #7a7a7a';
      item.classList.remove('active')
    })
  }

  const handleClickAsesor = (e) => {
    let idOfAsesor = parseInt(e.target.id);
    let asesorObj = dummyData[idOfAsesor];
    let asesor = asesorObj.matricula
    //setAsesorActual(asesor)
    clearAllBorders();
    if (!e.target.classList.contains('active')){
      e.target.style.border = '2px solid #039BE5';
      e.target.classList.add('active')
    }
    setAsesorActual(asesor)
    console.log("Asesor seleccionado: ", asesor)
  }

  useEffect(() => {
    setTimeout(() => {
      let wrapper = document.querySelector('#wrapper');
      let asesores = wrapper.childNodes;
      asesores.forEach(item => {
        item.addEventListener("click", handleClickAsesor);
      })
    },1000)
  }, [])
  
  const sendData = () => {
    setAsesor(asesorActual);
    onClickSave();
  }
  return (
    <ClosablePopup
      title="Otros asesores disponibles"
      line
      visible={visible}
      style={editAsesorStyles.container}
      setVisible={setVisible}
    >
      <div className={editAsesorStyles.wrapper}>
        <div id='wrapper' className={editAsesorStyles.asesores}>
          { 
            dummyData.map(function(item,index) {
              return ( 
              <div key={index} id={index} className={editAsesorStyles.asesor}>
                  <div  className={editAsesorStyles.asesor_izq}>
                      <p className={editAsesorStyles.name}>{ item.name } </p>
                      <p className={editAsesorStyles.apellidos}>{ item.apellidos }</p>
                      <div className={editAsesorStyles.flex}>
                          <p className={editAsesorStyles.carrera}>{ item.carrera }</p>
                          <p className={editAsesorStyles.matricula}>{ item.matricula }</p>
                      </div>
                  </div>
                  <div className={editAsesorStyles.asesor_der}>
                      <p className={editAsesorStyles.textHoras}>Horas totales</p>
                      <p className={editAsesorStyles.horas}>{ item.horas }</p>
                  </div>
              </div>
              )
            })}
        </div>
        <div className={editAsesorStyles.button}>
          <ButtonTemplate variant="confirm" onClick={sendData}>
                GUARDAR
          </ButtonTemplate>
      </div>
      </div>
    </ClosablePopup>
  );
};

export default EditAsesor;
