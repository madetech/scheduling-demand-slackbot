function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Send to Slack', 'sendAllMessages')
    .addToUi();
}

function sendAllMessages() {
  const spreadsheetContent = getDataFromSpreadsheet();
  const messages = createMessages(spreadsheetContent);
  messages.forEach((message) => {
    sendSlackMessage(message);
  })
}

function validateColumnHeaders(range) {
  const account = range.getCell(1, 1).getValue();
  const assignment_demand = range.getCell(1, 2).getValue();
  const start_date = range.getCell(1, 3).getValue();
  const end_date = range.getCell(1, 4).getValue();

  if (
    !account.includes('Account') ||
    !assignment_demand.includes('Assignment Demand') ||
    !start_date.includes('Start Date') ||
    !end_date.includes('End Date')
    ) {
    throw new Error("There is a problem with the table headers");
  }
}

function getDataFromSpreadsheet() {
  const activeSpreadsheet = SpreadsheetApp.getActive();
  const firstSheet = activeSpreadsheet.getSheets()[0];
  const range = firstSheet.getDataRange();
  validateColumnHeaders(range);
  const values = range.getValues();
  return values;
}

function createMessages(data) {

  const schedulingDemands = data.slice(1).map(column => {
    const account = column[0];
    const assignment_demand = column[1];
    const start_date = column[2].toLocaleDateString();
    const end_date = column[3].toLocaleDateString();

    const message = `*${assignment_demand}* \n${account}\n${start_date} to ${end_date}`
    return message
  });

  const buildBlock = text => {
    return {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": text
          }
        }
      ]
    }
  }

  const intro_message = buildBlock(":bell: *Hello, here are the latest billable roles we are looking to fill. Please reply in the relevant thread if you're interested in a particular role.*");

  let messages = [intro_message]

  schedulingDemands.forEach((demand) => {
    messages.push(buildBlock(demand));
  })

  return messages;
}

function sendSlackMessage(message) {
  const webhookUrl = ScriptProperties.getProperty('WEBHOOK_URL');

  const options = {
    "method": "post",
    "contentType": "application/json",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(message)
  };

  try {
    UrlFetchApp.fetch(webhookUrl, options);
  } catch (e) {
    Logger.log(e);
  }
}