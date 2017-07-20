var geocoder;
var map;
var goTo_marker;
var pointMarker;
var address;	  
var marCount;
var infowindow;
var city;

/*
*
markers data
*
*/
var pointMarkerImage = new Array();//store image of marker in array
var pointMarker = new Array();//store marker in array
var infowindow = new Array();//store infowindow in array

pointMarkerImage[0]= new google.maps.MarkerImage('image/star.png', null, null, null, new google.maps.Size(42, 42)); // star of david
pointMarkerImage[1]= new google.maps.MarkerImage('image/drop1.png',null, null, null, new google.maps.Size(42, 42)); // drop of water
pointMarkerImage[2]= new google.maps.MarkerImage('image/flag.png', null, null, null, new google.maps.Size(50, 42)); // habad logo
pointMarkerImage[3]= new google.maps.MarkerImage('image/kosher.png', null, null, null, new google.maps.Size(60, 42)); // kosher logo
pointMarkerImage[4]= new google.maps.MarkerImage('image/house.png', null, null, null, new google.maps.Size(50, 42)); // jewish house logo
/*
*
getting the json data
*
*/
$( document ).ready(function() {
  $.ajax({url: "https://raw.githubusercontent.com/itayariel/yehudinonded/master/data.json", success: function(result){
        $("#city").html(typeof(result));
		city = JSON.parse(result);
	}});
});
/*
*
*
functions
*
*
*/
       //create number of markers based on the radio selection
function setMikvehPoint(dest){// adding the Mikveh markers
	for(var i=0; i<city[dest].mikvaot.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
			position: new google.maps.LatLng(city[dest].mikvaot[i].Lat, city[dest].mikvaot[i].Lng),
            map: map,
            icon: pointMarkerImage[1],
            animation: google.maps.Animation.DROP,
            title: city[dest].mikvaot[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
		});

		
		pointMarker[marCount].addListener('click', function() {
            infowindow[marCount] = new google.maps.InfoWindow({
			content: city[dest].mikvaot[i].desciption
		});
		//infowindow.setContent(this.html);
		infowindow[marCount].open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setSynagoguePoint(dest){// adding the Synagogue markers
    for(var i=0; i<city[dest].Synagogues.length; i++){
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].Synagogues[i].Lat, city[dest].Synagogues[i].Lng),
            map: map,
            icon: pointMarkerImage[0],
            animation: google.maps.Animation.DROP,
            title: city[dest].Synagogues[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		
		pointMarker[marCount].addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
			content: city[dest].Synagogues[i].desciption
		});
		infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setRestaurantPoint(dest){// adding the restaurant markers
    for(var i=0 ; i<city[dest].resteraunts.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].resteraunts[i].Lat, city[dest].resteraunts[i].Lng),
            map: map,
            icon: pointMarkerImage[3],
            animation: google.maps.Animation.DROP,
            title:city[dest].resteraunts[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		
		pointMarker[marCount].addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
			content: city[dest].resteraunts[i].desciption
		});
		infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setChabadPoint(dest){// adding the chabad house markers
	for(var i=0 ; i<city[dest].chabad.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].chabad[i].Lat, city[dest].chabad[i].Lng),
            map: map,
            icon: pointMarkerImage[2],
            animation: google.maps.Animation.DROP,
            title: city[dest].chabad[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
	
		pointMarker[marCount].addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
                content: city[dest].chabad[i].desciption
		});
		infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setJewishPoint(dest){// adding the jewish house markers
	for(var i=0 ; i<city[dest].houses.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].houses[i].Lat, city[dest].houses[i].Lng),
            map: map,
            icon: pointMarkerImage[4],
            animation: google.maps.Animation.DROP,
            title: city[dest].houses[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		
		pointMarker[marCount].addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
                content: city[dest].houses[i].desciption
            });
            infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markers_id_counter=0;
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < marCount; i++) {
    if(pointMarker[i]!=null){
        pointMarker[i].setMap(map);
    }
  }
}
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  pointMarker = [];
}
//remove null markers from the array and reindex exisisting markers to prevent wasted cells
function clean_null_markers(){
  var temp = [];
  for(var i = 0; i<pointMarker.length; i++){
    if(pointMarker[i]!=null){
      temp.push(pointMarker[i]);
      temp[temp.length-1].set("id" , temp.length-1);
    }
  }
  markers_id_counter = temp.length;
  pointMarker = temp;
}

