import React from 'react';
import './ProductItem.css';
import { ReactComponent as ArrowLeft } from '../../images/arrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../images/arrowRight.svg'
const Question = ({ number, title, input, onPrevClick, onNextClick, allQuestions, error }) => {
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

            {error
                &&
                <div className="error-container">
                    <p className="error-text">Заполните все данные</p>
                </div>
            }

            <div className="question-arrows">
                <button className="question-arrow question-prev" onClick={onPrevClick}>
                    <ArrowLeft />
                </button>
                <button className="question-arrow question-next" onClick={onNextClick}>
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Question;