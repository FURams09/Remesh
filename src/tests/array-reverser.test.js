
const expect = require('chai').expect;
import * as mocha from 'mocha';
import ArrayReverser from '../lib/array-reverser';

describe('Test ReverseArray', () => {
    it('should reverse valid array', (done) => {
        let start = [1, 2, [3, 4, 5], [6, [7, 8], 9]];
        let expectedEnd = [[9, [8, 7],
        6], [5, 4, 3], 2, 1];
        let arrayReverser = new ArrayReverser();
        let actualEnd = arrayReverser.reverseArray(start);
        expect(expectedEnd).to.deep.equal( actualEnd, "expected and actual reversed array not equal");
        expect(Array.isArray(actualEnd), "result not an array")
        done();
    });

    it('should reject invalid array', (done) => {
        let stringArray = () => {array.reverseArray('[stringarray]');}
        expect(stringArray).to.throw();

        let objectArray = () => {array.reverseArray({fail: true})};
        expect(objectArray).to.throw();


        let stringInArray = () => {array.reverseArray([1, 2, [3,4,"5"], 6, [7, 8]]);}
        expect(stringInArray).to.throw();

        done();
    });
});