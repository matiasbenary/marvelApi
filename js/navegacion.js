$(document).ready(function(){
console.log("hola");
$('.page').on('click',function(e){
	e.preventDefault();
	var pageSolicitada = $(this).attr('href');
	$.get("./busqueda",function(data,status){
		console.log("Data: " + data + "\nStatus: " + status);
	});
});

function getPage(page){
	$.ajax({
		url: page,
		type: "GET",
		dataType: "text",
		success: function( reponse ){
			console.log("secargo",response);
		},
		error:function (error){
			console.log("nocargo",error);
		},
		complete: function (xhr,status){
			console.log("complete");
		}
	});
}
});