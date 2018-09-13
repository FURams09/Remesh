export default class FilterCriteria {
    key: string
    criteria: string[]
    constructor(key : string, criteria : any[]) {
        if (typeof(key) !== 'string') {throw new Error(`invalid key ${key}`)}
        if (!Array.isArray(criteria)) {throw new Error(`invalid criteria ${criteria}`)}
        this.key = key,
        this.criteria = criteria
    }
}