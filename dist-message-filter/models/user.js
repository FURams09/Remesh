"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class User {
    constructor(id, age, sex, income, livingEnvironment) {
        if (typeof (id) !== 'number') {
            throw new Error('user id is invalid');
        }
        ;
        if (!constants_1.default.sex.includes(sex)) {
            throw new Error('sex is invalid');
        }
        ;
        if (!constants_1.default.age.includes(age)) {
            throw new Error('age is invalid');
        }
        ;
        if (!constants_1.default.income.includes(income)) {
            throw new Error('income is invalid');
        }
        ;
        if (!constants_1.default.livingEnvironment.includes(livingEnvironment)) {
            throw new Error('livingEnvironment is invalid');
        }
        ;
        this.id = id;
        this.sex = sex;
        this.age = age;
        this.income = income;
        this.livingEnvironment = livingEnvironment;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map