import * as mocha from 'mocha';
const expect = require('chai').expect;
import {User, FilterCriteria, DisplayMessage, MessageKey} from '../models';
declare var require: any

/**
 * Having or building a Model testing framework would probably be a good investment of time in the future 
 * since a lot of the tests are reused. But for the time being with the scope of the project I dedicated time elsewhere. 
 */
describe ("Test Models", () => {

    it ('should make valid User', () => {
        let user = new User(1, '18-24', 'M', '<20,000', 'Suburban');
        expect(user).to.have.all.keys('id', 'age', 'sex', 'income', 'livingEnvironment');
        expect(user.id).to.equal(1);
        expect(user.age).to.equal('18-24');
        expect(user.sex).to.equal('M');
        expect(user.income).to.equal( '<20,000');
        expect(user.livingEnvironment).to.equal('Suburban');
    });

    it ('should reject invalid User', () => {
        let undefinedUser = () => {new User(1, undefined, 'M', '<20,000', 'Suburban');}
        expect(undefinedUser).to.throw('age is invalid');

        let invalidAge = () => {new User(1, "fail", 'M', '<20,000', 'Suburban');}
        expect(invalidAge).to.throw('age is invalid');
    }); 

    it ('should make valid Filter Criteria', () => {
        let filter = new FilterCriteria('age', ['18-24']);
        expect(filter).to.have.all.keys('key', 'criteria');
        expect(filter.key).to.equal('age');
        expect(filter.criteria).to.be.an('array').that.has.lengthOf(1).that.includes('18-24');
    });

    it ('should reject invalid Filter Criteria', () => {
        let undefinedCriteria = () => {new FilterCriteria('age', undefined)};
        expect(undefinedCriteria).to.throw();

        let undefinedKey = () => {new FilterCriteria(undefined, ['18-24'])};
        expect(undefinedKey).to.throw();
        
    });

    it ("should build valid MessageKey", () => {
        let newKey = new MessageKey(1, 2, 3);
        expect(newKey).to.have.all.keys('messageId', 'questionId', 'creatorId');
        
        expect(newKey.questionId).to.equal(1);
        expect(newKey.messageId).to.equal(2);
        expect(newKey.creatorId).to.equal(3);
    });

    it ("should handle an invalid MessageKeys", () => {
        let undefinedQuestion = () =>{new MessageKey(undefined, 2, 3);}
        expect(undefinedQuestion).to.throw();

        let undefinedMessage = () =>{new MessageKey(1, undefined, 3);}
        expect(undefinedMessage).to.throw();

        let undefinedCreator = () =>{new MessageKey(1, 2, undefined);}
        expect(undefinedCreator).to.throw();
    })

    it ('should make valid Display Message', () => {
        let displayMessage = new DisplayMessage(1, 2, 'Sample Message', 3)
        expect(displayMessage).to.have.all.keys('messageId', 'questionId', 'text', 'creatorId', 'votes');
        expect(displayMessage.messageId).to.equal(1);
        expect(displayMessage.questionId).to.equal(2);
        expect(displayMessage.text).to.equal('Sample Message');
        expect(displayMessage.creatorId).to.equal(3);
    });

    it ('should reject invalid Display Message', () => {
       
        let undefinedMessage = () =>{new DisplayMessage(undefined, 2, 'Sample Message', 3);}
        expect(undefinedMessage).to.throw();

        let undefinedQuestion = () =>{new DisplayMessage(1, undefined, 'Sample Message', 3);}
        expect(undefinedQuestion).to.throw();

        let undefinedText = () =>{new DisplayMessage(1, 2, undefined, 3);}
        expect(undefinedText).to.throw();

        let undefinedCreator = () =>{new DisplayMessage(1, 2, 'Sample Message', undefined);}
        expect(undefinedCreator).to.throw();
        
    });
})