function initialize() { // initialize the map on load 
   var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Styled Map'});
  directionsDisplay = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(31.774464, 35.207478);
  var mapOptions = {
    zoom: 7,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  var input = document.getElementById('searchTextField');
    //this directionsDisplay will be used to show the route of the requested directions
  directionsDisplay.setMap(map);
  // This event listener will call addMarker() when the map is clicked.
google.maps.event.addListener(map, "click", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    alert("Lat=" + lat + "; Lng=" + lng);
});
}
//google.maps.event.addDomListener(window, 'load', initialize);

function MyFunction(address) {// zoom in the map to the address
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
	   map.setZoom(12);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  if(address=='Jerusalem'){
      setPoint(address)
   }
}

//reads a location from the "adress" input field, centers the map on it and adds a marker
function goTo() {
  marCount = 0;
  address = document.getElementById('address').value;
 
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK'){
     	map.setCenter(results[0].geometry.location);
		map.setZoom(12);
	}
  });
 }
 function markerSelect(id){
	if(city[address]){// check if we have info about this city
		if(id == 'Synagogue'){
			setSynagoguePoint(address);// if we have we display all the Synagogue markers
		}
		if(id == 'Kosher restaurant'){
			setRestaurantPoint(address);// if we have we display all the Kosher restaurant markers
		}
		if(id == 'Mikveh'){
			setMikvehPoint(address);// if we have we display all the Mikveh markers
		}
		if(id == 'Chabad house'){
			setChabadPoint(address);// if we have we display all the Chabad house markers
		}
		if(id == 'Jewish house'){
			setJewishPoint(address);// if we have we display all the Jewish house markers
		}
		if(id == 'Show all'){// if we have we display all the markers	
			setSynagoguePoint(address);
			setRestaurantPoint(address);
			setMikvehPoint(address);		
			setChabadPoint(address);	
			setJewishPoint(address);
		}
	}
}
/*
*
*
Everything that has to do with getting directions and paths
*
*
*/

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function calcRoute() {
  var travelMode = document.getElementById('travelMode').value;
  if(travelMode=="NONE"){
      alert('Choose a valid transportation method to get directions');
      return;
  }
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: travelMode
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    else{
      alert('Route was not successful for the following reason: ' + status);
    }
  });
}
// check the validation of the form
   function validateForm() {
    var x = document.forms["myForm"]["Address"].value;
    if (x == "") {
        alert("Address must be filled out");
         return false;
         }
    var y = document.forms["myForm"]["Description"].value;
   if (y == "") {
        alert("Description must be filled out");
         return false;
         }
}
//add a data
$(document).ready(function(){
	$('#add-location').on('click', function(e){
		var Type = $('#Type').val();
		var Address = $('#Address').val();
		var Description = $('#Description').val();
		var Title = $('#Title').val();
		var City = $('#City').val();
		
	
$.ajax({ url: "https://api.mlab.com/api/1/databases/mydata/collections/city?apiKey=ORlPGrQVCT2BKBjqZ38ae1z9vU5aj54U",
		  data: JSON.stringify({
			"type": Type,
			"title": Title,
			"city": City,
			"address": Address,
			"description": Description
		  }),
		  type: "POST",
		  contentType: "application/json", 
		  success: function(data){
			window.location.href = "map.html"
		  },
		  error: function(xhr, status, err){
			console.log(err);
		  }
		 });
	});
});

