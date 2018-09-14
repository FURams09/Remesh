#Gregory Padin's Remesh Interview Project

Thank you again for considering me for a position at Remesh. Below I've outlined the structure of the project 

##Project Structure
I decided to make this as a typescript project both as an excuse to try the typescript I've been learning on a real world project, and because it made working with the custom data structures relatively easy, from a developer standpoint.


##Running The Programs

####Array Reverser

>Write some code (including tests) that will reverse an array of>arbitrary elements
>in place along with any arrays (or  arrays of >arrays). 
>For example: [1, 2, [3, 4, 5], [6, [7, 8], 9]] => [[9, [8, 7],6], [5, 4, 3], 2, 1]


Run: `npm run start`
This command will clean the dist folder, run the ts compiler to recreate the 


####Message Filter
>We have an API that returns JSON-encoded data related to one of our
>Remesh sessions. Our API returns four types of data: users, questions,
>messages, and votes.
>   - Users have an id, age, sex, income bracket, and living environment
>   attribute.
>   - Questions have an id and text.
>   - Messages have an id, text, creatorId, and questionId.
>   - Votes have an id, userId, and messageId.
>- **Check out **this GitHub repo*
><https://github.com/Remesh/interview-mock-api>* for a more thorough
>description of the api and a mock api you can run locally.*
>- Write code that accepts a JSON response and provides functions that
>allow us to group messages by any combination of users, ages, sexes,
>incomes, or living environments.
>- For example, given parameters of "Male" users aged "18-24" and "65+"
>with incomes "<20,000" and living in "Urban" and "Rural" environments,
>your function would return messages which were voted on only by users
>fitting those parameters. Think of search filters and parameters.
>- Remember, your code should be fully tested!


##Tests