import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch } from 'react-redux';
import { addAnswer } from '../../services/actions/example'
import data from "../../utils/lines.json"
import triangle from '../../utils/triangle.json'

import image1 from '../../images/1.jpg'
import image2 from '../../images/2.jpg'
import image3 from '../../images/3.jpg'
import image4 from '../../images/4.jpg'
import image5 from '../../images/5.jpg'
import styles from './ProductList.module.css'

import questions from '../../utils/questions.json'
const ProductList = () => {
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [selectValueDay, setSelectValueDay] = useState('');
    const [selectValueMonth, setSelectValueMonth] = useState('');
    const [selectValueYear, setSelectValueYear] = useState('');
    const [oneAnswer, setOneAnswer] = useState('');
    const [twoAnswer, setTwoAnswer] = useState('');
    const [error, setError] = useState(Boolean);
    const [selectedCircles, setSelectedCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const [removedLinesCount, setRemovedLinesCount] = useState(0);
    const [triangles, setTriangles] = useState(triangle);
    const [i, setI] = useState(0);

    const handlePrevClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        if (currentIndex > 0) {
            setCurrentQuestion(questions[currentIndex - 1]);
        }
    };
    const handleNextClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        const currentAnswer = userAnswers[currentQuestion.number];

        setError(false)
        let isValid = true;
        switch (currentQuestion.type) {
            case 'date':
                isValid = selectValueDay !== '' && selectValueMonth !== '' && selectValueYear !== '';
                break;
            case 'email':
            case 'text':
                isValid = currentAnswer !== undefined && currentAnswer !== '' && currentAnswer.trim() !== '';
                break;
            case 'text&pictures':
                isValid = oneAnswer.trim() !== '' && twoAnswer.trim() !== '';
                break;
            case 'drawing':
                isValid = currentAnswer !== undefined && currentAnswer !== null;
                break;
            case 'file':
                isValid = currentAnswer !== undefined && currentAnswer !== null;
                break;
            case 'radio':
                isValid = currentAnswer !== undefined;
                break;
            case 'button':
                isValid = true;
                break;
            case 'countries':
                isValid = currentAnswer !== undefined && currentAnswer !== null &&
                    Object.values(currentAnswer).every((country) => country.trim() !== '');
                break;
            case 'triangle':
                console.log('triangles.length', triangles.length)
                isValid = triangles.length == 7;
                break;
            case "circle":
                isValid = selectedCircles.length === 12;
                break
            default:
                break;
        }

        if (currentIndex < questions.length - 1 && isValid) {
            const updatedAnswers = {
                ...userAnswers,
                [currentQuestion.number]: currentAnswer,
            };
            setUserAnswers(updatedAnswers);
            setCurrentQuestion(questions[currentIndex + 1]);
            setCurrentAnswer('');
            setSelectValueDay('');
            setSelectValueMonth('');
            setSelectValueYear('');
            setOneAnswer('');
            setTwoAnswer('');
            dispatch(addAnswer(updatedAnswers));
        } else {
            setError(true)
        }
    };
    const handleRadioClick = (index) => {
        const radioButton = document.getElementById(index);
        if (radioButton) {
            radioButton.classList.toggle(`${styles.selected}`)
            radioButton.click();
        }
    };
    const handleAnswerChange = (questionNumber, answer) => {
        const updatedAnswers = { ...userAnswers, [questionNumber]: answer };
        setUserAnswers(updatedAnswers);
    };
    const handleMultiAnswerChange = (questionNumber, selectDay, selectedMonth, selectedYear) => {
        setSelectValueDay(selectDay);
        setSelectValueMonth(selectedMonth);
        setSelectValueYear(selectedYear);
        const updatedAnswers = {
            ...userAnswers,
            [questionNumber]: {
                selectDay,
                selectedMonth,
                selectedYear,
            },
        };
        setUserAnswers(updatedAnswers);
    };
    const handleDualAnswerChange = (questionNumber, one, two) => {
        setOneAnswer(one);
        setTwoAnswer(two);
        const updatedAnswers = {
            ...userAnswers,
            [questionNumber]: {
                oneAnswer,
                twoAnswer,
            },
        };
        setUserAnswers(updatedAnswers);
    };
    const handleFileChange = (e, questionNumber) => {
        if (e.target.files) {
            const file = e.target.files[0];

            if (!file) {
                return;
            } else {
                fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: file,
                    headers: {
                        'content-type': file.type,
                        'content-length': file.size,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        const updatedAnswers = {
                            ...userAnswers,
                            [questionNumber]: {
                                fileData: data,
                            },
                        };
                        setUserAnswers(updatedAnswers);
                    })
                    .catch((err) => console.error(err));
            }
        }
    };
    const handleCountriesChange = (questionNumber, value, inputIndex) => {
        const updatedUserAnswers = {
            ...userAnswers,
            [questionNumber]: {
                ...(userAnswers[questionNumber] || {}),
                [inputIndex]: value,
            },
        };
        setUserAnswers(updatedUserAnswers);
    };
    const handleCircleClick = (questionNumber, circleKey) => {
        if (selectedCircles.includes(circleKey)) {
            return;
        }
        setSelectedCircles((prevCircles) => [...prevCircles, circleKey]);
        if (selectedCircles.length > 0) {
            const prevCircle = selectedCircles[selectedCircles.length - 1];
            const line = { from: prevCircle, to: circleKey };
            setLines((prevLines) => [...prevLines, line]);

            setI((prevValue) => prevValue + 1);

            const updatedUserAnswers = {
                ...userAnswers,
                [questionNumber]: {
                    ...(userAnswers[questionNumber] || {}),
                    ["step-" + i]: { from: prevCircle, to: circleKey },
                },
            };
            setUserAnswers(updatedUserAnswers);
        }
    };
    const handleTriangleClick = (questionNumber, id) => {
        if (removedLinesCount < 2) {
            setTriangles(triangles.map(line => {
                if (line.id === id) {
                    return null;
                }
                return line;
            }).filter(line => line !== null));

            // triangles
            const updatedUserAnswers = {
                ...userAnswers,
                [questionNumber]: {
                    ...(userAnswers[questionNumber] || {}),
                    triangles,
                },
            };
            setUserAnswers(updatedUserAnswers);

            setRemovedLinesCount(removedLinesCount + 1);
        }
    };
    const renderInput = () => {
        switch (currentQuestion.type) {
            case 'date':
                return (
                    <div className={styles.radioCard}>
                        <input
                            className={`${styles.mb4} ${styles.input}`}
                            type="text"
                            min="1"
                            max="31"
                            value={selectValueDay}
                            onChange={(event) => handleMultiAnswerChange(currentQuestion.number, event.target.value, selectValueMonth, selectValueYear)}
                        />

                        <select
                            name="months"
                            className={styles.select}
                            value={selectValueMonth}
                            onChange={(event) => handleMultiAnswerChange(currentQuestion.number, selectValueDay, event.target.value, selectValueYear)}
                        >
                            <option key={1} value={1}>Январь</option>
                            <option key={2} value={2}>Февраль</option>
                            <option key={3} value={3}>Март</option>
                            <option key={4} value={4}>Апрель</option>
                            <option key={5} value={5}>Май</option>
                            <option key={6} value={6}>Июнь</option>
                            <option key={7} value={7}>Июль</option>
                            <option key={8} value={8}>Август</option>
                            <option key={9} value={9}>Сентябрь</option>
                            <option key={10} value={10}>Октябрь</option>
                            <option key={11} value={11}>Ноябрь</option>
                            <option key={12} value={12}>Декабрь</option>
                        </select>
                        <select
                            name="years"
                            className={styles.select}
                            value={selectValueYear}
                            onChange={(event) => handleMultiAnswerChange(currentQuestion.number, selectValueDay, selectValueMonth, event.target.value)}
                        >
                            {Array.from({ length: 103 }, (_, i) => 1922 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                )
            case 'email':
                return (
                    <>
                        <input
                            type={currentQuestion.type}
                            className={`${styles.input}`}
                            value={userAnswers[currentQuestion.number] || ''}
                            onChange={(event) => handleAnswerChange(currentQuestion.number, event.target.value)}
                        />
                        <div className={`${styles.mt4} ${styles.termsForm}`}>
                            <input className={`${styles.customCheckbox}`} type="checkbox" id="terms" name="scales" />
                            <label htmlFor="terms">Я согласен(а) на обработку <NavLink className={styles.link} to="#notFound">персональных данных</NavLink></label>
                        </div>
                    </>
                );
            case 'text':
                return <input
                    type={currentQuestion.type}
                    className={styles.input}
                    value={userAnswers[currentQuestion.number] || ''}
                    onChange={(event) => handleAnswerChange(currentQuestion.number, event.target.value)}
                />;
            case 'radio':
                return (
                    <div className={styles.radioCard}>
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                className={styles.radioCardItem}
                                onClick={() => handleRadioClick(index)}
                            >
                                <input
                                    type="radio"
                                    id={index}
                                    value={option}
                                    name={`question-${currentQuestion.number}`}
                                    onChange={(event) => handleAnswerChange(currentQuestion.number, event.target.value)}
                                />
                                <label htmlFor={index}>{option}</label>
                            </div>
                        ))}
                    </div>
                )
            case 'text&pictures':
                return (
                    <div className={styles.container}>
                        <img src={image1} alt="" className={`${styles.mb2} ${styles.mt2}`} />
                        <input
                            type="text"
                            className={`${styles.input}`}
                            value={oneAnswer}
                            onChange={(event) => handleDualAnswerChange(currentQuestion.number, event.target.value, twoAnswer)}
                        />

                        <img src={image2} alt="" className={`${styles.mb2} ${styles.mt2}`} />
                        <input
                            type="text"
                            className={`${styles.input}`}
                            value={twoAnswer}
                            onChange={(event) => handleDualAnswerChange(currentQuestion.number, oneAnswer, event.target.value)}
                        />
                    </div>
                )
            case 'drawing':
                return (
                    <div className={styles.container}>
                        <h2>Для прохождения задания, пожалуйста, возьмите чистый лист бумаги (постарайтесь использовать нелинованный лист белого цвета).</h2>
                        <ol className={styles.fileContainer}>
                            <li>С помощью доступных электронных устройств сфотографируйте ваш рисунок.</li>
                            <li>Любым доступным способом перенесите фотографию на компьютер, с которого Вы проходите тестирование:
                                <ul>
                                    <li>перемещение с помощью USB накопителя</li>
                                    <li>перемещение с помощью проводного подключения устройства</li>
                                </ul>
                            </li>
                        </ol>
                        <p>Нарисуйте циферблат и разместите на нем цифры. Расположите стрелки так, чтобы часы показывали без десяти минут 14 часов.</p>
                        <label className={`${styles.inputFile}`}>
                            <input type="file" name="file" accept="image/*" onChange={(event) => handleFileChange(event, currentQuestion.number)} />
                            <span>Добавить файл</span>
                        </label>
                    </div>
                )
            case 'file':
                return (
                    <div className={styles.container}>
                        <h2>Для прохождения задания, пожалуйста, возьмите чистый лист бумаги (постарайтесь использовать нелинованный лист белого цвета).</h2>
                        <ol className={styles.fileContainer}>
                            <li>С помощью доступных электронных устройств сфотографируйте ваш рисунок.</li>
                            <li>Любым доступным способом перенесите фотографию на компьютер, с которого Вы проходите тестирование:
                                <ul>
                                    <li>перемещение с помощью USB накопителя</li>
                                    <li>перемещение с помощью проводного подключения устройства</li>
                                </ul>
                            </li>
                        </ol>
                        <img src={image3} alt="" className={`${styles.mb4}`} />
                        <label className={`${styles.inputFile}`}>
                            <input type="file" name="file" accept="image/*" onChange={(event) => handleFileChange(event, currentQuestion.number)} />
                            <span>Добавить файл</span>
                        </label>
                    </div>
                );
            case 'triangle':
                return (
                    <div className={styles.container}>
                        <p>На рисунке четыре треугольника. Удалите 2 линии так, чтобы осталось 3 треугольника. Линий, не образующих фигуры, быть не должно. Чтобы убрать линию, кликните по ней.</p>
                        <img src={image4} alt="" />

                        <div>
                            <svg width={300} height={300} version="1.1" xmlns="http://www.w3.org/2000/svg">
                                {triangles.map(line => (
                                    <line
                                        key={line.id}
                                        x1={line.points.x1}
                                        x2={line.points.x2}
                                        y1={line.points.y1}
                                        y2={line.points.y2}
                                        stroke="black"
                                        fill="transparent"
                                        strokeWidth="5"
                                        onClick={() => handleTriangleClick(currentQuestion.number, line.id)}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>
                )
            case 'button':
                return <button
                    className={styles.button}
                    onClick={() => handleAnswerChange(currentQuestion.number, "ok")}
                >Понятно, далее</button>;
            case 'circle':
                return (
                    <div>
                        <div className={styles.circlesContainer}>
                            <p className={styles.circlesText}>Соедините круги линией, начиная с цифры 1, чередуя затем цифры и буквы, и завершите на букве Е (1 – А – 2 – Б и т.д.).</p>
                            <img src={image5} alt="" />
                        </div>

                        <svg width="340" height="740" className={`${styles.container}`}>
                            {lines.map((line, index) => {
                                const fromData = data.find(item => item.label === line.from);
                                const toData = data.find(item => item.label === line.to);

                                if (fromData) {
                                    return (
                                        <line
                                            key={index}
                                            x1={fromData.x}
                                            y1={fromData.y}
                                            x2={toData.x}
                                            y2={toData.y}
                                            strokeWidth="3"
                                            stroke="#5e0b77"
                                        />
                                    );
                                }

                                return null;
                            })}

                            {data.map((item, index) => (
                                <g key={item.id} onClick={() => handleCircleClick(currentQuestion.number, item.label)}>
                                    <circle cx={item.x} cy={item.y} r={30} className={selectedCircles.includes(item.label) ? styles.selectedPoint : styles.nonSelectedPoint} />
                                    <text x={item.x} y={item.y + 10} fontSize="12" textAnchor="middle" fill="white" >
                                        {item.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                )
            case 'countries':
                return (
                    <>
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 1)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 2)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 3)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 4)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 5)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 6)
                            }
                        />

                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 7)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 8)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 9)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 10)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 11)
                            }
                        />
                        <input type="text" className={`${styles.input} ${styles.mt1}`}
                            onChange={(event) =>
                                handleCountriesChange(currentQuestion.number, event.target.value, 12)
                            }
                        />
                    </>
                )
        }
    };
    return (
        <div className="app">
            <ProductItem
                number={currentQuestion.number}
                title={currentQuestion.title}
                input={renderInput()}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
                allQuestions={questions}
                error={error}
            />
        </div>
    );
};
export default ProductList;