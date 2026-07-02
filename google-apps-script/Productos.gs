function getProductos() {
  var sheet = getSheet("Productos");
  if (!sheet) return { ok: false, error: "Hoja Productos no encontrada", status: 404 };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var products = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;

    var product = {};
    for (var j = 0; j < headers.length; j++) {
      var val = row[j];
      if (headers[j] === "precio" || headers[j] === "precioAnterior" || headers[j] === "stock") {
        val = typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]/g, "")) || 0 : Number(val) || 0;
      }
      product[headers[j]] = val;
    }

    if (product.estado === "disponible" || !product.estado) {
      products.push(product);
    }
  }

  return { ok: true, data: products, count: products.length };
}

function getProducto(id) {
  if (!id) return { ok: false, error: "ID requerido", status: 400 };

  var result = getProductos();
  if (!result.ok) return result;

  var product = result.data.find(function (p) { return p.id === id; });
  if (!product) return { ok: false, error: "Producto no encontrado: " + id, status: 404 };

  return { ok: true, data: product };
}

function getCategorias() {
  var sheet = getSheet("Categorias");
  if (!sheet) return { ok: false, error: "Hoja Categorias no encontrada", status: 404 };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var categories = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    var cat = {};
    for (var j = 0; j < headers.length; j++) {
      cat[headers[j]] = row[j];
    }
    categories.push(cat);
  }

  categories.sort(function (a, b) { return (a.orden || 99) - (b.orden || 99); });

  return { ok: true, data: categories, count: categories.length };
}

function getStock() {
  var result = getProductos();
  if (!result.ok) return result;

  var stock = result.data.map(function (p) {
    return { id: p.id, nombre: p.nombre, stock: p.stock || 0 };
  });

  return { ok: true, data: stock, count: stock.length };
}

function getConfig() {
  var sheet = getSheet("Configuracion");
  if (!sheet) return { ok: false, error: "Hoja Configuracion no encontrada", status: 404 };

  var data = sheet.getDataRange().getValues();
  var config = {};

  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      config[data[i][0]] = data[i][1];
    }
  }

  return { ok: true, data: config };
}

function getPromociones() {
  var sheet = getSheet("Promociones");
  if (!sheet) return { ok: true, data: [], count: 0 };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var promos = [];

  var now = new Date();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;

    var promo = {};
    for (var j = 0; j < headers.length; j++) {
      promo[headers[j]] = row[j];
    }

    if (promo.activa === true || promo.activa === "TRUE" || promo.activa === "true") {
      var inicio = promo.fechaInicio ? new Date(promo.fechaInicio) : null;
      var fin = promo.fechaFin ? new Date(promo.fechaFin) : null;
      if ((!inicio || now >= inicio) && (!fin || now <= fin)) {
        promos.push(promo);
      }
    }
  }

  return { ok: true, data: promos, count: promos.length };
}
