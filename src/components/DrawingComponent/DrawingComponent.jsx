import React, { useState } from 'react';

const DrawingComponent = () => {
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
        <svg width="740" height="340">
            <circle cx="40" cy="40" r="20" fill={selectedCircles.includes("1") ? "red" : "gray"} onClick={() => handleCircleClick("1")} />
            <text x="40" y="45" fontSize="12" textAnchor="middle" fill="white">
                1
            </text>
            <circle cx="360" cy="50" r="20" fill={selectedCircles.includes("2") ? "red" : "gray"} onClick={() => handleCircleClick("2")} />
            <text x="360" y="55" fontSize="12" textAnchor="middle" fill="white">
                2
            </text>
            <circle cx="300" cy="200" r="20" fill={selectedCircles.includes("3") ? "red" : "gray"} onClick={() => handleCircleClick("3")} />
            <text x="300" y="205" fontSize="12" textAnchor="middle" fill="white">
                3
            </text>
            <circle cx="125" cy="185" r="20" fill={selectedCircles.includes("4") ? "red" : "gray"} onClick={() => handleCircleClick("4")} />
            <text x="125" y="185" fontSize="12" textAnchor="middle" fill="white">
                4
            </text>
            <circle cx="450" cy="280" r="20" fill={selectedCircles.includes("5") ? "red" : "gray"} onClick={() => handleCircleClick("5")} />
            <text x="450" y="285" fontSize="12" textAnchor="middle" fill="white">
                5
            </text>
            <circle cx="210" cy="60" r="20" fill={selectedCircles.includes("А") ? "red" : "gray"} onClick={() => handleCircleClick("А")} />
            <text x="210" y="65" fontSize="12" textAnchor="middle" fill="white">
                А
            </text>
            <circle cx="410" cy="160" r="20" fill={selectedCircles.includes("Б") ? "red" : "gray"} onClick={() => handleCircleClick("Б")} />
            <text x="410" y="165" fontSize="12" textAnchor="middle" fill="white">
                Б
            </text>
            <circle cx="260" cy="130" r="20" fill={selectedCircles.includes("В") ? "red" : "gray"} onClick={() => handleCircleClick("В")} />
            <text x="260" y="135" fontSize="12" textAnchor="middle" fill="white">
                В
            </text>
            <circle cx="280" cy="300" r="20" fill={selectedCircles.includes("Г") ? "red" : "gray"} onClick={() => handleCircleClick("Г")} />
            <text x="280" y="305" fontSize="12" textAnchor="middle" fill="white">
                Г
            </text>
            <circle cx="710" cy="300" r="20" fill={selectedCircles.includes("Д") ? "red" : "gray"} onClick={() => handleCircleClick("Д")} />
            <text x="710" y="305" fontSize="12" textAnchor="middle" fill="white">
                Д
            </text>
            <circle cx="700" cy="60" r="20" fill={selectedCircles.includes("Е") ? "red" : "gray"} onClick={() => handleCircleClick("Е")} />
            <text x="700" y="65" fontSize="12" textAnchor="middle" fill="white">
                Е
            </text>
            {lines.map((line, index) => (
                <line
                    key={index}
                    x1={getXCoordinate(line.from)}
                    y1={getYCoordinate(line.from)}
                    x2={getXCoordinate(line.to)}
                    y2={getYCoordinate(line.to)}
                    strokeWidth="2"
                    stroke="black"
                />
            ))}
        </svg>
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

export default DrawingComponent;