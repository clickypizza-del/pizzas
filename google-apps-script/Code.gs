function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var params = e.parameter || {};
  var action = params.action;
  var apiKey = params.apiKey || params.api_key;

  var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  };

  if (!validateApiKey(apiKey)) {
    return jsonResponse({ ok: false, error: "API key invalida" }, 401, corsHeaders);
  }

  try {
    var result;
    switch (action) {
      case "productos":
        result = getProductos();
        break;
      case "producto":
        result = getProducto(params.id);
        break;
      case "categorias":
        result = getCategorias();
        break;
      case "stock":
        result = getStock();
        break;
      case "config":
        result = getConfig();
        break;
      case "promociones":
        result = getPromociones();
        break;
      default:
        result = { ok: false, error: "Accion no valida: " + action, status: 400 };
    }

    var statusCode = result.status || 200;
    delete result.status;
    return jsonResponse(result, statusCode, corsHeaders);

  } catch (err) {
    logError(action, err.message, err.stack);
    return jsonResponse(
      { ok: false, error: err.message },
      500,
      corsHeaders
    );
  }
}

function jsonResponse(data, code, extraHeaders) {
  var code = code || 200;
  var textOutput = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  return textOutput;
}
