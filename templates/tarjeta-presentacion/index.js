// ---------------------------------------------------------------- //
// ---------------Bind events to modified elements----------------- //
// ---------------------------------------------------------------- //

// Menú Links
// Imágenes
document.querySelectorAll(".edit-image").forEach( (element) => {
	element.addEventListener("click", (event) => {
		let newURL = prompt("Nueva imágen:", "ej: http://dom.com/imagen.jpg");
		if (newURL != null) { element.innerHTML = newURL; }
	} );
} );
// Texto
document.querySelectorAll(".edit-text").forEach( (element) => {
	element.addEventListener("click", (event) => {
		let newText = prompt("Nuevo Texto:", element.innerHTML);
		if (newText != null) { element.innerHTML = newText; }
	} );
} );