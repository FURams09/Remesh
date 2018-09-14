"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Votes is an array of messageKeys
 * messageKeys = [questionId, messageId, ?voteId(undefined if user is creator of that message)]
 */
class DisplayMessage {
    constructor(messageId, questionId, text, creatorId) {
        if (typeof (messageId) !== 'number') {
            throw new Error(`Invalid messageId ${messageId}`);
        }
        ;
        if (typeof (questionId) !== 'number') {
            throw new Error(`Invalid questionId ${questionId}`);
        }
        ;
        if (typeof (text) !== 'string') {
            throw new Error(`Invalid text ${text}`);
        }
        ;
        if (typeof (creatorId) !== 'number') {
            throw new Error(`Invalid creatorId ${creatorId}`);
        }
        ;
        this.questionId = questionId;
        this.messageId = messageId;
        this.text = text;
        this.creatorId = creatorId;
        this.votes = [];
    }
    AddVoteToMessage(voter) {
        this.votes.push(voter);
    }
}
exports.default = DisplayMessage;
//# sourceMappingURL=display-message.js.map