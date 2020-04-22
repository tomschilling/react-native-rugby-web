import { GET_SETTINGS } from "../actions/SettingsActions" 

let dataState = { settings: [] };

const settingsReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            let { settings } = action.data;

            return {...state, settings};
            
        default:
            return state;
    }
};

export default settingsReducer;
