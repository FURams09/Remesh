import apiConfig from '../config/api';
import axios from 'axios';
declare var process :any;

/**
 * Make a request to the Remesh API. Wrote a wrapper function for making these request so there would be 
 * consistent error handling for all requests
 * @param {string} queryType The route you want to retrieve from Remesh API
 * @param {number} id - id of user wanted (optional);
 */
const QueryRemesh = async (queryType: string, id : number = 0) => {
    let remeshURL : string;
    switch (process.env.NODE_ENV) {
        case 'DOCKER':
            remeshURL = `${ apiConfig.dockerUrl }/${queryType}${id >0 ? '' : `?${id}`}`
            break;
        default:
            remeshURL = `${ apiConfig.devUrl }/${queryType}${id >0 ? '' : `?${id}`}`
            console.log(remeshURL);
            break;
    }

    try {
        let response = await axios.get(remeshURL);

        if (response.status !== 200) {
            throw new Error ('Invalid Response from remote server');
        }
        return response.data;
    } catch (ex) {
        if (!(process.env.NODE_ENV === 'test')) {
            console.log(ex);
        }
        return false;
    }   
};

export default QueryRemesh