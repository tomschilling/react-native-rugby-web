
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import gamesReducer from './reducers/GameReducers.js';
import settingsReducer from './reducers/SettingsReducers.js';


const rootReducer = combineReducers({gamesReducer, settingsReducer});

// Connect our store to the reducers
export default createStore(rootReducer, applyMiddleware(thunk));