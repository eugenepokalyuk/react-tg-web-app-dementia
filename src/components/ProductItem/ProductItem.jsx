import React from 'react';
import './ProductItem.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const Question = ({ number, title, input, onPrevClick, onNextClick, allQuestions }) => {
    // Создаем массив ссылок на другие вопросы, кроме текущего
    const otherQuestions = allQuestions.filter((q) => q.number !== number);

    return (
        <div className="question">
            <div className="question-header">
                <div className="question-number">{number}</div>
                <div className="question-title">{title}</div>
            </div>

            <div className="question-body">
                <button className="question-prev" onClick={onPrevClick}>
                    <FaArrowLeft />
                </button>
                {input}
                <button className="question-next" onClick={onNextClick}>
                    <FaArrowRight />
                </button>
            </div>
            <div className="question-footer">
                {otherQuestions.map((q) => (
                    <a key={q.number} href={`#${q.number}`} className="question-link">
                        {q.number}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Question;