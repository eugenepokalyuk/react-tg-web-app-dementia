import {
    GET_ANSWER,
} from "../actions/example";

const initialState = {
    questions: null,
    error: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANSWER:
            return {
                ...state,
                questions: action.payload,
                error: null,
            };
        default:
            return state;
    }
};