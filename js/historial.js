$(document).ready(function () {

    cargarStorage();
    $('#borrar').click(function (event) {
        event.preventDefault();
        c = confirm("esta seguro que desea borrar el historial")
        if (c) {
            listaIds = JSON.parse(localStorage.getItem('ids'));

            for (var x = 0; x < listaIds.length; x++) {
                localStorage.removeItem(listaIds[x]);
            }

            localStorage.removeItem('ids')
        }

    });


    function cargarStorage() {

        listaIds = JSON.parse(localStorage.getItem('ids'));
        var cardsHtml = ''
        if (listaIds != null) {


            for (var x = 0; x < listaIds.length; x++) {
                comic = JSON.parse(localStorage.getItem(listaIds[x]));

                cardsHtml = cardsHtml +
                    '<div class="card">' +
                    '<h4><b><a href="detalles.html?id=' + comic['id'] + '">' + comic['title'] + '</a></b></h4>' +
                    '<div class="crop-img">' +
                    '<img src="' + comic['img'] + '" alt="Avatar">' +
                    '</div>' +
                    '<div class="container">' +

                    '<p>' + comic['description'] + '</p>' +
                    '</div>' +
                    '</div>';
            }
        }
        $("#resultados").html(cardsHtml);
    }

});