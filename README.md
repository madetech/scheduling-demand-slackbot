# scheduling-demand-slackbot

Google Apps Script that gets data from a google spreadsheet, transforms it to create a Slackbot payload and sends one alert per row.

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
// TO DO

## User's guide
// TO DO

### Set up
// TO DO

### Running
// TO DO