import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from '../css/components/dragdrop.module.css';


const DragAndDrop = () => {

    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        console.log(file.name)
        let text = document.querySelector('#text')
        text.innerHTML = "<b>Archivo cargado: </b>"+file.name;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <FileUploader children={<p id="text" className={styles.text}><b>Drag</b> a file here or <b>click</b> to select from your computer</p>} className={styles.input} handleChange={handleChange} name="file"  />
            </div>
        </div>
    )
};

export default DragAndDrop; 