var API_KEY = "cp_2025_sk_a1b2c3d4e5f6g7h8";
var SHEET_ID = "1_S8KfqB_xB359tuyMXXwTVrU2SycnIwl8LET1orlQ7I";

function getSheet(name) {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
}

function getConfigRow(clave) {
  var sheet = getSheet("Configuracion");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === clave) return data[i][1];
  }
  return null;
}
