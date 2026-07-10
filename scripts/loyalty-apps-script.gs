/**
 * Club Clicky — Loyalty API (Google Apps Script)
 *
 * SETUP:
 * 1. Crear un Google Sheet vacío
 * 2. Copiar el ID de la URL (entre /d/ y /edit)
 *    Ejemplo: https://docs.google.com/spreadsheets/d/ESTE_ID_AQUI/edit
 * 3. Pegar este código en Apps Script
 * 4. Reemplazar SPREADSHEET_ID abajo con tu ID
 * 5. Deploy → New deployment → Web app → Execute as: Me → Anyone
 * 6. Copiar la URL del deployment
 */

// ⚠️ REEMPLAZAR CON EL ID DE TU GOOGLE SHEET
const SPREADSHEET_ID = "PEGA_ACA_EL_ID_DE_TU_SHEET";

const SHEET_USUARIOS = "usuarios";
const SHEET_CONFIG = "config";

function doGet(e) {
  try {
    const action = e.parameter.action;
    const phone = e.parameter.phone;
    const apiKey = e.parameter.key;

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
    const body = JSON.parse(e.postData.contents);
    const apiKey = body.key;

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
    const sheet = getOrCreateSheet(SHEET_CONFIG);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
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
  const sheet = getOrCreateSheet(SHEET_USUARIOS);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      return jsonResponse({
        phone: String(data[i][0]),
        name: String(data[i][1] || ""),
        purchases: parseInt(data[i][2]) || 0,
        lastPurchase: data[i][3] ? String(data[i][3]) : null,
        rewardReady: (parseInt(data[i][2]) || 0) >= 10,
      });
    }
  }

  // Crear usuario nuevo
  sheet.appendRow([String(phone), "", 0, new Date().toISOString()]);
  return jsonResponse({
    phone: String(phone),
    name: "",
    purchases: 0,
    lastPurchase: null,
    rewardReady: false,
  });
}

function addPurchase(phone, name) {
  const sheet = getOrCreateSheet(SHEET_USUARIOS);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      const current = parseInt(data[i][2]) || 0;
      const newCount = current + 1;
      sheet.getRange(i + 1, 3).setValue(newCount);
      sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
      if (name) sheet.getRange(i + 1, 2).setValue(name);

      return jsonResponse({
        phone: String(phone),
        name: name || String(data[i][1] || ""),
        purchases: newCount,
        lastPurchase: new Date().toISOString(),
        rewardReady: newCount >= 10,
        added: true,
      });
    }
  }

  // No existe — crear con 1 compra
  sheet.appendRow([String(phone), name || "", 1, new Date().toISOString()]);
  return jsonResponse({
    phone: String(phone),
    name: name || "",
    purchases: 1,
    lastPurchase: new Date().toISOString(),
    rewardReady: false,
    added: true,
  });
}

function resetUser(phone) {
  const sheet = getOrCreateSheet(SHEET_USUARIOS);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(phone)) {
      sheet.getRange(i + 1, 3).setValue(0);
      sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
      return jsonResponse({ phone: String(phone), purchases: 0, reset: true });
    }
  }

  return jsonResponse({ error: "User not found" }, 404);
}

function getStats() {
  const sheet = getOrCreateSheet(SHEET_USUARIOS);
  const data = sheet.getDataRange().getValues();
  let totalUsers = 0;
  let totalPurchases = 0;
  let rewardsReady = 0;

  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) {
      totalUsers++;
      const purchases = parseInt(data[i][2]) || 0;
      totalPurchases += purchases;
      if (purchases >= 10) rewardsReady++;
    }
  }

  return jsonResponse({ totalUsers, totalPurchases, rewardsReady });
}

function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === SHEET_USUARIOS) {
      sheet.appendRow(["telefono", "nombre", "compras", "fecha_ultima"]);
    }
    if (name === SHEET_CONFIG) {
      sheet.appendRow(["clave", "valor"]);
      const apiKey = generateApiKey();
      sheet.appendRow(["api_key", apiKey]);
      Logger.log("API Key generada: " + apiKey);
    }
  }

  return sheet;
}

function generateApiKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * FUNCIONES AUXILIARES — ejecutar desde el editor para debug
 */

// Ejecutar esto UNA VEZ para generar la API key inicial
function setupInicial() {
  const sheet = getOrCreateSheet(SHEET_CONFIG);
  Logger.log("Sheet config creada. Revisá la hoja en Google Sheets.");
}

// Ver la API key actual
function verApiKey() {
  const sheet = getOrCreateSheet(SHEET_CONFIG);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "api_key") {
      Logger.log("API Key: " + data[i][1]);
      return;
    }
  }
  Logger.log("No se encontró API key");
}

// Test: agregar una compra de prueba
function testAgregarCompra() {
  const result = addPurchase("5492615551234", "Test");
  Logger.log(JSON.stringify(result));
}

// Test: buscar usuario
function testBuscarUsuario() {
  const result = getUser("5492615551234");
  Logger.log(JSON.stringify(result));
}
