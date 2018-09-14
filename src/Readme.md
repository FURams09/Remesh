#Gregory Padin's Remesh Interview Project

Thank you again for considering me for a position at Remesh. Below I've outlined the structure of the project 

##Project Structure
I decided to make this as a typescript project both as an excuse to try the typescript I've been learning on a real world project, and because it made working with the custom data structures relatively easy, from a developer standpoint.

The package.json file is configured for Windows so if you're running this on a Mac you'll need to make changes to the scripts to run these programs.

The code for both projects is contained in the _src_ folder. All of the code for the array-reverser is in _lib/array-reverser.ts_. The rest of the directory is used in the message filter app. Building either project will extract the necessary files to a dist-[project name] directory in the main directory.

Both projects have their tests in the same _tests_ folder but are divided out by module. Although in the real world these the two projects don't sahre any code and are build into two different projects so it would have probably been better to run them in seperate test folders, but for this exercise it was helpful to run all tests to catch an inadvertant typo or file rename right away. 

All functions are commented with JSDoc comments.

####Array Reverser
___
>Write some code (including tests) that will reverse an array of>arbitrary elements
>in place along with any arrays (or  arrays of >arrays). 
>For example: [1, 2, [3, 4, 5], [6, [7, 8], 9]] => [[9, [8, 7],6], [5, 4, 3], 2, 1]

The run-array.js script is where you can define the array you would like to reverse by setting arrayToReverse. This is the only configuration necessary. When it runs it will output the reversed array to the console and exit. 

Run: `npm run start`
This command will 
    -Clean the _dist-array-message_ directory and run the ts compiler based on _tsconfig.array.json_. You can also run this step by running `npm run build:array`
    -run the script _run-array.js_. 

 

####Message Filter
___
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


The _run-array.js_ script is where you can define the array you would like to reverse by setting arrayToReverse. This is the only configuration necessary. When it runs it will output the reversed array to the console and exit. 

Run: `npm run start`
This command will 
    -Clean the _dist-message-filter_ directory and run the ts compiler based on _tsconfig.message.json_. You can also run this step by running `npm run build:array`
    -run the script run-message.js. 

##Tests

Run: `npm run test`
This command will 
    -Clean the _test_ folder and run the ts compiler based on _tsconfig.test.json_. 
    -run the tests defined in the _src/tests_ directory. 
As I mentioned above both projects are tested with the same command but each lib file has its own test. 