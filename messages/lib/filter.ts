import {User, FilterCriteria, DisplayMessage} from '../models';

export default class Search {
    /**
     * Takes an array of Users and returns an array of users that match all criteria presented in the filter array;
     * @param users Array of Users we are searching
     * @param filter Array of SearchCriteria objects we'll use to 
     */
    static FilterUsers (users: User[], filter: FilterCriteria[]) {
        let foundUsers = [];
        users.forEach(user => {
            let found = true;
            filter.every(category => {
                if (category.criteria.length === 0 || category.criteria.includes(user[category.key])) {
                    //if a category has no criteria we can probably let it slide, maybe log it at a later date. 
                    //or if the user's value matches one of the categories specified by the filter. 
                    return true;
                } else {
                    //user does not match all criteria so we bail out of the every loop and don't push it to the final
                    found = false;
                    return false;
                }
                return true;
            });
    
            if (found) {
                foundUsers.push(user);
            }
        })
    
        return foundUsers;
    }
    
    static GetUsersMessages(usersToDisplay : User[], userMessages: any, messages: any, questions: any) {
    
        let results = usersToDisplay.map(user => {
             let currentUsermessages = userMessages[user.id];
             let allMessages = currentUsermessages.map(message => {
                 let usersMessage : DisplayMessage = messages[message[0]][message[1]]
                 usersMessage.AddVoteToMessage(user);
                 if (usersMessage.creatorId === user.id) {
                     usersMessage.hasCreator = true;
                 }
                 return usersMessage;
             })
            
             return allMessages;
        })
        return results;
     
     }
    
}
