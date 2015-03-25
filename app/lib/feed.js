// Conectar con el feed a procesar
exports.obtenerDatosTabla = function(urlFeed, siHayExito, siHayError){
	
	// Lanzamos el mensaje de cargando...
	Alloy.Globals.loading.show('Cargando feed...', false);
	
	var client = Ti.Network.createHTTPClient({
		
		// Cuando los datos están disponibles, cargados
		onload : function(e) {
			siHayExito(this.responseText);
		},
		
		// Error, incluyendo el timeout
		onerror : function(e) {
			siHayError(e);
		},
		timeout : 5000  // in milliseconds
	});

	// Abrimos la conexión
	client.open("GET", urlFeed);
	
	// Enviamos la petición
	client.send();
};