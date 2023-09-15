import React, { useState } from 'react';
import styles from './CirclesComponent.module.css'
import { useMediaQuery } from "react-responsive";

const CirclesComponent = () => {

    const isDesktop = useMediaQuery({
        query: "(min-width: 768px)"
    });

    const [selectedCircles, setSelectedCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const handleCircleClick = (circleKey) => {
        if (selectedCircles.includes(circleKey)) {
            // Кружок уже выбран, ничего не делаем
            return;
        }

        setSelectedCircles((prevCircles) => [...prevCircles, circleKey]);

        // Если выбрано больше одного кружка, проводим линию от последнего выбранного к предыдущему
        if (selectedCircles.length > 0) {
            const prevCircle = selectedCircles[selectedCircles.length - 1];
            const line = { from: prevCircle, to: circleKey };
            setLines((prevLines) => [...prevLines, line]);
        }
    };
    return (
        <>
            {isDesktop ?
                <div className={`${styles.circlesContaier}`}>
                    <svg width="740" height="340" className={`${styles.container}`} > {/* viewBox="0 0 800 800"*/}
                        {lines.map((line, index) => (
                            <line
                                key={index}
                                x1={getXCoordinate(line.from)}
                                y1={getYCoordinate(line.from)}
                                x2={getXCoordinate(line.to)}
                                y2={getYCoordinate(line.to)}
                                strokeWidth="3"
                                stroke="#5e0b77"

                            />
                        ))}
                        <circle cx="40" cy="40" r="30" className={selectedCircles.includes("1") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("1")} />
                        <text x="40" y="50" fontSize="12" textAnchor="middle" fill="white">
                            1
                        </text>
                        <circle cx="360" cy="50" r="30" className={selectedCircles.includes("2") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("2")} />
                        <text x="360" y="60" fontSize="12" textAnchor="middle" fill="white">
                            2
                        </text>
                        <circle cx="300" cy="200" r="30" className={selectedCircles.includes("3") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("3")} />
                        <text x="300" y="210" fontSize="12" textAnchor="middle" fill="white">
                            3
                        </text>
                        <circle cx="125" cy="185" r="30" className={selectedCircles.includes("4") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("4")} />
                        <text x="125" y="195" fontSize="12" textAnchor="middle" fill="white">
                            4
                        </text>
                        <circle cx="450" cy="280" r="30" className={selectedCircles.includes("5") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("5")} />
                        <text x="450" y="290" fontSize="12" textAnchor="middle" fill="white">
                            5
                        </text>
                        <circle cx="560" cy="120" r="30" className={selectedCircles.includes("6") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("6")} />
                        <text x="560" y="130" fontSize="12" textAnchor="middle" fill="white">
                            6
                        </text>
                        <circle cx="210" cy="60" r="30" className={selectedCircles.includes("А") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("А")} />
                        <text x="210" y="70" fontSize="12" textAnchor="middle" fill="white">
                            А
                        </text>
                        <circle cx="410" cy="160" r="30" className={selectedCircles.includes("Б") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Б")} />
                        <text x="410" y="170" fontSize="12" textAnchor="middle" fill="white">
                            Б
                        </text>
                        <circle cx="260" cy="130" r="30" className={selectedCircles.includes("В") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("В")} />
                        <text x="260" y="140" fontSize="12" textAnchor="middle" fill="white">
                            В
                        </text>
                        <circle cx="280" cy="300" r="30" className={selectedCircles.includes("Г") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Г")} />
                        <text x="280" y="310" fontSize="12" textAnchor="middle" fill="white">
                            Г
                        </text>
                        <circle cx="710" cy="300" r="30" className={selectedCircles.includes("Д") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Д")} />
                        <text x="710" y="310" fontSize="12" textAnchor="middle" fill="white">
                            Д
                        </text>
                        <circle cx="700" cy="60" r="30" className={selectedCircles.includes("Е") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Е")} />
                        <text x="700" y="70" fontSize="12" textAnchor="middle" fill="white">
                            Е
                        </text>
                    </svg>
                </div>
                :
                <div className={`${styles.circlesContaier}`}>
                    <svg width="340" height="740" className={`${styles.container}`} > {/* viewBox="0 0 800 800"*/}
                        {lines.map((line, index) => (
                            <line
                                key={index}
                                x1={getXCoordinateMobile(line.from)}
                                y1={getYCoordinateMobile(line.from)}
                                x2={getXCoordinateMobile(line.to)}
                                y2={getYCoordinateMobile(line.to)}
                                strokeWidth="3"
                                stroke="#5e0b77"

                            />
                        ))}
                        <circle cx="40" cy="40" r="30" className={selectedCircles.includes("1") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("1")} />
                        <text x="40" y="50" fontSize="12" textAnchor="middle" fill="white">
                            1
                        </text>
                        <circle cx="50" cy="360" r="30" className={selectedCircles.includes("2") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("2")} />
                        <text x="50" y="370" fontSize="12" textAnchor="middle" fill="white">
                            2
                        </text>
                        <circle cx="200" cy="300" r="30" className={selectedCircles.includes("3") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("3")} />
                        <text x="200" y="310" fontSize="12" textAnchor="middle" fill="white">
                            3
                        </text>
                        <circle cx="185" cy="125" r="30" className={selectedCircles.includes("4") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("4")} />
                        <text x="185" y="135" fontSize="12" textAnchor="middle" fill="white">
                            4
                        </text>
                        <circle cx="280" cy="450" r="30" className={selectedCircles.includes("5") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("5")} />
                        <text x="280" y="460" fontSize="12" textAnchor="middle" fill="white">
                            5
                        </text>
                        <circle cx="120" cy="560" r="30" className={selectedCircles.includes("6") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("6")} />
                        <text x="120" y="570" fontSize="12" textAnchor="middle" fill="white">
                            6
                        </text>
                        <circle cx="60" cy="210" r="30" className={selectedCircles.includes("А") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("А")} />
                        <text x="60" y="220" fontSize="12" textAnchor="middle" fill="white">
                            А
                        </text>
                        <circle cx="160" cy="410" r="30" className={selectedCircles.includes("Б") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Б")} />
                        <text x="160" y="420" fontSize="12" textAnchor="middle" fill="white">
                            Б
                        </text>
                        <circle cx="130" cy="260" r="30" className={selectedCircles.includes("В") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("В")} />
                        <text x="130" y="270" fontSize="12" textAnchor="middle" fill="white">
                            В
                        </text>
                        <circle cx="300" cy="280" r="30" className={selectedCircles.includes("Г") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Г")} />
                        <text x="300" y="290" fontSize="12" textAnchor="middle" fill="white">
                            Г
                        </text>
                        <circle cx="300" cy="710" r="30" className={selectedCircles.includes("Д") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Д")} />
                        <text x="300" y="720" fontSize="12" textAnchor="middle" fill="white">
                            Д
                        </text>
                        <circle cx="60" cy="700" r="30" className={selectedCircles.includes("Е") ? styles.selectedPoint : styles.nonSelectedPoint} onClick={() => handleCircleClick("Е")} />
                        <text x="60" y="710" fontSize="12" textAnchor="middle" fill="white">
                            Е
                        </text>
                    </svg>
                </div>
            }
        </>
    );
};

const getXCoordinate = (circleKey) => {
    switch (circleKey) {
        case "1":
            return "40";
        case "2":
            return "360";
        case "3":
            return "300";
        case "4":
            return "125";
        case "5":
            return "450"
        case "6":
            return "560"
        case "А":
            return "210";
        case "Б":
            return "410";
        case "В":
            return "260";
        case "Г":
            return "280";
        case "Д":
            return "710";
        case "Е":
            return "700";
        default:
            return "0";
    }
};
const getYCoordinate = (circleKey) => {
    switch (circleKey) {
        case "1":
            return "40";
        case "2":
            return "50";
        case "3":
            return "200";
        case "4":
            return "185";
        case "5":
            return "280"
        case "6":
            return "120"
        case "А":
            return "60";
        case "Б":
            return "160";
        case "В":
            return "130";
        case "Г":
            return "300";
        case "Д":
            return "300";
        case "Е":
            return "60";
        default:
            return "0";
    }
};
const getXCoordinateMobile = (circleKey) => {
    switch (circleKey) {
        case "1":
            return "40";
        case "2":
            return "50";
        case "3":
            return "200";
        case "4":
            return "185";
        case "5":
            return "280"
        case "6":
            return "120"
        case "А":
            return "60";
        case "Б":
            return "160";
        case "В":
            return "130";
        case "Г":
            return "300";
        case "Д":
            return "300";
        case "Е":
            return "60";
        default:
            return "0";
    }
};
const getYCoordinateMobile = (circleKey) => {
    switch (circleKey) {
        case "1":
            return "40";
        case "2":
            return "360";
        case "3":
            return "300";
        case "4":
            return "125";
        case "5":
            return "450"
        case "6":
            return "560"
        case "А":
            return "210";
        case "Б":
            return "410";
        case "В":
            return "260";
        case "Г":
            return "280";
        case "Д":
            return "710";
        case "Е":
            return "700";
        default:
            return "0";
    }
};

export default CirclesComponent;