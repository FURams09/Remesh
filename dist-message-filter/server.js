"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const api_1 = require("./lib/api");
const filter_1 = require("./lib/filter");
const utility_1 = require("./lib/utility");
const models_1 = require("./models");
const PORT = 8081;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' })); //this handles converting the JSON to a useable javascript option. 
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
app.post('/searchResults', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!isInitialized) {
            console.log('running');
            let messages = api_1.default('messages');
            let votes = api_1.default('votes');
            let users = api_1.default('users');
            let remeshRes = yield Promise.all([votes, messages, users]);
            UserMessages = utility_1.default.BuildUserMessages(remeshRes[0], remeshRes[1]);
            MessageIndex = utility_1.default.BuildMessageIndex(remeshRes[1]);
            RemeshUsers = remeshRes[2];
            isInitialized = true;
        }
        ;
        let searchCriteria = Object.keys(req.body).map(filterCategory => {
            return new models_1.FilterCriteria(filterCategory, req.body[filterCategory]);
        });
        let usersToDisplay = filter_1.default.FilterUsers(RemeshUsers, searchCriteria);
        let filteredMessages = filter_1.default.GetFilteredMessages(usersToDisplay, UserMessages, MessageIndex);
        res.send(filteredMessages);
    }
    catch (ex) {
        res.send(ex);
    }
}));
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map