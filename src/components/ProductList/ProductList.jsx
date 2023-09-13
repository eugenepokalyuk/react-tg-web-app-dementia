import React, { useState } from 'react';
import ProductItem from "../ProductItem/ProductItem";
import DrawingComponent from "../DrawingComponent/DrawingComponent"
const questions = [
    // { number: 1, title: 'Введите Ваше Имя:', type: 'text' }, // 1 поля для ввода имени
    // { number: 2, title: 'Введите свою Дату рождения:', type: 'date' }, // 3 поля для ввода День Месяц Год рождения
    // { number: 3, title: 'Укажите Ваш Пол:', type: 'radio', options: ['Мужской', 'Женский'] }, // radio button пол мужской или женский
    // { number: 4, title: 'Укажите электронную почту:', type: 'email' }, // 1 поля для ввода почты и чек бокс "Я согласен(а) на обработку персональных данных"
    // { number: 5, title: 'Есть ли у вас проблемы с памятью и мышлением?', type: 'radio', options: ['Да', 'Иногда', 'Нет'] }, // 3 кнопки, Да Иногда Нет
    // { number: 6, title: 'Есть ли у ваших близких родственников проблемы с памятью или мышлением?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 7, title: 'Есть ли у вас проблемы с удержанием равновесия?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 8, title: 'Если есть, известна ли вам их причина?', type: 'text' }, // 1 кнопки
    // { number: 9, title: 'Был ли у вас инсульт?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 10, title: 'Был ли у вас микроинсульт?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 11, title: 'Испытываете ли вы тревогу, депрессию, тоску?', type: 'radio', options: ['Да', 'Иногда', 'Нет'] }, // 3 кнопки, Да Иногда Нет
    // { number: 12, title: 'Наблюдаете ли вы изменения в собственной личности?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 13, title: 'Сложно ли вам заниматься повседневными делами из-за проблем с памятью или мышлением?', type: 'radio', options: ['Да', 'Нет'] }, // 2 кнопки, Да Нет
    // { number: 14, title: 'Назовите сегодняшнюю дату, месяц, год', type: 'date' }, // 3 поля для ввода День Месяц Год рождения
    { number: 15, title: 'Назовите объекты, изображённые на рисунках', type: 'drawing' }, // 2 рисунка и 2 поля для ввода
    { number: 16, title: 'Что общего между розой и тюльпаном?', type: 'text' }, // 1 поля для ввода
    { number: 17, title: 'Сколько полтинников в 3 рублях?', type: 'text' }, // 1 поля для ввода
    { number: 18, title: 'Вы оплачиваете в кассу 3 рубля 05 копеек? Сколько сдачи вы получите, если дадите кассиру 5 рублей?', type: 'text' }, // 2 поля для ввода Рублей Копеек
    { number: 19, title: 'Тест на память. Выполните это задание в самом конце, когда работа с тестом будет прекращена. Напишите «Я закончил(а)» в конце теста.', type: 'button' }, // 1 кнопка далее
    { number: 20, title: 'Скопируйте рисунок', type: 'file' }, // Картинка + Текст + Кнопка принять файл
    { number: 21, title: 'Нарисуйте циферблат', type: 'drawing' }, // Текст + Кнопка принять файл
    { number: 22, title: 'Напишите названия 12 разных стран.', type: 'text', count: 12 }, // 12 полей для ввода
    { number: 23, title: 'Соедините круги', type: 'circle' }, // Круглишки на экране с символами 1,2,3,4,5,А,Б,В,Г,Д,Е нужно реализовать: "Соедините круги линией, начиная с цифры 1, чередуя затем цифры и буквы, и завершите на букве Е (1 – А – 2 – Б и т.д.)."
    { number: 24, title: 'Уберите лишние линии', type: 'drawing' }, // "На рисунке четыре треугольника. Удалите 2 линии так, чтобы осталось 3 треугольника. Линий, не образующих фигуры, быть не должно. Чтобы убрать линию, кликните по ней."
    { number: 25, title: 'Вы все сделали?', type: 'text' } // 1 поле для
];

const ProductList = () => {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

    const handlePrevClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        if (currentIndex > 0) {
            setCurrentQuestion(questions[currentIndex - 1]);
        }
    };

    const handleNextClick = () => {
        const currentIndex = questions.findIndex((q) => q.number === currentQuestion.number);
        if (currentIndex < questions.length - 1) {
            setCurrentQuestion(questions[currentIndex + 1]);
        }
    };

    const renderInput = () => {
        switch (currentQuestion.type) {
            case 'text':
            case 'date':
            case 'email':
                return <input type={currentQuestion.type} />;
            case 'radio':
                return currentQuestion.options.map((option, index) => (
                    <div key={index}>
                        <input type="radio" value={option} name={`question - ${currentQuestion.number}`} />
                        <label>{option}</label>
                    </div>
                ));
            case 'drawing':
                return <DrawingComponent />;
            case 'file':
                return <input type="file" />;
            case 'button':
                return <button>{currentQuestion.title}</button>;
            case 'circle':
                return <CirclesComponent />;
            // Дополнительные типы вопросов и соответствующие им поля ввода
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