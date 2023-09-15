import { combineReducers } from 'redux';
import { example } from './example';

const rootReducer = combineReducers({
    example: example,
});

export default rootReducer;