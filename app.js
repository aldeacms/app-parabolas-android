$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
	//navigator.splashscreen.hide();

	$("#menu a").on("click",function(){

		$("#menu td").removeClass("active");
		$(this).parent().addClass("active");
		
		tab = $(this).attr("rel");
		URL = "pages/"+tab+".html";
		titulo = $(this).attr("title");
		tipo = tab;
	
		if (tab=="random"){
			$("#btnSearch").hide();			
			random = Math.floor(Math.random() * (39 - 1 + 1) + 1);
			if(random<10){
				random = random+".html";
				random = "0"+random;
			}
			else{
				random = random+".html";	
			}
			URL = "pages/parabola"+random;
			titulo ="Par&aacute;bola Aleatoria";
			tipo="random";
		}

		abrirPagina(URL,tipo,titulo);

		if($("#listadoParabolas a").length){
			$("#busqueda").on("keyup",function(){
				var search_string = $("#busqueda").val();
				
				search_string = search_string.toLowerCase();

				$( ".parabola" ).each(function( index ) {
					nombre = $(this).data("nombre");
					if(nombre.search(search_string) !=-1){
						$(this).parent().parent().parent().show();
					}
					else{
						$(this).parent().parent().parent().hide();
					}
					
				});
				
			});
			// $("#btnClose").on("click",function(){
			// 	$("#busqueda").val("");
			// 	$("#busqueda").keyup();
			// 	return false;
			// });

			$("#listadoParabolas a").on("click",function(){
				$(this).parent().parent().addClass("active");

				URL = "pages/"+$(this).attr("href");
				titulo = "Lectura B&iacute;blica";
				tipo ="parabola";
				abrirPagina(URL,tipo,titulo);
				return false;
			});
			
		}
			
	
	});

	$("#btnSearch").on("click",function(){
		if($("#divBusqueda").is(":visible")){
			$("#divBusqueda").hide();
			$("#busqueda").val("");
			$("#busqueda").keyup();
		}
		else{
			$("#divBusqueda").show();
		}		
		
	});	
	
	$("#btnBack").on("click",function(){
		$("#tabHome").click();
	});	
	
	$("#tabHome").click();
}

function abrirPagina(URL, tipo, titulo){
	$.ajax({
		type: 'GET',
		url: URL,
		async:false,
		dataType:'html',
		success: function(data) { 
			if(tipo!="home" && tipo!="random"){
				$("#btnBack").show();
				$("#btnSearch").hide();	
			}
			else if(tipo=="random"){
				$("#btnBack").hide();
				$("#btnSearch").hide();	
			}
			else if(tipo=="home"){
				$("#btnBack").hide();
				$("#btnSearch").show();	
			}
			
			$("#content").remove();
			$("body").append('<div id="content" class="cf"></div>');
			$("#content").html(data);
			
			
			$("#header .titulo span").html(titulo);

			$("a[target=_blank]").on("click",function(){
				URL = $(this).attr("href");
				window.open(encodeURI(URL), '_blank','location=yes,closebuttoncaption=Volver');
				return false;
			});

			return false;
		}
	});
}