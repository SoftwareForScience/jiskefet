import { fetchClient } from '/js/src/index.js';

// TODO: In the future this should be defined in some sort of environment variable
const API_URL = 'http://localhost:4000/'

/**
 * @param {String} url
 */
const apiGet = async (url) => {
    await fetchClient(`${API_URL}${url}`, { method: 'GET' });
}

export { apiGet }