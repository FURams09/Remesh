const NUMBER_OF_USERS = 1000;
const SKEW_FACTOR_MAX = 4;
const DIRECTORY = ".";
const AGES = ["18-24", "25-29", "30-39", "40-49", "50-59", "60-64", "65+"];
const SEXES = ["M", "F"];
const INCOMES = ["<20,000", "20,000-30,000", "30,000-40,000", "40,000-50,000", "50,000-60,000", "60,000-70,000", "70,000-80,000", "80,000-90,000", "90,000-100,000", "100,000+"];
const LIVING_ENVIRONMENT = ["Suburban", "Urban", "Rural"]
const QUESTIONS = [
  "How do you think Marissa Meyer is doing running Yahoo?",
  "What strategies do you think Yahoo is getting right?",
  "How do you feel about the Alibaba purchase?",
  "What do you think is the future of search-based advertising?",
  "What do you think about the future success of Yahoo?",
  "How do you like working for Yahoo?",
  "What would you change about working for Yahoo?",
  "What would force you to leave Yahoo?",
  "What do you think Yahoo should focus on next?",
  "Where should Yahoo build its new headquarters?"
];

const ANSWERS_BY_ID = {
  1: [
    "She's doing a great job!",
    "I'm happy with how she's been doing",
    "Fine I guess, I don't really notice.",
    "Meh",
    "I'm not sure she has a big-picture vision for Yahoo.",
    "Who is Marissa Meyer?",
    "Good"
  ],
  2: [
    "Ads",
    "Mobile is good",
    "Mail is one of our integral products",
    "Nothing"
  ],
  3: [
    "Don't care",
    "Fine",
    "Good.",
    "Awesome!",
    "Don't know."
  ],
  4: [
    "It's going to be the norm for a while",
    "The end is near!",
    "Not sure.",
    "I think it will become more integrated into our daily lives",
    "Bad."
  ],
  5: [
    "I think we'll be around for a long time",
    "I have no idea",
    "The market can change in an instant, we have no idea how long this will last.",
    "I don't think things look very good for us."
  ],
  6: [
    "It's great",
    "Fine.",
    "I think we need to focus on employee retention.",
    "Love the benefits",
    "No comment"
  ],
  7: [
    "More beneifts.",
    "We need to be paid competitively.",
    "More transparency into what's going on at the higher levels.",
    "Nothing, really.",
    "I'd like to get involved in some big picture thinking.",
    "The name"
  ],
  8: [
    "No raise.",
    "Major market change",
    "Acquisition",
    "Nothing!"
  ],
  9: [
    "More mobile apps",
    "Let's make yahoo mail better",
    "Hardware maybe? We could do a phone that would kill the iPhone!",
    "Decrease outsources and focus on internal development!",
    "No idea. That's not my job to figure out"
  ],
  10: [
    "New York City!!",
    "Seattle?",
    "MARS",
    "The Moooon!",
    "colorado maybe?"
  ]
}

module.exports = {
  DIRECTORY,
  AGES,
  SEXES,
  INCOMES,
  LIVING_ENVIRONMENT,
  QUESTIONS,
  ANSWERS_BY_ID,
  SKEW_FACTOR_MAX,
  NUMBER_OF_USERS
}
