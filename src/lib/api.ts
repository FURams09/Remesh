import apiConfig from '../config/api';
import axios from 'axios';
declare var process :any;

/**
 * Make a request to the Remesh API. Wrote a wrapper function for making these request so there would be 
 * consistent error handling for all requests, and because of the consitent nature of avaiable API Endpoints
 * @param {string} queryType The route you want to retrieve from Remesh API
 * @param {number} id - id of user wanted (optional);
 */
const QueryRemesh = async (queryType: string, id : number = 0) => {
    const url = `${apiConfig.url}/${queryType}?${id >0 ? '' : `${id}`}`
    try {
        let response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error ('Invalid Response from remote server');
        }
        return response.data;
    } catch (ex) {
        if (!(process.env.NODE_ENV === 'test')) {
            console.log(ex.config);
        }
        return false;
    }   
};

export default QueryRemesh