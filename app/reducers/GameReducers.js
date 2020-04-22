
import { GET_GAMES } from "../actions/GameActions" 

let dataState = { games: [] };

const gamesReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_GAMES:
            let { games } = action.data;

            return {...state, games};
            
        default:
            return state;
    }
};

export default gamesReducer;
