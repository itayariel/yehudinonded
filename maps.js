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

	for(var i=0; i<city[dest].Mikveh.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
			position: new google.maps.LatLng(city[dest].Mikveh[i].Lat, city[dest].Mikveh[i].Lng),
            map: map,
            icon: pointMarkerImage[1],
            animation: google.maps.Animation.DROP,
            title: city[dest].Mikveh[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
		});

		infowindow[marCount] = new google.maps.InfoWindow({
			content: city[dest].Mikveh[i].desciption
		});
		pointMarker[marCount].addListener('click', function() {
		//infowindow.setContent(this.html);
		infowindow[marCount].open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setSynagoguePoint(dest){// adding the Synagogue markers
    for(var i=0; i<city[dest].synagogue.length; i++){
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].synagogue[i].Lat, city[dest].synagogue[i].Lng),
            map: map,
            icon: pointMarkerImage[0],
            animation: google.maps.Animation.DROP,
            title: city[dest].synagogue[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		var infowindow = new google.maps.InfoWindow({
			content: city[dest].synagogue[i].desciption
		});
		pointMarker[marCount].addListener('click', function() {
		infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setRestaurantPoint(dest){// adding the restaurant markers
    for(var i=0 ; i<city[dest].resteraunt.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].resteraunt[i].Lat, city[dest].resteraunt[i].Lng),
            map: map,
            icon: pointMarkerImage[3],
            animation: google.maps.Animation.DROP,
            title: city[dest].resteraunt[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		var infowindow = new google.maps.InfoWindow({
			content: city[dest].resteraunt[i].desciption
		});
		pointMarker[marCount].addListener('click', function() {
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
		var infowindow = new google.maps.InfoWindow({
			content: city[dest].chabad[i].desciption
		});
		pointMarker[marCount].addListener('click', function() {
		infowindow.open(map, pointMarker[marCount]);
		});
		marCount++;
	}
}
function setJewishPoint(dest){// adding the jewish house markers
	for(var i=0 ; i<city[dest].Jewish.length; i++){ 
		pointMarker[marCount] = new google.maps.Marker({
            position: new google.maps.LatLng(city[dest].Jewish[i].Lat, city[dest].Jewish[i].Lng),
            map: map,
            icon: pointMarkerImage[4],
            animation: google.maps.Animation.DROP,
            title: city[dest].Jewish[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		var infowindow = new google.maps.InfoWindow({
			content: city[dest].Jewish[i].desciption
		});
		pointMarker[marCount].addListener('click', function() {
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
  directionsDisplay = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(31.774464, 35.207478);
  var mapOptions = {
    zoom: 7,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
  var input = document.getElementById('searchTextField');
    //this directionsDisplay will be used to show the route of the requested directions
  directionsDisplay.setMap(map);
  // This event listener will call addMarker() when the map is clicked.
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
var city;
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