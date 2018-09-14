import apiConfig from '../config/api';
import axios from 'axios';

export default async (queryType: string, id : number = -1) => {
        const url = `${apiConfig.url}/${queryType}?${id >=0 ? '' : `${id}`}`
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