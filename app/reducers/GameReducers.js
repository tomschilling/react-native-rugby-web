import { combineReducers } from 'redux';

import { GET_GAMES } from "../actions/GameActions" 

let dataState = { quotes: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_GAMES:
            let { games } = action.data;

            return {...state, games};
            
        default:
            return state;
    }
};

const rootReducer = combineReducers({dataReducer});

export default rootReducer;
