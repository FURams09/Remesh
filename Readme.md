# Gregory Padin's Remesh Interview Project

Thank you again for considering me for a position at Remesh. Below I've outlined the structure of this project and everything you need to know to get it working.
If you have any questions don't hesitate to make an issue on this repo (or email me, that's probably easier lol). I look forward to hearing back from you.

## Project Structure

The package.json file is configured for Windows so if you're running this on a Mac 
you'll need to make changes to the scripts to run these programs.

The code for both projects is contained in the _src_ folder. All of the code for the array-reverser is in _lib/array-reverser.ts_. 
The rest of the directory is used in the message filter app. Building either project will extract the necessary 
files to a dist-[project name] directory under the main directory.

Both projects have their tests in the same _tests_ folder but the tests themselves are divided out by module. 
In the real world these two projects don't share any code and build into two different project directories 
so in a real world scenario, it would have probably been better to run them in seperate test folders, but for this exercise it was convenient to just run them all with the same structure as the _src_ folder. 


#### Personal Questions
>What is something you worked on that you’re particularly proud of? It
>can be a personal project or something you did professionally. You don’t
>have to write a book, but we’d love to hear why you’re proud of it.


We recently installed the first version of our next build at a new client’s site. This was the culmination of about a year of development work, including three new major features added specifically for this client. It was also the first full release after we upgraded from .NET 2.0 to .NET 4.0, so there were also a fair amount of changes related to that which we had not released to the wild yet. 

The product began as a DOS program and over the last 20 years the code base had become the classic monolithic nightmare. We made a lot of improvements over the .NET upgrade, but at the beginning of the project I decided I wanted to put extra focus on making sure these new features were extensible and up to more modern standards. About a week before they were ready to go live they decided they wanted the ability to run a report against their entire database on demand, as well as the original spec of exporting a single record whenever one of their records was updated, which had no user facing interface. It took about two days to refactor my code to give them the report they wanted and when I showed it to the client his reaction was “My only complaint is I don’t need to run it more often because it’s just so fast and I’m so happy with it”. They’ve been live for about a month and have been calling with a lot of usage questions but no technical issues yet. This tells me they’re using it actively and everything’s running smoothly. 

>What is something new you recently learned and why is it awesome?

We're finally replacing one of the last vestiges of our Microsoft Access days and changing our Excel report generator in our web product from using  VBScripts to run in the client's browser, to a backend framework called OpenXML built into our ASP.Net app directly. Having done most of my college programming in VBA as a business major it was like a real geeky moment when I learned you can just rename any xlsx file to a zip file and see the underlying files that make up an Excel workbook. I'd used OpenXML before on a similar project but this was the first time I built an entire workbook from scratch instead of preloading one created in Excel with all of the style declarations and boilerplate of sheets and worksheets and cells. If you believe the people who say Excel is the most used programming language in the world, knowing this library gives you the ability to replace VBA with C# taking what you can do with Excel to a totally different level.  No “Record Macro” option though. 


#### Array Reverser
___
>Write some code (including tests) that will reverse an array of>arbitrary elements
>in place along with any arrays (or  arrays of >arrays). 
>For example: [1, 2, [3, 4, 5], [6, [7, 8], 9]] => [[9, [8, 7],6], [5, 4, 3], 2, 1]

The _run-array.js_ script is where you can define the array you would like to reverse by setting arrayToReverse. 
This is the only configuration necessary. When it runs it will output the reversed array to the console and exit. 

Run: `npm run start`
This command will 
    - Clean the _dist-array-message_ directory and run the ts compiler based on _tsconfig.array.json_.
     You can also run this step by running `npm run build:array`
    - run the script _run-array.js_. 

 
#### Message Filter
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


The config file is where the API url is stored. If you're running it on localhost:8080 
you don't need to configure anything else. I added a script `npm run start:api` assuming 
the parent directory of this project also has the remesh-interview-api directory. 
Otherwise just ignore this script. 

Run: `npm run serve`
This command will 
    - Clean the _dist-message-filter_ directory and run the ts compiler based on _tsconfig.message.json_. 
    You can also run this step by running `npm run build:message`
    - run the script _server.js_. 
Once the server is running (Port 8081 by default) you can make a post request to /searchResults 
with either a JSON or a url encoded form representing your search criteria. It will then return an array of all
the messages that had votes from Users matching your search criteria. 

## Tests

Run: `npm run test`
This command will 
    - Clean the _test_ folder and run the ts compiler based on _tsconfig.test.json_. 
    - run the tests defined in the _src/tests_ directory. 
As I mentioned above both projects are tested with the same command but each lib file has its own test.
