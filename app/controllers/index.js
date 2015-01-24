var feed = require('feed');

// Procesar el feed y guardarlo en un objeto Json
var onSucces = function(respuesta) {

	var feedParseado = JSON.parse(respuesta);
	var fila,
	    payload;
	var filas = [];

	// Por cada una de las noticias, debo crear una fila
	// para la tableView con los datos individuales del contenido
	feedParseado.forEach(function(noticia) {

		// Guardo los datos de cada noticia en el objeto payload
		payload = {
			titulo : noticia.title,
			previo : noticia.excerpt,
			thumb : noticia.thumbnail,
			direccion : noticia.permalink
		};

		// Pora cada fila instanciamos el controlador de las filas
		// y obtenemos su vista
		fila = Alloy.createController('fila', payload).getView();

		// Y vamos guardando cada fila en la matriz filas
		filas.push(fila);
	});

	// Le pasamos la matriz con las filas a la tableView
	$.tablaNoticias.data = filas;
};

// Callback para los errores
var onError = function(errorDevuelto) {
	console.log(errorDevuelto);
};

// Feed a abrir
var urlFeed = "http://wmedia.es/?feed=json";

// Lanzamos la lectura del feed
feed.obtenerDatosTabla(urlFeed, onSucces, onError);

var abrirDetalle = function(datos) {
	var detalle = Alloy.createController("detalle");
	detalle.abrirDetalle(datos.row.direccion);
	var vistaDetalle = detalle.getView();

	

	if (OS_IOS) {
		$.navigationWindow.openWindow(vistaDetalle);
	} else {
		vistaDetalle.open();
	}

};

// Abrimos la navigation Window
if (OS_IOS) {
	$.navigationWindow.open();
} else {
	$.index.open();
}

