import { combineReducers } from 'redux';
import { reducer } from './example';

const rootReducer = combineReducers({
    questions: reducer,
});

export default rootReducer;