var map;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.9228288, lng: -57.9584442},
        zoom: 9
    });

    var myLatLng = new google.maps.LatLng(-34.922770, -57.956189);

    var marker1 = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "catedral",
    });

    var infowindow1 = new google.maps.InfoWindow({
        content: "Oficina Central"
    });

    google.maps.event.addListener(marker1, 'click', function () {
        infowindow1.open(map, marker1);
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Usted esta aquì");
        });
    }
}
