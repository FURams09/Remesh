

import filters from '../constants';

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