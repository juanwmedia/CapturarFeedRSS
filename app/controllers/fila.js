var args = arguments[0] || {};

// Capturamos los datos que nos envíarán desde el controlador principal
// y los asignamos a los elementos del interfaz de la vista fila
$.thumb.image = args.thumb;
$.titulo.text = args.titulo; // Corresponde con la propiedad del objeto payload
$.previo.text = args.previo;

// Podemos guardar datos como variable local de ese controlador
// En este caso usaremos esta dirección para abrir una 'webView' con ella
$.fila.direccion = args.direccion;