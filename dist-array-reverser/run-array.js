"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_reverser_1 = require("./lib/array-reverser");
const arrayToReverse = [1, 2, [3, 4, 5], [6, [7, 8], 9]];
const run = () => {
    let arrayReverser = new array_reverser_1.default();
    console.log(arrayReverser.reverseArray(arrayToReverse));
};
run();
//# sourceMappingURL=run-array.js.map