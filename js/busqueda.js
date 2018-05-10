$(document).ready(function () {
    $(".buscar").click(function (event) {
        event.preventDefault();
        $("#modal").css("display", "none");
        buscar(1);
    })

    $(".tete").click(function (event) {
        event.preventDefault();
    });

    $("#resultados").on('click', '#paginaActual', function (event) {
        event.preventDefault();
    });

    $("#resultados").on('click', '.paginasSiguientes', function (event) {
        event.preventDefault();
        var offset = $(this).attr('href');
        buscar(offset);
    });


    $("#modalBoton").click(function (event) {
        event.preventDefault();
        $("#modal").css("display", "block");
    });

    $(".close").click(function (event) {
        $("#modal").css("display", "none");
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            $("#modal").css("display", "none");
        }
    }

    function buscar(offset) {
        var key = 'ts=1&apikey=4cc4ad6ac17b1e0d8cf0b785d1367511&hash=0425c79019517b0f72a911ff47a5bd12';
        var limitOffset = '&limit=10&offset=' + (offset - 1) * 10;

        var format = ($('#format').val()) ? "&format=" + $('#format').val() : "";
        var titulo = ($('#titulo').val()) ? "&titleStartsWith=" + $('#titulo').val() : "";
        var fecha = getFecha();

        if (checkParms([format, titulo, fecha])) {

            var url = "https://gateway.marvel.com/v1/public/comics?" + key + limitOffset + format + titulo + fecha;
            $("#resultados").html('<div style="color: white;">buscando ... </div>');

            $.get(url, function (data) {
                var cardsHtml = "";
                for (var x = 0; x < data.data.results.length; x++) {
                    comic = data.data.results[x];
                    card = {}
                    card.id = comic['id'];
                    card.title = comic['title'];
                    card.description = comic['description'] ? comic['description'].substring(0, 150) + "..." : "Sin descripciòn";
                    card.img = (comic.thumbnail.path + "." + comic.thumbnail.extension);

                    cardsHtml = cardsHtml +
                        '<div class="card">' +
                        '<h4><b><a href="detalles.html?id=' + card.id + '">' + card.title + '</a></b></h4>' +
                        '<div class="crop-img">' +
                        '<img src="' + card.img + '" alt="Avatar">' +
                        '</div>' +
                        '<div class="container">' +

                        '<p>' + card.description + '</p>' +
                        '</div>' +
                        '</div>';
                }

                if (data.data.results.length) {

                    var paginasTotales = data.data.total / 10 + 1;
                    var paginaActual = offset;
                    var limit = (paginasTotales < 5) ? paginasTotales : 5;
                    var aux = '';

                    if (offset > 1) {
                        valor = parseInt(offset);
                        aux = '<li><a href="' + (valor - 1) + '" class="paginasSiguientes">' + (valor - 1) + '</a></li>';
                        limit = limit - 1;
                    }

                    var aux = aux + '<li><a id="paginaActual" href="' + offset + '" class="active">' + offset + '</a></li>';

                    for (var x = 1; x <= limit - 1; x++) {
                        valor = x + parseInt(offset);
                        aux = aux + '<li><a href="' + valor + '" class="paginasSiguientes">' + valor + '</a></li>'
                    }
                    cardsHtml = cardsHtml +
                        '<section class="paginacion">' +
                        '<ul>' +
                        aux
                    '</ul>' +
                    '</section>';
                    $("#resultados").html(cardsHtml);
                } else {
                    $("#resultados").html(
                        '<div class="card">' +
                        '<div class="container">' +
                        '<h4><b>Sin resultados</b></h4>' +
                        '</div>' +
                        '</div>');
                }

            }).fail(function () {
                alert("error");
            });
        }
    }

    function getFechaHoy() {
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1;
        var yyyy = hoy.getFullYear();

        dd = addZero(dd);
        mm = addZero(mm);

        return yyyy + '-' + mm + '-' + dd;
    }

    function addZero(numero) {
        if (numero < 10) {
            numero = '0' + numero;
        }
        return numero;
    }

    function getFecha() {
        var fechaRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;

        var desde = $("#desde").val();
        var hasta = $("#hasta").val();

        var fecha = {};


        if (desde == "" && hasta == "") {
            return "";
        } else if (desde != "" && !desde.match(fechaRegex)) {
            alert('la fecha desde no respeta el formato');
            return false
        } else if (hasta != "" && !hasta.match(fechaRegex)) {
            alert('la fecha hasta no respeta el formato');
            return false
        }

        fecha.desde = (desde != "") ? desde : "1939-01-01";
        fecha.hasta = (hasta != "") ? hasta : getFechaHoy();

        if (new Date(fecha.desde) <= new Date(fecha.hasta)) {
            return "&dateRange=" + fecha.desde + "%2C" + fecha.hasta;
        } else {

            alert("la fecha desde es mas grande que la fecha hasta")
            return false;
        }

    }

    function checkParms(parametros) {

        isOk = true;

        for (a = 0; a <= parametros.length; a++) {
            if (parametros[a] === false) {

                isOk = false;
            }
        }

        return isOk;
    }

});