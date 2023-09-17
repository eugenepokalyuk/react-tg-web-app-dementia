import React from 'react';
import './ProductItem.css';
import { ReactComponent as ArrowLeft } from '../../images/arrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../images/arrowRight.svg'
import { NavLink } from 'react-router-dom';
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
                <div className="body-container">
                    {input}
                </div>
            </div>

            <div className="question-arrows">
                <button className="question-prev" onClick={onPrevClick}>
                    <ArrowLeft />
                </button>
                <button className="question-next" onClick={onNextClick}>
                    <ArrowRight />
                </button>
            </div>

            <div className="question-footer">
                {/* {otherQuestions.map((q) => (
                    <NavLink key={q.number} to={`#${q.number}`} className="question-link">
                        {q.number}
                    </NavLink>
                ))} */}
                {allQuestions.map((q) => (
                    <NavLink key={q.number} to={`#${q.number}`} className={`question-link ${q.number === number ? "selected" : ""}`}>
                        {<span className={`q${q.number}`}>{q.number}</span>}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Question;