import {User, FilterCriteria, DisplayMessage, MessageKey} from '../models';
declare var process;
export default class Filter {
    /**
     * Returns an array of Users who match all of the filter criteria provided
     * on error this will return the array [false] instead of false to satisfy ts type safety. 
     * With a change to the users type and a renaming this could also be used to filter the final array 
     * of messages as well
     * 
     * This will run in M * N time where M is the lenght of the Users array and N the number of filter criteria
     * @param users Array of Users to filter
     * @param filter Array of FilterCriteria used to filter the search
     */
    static FilterUsers (users: User[], filter: FilterCriteria[]) {
        try {
            let foundUsers = [];
            users.forEach(user => {
                let found = filter.every(category => {
                    return (category.criteria.length === 0 || category.criteria.includes(user[category.key]));
                });
                if (found) {
                    foundUsers.push(user);
                }
            })
            return foundUsers;
        } catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log(ex);
            }
            return [false];
        }
    }
    /**
     * This Function builds the final return object which is an array of DisplayMessages which have votes from
     * the users. I chose to fill the Array of DisplayMessage votes with Users instead of just the ids mostly
     * for observability. In the real world I would have returned just the ids and let the consumer of this 
     * list deal with retrieving the User data it needed. 
     * 
     * @param usersToDisplay Array of Users to get messages for
     * @param userMessages Lookup list that matches UserIds to MessageKeys for looking up a users messages
     * from the array of messages returned from the Remesh API. 
     * @param messageIndex 
     */
    static GetFilteredMessages(usersToDisplay : User[] , userMessages: any, messageIndex: any) {
        try {
            let displayMessageIndex = {}; //Keep track of where a specific message is so we can update the votes without looping through the array.
            let returnMessages = []
            usersToDisplay.forEach(user => {
                 let currentUsermessages = userMessages[user.id];
                 currentUsermessages.forEach((message : MessageKey) => {
                    if (!(displayMessageIndex[message.questionId])) { 
                        displayMessageIndex[message.questionId] = {}
                    };
                    if (!(displayMessageIndex[message.questionId][message.messageId])) { 
                        displayMessageIndex[message.questionId][message.messageId] = returnMessages.length;
                        returnMessages.push(messageIndex[message.questionId][message.messageId]);
                    };
                    
                    let messageToVote :DisplayMessage = returnMessages[displayMessageIndex[message.questionId][message.messageId]]
                    if (!messageToVote) {throw new Error(`message not found questionId: ${message.questionId} messageId: ${message.messageId}`)}
                     
                    messageToVote.AddVoteToMessage(user);
     
                    if (messageToVote.creatorId === user.id) {
                        messageToVote.hasCreator = true;
                    };
                 })
            });
            return returnMessages;  
        } catch (ex) {
           
            if (!(process.env.NODE_ENV === 'test')) {
                console.log(ex);
            }
            return [false];
        }
     }
}
