export const GET_GAMES = 'GET_GAMES';

// Get Games
export const getGames = (games) => ({
    type: GET_GAMES,
    data: {games}
});