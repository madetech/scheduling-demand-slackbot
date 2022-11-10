function start() {
  const data = getDataFromSpreadsheet();
  const payload = buildPayload(data);
  sendSlackMessage(payload);
}

function getDataFromSpreadsheet() {
  const spreadsheet = SpreadsheetApp.getActive();
  const firstSheet = spreadsheet.getSheets()[0];
  const range = firstSheet.getDataRange();
  const values = range.getValues();
  return values;
}

function buildPayload(data) {
  const schedulingDemands = data.slice(1).map(row => {
    const message = `*${row[1]}*\n${row[0]}\n${row[2]} to ${row[3]}`
    return message
  }).join("\n\n");

  const payload = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":bell: *Hello here are the latest billable roles we are looking to fill:* :bell:"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": schedulingDemands
        }
      }
    ]
  }
  return payload;
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