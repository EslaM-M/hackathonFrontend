## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/)<br>

### `plop`
 
Plop is a library used as a component generator. In this project you can choose to generate 3 types of structures:
1. **component** 
2. **container** 
3. **page**
<br>

#### Output
 For all 3 choices the command asks the user for a `name` then generates a folder titled with this name having 3 files:
 - `name`.css -> for component styling,
 - `name`.js -> for component logic,
 - `name`.test.js -> for component testing.
<br>

  However for **page** generation an additional input is required, which is the `link` input that when asked, you have to enter a page link to be used in the url. For example: if the name of the page is `test` and you want to navigate to the test page typing www.example.com/test, you have to enter the link `/test`. After adding the link, just type the link in the browser url, you will be navigated to the created page.
<br>
<br>
 The generator then adds an export to the corresponding root folder. For example if you generate a component, an export to this component will be added to the `components` folder in the `index.js` file to be imported directly from the `index.js` file if needed.
    
# gandalf-dashboard
