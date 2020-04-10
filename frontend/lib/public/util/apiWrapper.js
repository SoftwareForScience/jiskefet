import { fetchClient } from '/js/src/index.js';

// TODO: Ideally the API url should be declared in some sort of environment variable
// const API_URL = 'http://localhost/api/'

/**
 * Retrieve data from an API using HTTP GET method
 * @returns {JSON} The result
 */
export const get = async (path) => {
    return new Promise((resolve, reject) => {
        fetchClient(`/api/${path}`, { method: 'GET' })
            .then((data) => resolve(data.json()))
            .catch(reject);
    });
};

// TODO: Complete this with the remaining HTTP methods
