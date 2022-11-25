# scheduling-demand-slackbot

Google Apps Script project that gets data from a Google Sheets spreadsheet, transforms it to create a Slackbot payload and sends one alert per spreadsheet row. It has also been published as a private Sheets Add-on in a Google Cloud Project and is available to install for Made Tech users through the Google Workspace Marketplace.

## Table of contents
  - [How it works](#how-it-works)
    - [Column order of spreadsheet](#column-order-of-spreadsheet)
    - [Slackbot output](#slackbot-output)
  - [Developer's guide](#developers-guide)
    - [Prerequisites](#prerequisites)
    - [Setting up your local environment](#setting-up-your-local-environment)
    - [Code changes and deployment](#code-changes-and-deployment)
    - [Setting up a new Slack channel](#setting-up-a-new-slack-channel)
  - [User's guide](#users-guide)
    - [Set up](#set-up)
    - [Running](#running)

## How it works
When a spreadsheet is opened, this script adds an item to the add-on menu at: **Extensions** > **Scheduling Demand Slackbot** > **Send to Slack**.

Clicking on **Send to Slack** triggers the following workflow:
1. Read the data of the first sheet of the spreadsheet.
2. Check that the column headers and column order are as expected ([see below](#column-order-of-spreadsheet)). Exit and throw an error if not.
3. Format the data for each row into a message `string`.
4. Create a `JSON` payload for each message using [Slack message blocks](https://api.slack.com/messaging/composing/layouts#adding-blocks) syntax.
5. For each message call the Slackbot Webhook URL with the relevant payload. This will send a message for each role in the designated Slack channel.

### Column order of spreadsheet

The script validates the first 4 column headers by cheking that they match the below:

| Account | Assignment Demand | Start Date | Element End Date |
| ------- | ----------------- | ---------- | ---------------- |

### Slackbot output

The script sends the following intro message to Slack:

:bell: *Hello, here are the latest billable roles we are looking to fill. Please reply in the relevant thread if you're interested in a particular role.*

And follows with one message per role which is structured like this:

*Assignment Demand*

*Account*

*Start Date* to *Element End Date*

**Example:**

Software Engineer_SFIA 1 Academy - DVLA Investment & Account Oversight

DVLA

27/09/2022 to 30/11/2022

## Developer's guide

### Prerequisites
For local development you will need to install:

* [Node Js + NPM](https://nodejs.org/en/download/) - Node 4.7.4 or later,
* [clasp](https://developers.google.com/apps-script/guides/clasp) - clasp is an open source tool that allows you to develop and manage Apps Script projects from your terminal rather than the Apps Script editor.

You will also need to enable the Google Apps Script API because that’s what clasp uses in the background. In order to do this please:
1. Navigate to the [Apps Script Settings](https://script.google.com/home/usersettings) page.
2. Click on "Google Apps Script API".
3. Toggle the switch to "on".

### Setting up your local environment

1. Get the ScriptID from the mother Apps Script project (which needs to have been shared with you beforehand):
   1. Navigate to [My Projects](https://script.google.com/home/my) or [Shared with me](https://script.google.com/home/shared).
   2. Find the project and open it.
   3. Open the project settings (the cog icon on the left hand side).
   4. Under IDs, find the ScriptID and copy it for later.

2. Clone this repository with `git clone https://github.com/madetech/scheduling-demand-slackbot.git`.
3. Install clasp with `sudo npm install @google/clasp -g`
4. Log into clasp with `clasp login`
5. A window will open, and ask you to choose a Google account (make sure you choose the one associated with the spreadsheet)
6. Click “Allow” on the next screen
7. Run `clasp clone <script_id>` to connect your local repository with the Google Scripts App project (this is where you paste in the script ID from the Apps Script project)
8. This should add three files to the current directory:
   - A `.clasp.json` file storing the script ID.
   - An `appsscript.json` project manifest file containing project metadata.
   - A `script.js` file containing on empty function.
9. Create a `.claspignore` file and add the following:
   ```
   README.md
   .gitignore
   .clasp.json
   ```

### Code changes and deployment
In order to make a change to the script please follow the steps below:
1. Make the code change in your local environment.
2. Push the changes to AppScript with `clasp push` (this will allow you to run the code and see the change in action).
3. Make a commit & push to github.

In oder to deploy the change please follow the steps below:
1. Create a new version of the script in the App Scripts project:
   1. Open the App Scripts project.
   2. Click the arrow on the 'Deploy' button.
   3. Select 'Manage deployments'.
   4. Click the pencil icon to go into the edit mode.
   5. Select the 'New version' in the 'Version' dropdown.
   6. Click 'deploy'.
   7. Click 'done'.
2. Update the version of the script in the Google Cloud project:
   1. Go to the Google Cloud project.
   2. Put 'workspace marketplace SDK' in the search box at the top & navigate to it.
   3. Click 'Manage'.
   4. Go to 'APP CONFIGURATION'.
   5. Put the new version of the script in the 'Sheets Add-on script version' section.
   6. Click 'save'.

### Setting up a new Slack channel

Make sure you've been added as a collaborator to the "Scheduling Demand Slackbot" app. Then:

1. Set up a new Slack Webhook:
   1. In a browser go to your [Slack apps](https://api.slack.com/apps).
   2. Click on the app called "Scheduling Demand Slackbot".
   3. Click on "Incoming Webhooks" (left hand menu).
   4. If you want to delete the Webhook connecting the old Slack channel to the add-on, click on the bin icon of that Webhook.
   5. Click on "Add New Webhook to Workspace".
   6. Choose the new channel from the dropdown and choose "Allow".
   7. Copy the new Webhook URL.

2. Open the mother Apps Script project.
3. Navitgate to the project settings and scroll down to "Script Properties".
4. There should be a property called "WEBHOOK_URL". Click "Edit script properties" and paste the new URL into the value field.
5. Test that everything works by [Running](#running) the script.
6. Once tested, you can publish your changes as an add-on (follow [above deploy steps](#code-changes-and-deployment)).

## User's guide

### Set up
The Add-On only needs to be installed once. In order to do it, please follow the steps below:
1. Open a spreadsheet in Google Sheets.
2. Open 'Extensions' > 'Add-ons' > 'Get add-ons' in the top menu.
3. Click 'Internal apps' button.
4. Click 'Scheduling Demand Slackbot'.
5. Click 'Install' button.
6. If prompted, click 'Continue' and give the necessary permissions.

This will install the script in your Google Sheets. You can check if it's been installed correctly by clicking on the 'Extensions' in the top menu. Now you should see 'Scheduling Demand Slackbot' menu item. If it doesn't show, please refresh the document and wait a few seconds.

### Running

Open 'Extensions' > 'Scheduling Demand Slackbot' from the top menu and click 'Send to Slack'.

If you get an error message with the following text "Error: There is a problem with the table headers" ensure that the columns of the spreadsheet are in the correct order and have the right names (see [above](#column-order-of-spreadsheet)).