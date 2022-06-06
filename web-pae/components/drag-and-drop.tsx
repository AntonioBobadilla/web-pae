import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useAppDispatch } from 'store/hook';
import { setFile } from 'store/reducers/schedule-tutoring';
import styles from '../css/components/dragdrop.module.css';

const DragAndDrop = ({ file }: { file: File }) => {
  const fileTypes = ['JPG', 'PNG'];
  const dispatch = useAppDispatch();
  const handleChange = (newFile: any) => {
    dispatch(setFile(newFile));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <FileUploader
          className={styles.input}
          handleChange={handleChange}
          name="file"
          accept={fileTypes}
          maxSize={100000}
          value={file}
        >
          <p className={styles.text}>
            <b>Drag</b> a file here or <b>click</b> to select from your computer
          </p>
        </FileUploader>
      </div>
    </div>
  );
};

export default DragAndDrop;
