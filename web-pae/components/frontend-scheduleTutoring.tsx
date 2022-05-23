import styles from '../css/components/scheduleTutoring.module.css'
import cx from 'classnames'
import SearchBar from './frontend-searchBar';
import { useState, useEffect } from 'react';
import ButtonTemplate from './button-template';

const ScheduleTutoring = () => {

    // AQUÍ SE GUARDAN LOS VALORES SELECCIONADOS EN FORMA DE ARREGLO
    const [valuesSelected, changeValues] = useState([])

    useEffect(() => {
        //showValues();
      }, [valuesSelected]);

    const cleanHTML = () => {
        let div = document.querySelector('.values');
        while(div.firstChild){
            div?.removeChild(div.firstChild);
        }
    }

    const showValues = () => {
        let div = document.querySelector('.values');
        cleanHTML()
        valuesSelected.forEach(item => {
            let value = document.createElement('p');
            value.innerHTML = item;
            div.appendChild(value);
        })
        
        
    }

    const handleSuggestions = (suggestion) => {
        changeValues((valuesSelected) => [...valuesSelected, suggestion]);
        //showValues();
    }

    const deleteItem = (e) => {
       let itemToDelete = e.target.parentElement.parentElement.id;
       console.log(itemToDelete)
       changeValues(valuesSelected.filter(item => item != itemToDelete));
    }

    const test = () => {
        console.log('agregar funcionalidad cuando hace click xd')
    }

    return (
            <div className={styles.wrapper}>
                <SearchBar function={handleSuggestions} suggestions={["AK - Alaska", 
                "AL - Alabama", 
                "AR - Arkansas", 
                "AS - American Samoa", 
                "AZ - Arizona", 
                "CA - California", 
                "CO - Colorado", 
                "CT - Connecticut", 
                "DC - District of Columbia", 
                "DE - Delaware", 
                "FL - Florida", 
                "GA - Georgia", 
                "GU - Guam", 
                "HI - Hawaii", 
                "IA - Iowa", 
                "ID - Idaho", 
                "IL - Illinois", 
                "IN - Indiana", 
                "KS - Kansas", 
                "KY - Kentucky", 
                "LA - Louisiana", 
                "MA - Massachusetts", 
                "MD - Maryland", 
                "ME - Maine", 
                "MI - Michigan", 
                "MN - Minnesota", 
                "MO - Missouri", 
                "MS - Mississippi", 
                "MT - Montana", 
                "NC - North Carolina", 
                "ND - North Dakota", 
                "NE - Nebraska", 
                "NH - New Hampshire", 
                "NJ - New Jersey", 
                "NM - New Mexico", 
                "NV - Nevada", 
                "NY - New York", 
                "OH - Ohio", 
                "OK - Oklahoma", 
                "OR - Oregon", 
                "PA - Pennsylvania", 
                "PR - Puerto Rico", 
                "RI - Rhode Island", 
                "SC - South Carolina", 
                "SD - South Dakota", 
                "TN - Tennessee", 
                "TX - Texas", 
                "UT - Utah", 
                "VA - Virginia", 
                "VI - Virgin Islands", 
                "VT - Vermont", 
                "WA - Washington", 
                "WI - Wisconsin", 
                "WV - West Virginia", "WY - Wyoming"]} />
                <div className={styles.selectedSubjects}>
                    <h2  className={styles.title}>Materia escogida</h2>
                    <div className={styles.values}>
                        {
                            valuesSelected.map(function(value, index){
                                return (
                                     <p key={index} id={value} className={styles.element}>{value} <button id={value} onClick={deleteItem} className={styles.delete}><i className="bi bi-trash3"></i></button></p> 
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.continueButton}>
                <ButtonTemplate variant="primary">BUSCAR ASESORÍAS</ButtonTemplate>
                </div>
            </div>
    )
};

export default ScheduleTutoring; 