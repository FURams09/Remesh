"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
    /**
     * Returns an array of Users who match all of the filter criteria provided
     * on error this will return the array [false] instead of false to satisfy ts type safety.
     *
     * This will run in M * N time where M is the lenght of the Users array and N the number of filter criteria
     * @param users Array of Users to filter
     * @param filter Array of FilterCriteria used to filter the search
     */
    static FilterUsers(users, filter) {
        try {
            let foundUsers = [];
            users.forEach(user => {
                let found = filter.every(category => {
                    return (category.criteria.length === 0 || category.criteria.includes(user[category.key]));
                });
                if (found) {
                    foundUsers.push(user);
                }
            });
            return foundUsers;
        }
        catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log(ex);
            }
            return [false];
        }
    }
    /**
     * This Function builds the final return object which is an Object using the same keys
     * @param usersToDisplay Array of Users to get messages for
     * @param userMessages Lookup list that matches UserIds to MessageKeys for looking up a users messages
     * from the array of messages returned from the Remesh API.
     * @param messageIndex
     */
    static GetFilteredMessages(usersToDisplay, userMessages, messageIndex) {
        try {
            let displayMessageIndex = {}; //Keep track of where a specific message is so we can update the votes without looping through the array.
            let returnMessages = [];
            usersToDisplay.forEach(user => {
                let currentUsermessages = userMessages[user.id];
                currentUsermessages.forEach((message) => {
                    if (!(displayMessageIndex[message.questionId])) {
                        displayMessageIndex[message.questionId] = {};
                    }
                    ;
                    if (!(displayMessageIndex[message.questionId][message.messageId])) {
                        displayMessageIndex[message.questionId][message.messageId] = returnMessages.length;
                        returnMessages.push(messageIndex[message.questionId][message.messageId]);
                    }
                    ;
                    let messageToVote = returnMessages[displayMessageIndex[message.questionId][message.messageId]];
                    if (!messageToVote) {
                        throw new Error(`message not found questionId: ${message.questionId} messageId: ${message.messageId}`);
                    }
                    messageToVote.AddVoteToMessage(user);
                    if (messageToVote.creatorId === user.id) {
                        messageToVote.hasCreator = true;
                    }
                    ;
                });
            });
            console.log(returnMessages);
            return returnMessages;
        }
        catch (ex) {
            if (!(process.env.NODE_ENV === 'test')) {
                console.log(ex);
            }
            return [false];
        }
    }
}
exports.default = Filter;
//# sourceMappingURL=filter.js.map