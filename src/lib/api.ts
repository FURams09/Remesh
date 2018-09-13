import apiConfig from '../config/api';
import axios from 'axios';
import {INVALID_API_QUERY} from './errors';

export default async (queryType: string, id : number = -1) => {
        const url = `${apiConfig.url}/${queryType}?${id >=0 ? '' : `${id}`}`
        try {
            let response = await axios.get(url);
    
            if (response.status !== 200) {
                throw new Error ('Invalid Response from remote server');
            }
            return response.data;
        } catch (ex) {
            console.log(ex);
            return false;
        }   
    };