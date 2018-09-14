import * as mocha from 'mocha';
const expect = require('chai').expect;
declare var require :any;

import Utility from '../lib/utility';
import Filter from '../lib/filter';
import {FilterCriteria} from '../models';
import {MockMessages, MockUsers, MockVotes} from './constants'

describe ("Test Filter", () => {
    let validFitleredUsers = [];
    let mockUserMessages, mockMessageIndex, baseFilter;
    let ageCriteria, incomeCriteria, livingEnvironmentCriteria
    before(async () => {
        mockUserMessages = Utility.BuildUserMessages(MockVotes, MockMessages);
        mockMessageIndex = Utility.BuildMessageIndex(MockMessages);
        ageCriteria = new FilterCriteria('age', ['18-24', '65+'])
        incomeCriteria = new FilterCriteria('income', ['<20,000']);
        livingEnvironmentCriteria = new FilterCriteria('livingEnvironment', ['Urban', 'Rural']);
        baseFilter = [ageCriteria, incomeCriteria, livingEnvironmentCriteria];

    });
    
    it ("should return correctly filtered users", () => {
        
        let filteredUsers = Filter.FilterUsers(MockUsers, baseFilter);
        expect(filteredUsers).to.have.lengthOf(11);
        filteredUsers.forEach(user => {
            expect(ageCriteria.criteria).to.include(user.age);
            expect(incomeCriteria.criteria).to.include(user.income);
            expect(livingEnvironmentCriteria.criteria).to.include(user.livingEnvironment); 

            validFitleredUsers = filteredUsers;
        });
    });
    
    it ("should return valid message list", () => {
        expect(validFitleredUsers).to.have.lengthOf(11); //make sure filter test is passing the right filter
        let filteredMessages = Filter.GetFilteredMessages(validFitleredUsers, mockUserMessages, mockMessageIndex);
        expect(filteredMessages).to.be.an('array').to.have.lengthOf(41);
        let creatorMessage = filteredMessages[1]
        let sampleMessage = filteredMessages[2];
        expect(creatorMessage).to.have.all.keys('questionId', 'messageId', 'text', 'creatorId', 'votes', 'hasCreator');
        expect(sampleMessage).to.have.all.keys('questionId', 'messageId', 'text', 'creatorId', 'votes');
        expect(sampleMessage.votes).to.be.an('array').to.have.lengthOf(3);
        expect(sampleMessage.votes[0]).to.have.keys('id', 'age', 'sex', 'income', 'livingEnvironment');
    });

    it ('should not accept undefined filter', () => {
        let undefinedFilter = Filter.FilterUsers(MockUsers, undefined);
        expect(undefinedFilter).to.be.an('array').that.has.lengthOf(1).that.includes(false);
    });
    it ('should ignore blank search parameter', () => {
        let emptyIncomeFilter = [ageCriteria, incomeCriteria, livingEnvironmentCriteria, new FilterCriteria('income', [])];
        let filteredUsers = Filter.FilterUsers(MockUsers, baseFilter);
        expect(filteredUsers).to.have.lengthOf(11);
        filteredUsers.forEach(user => {
            expect(ageCriteria.criteria).to.include(user.age);
            expect(incomeCriteria.criteria).to.include(user.income);
            expect(livingEnvironmentCriteria.criteria).to.include(user.livingEnvironment); 

            validFitleredUsers = filteredUsers;
        });
    });
});