import {User, DisplayMessage, MessageKey} from '../models';
declare var process :any;
export enum queryType {
    users,
    messages,
    votes, 
}
export default class Utility {
   /**
    * This function takes the Array of users from the remesh session and turns them into a
    * User. Even though an unprocessed user object from the API will work as a valid user, 
    * I wanted to use the new User constructor as an easy way to to validate all of the users
    * (and because it gives you intellisense!)
    * 
    * @param users Array of users in Remesh session
    */
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
/**
 * Takes the votes and messages for a session and build an index of UserIds with values of MessageKeys for messages that user voted on.
 * Since we filter down to a list of users we'll have their ids and can just look them up in constant time. 
 * @param votes An array of Votes from Remesh Session
 */
    static BuildUserMessages (votes: any[]) {
        try {
            let userMessageIndex = {};
            if (!Array.isArray(votes)) {throw new Error(`votes not valid`)};

            votes.forEach(vote => {
                if (!userMessageIndex[vote.userId]) {
                    userMessageIndex[vote.userId] = [];
                }
                userMessageIndex[vote.userId].push(new MessageKey(vote.questionId, vote.messageId, vote.id));
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