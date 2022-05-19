import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from '../css/components/dragdrop.module.css';


const DragAndDrop = () => {

    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        console.log(file)
    }
    return (
        <div className={styles.wrapper}>
            <FileUploader className={styles.input} handleChange={handleChange} name="file"  />
        </div>
    )
};

export default DragAndDrop; 