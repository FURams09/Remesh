import ArrayReverser from './lib/array-reverser';

const arrayToReverse =[1, 2, [3, 4, 5], [6, [7, 8], 9]];
const run =() => {
    let arrayReverser = new ArrayReverser();
    console.log(arrayReverser.reverseArray(arrayToReverse));
}

run();

