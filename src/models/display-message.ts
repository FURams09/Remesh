import {User} from './index';
import QueryAPI from '../lib/api';
/**
 * Votes is an array of messageKeys
 * messageKeys = [questionId, messageId, ?voteId(undefined if user is creator of that message)]
 */
export default class DisplayMessage {
    questionId : number
    messageId: number
    text: string
    creatorId: number
    votes: User[]
    hasCreator: boolean;

    constructor(messageId: number, questionId: number, text :string, creatorId: number) {
        if (typeof(messageId) !== 'number') {throw new Error(`Invalid messageId ${messageId}`)};
        if (typeof(questionId) !== 'number') {throw new Error(`Invalid questionId ${questionId}`)};
        if (typeof(text) !== 'string') {throw new Error(`Invalid text ${text}`)};
        if (typeof(creatorId) !== 'number') {throw new Error(`Invalid creatorId ${creatorId}`)};
        this.questionId = questionId;
        this.messageId = messageId;
        this.text = text;
        this.creatorId = creatorId;
        this.votes = [];
    }

    AddVoteToMessage(voter: User) {
        this.votes.push(voter);
    }
}