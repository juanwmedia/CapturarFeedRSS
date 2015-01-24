// Conectar con el feed a procesar
exports.obtenerDatosTabla = function(url,onSucces,onError){
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