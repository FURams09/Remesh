const express = require('express');
import QueryRemesh from './lib/api';
import Search from "./lib/filter";
import Utility from './lib/utility'      

import {FilterCriteria} from './models';



const PORT = 8081;
const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json({type: 'application/json'})); //this handles converting the JSON to a useable javascript option. 

/**
 * Post /SearchResults
 * This route handler will take the requested filter criteria, represented as key value pairs what cateogry to
 * filter on the values to filter user messages by. 
 * It then goes and makes async requests to get all messages, votes, and users for the current session.
 * It uses this information along with the filter to build the three main data structures of the app
 * 
 * searchCriteria - An array of FilterCriteria that represent the categories and values to filter by
 * 
 * messageIndex- Nested Object that takes the array of messages for the session and turns it into an index for quikly
 * looking up a specific message with a compound key of QuesionID and MessageId
 * 
 * userMessages - An Oject where the keys are all the UserIds for the session and the values are an array of MessageKeys
 * that user either voted for or created. 
 */

let UserMessages = {};
let MessageIndex = {};
let RemeshUsers = [];
let isInitialized = false;
app.post('/searchResults', async (req, res, next) => {
    try {

        if (!isInitialized) {
            console.log('running');
            let messages = QueryRemesh('messages');
            let votes = QueryRemesh('votes');
            let users = QueryRemesh('users');
            let remeshRes = await Promise.all([votes,messages, users]);
            UserMessages = Utility.BuildUserMessages(remeshRes[0], remeshRes[1]);
            MessageIndex = Utility.BuildMessageIndex(remeshRes[1]);
            RemeshUsers = remeshRes[2];
            isInitialized = true;
        };

        let searchCriteria = Object.keys(req.body).map(filterCategory => {
            return new FilterCriteria(filterCategory, req.body[filterCategory]);
        });

        
        let usersToDisplay = Search.FilterUsers(RemeshUsers, searchCriteria);
        let filteredMessages = Search.GetFilteredMessages(usersToDisplay, UserMessages, MessageIndex);
        res.send(filteredMessages);
            
    } catch (ex) {
        res.send(ex);
    }
});



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
