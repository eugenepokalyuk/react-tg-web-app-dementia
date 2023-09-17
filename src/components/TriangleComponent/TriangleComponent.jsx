import React, { useState } from 'react';
import styles from './TriangleComponent.module.css'
import image from '../../images/4.jpg'

const TriangleComponent = () => {
    // const [lines, setLines] = useState([
    //     {
    //         id: 1, selected: false, points: {
    //             x1: 0,
    //             x2: 60,
    //             y1: 120,
    //             y2: 220,
    //         }
    //     },
    // ]);
    const [lines, setLines] = useState([
        {
            id: 1, selected: false, points: {
                x1: 0,
                x2: 60,
                y1: 120,
                y2: 220,
            }
        },
        {
            id: 2, selected: false, points: {
                x1: 0,
                x2: 120,
                y1: 120,
                y2: 120,
            }
        },
        {
            id: 3, selected: false, points: {
                x1: 60,
                x2: 120,
                y1: 220,
                y2: 120,
            }
        },
        {
            id: 4, selected: false, points: {
                x1: 240,
                x2: 120,
                y1: 120,
                y2: 120,
            }
        },
        {
            id: 5, selected: false, points: {
                x1: 120,
                x2: 180,
                y1: 120,
                y2: 220,
            }
        },
        {
            id: 6, selected: false, points: {
                x1: 60,
                x2: 180,
                y1: 220,
                y2: 220,
            }
        },
        {
            id: 7, selected: false, points: {
                x1: 180,
                x2: 240,
                y1: 220,
                y2: 120,
            }
        },
        {
            id: 8, selected: false, points: {
                x1: 240,
                x2: 300,
                y1: 120,
                y2: 220,
            }
        },
        {
            id: 9, selected: false, points: {
                x1: 180,
                x2: 300,
                y1: 220,
                y2: 220,
            }
        },
    ]);

    const handleLineClick = (id) => {
        // Проверяем, сколько линий уже удалено ? пока не работает
        const selectedCount = lines.filter(line => line.selected).length;
        // Если уже удалены две линии, не делаем ничего
        if (selectedCount >= 2) {
            return;
        }

        // Обновляем массив lines, удаляя выбранную линию
        setLines(lines.map(line => {
            if (line.id === id) {
                return null;
            }
            return line;
        }).filter(line => line !== null));
    }

    return (
        <div className={styles.container}>
            <p>На рисунке четыре треугольника. Удалите 2 линии так, чтобы осталось 3 треугольника. Линий, не образующих фигуры, быть не должно. Чтобы убрать линию, кликните по ней.</p>
            <img src={image} alt="" />

            <div>
                <svg width={300} height={300} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    {lines.map(line => (
                        <line
                            key={line.id}
                            x1={line.points.x1}
                            x2={line.points.x2}
                            y1={line.points.y1}
                            y2={line.points.y2}
                            stroke="black"
                            fill="transparent"
                            strokeWidth="5"
                            onClick={() => handleLineClick(line.id)}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default TriangleComponent;