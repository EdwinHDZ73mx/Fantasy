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
			ruta = "./templates/catalogo/";
			break;
		case "2":
			ruta = "./templates/empresa/";
			break;
		case "3":
			ruta = "./templates/inventario/";
			break;
		case "4":
			ruta = "./templates/podcast/";
			break;
		case "5":
			ruta = "./templates/sitio-personal/";
			break;
		case "6":
			ruta = "./templates/tarjeta-presentacion/";
		default:
			break;
	}
	$("#visor-if").attr("src", ruta + "index.html").ready( () => {  });
}
// Funciones
// Función para comprimir archivos
function comprime( ruta, name, zip ) {
	var archivo = new XMLHttpRequest();
	archivo.onreadystatechange = function() {
		if (archivo.readyState == XMLHttpRequest.DONE) {
			if (archivo.status == 200) {
				zip.file( name, archivo.responseText );
			}
		}
	};
	archivo.open("GET", ruta + name, true);
	archivo.send();
}

function comprime_index( zip ) {
	zip.file( "index.html", $("#visor-if").contents().find("html").html() );
}

// Función para mostrar y ocultar paneles
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

	let plantilla = getParameterByName("plantilla");
	let ruta = "none";
	switch (plantilla) {
		case "1":
			ruta = "./templates/catalogo/";
			break;
		case "2":
			ruta = "./templates/empresa/";
			break;
		case "3":
			ruta = "./templates/inventario/";
			break;
		case "4":
			ruta = "./templates/podcast/";
			break;
		case "5":
			ruta = "./templates/sitio-personal/";
			break;
		case "6":
			ruta = "./templates/tarjeta-presentacion/";
		default:
			break;
	}

	// JS zip
	var zip = new JSZip();
	comprime_index( zip );
	comprime( ruta,  "estilos.css", zip );
	comprime( ruta,  "index.js", zip );

	// Timer de 3 segundos
	setTimeout(function() {
		zip.generateAsync({type:"blob"}).then(function(content) {
			saveAs(content, "plantilla" + plantilla + ".zip");
		});
	}, 2000);
});

// Onload
$(document).ready(function() {
	getTemplate();
});