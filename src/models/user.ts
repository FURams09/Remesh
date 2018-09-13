import Constants from '../constants/constants';

export default class User {
    id: number
    age: string
    sex: string
    income: string
    livingEnvironment: string
    constructor(id : number, age : string, sex : string, income : string, livingEnvironment: string) {
        if(typeof(id) !== 'number') {throw new Error('user id is invalid')};
        if(!Constants.SEXES.includes(sex)) {throw new Error('sex is invalid')};
        if(!Constants.AGES.includes(age)) {throw new Error('age is invalid')};
        if(!Constants.INCOMES.includes(income)) {throw new Error('income is invalid')};
        if(!Constants.LIVING_ENVIRONMENT.includes(livingEnvironment)) {throw new Error('livingEnvironment is invalid')};

        this.id = id;
        this.sex = sex;
        this.age = age;
        this.income = income;
        this.livingEnvironment = livingEnvironment;
    }
}