export default class MessageKey {
    questionId : number;
    messageId: number;
    creatorId: number;
    
    constructor(questionId, messageId, creatorId) {
        if (typeof(questionId) !== 'number') {throw new Error(`questionId ${questionId} is not valid`)};
        if (typeof(messageId) !== 'number') {throw new Error(`messageId ${messageId} is not valid`)};
        if (typeof(creatorId) !== 'number') {throw new Error(`creatorId ${creatorId} is not valid`)};

        this.questionId = questionId;
        this.messageId = messageId;
        this.creatorId = creatorId;
    }

    
}