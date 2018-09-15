const fs = require('fs');
const path = require('path');
const {
  DIRECTORY,
  AGES,
  SEXES,
  INCOMES,
  LIVING_ENVIRONMENT,
  QUESTIONS,
  ANSWERS_BY_ID,
  SKEW_FACTOR_MAX
} = require('./constants.js');

function sample(array) {
  const idx = Math.round(Math.random() * (array.length - 1));

  return array[idx];
}

function sampleWithSkew(array, skewTowardsIndices, skewFactor) {
  let idx = Math.round(Math.random() * (((array.length - 1) + (skewTowardsIndices.length * skewFactor))));

  if (idx >= array.length) {
    idx = sample(skewTowardsIndices)
  }

  return array[idx];
}

function getSkewedTowardsIndices(array) {
  const numberOfSkewed = Math.round(Math.random() * Math.round(array.length / 2))
  const idsToSkew = new Set();

  while (idsToSkew.size < numberOfSkewed) {
    for (let i = 0; i < numberOfSkewed; i++) {
      const idToSkew = Math.round(Math.random() * (array.length - 1));
      idsToSkew.add(idToSkew)
    }
  }

  return [ ...idsToSkew ];
}

function createVotes(questions, messages, users) {
  const votes = [];

  questions.forEach(question => {
    const answers = messages.filter(message => message.questionId === question.id)
    const skewedTowardsIndices = getSkewedTowardsIndices(answers);

    const skewFactor = Math.round(Math.random() * SKEW_FACTOR_MAX);

    users.forEach(user => {
      votes.push({
        id: votes.length + 1,
        userId: user.id,
        messageId: sampleWithSkew(answers, skewedTowardsIndices, skewFactor).id,
        questionId: question.id
      });
    });
  });

  return votes
}

function createMessages(questions, users) {
  const messages = []

  questions.forEach(question => {
    ANSWERS_BY_ID[question.id].forEach((answer, idx) => {
      const id = idx + 1;

      messages.push({
        id,
        text: answer,
        creatorId: sample(users).id,
        questionId: question.id
      });
    });
  })

  return messages;
}

function createQuestions() {
  const questions = [];

  QUESTIONS.forEach((question, idx) => {
    const id = idx + 1;

    questions.push({
      id,
      text: question,
    })
  });

  return questions;
}


function createUsers(numUsers) {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    users.push({
      id: i+1,
      age: sample(AGES),
      sex: sample(SEXES),
      income: sample(INCOMES),
      livingEnvironment: sample(LIVING_ENVIRONMENT)
    })
  }

  return users
}

function cb(err) {
  if (err) throw err;

  console.log('API data created!');
}

function generate(numUsers, dbPath = '') {
  const users = createUsers(numUsers);
  const questions = createQuestions();
  const messages = createMessages(questions, users);
  const votes = createVotes(questions, messages, users);
  console.log()
  fs.writeFile(`${DIRECTORY}/db.json`, JSON.stringify({ users, questions, messages, votes }), cb)
}

module.exports = generate
