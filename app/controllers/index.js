// Conectar con el feed a procesar
var obtenerDatosTabla = function(url,onSucces,onError){
	var client = Ti.Network.createHTTPClient({
		
		// Cuando los datos están disponibles, cargados
		onload : function(e) {
			onSucces(this.responseText);
		},
		
		// Error, incluyendo el timeout
		onerror : function(e) {
			onError(e);
		},
		timeout : 5000  // in milliseconds
	});

	// Abrimos la conexión
	client.open("GET", url);
	// Enviamos la petición
	client.send();
};

// Procesar el feed y guardarlo en un objeto Json
var onSucces = function(respuesta) {
	
	var feedParseado = JSON.parse(respuesta);
	var fila, payload;
	var filas = [];
	
	// Por cada una de las noticias, debo crear una fila 
	// para la tableView con los datos individuales del contenido	
	feedParseado.forEach(function(noticia){ 
	
		// Guardo los datos de cada noticia en el objeto payload
		payload = {
			titulo: noticia.title,
			previo: noticia.excerpt,
			thumb: noticia.thumbnail
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
var feed = "http://wmedia.es/?feed=json";

// Lanzamos la lectura del feed
obtenerDatosTabla(feed, onSucces, onError);

// Abrimos la ventana principal
$.index.open();
