# Remesh Fake Server

This is a simple api designed to return randomized mock data and generate a local server.

## Setup
Download this repo.

Run:
```
> yarn
> yarn serve
```

...and you'll be up and running!

Visit `localhost:8080/users`, `localhost:8080/questions`, `localhost:8080/messages`, or `localhost:8080/votes` to check out the API

## The API
The api is organized as such:

### Users
`/users` - user demographic information

`GET /users`
returns
```
[
  {
    "id": 1,
    "age": "60-64",
    "sex": "F",
    "income": "100,000+",
    "livingEnvironment": "Urban"
  },
  {
    "id": 2,
    "age": "18-24",
    "sex": "M",
    "income": "40,000-50,000",
    "livingEnvironment": "Rural"
  },
  ...
]
```

`GET /users/288`
returns
```
{
  "id": 288,
  "age": "60-64",
  "sex": "F",
  "income": "100,000+",
  "livingEnvironment": "Urban"
},
```

### Questions
`/questions` - questions asked during the session

`GET /questions`
returns
```
[
  {
    "id": 1,
    "text": "How do you think Marissa Meyer is doing running Yahoo?"
  },
  {
    "id": 2,
    "text": "What do you think is the future of Yahoo?"
  },
  ...
]
```

`GET /questions/1`
returns
```
{
  "id": 1,
  "text": "How do you think Marissa Meyer is doing running Yahoo?"
}
```

### Messages
`/messages` - user submitted responses to questions

`GET /messages`
returns
```
[
  {
    "id": 1,
    "text": "She's doing a great job!",
    "creatorId": 23,
    "questionId": 1
  },
  }
    "id": 2,
    "text": "Meh...",
    "creatorId": 381,
    "questionId": 1
  },
  ...
]
```

`GET /messages/1`
returns
```
{
  "id": 1,
  "text": "She's doing a great job!",
  "creatorId": 23,
  "questionId": 1
}
```

### Votes
`/votes` - user votes on responses

`GET /votes`
returns
```
[
  {
    "id": 1,
    "userId": 1,
    "messageId": 5,
    "questionId": 3
  },
  {
    "id": 2,
    "userId": 42,
    "messageId": 99,
    "questionId": 10,
  }
  ...
]
```

`GET /votes/1`
return
```
  {
    "id": 1,
    "userId": 1,
    "messageId": 5
  }
```
