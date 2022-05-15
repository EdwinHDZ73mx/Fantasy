// ---------------------------------------------------------------- //
// ---------------Bind events to modified elements----------------- //
// ---------------------------------------------------------------- //

// Menú Links
// Imágenes
// Texto
document.querySelectorAll(".edit-text").forEach( (element) => {
	element.addEventListener("mouseover", () => {
		element.style.boxShadow = "#FF0000 0px 0px 10px";
	} );
} );