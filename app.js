document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

	$("#menu a").on("click",function(){
		$("#menu td").removeClass("active");
		$(this).parent().addClass("active");
		
		tab = $(this).attr("rel");
		page = "pages/"+tab+".html";
		titulo = $(this).attr("title");
		
		if (tab=="random"){
			
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
					$("#btnBack").show();

					$("#content").html(data);
					$("#content").scrollTop(0);
					$("#header .titulo span").html("Par&aacute;bola");
					return false;
				}
			});
		return false;
		}
		
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

					$("#listadoParabolas a").on("click",function(){
						$(this).parent().parent().addClass("active");

						URL = "pages/"+$(this).attr("href");
						$.ajax({
							type: 'GET',
							url: URL,
							async:false,
							dataType:'html',
							success: function(data) { 
								$("#btnBack").show();

								$("#content").html(data);
								$("#content").scrollTop(0);
								$("#header .titulo span").html("Par&aacute;bola");
								return false;
							}
						});
					});	
				}
				else{
					$("#btnBack").hide();
				}
				
				$("a[target=_blank]").on("click",function(){
					URL = $(this).attr("href");
					window.open(encodeURI(URL), '_blank', 'location=yes');
					return false;
				});
				
				return false;
			}
		});
		
		$("#menu").trigger("close");
				
	});
	
	$("#btnBack").on("click",function(){
		$("#tabHome").click();
	});
	
	
	 resizeContent();
	 $(window).on('resize', function(){
		resizeContent();
	});
	
	$("#tabHome").click();
}

function resizeContent(){
	var totalHeight = $(window).height();
	$("#content").css("height",totalHeight-110+"px");
}
