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
//const messageFilter : MessageFilter;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' })); //this handles converting the JSON to a useable javascript option. 
app.get('/', (req, res, next) => {
    try {
        res.send('Running');
    }
    catch (ex) {
        next(ex);
    }
});
app.post('/searchResults', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let messages = api_1.default('messages');
        let votes = api_1.default('votes');
        let users = api_1.default('users');
        let buildSearchCriteria = new Promise((resolve, reject) => {
            try {
                let searchCriteria = [];
                Object.keys(req.body).forEach(filterCategory => {
                    searchCriteria.push(new models_1.FilterCriteria(filterCategory, req.body[filterCategory]));
                });
                resolve(searchCriteria);
            }
            catch (ex) {
                reject(ex);
            }
        });
        let responses = yield Promise.all([votes, messages, users, buildSearchCriteria]);
        let userMessages = utility_1.default.BuildUserMessages(responses[0], responses[1]);
        let messageIndex = utility_1.default.BuildMessageIndex(responses[1]);
        let usersToDisplay = filter_1.default.FilterUsers(responses[2], responses[3]);
        let filteredMessages = filter_1.default.GetFilteredMessages(usersToDisplay, userMessages, messageIndex);
        res.send(filteredMessages);
    }
    catch (ex) {
        next(ex);
    }
}));
app.use((err, req, res, next) => {
    if (err) {
        console.log(req, err);
        res.send(`Error with request ${req.path}: ${err}`);
    }
    ;
    next();
});
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map