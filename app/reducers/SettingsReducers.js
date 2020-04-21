import { combineReducers } from 'redux';

import { GET_SETTINGS } from "../actions/SettingsActions" 

let dataState = { settings: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            let { settings } = action.data;

            return {...state, settings};
            
        default:
            return state;
    }
};

const rootReducer = combineReducers({dataReducer});

export default rootReducer;
