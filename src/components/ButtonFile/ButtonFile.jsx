import React from 'react';
import styles from './ButtonFile.module.css'

const ButtonFile = () => {
    return (
        <form method="post" encType="multipart/form-data" className={styles.form}>
            <label className={`${styles.inputFile}`}>
                <input type="file" name="file" />
                <span>Добавить файл</span>
            </label>
        </form>
    )
};
export default ButtonFile;