function sendAllMessages() {
  const spreadsheetContent = getDataFromSpreadsheet();
  const messages = createMessages(spreadsheetContent);
  messages.forEach((message) => {
    sendSlackMessage(message);
  })
}

function getDataFromSpreadsheet() {
  const activeSpreadsheet = SpreadsheetApp.getActive();
  const firstSheet = activeSpreadsheet.getSheets()[0];
  const range = firstSheet.getDataRange();
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

  const intro_message = buildBlock(":bell: *Hello, here are the latest billable roles we are looking to fill:*");

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