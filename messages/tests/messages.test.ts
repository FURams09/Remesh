import * as mocha from 'mocha';
const expect = require('chai').expect;
import {User, FilterCriteria, DisplayMessage, MessageKey} from '../models';
import {MockMessages, MockUsers, MockVotes, MockQuestions} from './constants'
import queryAPI from '../lib/api';
import Utility from '../lib/utility';
import Filter from '../lib/filter';
declare var require: any


describe ("Test API", () => {
    it ("should get messages",async () => {
        let messages = await queryAPI('messages');
        expect(messages).to.be.an('array');
        expect(messages).to.have.lengthOf.at.least(1);

        let firstMessage = messages[0];
        expect(firstMessage).to.be.an('object');
        expect(firstMessage).to.have.all.keys('id', 'text', 'creatorId', 'questionId');
 
    });
    it ("should get users", async () => {
        let users = await queryAPI('users');
        expect(users).to.be.an('array');
        expect(users).to.have.lengthOf.at.least(1);

        let firstUser = users[0];
        expect(firstUser).to.be.an('object');
        expect(firstUser).to.have.all.keys('id', 'age', 'sex', 'income', 'livingEnvironment');
    });
    it ("should get votes", async () => {
        let votes = await queryAPI('votes');
        expect(votes).to.be.an('array');
        expect(votes).to.have.lengthOf.at.least(1);

        let firstVote = votes[0];
        expect(firstVote).to.be.an('object');
        expect(firstVote).to.have.all.keys('id', 'userId', 'messageId', 'questionId');
    });

    it ("should handle invalid category", async () => {
        let badQuery = await queryAPI('fail');
        expect(badQuery).to.be.false;
    });
    
})

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
        expect(Object.keys(filteredMessages)).to.have.lengthOf(10);
        expect(Object.keys(filteredMessages[1])).to.have.lengthOf(4);
        let sampleMessage = filteredMessages[1][2];
        expect(sampleMessage).to.have.all.keys('questionId', 'messageId', 'text', 'creatorId', 'votes');
        expect(sampleMessage.votes).to.be.an('array').to.have.lengthOf(6);
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

describe ("Test Utility", () => {
    it ("BuildSearchableUsers should build valid SearchableUsers", () => {
        let testUsers = Utility.BuildSearchableUsers(MockUsers);
        expect(testUsers).to.be.an('array');
        expect(testUsers).to.be.lengthOf(1000);
        let randomUser = testUsers[0];
        expect(randomUser).to.have.all.keys('id', 'age', 'sex', 'income', 'livingEnvironment');
        expect(randomUser.id).to.equal(1);
        expect(randomUser.age).to.equal('25-29');
        expect(randomUser.sex).to.equal('F');
        expect(randomUser.income).to.equal('60,000-70,000');
        expect(randomUser.livingEnvironment).to.equal('Urban');

    });
    it ("BuildSerachableUsers should handle an invalid Users", () => {
        let undefinedUsers = Utility.BuildSearchableUsers(undefined);
        expect(undefinedUsers).to.be.false;

        let stringUser = Utility.BuildSearchableUsers(['fail']);
        expect(stringUser).to.be.false;

        let missingKey = Utility.BuildSearchableUsers([{id:1, sex: 'M', 'income': '60,000-70,000',
        'livingEnvironment': 'Suburban'}]);
        expect(missingKey).to.be.false;

        let invalidKey = Utility.BuildSearchableUsers([{id:1, age: "fail", sex: 'M', 'income': '60,000-70,000',
        'livingEnvironment': 'Suburban'}]);
        expect(invalidKey).to.be.false;
    });

    it ("BuildMessageIndex should build valid Messages index", () => {
        let testMessageIndex = Utility.BuildMessageIndex(MockMessages);
        expect(Object.keys(testMessageIndex)).to.be.lengthOf(10);
        expect(Object.keys(testMessageIndex["1"])).to.be.lengthOf(7);
        expect(testMessageIndex["1"]["2"]).to.have.all.keys('questionId', 'messageId', 'text', 'creatorId', 'votes');

        let sampleMessage : DisplayMessage = testMessageIndex["1"]["2"]
        console.log(sampleMessage);
        expect(sampleMessage.questionId).to.equal(1);
        expect(sampleMessage.messageId).to.equal(2);
        expect(sampleMessage.text).to.equal('I\'m happy with how she\'s been doing');
        expect(sampleMessage.creatorId).to.equal(894);
        expect(sampleMessage.votes).to.be.an('array').that.is.empty;

        sampleMessage.AddVoteToMessage(MockUsers[0]);
        
        expect(sampleMessage.votes).to.be.an('array').that.is.lengthOf(1);
        expect(sampleMessage.votes[0].id).to.equal(1);
    });

    it ("BuildMessageIndex should handle an invalid Messages", () => {
        let undefinedMessages = Utility.BuildMessageIndex(undefined);
        expect(undefinedMessages).to.be.false

        let stringAsMessages = Utility.BuildMessageIndex(['fail']);
        expect(stringAsMessages).to.be.false

        let missingKey = Utility.BuildMessageIndex([{id: 1, text: "I should not pass", questionId: 2}]);
        expect(missingKey).to.be.false

        let badKey = Utility.BuildMessageIndex([{id: 1, text: "I should not pass", questionId: 1, messageId: 'String'}]);
        expect(badKey).to.be.false

        
    })
});
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