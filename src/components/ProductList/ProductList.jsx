import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProductItem from "../ProductItem/ProductItem";
import DrawingComponent from "../DrawingComponent/DrawingComponent"
import CirclesComponent from "../CirclesComponent/CirclesComponent"
import TriangleComponent from "../TriangleComponent/TriangleComponent"
import ButtonFile from '../ButtonFile/ButtonFile';

import { useDispatch } from 'react-redux';
import { addAnswer } from '../../services/actions/example'

import image1 from '../../images/1.jpg'
import image2 from '../../images/2.jpg'
import image3 from '../../images/3.jpg'
import styles from './ProductList.module.css'

const questions = [
    { number: 1, title: 'Введите Ваше Имя:', type: 'text' }, // 1 поля для ввода имени
    { number: 2, title: 'Введите свою Дату рождения:', type: 'date' }, // 3 поля для ввода День Месяц Год рождения
    { number: 3, title: 'Укажите Ваш Пол:', type: 'radio', options: ['Мужской', 'Женский'] }, // radio button пол мужской или женский
    { number: 4, title: 'Укажите электронную почту:', type: 'email' }, // 1 поля для ввода почты и чек бокс "Я согласен(а) на обработку персональных данных"
    { number: 5, title: 'Есть ли у вас проблемы с памятью и мышлением?', type: 'radio', options: ['Да', 'Иногда', 'Нет'] }, // 3 кнопки, Да Иногда Нет
    { number: 6, title: 'Есть ли у ваших близких родственников проблемы с памятью или мышлением?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 7, title: 'Есть ли у вас проблемы с удержанием равновесия?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 8, title: 'Если есть, известна ли вам их причина?', type: 'text' }, // 1 кнопки
    { number: 9, title: 'Был ли у вас инсульт?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 10, title: 'Был ли у вас микроинсульт?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 11, title: 'Испытываете ли вы тревогу, депрессию, тоску?', type: 'radio', options: ['Да', 'Иногда', 'Нет'] }, // 3 кнопки, Да Иногда Нет
    { number: 12, title: 'Наблюдаете ли вы изменения в собственной личности?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 13, title: 'Сложно ли вам заниматься повседневными делами из-за проблем с памятью или мышлением?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    { number: 14, title: 'Назовите сегодняшнюю дату, месяц, год', type: 'date' }, // 3 поля для ввода День Месяц Год рождения
    { number: 15, title: 'Назовите объекты, изображённые на рисунках', type: 'text&pictures', count: '2' }, // 2 рисунка и 2 поля для ввода
    { number: 16, title: 'Что общего между розой и тюльпаном?', type: 'text' }, // 1 поля для ввода
    { number: 17, title: 'Сколько полтинников в 3 рублях?', type: 'text' }, // 1 поля для ввода
    { number: 18, title: 'Вы оплачиваете в кассу 3 рубля 05 копеек? Сколько сдачи вы получите, если дадите кассиру 5 рублей?', type: 'text', count: 2 }, // 2 поля для ввода Рублей Копеек
    { number: 19, title: 'Тест на память. Выполните это задание в самом конце, когда работа с тестом будет прекращена. Напишите «Я закончил(а)» в конце теста.', type: 'button' }, // 1 кнопка далее
    { number: 20, title: 'Скопируйте рисунок', type: 'file' }, // Картинка + Текст + Кнопка принять файл
    { number: 21, title: 'Нарисуйте циферблат', type: 'drawing' }, // Текст + Кнопка принять файл
    { number: 22, title: 'Напишите названия 12 разных стран.', type: 'countries' }, // 12 полей для ввода
    { number: 23, title: 'Соедините круги', type: 'circle' }, // Круглишки на экране с символами 1,2,3,4,5,А,Б,В,Г,Д,Е нужно реализовать: "Соедините круги линией, начиная с цифры 1, чередуя затем цифры и буквы, и завершите на букве Е (1 – А – 2 – Б и т.д.)."
    { number: 24, title: 'Уберите лишние линии', type: 'triangle' }, // "На рисунке четыре треугольника. Удалите 2 линии так, чтобы осталось 3 треугольника. Линий, не образующих фигуры, быть не должно. Чтобы убрать линию, кликните по ней."
    { number: 25, title: 'Вы все сделали?', type: 'text' } // 1 поле для
];

const ProductList = () => {

    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentAnswer, setCurrentAnswer] = useState('');

    // console.log('userAnswers', userAnswers);

    const handlePrevClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        if (currentIndex > 0) {
            setCurrentQuestion(questions[currentIndex - 1]);
        }
    };

    const handleNextClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        if (currentIndex < questions.length - 1) {
            const updatedAnswers = { ...userAnswers, [currentQuestion.number]: userAnswers[questions[currentIndex].number] };
            setUserAnswers(updatedAnswers);

            setCurrentQuestion(questions[currentIndex + 1]);
            setCurrentAnswer(userAnswers[questions[currentIndex + 1].number] || ''); // Set the current answer for the next question

            console.log('updatedAnswers', updatedAnswers)
            dispatch(addAnswer(updatedAnswers))
        }
    };


    const handleRadioClick = (index) => {
        const radioButton = document.getElementById(index);
        if (radioButton) {
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

    const [selectValueDay, setSelectValueDay] = useState('');
    const [selectValueMonth, setSelectValueMonth] = useState('');
    const [selectValueYear, setSelectValueYear] = useState('');

    const [oneAnswer, setOneAnswer] = useState('');
    const [twoAnswer, setTwoAnswer] = useState('');

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

                                    // value={userAnswers[currentQuestion.number] || ''}
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
                    <TriangleComponent />
                )
            case 'button':
                return <button
                    className={styles.button}
                    onClick={() => handleAnswerChange(currentQuestion.number, "ok")}
                >Понятно, далее</button>;
            // return "";
            case 'circle':
                return <CirclesComponent />;
            case 'countries':
                return (
                    <>
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />

                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />

                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />

                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
                        <input type="text" className={`${styles.input} ${styles.mt1}`} />
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
            />
        </div>
    );
};

export default ProductList;