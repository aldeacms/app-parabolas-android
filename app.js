$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
//$(document).ready(function(){
	//navigator.splashscreen.hide();

	$("#menu a").on("click",function(){
		$("#menu td").removeClass("active");
		$(this).parent().addClass("active");
		
		tab = $(this).attr("rel");
		page = "pages/"+tab+".html";
		titulo = $(this).attr("title");

	
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
			$.ajax({
				type: 'GET',
				url: URL,
				async:false,
				dataType:'html',
				success: function(data) { 

					$("#content").html(data);
					$("#content").scrollTop(0);
					$("#header .titulo span").html("Par&aacute;bola Aleatoria");
					return false;
				}
			});
		}
		else{
			$.ajax({
				type: 'GET',
				url: page,
				async:false,
				dataType:'html',
				success: function(data) { 
					$("#content").html(data);
					$("#content").scrollTop(0);
					$("#header .titulo span").html(titulo);
					
					if(tab=='home'){
						$("#btnBack").hide();
						$("#btnSearch").show();
						
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
						$("#btnClose").on("click",function(){
							$("#busqueda").val("");
							$("#busqueda").keyup();
							return false;
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
					}
					else{
						$("#btnBack").hide();
						$("#btnSearch").hide();
					}

					if($("#listadoParabolas").length){
						$("#listadoParabolas a").on("click",function(){
							$(this).parent().parent().addClass("active");

							URL = "pages/"+$(this).attr("href");
							
							$.ajax({
								type: 'GET',
								url: URL,
								async:false,
								dataType:'html',
								success: function(data) { 
									alert(URL);
									return false
									alert("continua");
									$("#btnBack").show();
									$("#btnSearch").hide();

									$("#content").html(data);
									$("#content").scrollTop(0);
									$("#header .titulo span").html("Lectura B&iacute;blica");
									return false;
								}
							});
						});	
					}
					
					$("a[target=_blank]").on("click",function(){
						URL = $(this).attr("href");
						window.open(encodeURI(URL), '_blank','location=yes,closebuttoncaption=Volver');
						return false;
					});
					
					return false;
				}
			});
		}
		//$("#menu").trigger("close");
				
	});
	
	$("#btnBack").on("click",function(){
		$("#tabHome").click();
	});	
	
	$("#tabHome").click();
}
//});