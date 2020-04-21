export const GET_SETTINGS = 'GET_SETTINGS';

// Get Settings
export const getSettings = (settings) => ({
    type: GET_SETTINGS,
    data: {settings}
});