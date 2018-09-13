const express = require('express');
import QueryAPI from './lib/api';
import Search from "./lib/search";
import Utility from './lib/utility'      

import {FilterCriteria} from './models';
import ArrayReverser from './array';



const PORT = 8081;
const app = express();

//const messageFilter : MessageFilter;

app.use(express.urlencoded({ extended: true }))
app.use(express.json({type: 'application/json'})); //this handles converting the JSON to a useable javascript option. 

app.get('/', (req, res, next) => {
    try {
        res.send('Running');
    } catch (ex) {
        next(ex);
    }
    
});

app.post('/reverse', (req, res, next) => {
    try {
        let array = [1, 2, [3, 4, 5], [6, [7, 8], 9]] ;
        array = {fail: true};
        let reversedArray = ArrayReverser.reverseArray(array);

        res.send(reversedArray);
    } catch (ex) {
        next(ex);
    }
    
})

app.post('/searchResults', async (req, res, next) => {
    try {
        let messages = QueryAPI('messages');
        let votes = QueryAPI('votes');
        let users = QueryAPI('users');

        let buildSearchCriteria = new Promise ((resolve, reject) => {
            try {
                let searchCriteria = [];
                Object.keys(req.body).forEach(filterCategory => {
                    searchCriteria.push(new FilterCriteria(filterCategory, req.body[filterCategory]));    
                });
                resolve(searchCriteria);
            } catch (ex) {
                reject(ex);
            }
        });

        let responses = await Promise.all([votes,messages, users, buildSearchCriteria]);
        let userMessages = Utility.BuildUserMessages(responses[0], responses[1]);
        let messageIndex = Utility.BuildMessageIndex(responses[1]);

        let usersToDisplay = Search.FilterUsers(responses[2], responses[3]);
        let filteredMessages = Search.GetUsersMessages(usersToDisplay, userMessages, messageIndex);
        res.send(filteredMessages);
            
    } catch (ex) {
        next(ex);
    }
});

app.use( (err, req, res, next) => {
    if (err) {
        console.log(req, err);
        res.send(`Error with request ${req.path}: ${err}`);
    };
    next();
   
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
