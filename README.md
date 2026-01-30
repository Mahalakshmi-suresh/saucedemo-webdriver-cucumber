# SauceDemo WebdriverIO Cucumber Project

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Google Chrome browser

## Installation
1. Clone this repository or download the project files.
2. Open a terminal and navigate to the project root directory:
   
   ```sh
   cd path/to/saucedemo-webdriver-cucumber
   ```
3. Install all dependencies:
   
   ```sh
   npm install
   ```

## Running the Tests

### Run All Feature Files
To execute all tests defined in the `features` folder:

```sh
npx wdio run wdio.conf.js
```

### Run a Specific Feature File
To run only a specific feature file (e.g., `login.feature`):

```sh
npx wdio run wdio.conf.js --spec ./features/login.feature
```

## Notes
- Step definitions are located in the `step-definitions` folder. If you add new step definition files, list them in the `require` array in `wdio.conf.js` under `cucumberOpts`.
- Test results and Allure reports are generated in the `allure-results` folder.
- You can view Allure reports (if configured) by running:
  ```sh
  npx allure serve allure-results
  ```

## Troubleshooting
- If you get a "step not defined" error, ensure your step definition files are included in the `require` array in `wdio.conf.js`.
- For Windows users, use explicit file paths in the `require` array for best compatibility.

---

For more details, see the comments in `wdio.conf.js` or reach out to the project maintainer.
