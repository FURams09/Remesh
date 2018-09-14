
import * as mocha from 'mocha';
const expect = require('chai').expect;
declare var require :any;

import queryAPI from '../lib/api';

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