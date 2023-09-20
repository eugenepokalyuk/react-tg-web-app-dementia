import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../services/reducers/index';

const initialState = {
    questions: {
        questions: [], // Начальное значение списка ингредиентов для конструктора бургера
        loading: false,
        error: null,
    },
};

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);