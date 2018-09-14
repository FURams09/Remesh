

import filters from '../constants';
/**
 * A category want to limit the users by. I assumed the list of possible categories and their potential values would be 
 * known and we wouldn't need to build a list of potential values but it could be done during the building of the searchableUsers array.
 * 
 * @param key Name of the category to filter by
 * @param criteria an array of the values 
 */
export default class FilterCriteria {
    key: string
    criteria: string[]
    constructor(key : string, criteria : any[]) {
        
        if (typeof(key) !== 'string') {throw new Error(`invalid key type ${key}`)}
        if (!Array.isArray(criteria)) {throw new Error(`invalid criteria type ${criteria}`)}
        if (!Object.keys(filters).includes(key)) {throw new Error(`key is not valid criteria Key: ${key}`)};

        let invalidCriteria : string = '';
        criteria.every(currentCriteria => {
            if (!filters[key].includes(currentCriteria)) {
                invalidCriteria = currentCriteria;
                return false;
            }
        });
        if (!(invalidCriteria === '')) {throw new Error(`criteria for ${key} not found Invalid Criteria: ${invalidCriteria}`)}
       

        this.key = key,
        this.criteria = criteria
    }
}