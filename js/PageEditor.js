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
	var iframe = document.getElementById("visor-if");
	iframe.contentWindow.document.querySelectorAll(".edit-text").forEach( (element) => {
		element.addEventListener("click", (event) => {
			//Obtengo el texto del iframe y lo coloco en en textbox
			window.parent.document.getElementById("nuevoTexto").innerHTML = element.innerHTML;
			var textInputElement = window.parent.document.getElementById('nuevoTexto');
			//Actualizo el contenido del textbox conforme se modifica
			textInputElement.addEventListener('keyup', function(){
				var text = textInputElement.value;
				element.innerHTML = text;
			});
			//Botones de alineación de texto
			var leftBtn = window.parent.document.getElementById("left");
			var centerBtn = window.parent.document.getElementById("center");
			var rightBtn = window.parent.document.getElementById("right");
			leftBtn.addEventListener('click', function(){
				element.style.textAlign='left';
			})
			centerBtn.addEventListener('click', function(){
				element.style.textAlign='center';
			})
			rightBtn.addEventListener('click', function(){
				element.style.textAlign='right';
			})
			//Botones de formato
			var boldBtn = window.parent.document.getElementById("bold");
			var underlineBtn = window.parent.document.getElementById("underline");
			var italicBtn = window.parent.document.getElementById("italic");
			boldBtn.addEventListener('click', function(){
				if (element.style.fontWeight == 'bold') {
					element.style.fontWeight='normal';
				} else {
					element.style.fontWeight='bold';
				}
				
			})
			underlineBtn.addEventListener('click', function(){
				if (element.style.textDecoration == 'underline'){
                	element.style.textDecoration = 'none';
				}else{
                	element.style.textDecoration = 'underline';
				}
			})
			italicBtn.addEventListener('click', function(){
				if (element.style.fontStyle == 'italic'){
            		element.style.fontStyle = 'normal';
				}else{
					element.style.fontStyle = 'italic';
				}
			})
			//Color Picker
			let colour = window.parent.document.getElementById("colorPicker");
			colour.addEventListener('input', () =>{
				element.style.color = colour.value;
			});
			//Boton 'Guardar cambios'
			var guardar = window.parent.document.getElementById("guardaCambios");
			guardar.addEventListener('click', function() {
				$("#menu3")[0].classList.add("panel-hidden");
				return;
			})
		});
	} );
	ocultaPaneles();
	$("#menu3")[0].classList.remove("panel-hidden");
});
$("#btn-4")[0].addEventListener("click", function() {
	var iframe = document.getElementById("visor-if");
	iframe.contentWindow.document.querySelectorAll(".edit-image").forEach( (element) => {
		element.addEventListener("click", (event) => {
			var inputImage = window.parent.document.getElementById('file-upload');
			var formData = new FormData();
			formData.append("fileToUpload", blobFile);

			$.ajax({
			url: "wasd",
			type: "IMAGE",
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				console.log("ahuevo")
			},
			error: function(jqXHR, textStatus, errorMessage) {
				console.log(errorMessage); // Opcional
			}
			});
			//No logré solucionar esto aún, pero sigo en eso
		} );
	} );
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