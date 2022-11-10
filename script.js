function start() {
  const data = getDataFromSpreadsheet();
  const payload = buildPayload(data);
  payload.forEach((message) => {
    sendSlackMessage(message);
  })
}

function getDataFromSpreadsheet() {
  const spreadsheet = SpreadsheetApp.getActive();
  const firstSheet = spreadsheet.getSheets()[0];
  const range = firstSheet.getDataRange();
  const values = range.getValues();
  return values;
}

function buildPayload(data) {

  const schedulingDemands = data.slice(1).map(column => {
    const account = column[0];
    const assignment_demand = column[1];
    const start_date = column[2].toLocaleDateString();
    const end_date = column[3].toLocaleDateString();

    const message = `*${assignment_demand}*\n${account}\n${start_date} to ${end_date}`
    return message
  });

  const payload_header = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":bell: *Hello here are the latest billable roles we are looking to fill:* :bell:"
        }
      }
    ]
  };

  let payload_messages = [payload_header]

  schedulingDemands.forEach((demand) => {
    payload_messages.push({
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": demand
          }
        }
      ]
    });
  })

  return payload_messages;
}

function sendSlackMessage(payload) {
  var webhookUrl = ScriptProperties.getProperty('WEBHOOK_URL');

  const options = {
    "method": "post",
    "contentType": "application/json",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(webhookUrl, options);
  } catch (e) {
    Logger.log(e);
  }
}