var args = arguments[0] || {};

// Capturamos los datos que nos envíarán desde el controlador principal
// y los asignamos a los elementos del interfaz de la vista fila
$.thumb.image = args.thumb;
$.titulo.text = args.titulo; // Corresponde con la propiedad del objeto payload
$.previo.text = args.previo;
$.fila.direccion = args.direccion;