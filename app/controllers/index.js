// Cargo la funcinalidad para Ajax.
var utilidadAjax = require('feed'); // TIENE que estar en <lib>

// Feed a abrir
var urlFeed = "http://wmedia.es/?feed=json";

// Procesar el feed y guardarlo en un objeto Json
function siHayExito(responseText) {
	
	// Ocultamos el cargador
	Alloy.Globals.loading.hide();

	var feedParseado = JSON.parse(responseText);
	
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
	
	// Asociamos el objeto con las filas a la 'tableView'
	$.tablaNoticias.data = filas;
};

// Callback para los errores
function siHayError(errorDevuelto) {
	Alloy.Globals.loading.hide();
	console.log(errorDevuelto);
};

// Lanzamos la lectura del feed
function cargarRss() {
	utilidadAjax.obtenerDatosTabla(urlFeed, siHayExito, siHayError);
};

// Carga inicial
cargarRss();

// Abrir los detalles de un elemento de contenido específico
var abrirDetalle = function(datos) {
	
	var detalle = Alloy.createController("detalle");
	
	// Invoca la función 'abrirURL' del controlador 'detale' con
	// la dirección URL que proviene de la fila en cuestión 
	// donde se haya realizado el tap/click
	detalle.abrirURL(datos.row.direccion);
	
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