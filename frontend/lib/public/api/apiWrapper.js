import { fetchClient } from '/js/src/index.js';

// TODO: Ideally the API url should be declared in some sort of environment variable
const API_URL = 'https://localhost:4000/api/'

/**
 * Retrieve data from an API using HTTP GET method
 * @returns {JSON} The result
 */
export const get = async (path) => {
    const response = await fetchClient(`${API_URL}${path}`, { method: 'GET' });
    return response.json();
}

// TODO: Complete this with the remaining HTTP methods
