import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";



const DragAndDrop = () => {

    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        console.log(file)
    }
    return (
        <FileUploader handleChange={handleChange} name="file"  />
    )
};

export default DragAndDrop; 