# Stocks Code Challenge

## Prerequisites
- Must run on React 16 or tests will break.
- Must run on Node v12 or higher.

## Starting the app

-  In `/app`, `npm i` to install packages
-  Run `npm start` to build and run the front end on port `3000`
-  Go to http://localhost:3000/.

## Starting the server
-  In `/server`, `npm i` to install packages
-  Run `npm start` to build and run the server on port `4000`
-  Live at http://localhost:4000/.

## Running tests

-  In `/app` run `npm test` to run the tests using `jest`.
-  In `/server` run `npm test` to run the tests using `ava`.

## Documentation

-  JSDoc has been used for documenting the node server. Run `./node_modules/.bin/jsdoc File.js` on any given file to view.

## Limitations and Considerations
Due to the time constraints, there were trade offs that were made while creating the app. See more details below

### React
-  Used `create-react-app` to build this project as it quickly creates a project with all the nice stuff included (Linting, Jest, etc.). I've built some of my hobby projects from scratch - can walk through those to demonstrate this skill.
-  I created my own elements (inputs, modals) in this app to showcase this skill as this is a code challenge. If I were asked to complete a task with similar time constraints at work, I would either use Material UI or the company's own component library.
-  There were some design trade offs that I made, including using buttons in tables, putting two primary buttons next to eachother, not formatting values (e.g. cash balance can go above 2 decimal places) and not using icons. This was in order to display all available functionality obviously and make a quick mock up UI.
-  No routing included in the app. I designed it to be a single page due to time constraints.
-  Loading screen shifts all the items on the screen. If I had more time I would've styled a spinner that takes over the whole page.
-  I added basic error handling to the deduct balance modal to show I considered these error cases. However, I did not add error handling on the front end for buying more stocks than cash available or trying to buy a stock that doesn't exist. The server returns errors (e.g. 409 error for buying too many stocks) for these items and use is not allowed to continue the process.
-  Made the initial value in all modal text boxes the existing value (e.g. add balance modal will show the existing balance in the text box, meaning it defaults to double the existing balance). This is poor UX but functionality works fine.
-  Few reusable css classes, no sass - it's a bit messy but it's a trade off I chose to make.
-  Kept default react logo for tab icon.

### Node
-  Didn't set up web page to view JSDocs. Need to run manually
-  Didn't use Boom to throw errors
-  Didn't use Joi to validate values passing through. Resulted in some manual checks.
-  Very basic error handling. Did not use symbols to pass errors across services/handlers. Used strings to identify error type (would never do this in a production app).

### Tests
-  As you go through the application you will notice that the tests are incomplete. As I got closer to the end of this code challenge, I stopped writing tests as it was taking too much time. However, I believe tests are incredibly important so I've ensured there is at least one suite of tests for every function (reducers, sagas, containers, components, node handlers, services) to show that I'm able to write a range of tests.

### Top priorities
While making these trade offs, I had the following priorities in mind
-  Avoid re-rendering components that do not need to
-  Compartmentalising concerns - services, handlers, reducers, components all manage their own theme (e.g. manage balance)
-  Clean, documented and readable code
-  Good experience for user using both UI and node endpoints. How will someone interact with these items?
-  Has something similar been tested before? If so, skip.
-  Have I met the minimum requirements?

### Assumptions
-  The app only needs to cater for one user

### Obstacles and surprises
-  At the beginning of this project, I assumed not creating a database would save me time. By the end, I'd spent at least double the amount of time wrestling with the objects that are acting as databases in the services. So many problems came out of this including:
    - tests permanently changing values, leading to side effects for other tests
    - inability to mock these values
    - inability to share these values to other services
    - having to rewrite object values which I really try to avoid
    - not being scalable (can't add new properties to the obj because you can only have a key and a value). This meant I couldn't implement a few features that I wanted to e.g. pulling the stock price for the associated company.

-  I also assumed having basic error handling would save me time (not using Boom, Joi). By the end of it I realised how much time these save during the debugging process.

NOTE: The reason I did not retrospectively add the above items into the code base is because the problems appeared so late in the process that I would have to spend as much time refactoring and re-architecting as I had already spent coding.

-  The API endpoint would indicate errors by returning a 200 OK status with error messages in the result. Had already implemented it in the app and it broke everything anytime I tried to handle the error as it returned a string instead of the expected JSON obj. Ended up changing the endpoint to one that returned an empty object instead.

-  Overall, the process was quite smooth because I spent time understanding what basic functions the front end would have, and the information that they would require from the node endpoints. This meant that I did not
