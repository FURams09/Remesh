import {User, DisplayMessage, MessageKey} from '../models';
export enum queryType {
    users,
    messages,
    votes, 
}
export default class Utility {
   
   static BuildSearchableUsers(users: any[]) {

        try {
            let searchableUsers = users.map(user => {
                return new User(user.id, user.age, user.sex, user.income, user.livingEnvironment)
            });
            return searchableUsers;  
        } catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log('Error in BuildSearchableUsers: ', ex);
            }
            return false;
        }
        
    }

    static BuildUserMessages (votes: any[], messages: any[]) {
        try {
            let userMessageIndex = {};
            if (!Array.isArray(votes)) {throw new Error(`votes not valid`)};
            if (!Array.isArray(messages)) {throw new Error(`messages are not valid`)};

            votes.forEach(vote => {
                if (!userMessageIndex[vote.userId]) {
                    userMessageIndex[vote.userId] = [];
                }
                userMessageIndex[vote.userId].push(new MessageKey(vote.questionId, vote.messageId, vote.id));
            });

            messages.forEach(message => {
                if (!userMessageIndex[message.creatorId]) {
                    userMessageIndex[message.creatorId] = [];
                }
                userMessageIndex[message.creatorId].push(new MessageKey(message.questionId, message.id, message.creatorId));
                
            });
            return  userMessageIndex;  
        } catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log('Error in BuildUserIndex: ', ex);
            }
            return false;
        }
    }
    
    static BuildMessageIndex (messages: any[])  {
        let messageIndex = {}
        try {
            messages.forEach(message => {
                let {questionId, creatorId, id, text} = message;
                if(!questionId || !creatorId || !id || !text) { throw new Error(`Missing key for user ${creatorId}: Message ${message}`)}
                let questionKey : number = questionId
                let messageKey: number = id;
                if ( !(typeof(questionKey) === 'number') || !(typeof(messageKey) === 'number')) { throw new Error(`Message with invalid index QuestionId ${questionKey} MessageId ${messageKey}`)}
                if (!messageIndex[questionKey]) {
                    messageIndex[questionKey] = {}
                };
                if (messageIndex[questionKey][id]) {
                    console.log(`Duplicate Messages for Question ${questionId} Message ${id}`)
                };
                messageIndex[questionKey][messageKey] = new DisplayMessage (id, questionId, text, creatorId);
                });
            return messageIndex;
        } catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log('Error in BuildMessageIndex: ', ex);
            }
            return false;
        }
    };
};