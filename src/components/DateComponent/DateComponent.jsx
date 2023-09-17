import React from 'react';
import styles from './DateComponent.module.css'
const DateComponent = () => {
    return (
        <div className={styles.radioCard}>
            <input className={`${styles.mb4} ${styles.input}`} type="text" min="1" max="31" />
            <select name="months" className={styles.select}>
                <option value="1">Январь</option>
                <option value="2">Февраль</option>
                <option value="3">Март</option>
                <option value="4">Апрель</option>
                <option value="5">Май</option>
                <option value="6">Июнь</option>
                <option value="7">Июль</option>
                <option value="8">Август</option>
                <option value="9">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
            </select>
            <select name="years" className={styles.select}>
                {Array.from({ length: 103 }, (_, i) => 1922 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    )
};
export default DateComponent;