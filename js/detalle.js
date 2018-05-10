$(document).ready(function () {
    function getRequest(key) {
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

    if (id) {
        var key = 'ts=1&apikey=4cc4ad6ac17b1e0d8cf0b785d1367511&hash=0425c79019517b0f72a911ff47a5bd12';

        var url = "https://gateway.marvel.com/v1/public/comics/" + id + "?" + key;
        var urlPj = "https://gateway.marvel.com/v1/public/comics/" + id + "/characters?" + key;
        var urlCr = "https://gateway.marvel.com/v1/public/comics/" + id + "/creators?" + key;
        cardsHtml = {}
        var comic = [];
        var pjs = [];
        var cr = [];
        $.ajaxSetup({
            async: false,
        });


        $.get(url, function (data) {
            comic = data.data.results[0];
        });

        $.get(urlPj, function (data) {
            pjs = data.data.results;
        });

        $.get(urlCr, function (data) {
            crs = data.data.results;
        });

        card = {}

        card.id = comic['id'];
        card.title = comic['title'];
        card.description = comic['description'] ? comic['description'] : "Sin descripciòn";
        card.img = (comic.thumbnail.path + "." + comic.thumbnail.extension);
        card.price = comic['prices'][0]['price'];
        card.fecha = comic['dates'][0]['date'].substring(0, 10);
        cardsHtml =
            '<div class="card2">' +
            '<h4><b>' + card.title + '</b></h4>' +
            '<p class="descripcion">' + card.description + '</p>' +
            '<br/>' +
            '<img src="' + card.img + '" alt="Avatar" style="width:100%">' +
            '<p class="especifico">Fecha de publicacion: ' + card.fecha + '</p>' +
            '<p class="especifico">Precio: $' + card.price + '</p>'

        if (pjs.length) {
            cardsHtml = cardsHtml +
                '<div class="personajes">' +
                '<p class="title">Personajes:</p>';

            for (var x = 0; x < pjs.length; x++) {
                pj = pjs[x];
                img = (pj.thumbnail.path + "." + pj.thumbnail.extension);

                cardsHtml = cardsHtml +
                    '<div class="personaje">' +
                    '<h4 class="nombre">' + pj.name + '</h4>' +
                    '<div>' +
                    '<img src="' + img + '" alt="Avatar" style="width:100%">' +
                    '</div>' +
                    '</div>';
            }
            cardsHtml = cardsHtml +
                '</div>'

        }

        if (crs.length) {
            cardsHtml = cardsHtml +
                '<div class="personajes">' +
                '<p class="title">Creadores:</p>';

            for (var x = 0; x < crs.length; x++) {
                cr = crs[x];
                img = (cr.thumbnail.path + "." + cr.thumbnail.extension);

                cardsHtml = cardsHtml +
                    '<div class="personaje">' +
                    '<h4 class="nombre">' + cr.fullName + '</h4>' +
                    '<div>' +
                    '<img src="' + img + '" alt="Avatar" style="width:100%">' +
                    '</div>' +
                    '</div>';
            }
            cardsHtml = cardsHtml +
                '</div>'

        }


        cardsHtml = cardsHtml +
            '<input type="text" id="checkMail" name="email" value=""><a id="email" href="">Compartir</a>';

        $("#resultados").html(cardsHtml + '</div>');
        agregarIdLocalStorage(id);

    }

    $("#resultados").on('click', '#email', function (event) {
        var email = $('#checkMail').val();
        var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (emailRegex.test(email)) {
            emailAsunto = encodeURI('Encontre info sobre: ' + card.title);
            emailCuerpo = encodeURI('Descripciòn: \n' + card.description + '\npara mas conocer más de sus creadores y personaje no olvides visitar : \n' + window.location.href);

            var href = 'mailto:' + email + '?subject=' + emailAsunto + '&body=' + emailCuerpo;

            $("#email").attr("href", href);
        } else {
            event.preventDefault();
            alert("email invalido");
        }


    });

    function agregarIdLocalStorage(id) {

        listaIds = JSON.parse(localStorage.getItem('ids'))
        if (listaIds == null) {
            listaIds = [];
        }

        if (listaIds.indexOf(id) == -1) {
            listaIds.push(id);
        }


        if (listaIds.length > 10) {
            idBorrar = listaIds.shift();
            localStorage.removeItem(idBorrar);
        }

        localStorage.setItem('ids', JSON.stringify(listaIds));

        var descripcion = (card.description != 'Sin descripciòn') ? comic['description'].substring(0, 150) + "..." : "Sin descripciòn";
        infoComic = {
            title: card.title,
            description: descripcion,
            img: card.img,
            id: card.id
        }

        localStorage.setItem(id, JSON.stringify(infoComic));

    }


});