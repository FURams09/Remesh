"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
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
    static GetFilteredMessages(usersToDisplay, userMessages, messageIndex) {
        try {
            let returnMessages = {};
            usersToDisplay.forEach(user => {
                let currentUsermessages = userMessages[user.id];
                currentUsermessages.forEach((message) => {
                    if (!returnMessages[message.questionId]) {
                        returnMessages[message.questionId] = {};
                    }
                    ;
                    if (!returnMessages[message.questionId][message.messageId]) {
                        returnMessages[message.questionId][message.messageId] = messageIndex[message.questionId][message.messageId];
                    }
                    ;
                    let votedMessage = returnMessages[message.questionId][message.messageId];
                    if (!votedMessage) {
                        throw new Error(`message not found questionId: ${message.questionId} messageId: ${message.messageId}`);
                    }
                    votedMessage.AddVoteToMessage(user);
                    if (votedMessage.creatorId === user.id) {
                        votedMessage.hasCreator = true;
                    }
                    ;
                });
            });
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