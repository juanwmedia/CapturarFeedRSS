// Cargo la funcinalidad para Ajax.
var utilidadAjax = require('feed');

// Procesar el feed y guardarlo en un objeto Json
var siHayExito = function(respuesta) {
	
	Alloy.Globals.loading.hide();

	var feedParseado = JSON.parse(respuesta);
	
	var fila, payload;
	    
	var filas = []; // Array

	// Por cada una de las noticias, debo crear una fila
	// para la tableView con los datos individuales del contenido
	var i = 1;
	
	
	feedParseado.forEach(function(cadaNoticia) {

		// Guardo los datos de cada noticia en el objeto payload
		payload = {
			titulo : cadaNoticia.title,
			previo : cadaNoticia.excerpt,
			thumb : cadaNoticia.thumbnail,
			direccion : cadaNoticia.permalink
		};
		
		//////// INFO
		console.log('Payload ' + i + ' ' + JSON.stringify(payload));
		i++;
		////////

		// Pora cada fila instanciamos el controlador de las filas
		// y obtenemos su vista
		fila = Alloy.createController('fila', payload).getView();

		// Y vamos guardando cada fila en la matriz filas
		filas.push(fila);
		
		
	});
	
	// FIN BUCLE

	// Le pasamos la matriz con las filas a la tableView
	$.tablaNoticias.data = filas;
};

// Callback para los errores
var siHayError = function(errorDevuelto) {
	Alloy.Globals.loading.hide();
	console.log(errorDevuelto);
};

// Feed a abrir
var urlFeed = "http://wmedia.es/?feed=json";

// Lanzamos la lectura del feed
function cargarRss() {
	utilidadAjax.obtenerDatosTabla(urlFeed, siHayExito, siHayError);
};

// Carga inicial
cargarRss();

// Abrir los detalles de un elemento de contenido específico
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

// Lanzamos la App, primera carga, portada
if (OS_IOS) {
	$.navigationWindow.open();
} else {
	$.index.open();
}