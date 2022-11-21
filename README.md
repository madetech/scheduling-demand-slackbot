# scheduling-demand-slackbot

Google Apps Script project that gets data from a google spreadsheet, transforms it to create a Slackbot payload and sends one alert per row. It has also been published as a private Sheets Add-on in a Google Cloud Project and is available for Made Tech users through the Google Workspace Marketplace.

// TO DO - add table of contents

## How it works
// TO DO

### Column order of spreadsheet

| Account | Assignment Demand | Start Date | Element End Date | Demand status | Utilisation | Demand status - Further information |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |

### Slackbot output

**Structure:**

*Assignment Demand* (1)
*Account* (0) *Start Date* (2) to *Element End Date* (3)

**Example:**

Software Engineer_SFIA 1 Academy - DVLA Investment & Account Oversight
DVLA  27/09/2022 to 30/11/2022

## Developer's guide
// TO DO
### Prerequisites
For local development you will need to install:

* [Node Js + NPM](https://nodejs.org/en/download/) - Node 4.7.4 or later,
* [clasp](https://developers.google.com/apps-script/guides/clasp) - clasp is an open source tool that allows you to develop and manage Apps Script projects from your terminal rather than the Apps Script editor.

You will also need to enable the Google Apps Script API because that’s what clasp uses in the background. In order to do this please:
1. navigate to the Apps Script Settings page,
2. click on "Google Apps Script API",
3. toggle the switch to "on".

### Setting up your local environment
// TO DO

### Code changes and deployment
In order to make a change to the script please follow the steps below:
1. make the code change in your local environment,
2. push the changes to AppScript with `clasp push` (this will allow you run the code & see the change in action),
3. make a commit & push to github.

In oder to deploy the change please follow the steps below:
1. create a new version in the app scripts:
   1. open the app scripts,
   2. click the arrow on the deploy button,
   3. select 'Manage deployments',
   4. click the pencil icon to go into the edit mode,
   5. select the 'New version' in the 'Version' dropdown,
   6. click 'deploy',
   7. click 'done',
2. Update the version in the google cloud project:
   1. go to the google cloud project,
   2. put 'workspace marketplace SDK' in the search box at the top & navigate to it,
   3. click 'Manage',
   4. go to 'APP CONFIGURATION',
   5. put the new version in the 'Sheets Add-on script version' section,
   6. click 'save'.

## User's guide
// TO DO

### Set up
The script only needs to be installed once. In order to do it, please follow the steps below:
1. open a spreadsheet in google docs,
2. open 'Extensions' > 'Add-ons' > 'Get add-ons' in the top menu,
3. click 'Internal apps' button,
4. click 'Scheduling Demand Slackbot',
5. click 'Install' button,
6. if prompted, click 'Continue' and give the permissions.

This will install the script in your google docs. You can check if it's been installed by clicking on the 'Extensions' in the top menu. Now you should see 'Scheduling Demand Slackbot' menu item. If it doesn't show, please refresh the document and wait a few seconds.

### Running
// TO DO