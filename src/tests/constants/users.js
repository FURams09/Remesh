const validUser = {
        id: 1,
        age: "30-39",
        sex: "M",
        income: "60,000-70,000",
        livingEnvironment: "Suburban"
    };
export default {
validUser,
badId: () => {return [Object.assign({id: 'fail'}, validUser)]},
badAge : () => {return  [Object.assign({age: 'fail'}, validUser)]},
badSex : () => {return [Object.assign({sex: 'fail'}, validUser)]},
badIncome :() => {return  [Object.assign({income: 'fail'}, validUser)]},
badLivingEnvironment : () => {return [Object.assign({livingEnvironment: 'fail'}, validUser)]},
undefinedId : () => {return [Object.assign({id: undefined}, validUser)]},
undefinedAge : () => {return [Object.assign({age: undefined}, validUser)]},
undefinedSex : () => {return [Object.assign({sex: undefined}, validUser)]},
undefinedIncome : () => {return [Object.assign({income: undefined}, validUser)]},
undefinedLivingEnvironment : () => {return [Object.assign({livingEnvironment: undefined}, validUser)]}
}