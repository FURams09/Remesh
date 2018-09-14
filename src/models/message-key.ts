/**
 * This represents how to find a message in the MessageIndex object. 
 * 
 */
export default class MessageKey {
    questionId : number;
    messageId: number;
    
    constructor(questionId, messageId) {
        if (typeof(questionId) !== 'number') {throw new Error(`questionId ${questionId} is not valid`)};
        if (typeof(messageId) !== 'number') {throw new Error(`messageId ${messageId} is not valid`)};

        this.questionId = questionId;
        this.messageId = messageId;
    }

    
}