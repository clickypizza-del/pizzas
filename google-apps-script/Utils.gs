function validateApiKey(key) {
  if (!key) return false;
  return key === API_KEY;
}

function logError(action, message, stack) {
  try {
    var sheet = getSheet("Logs");
    if (!sheet) return;
    sheet.appendRow([
      new Date(),
      "error",
      action || "unknown",
      message || "",
      (stack || "").substring(0, 500)
    ]);
  } catch (e) {
    console.error("Error logging:", e);
  }
}

function logAction(action, detail, result) {
  try {
    var sheet = getSheet("Logs");
    if (!sheet) return;
    sheet.appendRow([
      new Date(),
      "info",
      action || "unknown",
      detail || "",
      result || ""
    ]);
  } catch (e) {
    console.error("Error logging:", e);
  }
}
