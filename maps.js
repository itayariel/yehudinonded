var geocoder;
var map;
var goTo_marker;

/*
*
*
data
*
*
*/

// Mikveh collection
var jsonM = [{title : "ben david 15 Mikveh", 
				Lat: 31.754133, Lng: 35.226074, 
				desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"}, 
				{title : "Strauss 26 Mikveh",
				Lat: 31.786688,  Lng: 35.218852, 
				desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
				{title : "David Ben 15 Mikveh",
				Lat: 31.776762, Lng: 35.229683,
				desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
				{title : "Kiryat Yovel Florentin Mikveh",
				Lat: 31.760301, Lng: 35.176763,
				desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
				{title : "Elisha 10 Jerusalem Mikveh",
				Lat: 31.780956, Lng: 35.225784, 
				desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"}];
				
// beyt cneset collection	
var jsonB = [{title : "Synagogue love of Zion and Jerusalem", 
				Lat: 31.814551, Lng: 35.205378, 
				desciption: "A synagogue is a Jewish house of prayer"}, 
				{title : "Synagogue in Bnei Zion Horb",
				Lat: 31.776377,  Lng: 35.215192, 
				desciption: "A synagogue is a Jewish house of prayer"},
				{title : "Father David Synagogue",
				Lat: 31.781308, Lng: 35.211178,
				desciption: "A synagogue is a Jewish house of prayer"},
				{title : "Synagogue Youth Paras",
				Lat: 31.784827, Lng: 35.210663,
				desciption: "A synagogue is a Jewish house of prayer"},
				{title : "Synagogue lion mizpe",
				Lat: 31.811952, Lng: 35.194305, 
				desciption: "A synagogue is a Jewish house of prayer"}];

// resteraunt collection				
var jsonR = [{title : "Pini's kitchen", 
				Lat: 31.764567, Lng: 35.220505, 
				desciption: "One of the best Kosher resteraunts"}, 
				{title : "Jacques Street",
				Lat: 31.784864,  Lng: 35.211679, 
				desciption: "One of the best Kosher resteraunts"},
				{title : "Trattoria Chabba",
				Lat: 31.785752, Lng: 35.212528,
				desciption: "One of the best Kosher resteraunts"},
				{title : "eucalyptus",
				Lat: 31.773662, Lng: 35.226803,
				desciption:"One of the best Kosher resteraunts"},
				{title : "Hamotzi",
				Lat: 31.783682, Lng:35.215744, 
				desciption: "One of the best Kosher resteraunts"}];
var jerusalem = {Mikveh: jsonM, synagogue: jsonB, resteraunt: jsonR}; //all the info of Jerusalem
var pointMarkerImage = new Array();//store image of marker in array
var pointMarker = new Array();//store marker in array

       pointMarkerImage[0]= new google.maps.MarkerImage('image/star.png', null, null, null, new google.maps.Size(42, 42)); // star of david
       pointMarkerImage[1]=  new google.maps.MarkerImage('image/drop1.png',null, null, null, new google.maps.Size(42, 42)); // drop of water
       pointMarkerImage[2]=  new google.maps.MarkerImage('image/flag.png', null, null, null, new google.maps.Size(60, 42)); // habad logo
	   pointMarkerImage[3]=  new google.maps.MarkerImage('image/kosher.png', null, null, null, new google.maps.Size(60, 42)); // kosher logo

	   var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
	  
/*
*
*
functions
*
*
*/
       //create number of markers based on collection.length
function setPoint(destination){
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	for(var i=0; i<jerusalem.Mikveh.length; i++){ // adding the Mikveh markers
		pointMarker[i] = new google.maps.Marker({
            position: new google.maps.LatLng(jerusalem.Mikveh[i].Lat, jerusalem.Mikveh[i].Lng),
            map: map,
            icon: pointMarkerImage[1],
            animation: google.maps.Animation.DROP,
            title: jerusalem.Mikveh[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
		});
		pointMarker[i].addListener('click', function() {
		infowindow.open(map, pointMarker[i]);
		});
	}
    for(var i=0; i<jerusalem.synagogue.length; i++){// adding the sinagogs markers
		pointMarker[i+jerusalem.Mikveh.length] = new google.maps.Marker({
            position: new google.maps.LatLng(jerusalem.synagogue[i].Lat, jerusalem.synagogue[i].Lng),
            map: map,
            icon: pointMarkerImage[0],
            animation: google.maps.Animation.DROP,
            title: jerusalem.synagogue[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		pointMarker[i+jerusalem.Mikveh.length].addListener('click', function() {
		infowindow.open(map, pointMarker[i]);
		});
		
	}
	var x =jerusalem.Mikveh.length+jerusalem.synagogue.length;
    for(var i=0 ; i<jerusalem.resteraunt.length; i++){ // adding the restaraunt markers
		pointMarker[i+x] = new google.maps.Marker({
            position: new google.maps.LatLng(jerusalem.resteraunt[i].Lat, jerusalem.resteraunt[i].Lng),
            map: map,
            icon: pointMarkerImage[3],
            animation: google.maps.Animation.DROP,
            title: jerusalem.resteraunt[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 	
		});
		pointMarker[i+x].addListener('click', function() {
		infowindow.open(map, pointMarker[i]);
		});
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markers_id_counter=0;
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < pointMarker.length; i++) {
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
      setPoint()
   }
}

//reads a location from the "adress" input field, centers the map on it and adds a marker
function goTo() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps
      .Marker({
          map: map,
          position: results[0].geometry.location
      });
	  map.setZoom(12);
      if(goTo_marker!=null){
        goTo_marker.setMap(null);
      }
      goTo_marker=marker;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  
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