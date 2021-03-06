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
	$("#menu7")[0].classList.add("panel-hidden");
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
var elem;
$("#btn-4")[0].addEventListener("click", function() {
	var iframe = document.getElementById("visor-if");
	iframe.contentWindow.document.querySelectorAll(".edit-image").forEach( (element) => {
		//Coloco la miniatura de la imagen seleccionada
		element.addEventListener("click", (event) => {
			window.parent.document.getElementById("imgSelec").setAttribute("src",element.getAttribute("src"));
			elem = element;
		} );
		subeArchivos();
	} );
	ocultaPaneles();
	$("#menu4")[0].classList.remove("panel-hidden");
});
$("#btn-5")[0].addEventListener("click", function() {
	var iframe = document.getElementById("visor-if");
	iframe.contentWindow.document.querySelectorAll(".edit-text").forEach( (element) => {
		element.addEventListener("click", (event) => {
			var link, url;
			var tbLink = window.parent.document.getElementById("nuevoLink");
			var tbURL = window.parent.document.getElementById("nuevaURL");
			var vinculo = window.parent.document.getElementById("vinculo");
			tbLink.addEventListener('keyup', function(){
				link = tbLink.value;
			});
			tbURL.addEventListener('keyup', function(){
				url = tbURL.value;
			});
			vinculo.addEventListener('click', function() {
				var nodo = document.createElement("a");
				nodo.innerHTML = link;
				nodo.setAttribute("href",url);
				element.appendChild(nodo);
			})
		});
	});
	ocultaPaneles();
	$("#menu5")[0].classList.remove("panel-hidden");
});
$("#btn-7")[0].addEventListener("click", function() {
	var iframe = document.getElementById("visor-if");
	//Medidas preestablecidas
	document.getElementById("celularV").addEventListener("click", function(){
		iframe.setAttribute("width","300");
		iframe.setAttribute("height","450");
	});
	document.getElementById("celularH").addEventListener("click", function(){
		iframe.setAttribute("width","450");
		iframe.setAttribute("height","300");
	});
	document.getElementById("tabletV").addEventListener("click", function(){
		iframe.setAttribute("width","380");
		iframe.setAttribute("height","550");
	});
	document.getElementById("tabletH").addEventListener("click", function(){
		iframe.setAttribute("width","550");
		iframe.setAttribute("height","380");
	});
	document.getElementById("def").addEventListener("click", function(){
		iframe.setAttribute("width","100%");
		iframe.setAttribute("height","100%");
	});
	//Medida personalizada
	var ancho = document.getElementById('nuevoAncho');
	var alto = document.getElementById('nuevoAlto');
	//Actualizo el contenido del textbox conforme se modifica
	ancho.addEventListener('keyup', function(){
		iframe.setAttribute("width", ancho.value);
	});
	alto.addEventListener('keyup', function(){
		iframe.setAttribute("width", alto.value);
	});
	ocultaPaneles();
	$("#menu7")[0].classList.remove("panel-hidden");
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
	var img = zip.folder("resources");

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

function subeArchivos(){
	const dropArea = document.querySelector(".drag-area"),
	dragText = dropArea.querySelector("header"),
	button = dropArea.querySelector("button"),
	dragToUploadForm = document.querySelector("#dragToUploadForm"),
	input = dropArea.querySelector("#inputFile");
	let files; //this is a global variable and we'll use it inside multiple functions

	dragToUploadForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if (files) {
			e.submit();
		}
	});
	button.addEventListener("click", (e) => {
		input.click(); //if user click on the button then the input also clicked
	});
	input.addEventListener("change", function () {
		//getting user select file and [0] this means if user select multiple files then we'll select only the first one
		files = this.files[0];
		dropArea.classList.add("active");
		showFile(files); //calling function
	});

	//If user Drag File Over DropArea
	dropArea.addEventListener("dragover", (event) => {
		event.preventDefault(); //preventing from default behaviour
		dropArea.classList.add("active");
		dragText.textContent = "Release to Upload File";
	});

	//If user leave dragged File from DropArea
	dropArea.addEventListener("dragleave", () => {
		dropArea.classList.remove("active");
		dragText.textContent = "Drag & Drop to Upload File";
	});

	//If user drop File on DropArea
	dropArea.addEventListener("drop", (event) => {
		event.preventDefault(); //preventing from default behaviour
		//getting user select file and [0] this means if user select multiple files then we'll select only the first one
		files = event.dataTransfer.files;
		showFile(files); //calling function
		dropArea.classList.remove("active");
	});
	function showFile(files) {
		[...files].forEach((file) => {
			let fileType = file.type; //getting selected file type
			let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
			if (validExtensions.includes(fileType)) {
				//if user selected file is an image file
				let fileReader = new FileReader(); //creating new FileReader object
				fileReader.onload = () => {
					let fileURL = fileReader.result; //passing user file source in fileURL variable
					// UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
					const image = document.createElement("img");
					image.src = fileURL;
					image.setAttribute("width", "50px");
					let imgTag = `<img src="${fileURL}" id="fotito" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
					dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
					//document.querySelector("#preview").appendChild(image);
					document.getElementById("replace").addEventListener("click", function(){
						elem.setAttribute("src",document.getElementById("fotito").getAttribute("src"));
					});
					
				};
				fileReader.readAsDataURL(file);
			} else {
				alert("Esta no es una imagen :c");
				dropArea.classList.remove("active");
				dragText.textContent = "Drag & Drop to Upload File";
			}
		});
	}
}