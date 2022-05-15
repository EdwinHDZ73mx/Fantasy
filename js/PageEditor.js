// Obtener la plantilla seleccionada
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getTemplate() {
	let plantilla = getParameterByName("plantilla");
	let ruta = "none";
	switch (plantilla) {
		case "1":
			ruta = "./templates/catalogo/index.html";
			break;
		case "2":
			ruta = "./templates/empresa/index.html";
			break;
		case "3":
			ruta = "./templates/inventario/index.html";
			break;
		case "4":
			ruta = "./templates/podcast/index.html";
			break;
		case "5":
			ruta = "./templates/sitio-personal/index.html";
			break;
		case "6":
			ruta = "./templates/tarjeta-presentacion/index.html";
		default:
			break;
	}
	$("#visor-if").attr("src", ruta).ready( () => {  });
}
// Funciones
function ocultaPaneles() {
	$("#menu2")[0].classList.add("panel-hidden");
	$("#menu3")[0].classList.add("panel-hidden");
	$("#menu4")[0].classList.add("panel-hidden");
	$("#menu5")[0].classList.add("panel-hidden");
	$("#menu6")[0].classList.add("panel-hidden");
}
// Eventos
$("#btn-2")[0].addEventListener("click", function() {
	ocultaPaneles();
	$("#menu2")[0].classList.remove("panel-hidden");
});
$("#btn-3")[0].addEventListener("click", function() {
	ocultaPaneles();
	$("#menu3")[0].classList.remove("panel-hidden");
});
$("#btn-4")[0].addEventListener("click", function() {
	ocultaPaneles();
	$("#menu4")[0].classList.remove("panel-hidden");
});
$("#btn-5")[0].addEventListener("click", function() {
	ocultaPaneles();
	$("#menu5")[0].classList.remove("panel-hidden");
});
$("#btn-6")[0].addEventListener("click", function() {
	ocultaPaneles();
	$("#menu6")[0].classList.remove("panel-hidden");
});

// Onload
$(document).ready(function() {
	getTemplate();
});