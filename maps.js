var geocoder;
var map;


function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(31.774464, 35.207478);
  var mapOptions = {
    zoom: 7,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
}

function MyFunction(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
	   map.setZoom(9);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
