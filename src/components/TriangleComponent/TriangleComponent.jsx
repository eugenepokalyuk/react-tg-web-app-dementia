import React, { useState } from 'react';
import styles from './TriangleComponent.module.css'
import image from '../../images/4.jpg'

const TriangleComponent = () => {
    const [lines, setLines] = useState([
        { id: 1, selected: false, points: [1, 2] },
        { id: 2, selected: false, points: [2, 3] },
        { id: 3, selected: false, points: [3, 1] },
        { id: 4, selected: false, points: [2, 4] },
        { id: 5, selected: false, points: [4, 3] },
        { id: 6, selected: false, points: [4, 1] },
    ]);

    return (
        <div className={styles.container}>
            <p>На рисунке четыре треугольника. Удалите 2 линии так, чтобы осталось 3 треугольника. Линий, не образующих фигуры, быть не должно. Чтобы убрать линию, кликните по ней.</p>
            <img src={image} alt="" />

            <div>

            </div>
        </div>
    );
};

export default TriangleComponent;