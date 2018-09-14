import * as mocha from 'mocha';
const expect = require('chai').expect;
declare var require :any;

import Utility from '../lib/utility';
import {DisplayMessage} from '../models';
import {MockMessages, MockUsers} from './constants'

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