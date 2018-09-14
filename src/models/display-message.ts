import {User} from './index';
/**
 * Votes is an array of Users that have voted for this message. It's the full user instead of 
 * just the id mostly for observability in development. 
 * messageKeys = [questionId, messageId, ?voteId(undefined if user is creator of that message)]
 * 
 * @param {number} messageId
 * @param {number} questionId
 * @param {string} text What the message should display. 
 * @param {number} creatorId
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