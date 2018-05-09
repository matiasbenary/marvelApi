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

<script>
		$(document).ready(function() {
			function getRequest(key){
     			key = key.replace(/[\[]/, '\\[');  
		        key = key.replace(/[\]]/, '\\]');  
		        var pattern = "[\\?&]" + key + "=([^&#]*)";  
		        var regex = new RegExp(pattern);  
		        var url = unescape(window.location.href);  
		        var results = regex.exec(url);  
		        if (results === null) {  
		            return null;  
		        } else {  
		            return results[1];  
		        }  
		    }  

		id = getRequest('id');

		if(id){
			var key = 'ts=1&apikey=4cc4ad6ac17b1e0d8cf0b785d1367511&hash=0425c79019517b0f72a911ff47a5bd12';
		
			var url = "https://gateway.marvel.com/v1/public/comics/"+id+"?"+key;
			var urlPj = "https://gateway.marvel.com/v1/public/comics/"+id+"characters?"+key;
			var urlCr = "https://gateway.marvel.com/v1/public/comics/"+id+"creators?"+key;

			$.get(url,function(data){   
				comic=data.data.results[0]; 
		   		console.log(comic);
				card = {}
				card.title = comic['title'];
				card.description = comic['description']?comic['description']: "No posee";
				card.img = (comic.thumbnail.path + "." + comic.thumbnail.extension);
				card.price = comic['prices'][0][''];
				card.fecha = comic['dates'][0]['date'];
				cardsHtml = 
				'<div class="card2">'+
				  '<img src="'+ card.img +'" alt="Avatar">'+
				  '<h4><b>'+card.title+'</b></h4>'+
				   '<p>'+card.description+'</p>'+
				   '<hr/>'+
				   '<p>Publicada: '+ card.fecha + 'Precio:'+ card.price+
				'</div>';
				console.log(cardsHtml);
				$("#resultados").html(cardsHtml);
		   	});
		};
	});    