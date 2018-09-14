"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class FilterCriteria {
    constructor(key, criteria) {
        if (typeof (key) !== 'string') {
            throw new Error(`invalid key type ${key}`);
        }
        if (!Array.isArray(criteria)) {
            throw new Error(`invalid criteria type ${criteria}`);
        }
        if (!Object.keys(constants_1.default).includes(key)) {
            throw new Error(`key is not valid criteria Key: ${key}`);
        }
        ;
        let invalidCriteria = '';
        criteria.every(currentCriteria => {
            if (!constants_1.default[key].includes(currentCriteria)) {
                invalidCriteria = currentCriteria;
                return false;
            }
        });
        if (!(invalidCriteria === '')) {
            throw new Error(`criteria for ${key} not found Invalid Criteria: ${invalidCriteria}`);
        }
        this.key = key,
            this.criteria = criteria;
    }
}
exports.default = FilterCriteria;
//# sourceMappingURL=filter-criteria.js.map