# scheduling-demand-slackbot

Google Apps Script that gets data from a google spreadsheet, transforms it to create a Slackbot payload and sends one alert per row.

## Prerequisites and set up

For local development you will need to install:

[Node Js + NPM](https://nodejs.org/en/download/)

[clasp](https://developers.google.com/apps-script/guides/clasp)

You will also need to enable the Google Apps Script API because that’s what clasp uses in the background. Navigate to the Apps Script Settings page, click on "Google Apps Script API" and toggle the switch to "on".

## Setting up your local environment

// TO DO

## Column order of spreadsheet

| Account | Assignment Demand | Start Date | Element End Date | Demand status | Utilisation | Demand status - Further information |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |

## Slackbot output

**Structure:**

*Assignment Demand* (1)
*Account* (0) *Start Date* (2) to *Element End Date* (3)

**Example:**

Software Engineer_SFIA 1 Academy - DVLA Investment & Account Oversight
DVLA  27/09/2022 to 30/11/2022