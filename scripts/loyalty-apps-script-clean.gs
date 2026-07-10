var SPREADSHEET_ID = "PEGA_ACA_EL_ID_DE_TU_SHEET";
var SHEET_USUARIOS = "usuarios";
var SHEET_CONFIG = "config";

function doGet(e) {
  try {
    var action = e.parameter.action;
    var phone = e.parameter.phone;
    var apiKey = e.parameter.key;
    if (!validateApiKey(apiKey)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    if (action === "get" && phone) {
      return getUser(phone);
    }
    if (action === "stats") {
      return getStats();
    }
    return jsonResponse({ error: "Invalid action" }, 400);
  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var apiKey = body.key;
    if (!validateApiKey(apiKey)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    if (body.action === "add Purchase") {
      return addPurchase(body.phone, body.name);
    }
    if (body.action === "reset") {
      return resetUser(body.phone);
    }
    return jsonResponse({ error: "Invalid action" }, 400);
  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

function validateApiKey(key) {
  try {
    var sheet = getOrCreateSheet(SHEET_CONFIG);
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === "api_key" && String(data[i][1]) === String(key)) {
        return true;
      }
    }
    return false;
  } catch (err) {
    Logger.log("validateApiKey error: " + err);
    return false;
  }
}

function getUser(phone) {
  var sheet = getOrCreateSheet(SHEET_USUARIOS);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      return jsonResponse({
        phone: String(data[i][0]),
        name: String(data[i][1] || ""),
        purchases: parseInt(data[i][2]) || 0,
        lastPurchase: data[i][3] ? String(data[i][3]) : null,
        rewardReady: (parseInt(data[i][2]) || 0) >= 10
      });
    }
  }
  sheet.appendRow([String(phone), "", 0, new Date().toISOString()]);
  return jsonResponse({
    phone: String(phone),
    name: "",
    purchases: 0,
    lastPurchase: null,
    rewardReady: false
  });
}

function addPurchase(phone, name) {
  var sheet = getOrCreateSheet(SHEET_USUARIOS);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      var current = parseInt(data[i][2]) || 0;
      var newCount = current + 1;
      sheet.getRange(i + 1, 3).setValue(newCount);
      sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
      if (name) sheet.getRange(i + 1, 2).setValue(name);
      return jsonResponse({
        phone: String(phone),
        name: name || String(data[i][1] || ""),
        purchases: newCount,
        lastPurchase: new Date().toISOString(),
        rewardReady: newCount >= 10,
        added: true
      });
    }
  }
  sheet.appendRow([String(phone), name || "", 1, new Date().toISOString()]);
  return jsonResponse({
    phone: String(phone),
    name: name || "",
    purchases: 1,
    lastPurchase: new Date().toISOString(),
    rewardReady: false,
    added: true
  });
}

function resetUser(phone) {
  var sheet = getOrCreateSheet(SHEET_USUARIOS);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      sheet.getRange(i + 1, 3).setValue(0);
      sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
      return jsonResponse({ phone: String(phone), purchases: 0, reset: true });
    }
  }
  return jsonResponse({ error: "User not found" }, 404);
}

function getStats() {
  var sheet = getOrCreateSheet(SHEET_USUARIOS);
  var data = sheet.getDataRange().getValues();
  var totalUsers = 0;
  var totalPurchases = 0;
  var rewardsReady = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      totalUsers++;
      var purchases = parseInt(data[i][2]) || 0;
      totalPurchases += purchases;
      if (purchases >= 10) rewardsReady++;
    }
  }
  return jsonResponse({ totalUsers: totalUsers, totalPurchases: totalPurchases, rewardsReady: rewardsReady });
}

function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === SHEET_USUARIOS) {
      sheet.appendRow(["telefono", "nombre", "compras", "fecha_ultima"]);
    }
    if (name === SHEET_CONFIG) {
      sheet.appendRow(["clave", "valor"]);
      var apiKey = generateApiKey();
      sheet.appendRow(["api_key", apiKey]);
      Logger.log("API Key generada: " + apiKey);
    }
  }
  return sheet;
}

function generateApiKey() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var key = "";
  for (var i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

function jsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function setupInicial() {
  var sheet = getOrCreateSheet(SHEET_CONFIG);
  Logger.log("Sheet config creada.");
}

function verApiKey() {
  var sheet = getOrCreateSheet(SHEET_CONFIG);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === "api_key") {
      Logger.log("API Key: " + data[i][1]);
      return;
    }
  }
  Logger.log("No se encontro API key");
}
