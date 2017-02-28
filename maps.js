var geocoder;
var map;

var json = [{title : "ben david 15 Mikveh", location: "new google.maps.LatLng(31.754133, 35.226074)", desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"}, 
{title : "Strauss 26 Mikveh", location: "new google.maps.LatLng(31.786688, 35.218852)", desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
{title : "David Ben 15 Mikveh", location: "new google.maps.LatLng(31.776762, 35.229683)", desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
{title : "Kiryat Yovel Florentin Mikveh", location: "new google.maps.LatLng(31.760301, 35.176763)", desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"},
{title : "Elisha 10 Jerusalem Mikveh", location: "new google.maps.LatLng(31.780956, 35.225784)", desciption: "Mikveh  is a bath used for the purpose of ritual immersion in Judaism"}];
//var list = JSON.parse(json);
//create array to store a set of location
var collectionM = new Array(); // Mikveh collection
var collectionB = new Array(); // beyt cneset collection
var collectionR = new Array(); // resteraunt collection

//a set of locations stored in array
var mikveh = ["ben david 15 Mikveh", " Strauss 26 Mikveh", "David Ben 15 Mikveh", "Kiryat Yovel Florentin Mikveh", "Elisha 10 Jerusalem Mikveh"];
collectionM[0] = new google.maps.LatLng(31.754133, 35.226074); // מקווה ארנונה בן דוד 15
collectionM[1] = new google.maps.LatLng(31.786688, 35.218852); // מקווה שטראוס 26
collectionM[2] = new google.maps.LatLng(31.776762, 35.229683); // בן דוד 15
collectionM[3] = new google.maps.LatLng(31.760301, 35.176763); // קרית יובל פלורנטין 3
collectionM[4] = new google.maps.LatLng(31.780956, 35.225784); // מוסררה אלישע 10 ירושלים

var beitK = ["Synagogue love of Zion and Jerusalem", "Synagogue in Bnei Zion Horb", "Father David Synagogue", "Synagogue Youth Paras", "Synagogue lion mizpe"];
collectionB[0] = new google.maps.LatLng(31.814551, 35.205378); // אבא הלל סילבר 3 ירושלים
collectionB[1] = new google.maps.LatLng(31.776377, 35.215192); // אבן גבירול 6 ירושלים
collectionB[2] = new google.maps.LatLng(31.781308, 35.211178); // אבן ספיר 5 ירושלים
collectionB[3] = new google.maps.LatLng(31.784827, 35.210663); // אגריפס 127
collectionB[4] = new google.maps.LatLng(31.811952, 35.194305); // אהרון אשכולי 110

var rest = ["Pini's kitchen", "Jacques Street", "Trattoria Chabba", "eucalyptus", "Hamotzi"];
collectionR[0] = new google.maps.LatLng(31.764567, 35.220505); // המטבח של פיני
collectionR[1] = new google.maps.LatLng(31.784864, 35.211679); // ג'קוס סטריט
collectionR[2] = new google.maps.LatLng(31.785752, 35.212528); // טרטוריה חבה
collectionR[3] = new google.maps.LatLng(31.773662, 35.226803); // אקליפטוס
collectionR[4] = new google.maps.LatLng(31.783682, 35.215744); // המוציא

var pointMarkerImage = new Array();//store image of marker in array
var pointMarker = new Array();//store marker in array

       pointMarkerImage[0]= new google.maps.MarkerImage('imeg/star.png', null, null, null, new google.maps.Size(42, 42)); // star of david
       pointMarkerImage[1]=  new google.maps.MarkerImage('imeg/drop1.png',null, null, null, new google.maps.Size(42, 42)); // drop of water
       pointMarkerImage[2]=  new google.maps.MarkerImage('imeg/flag.png', null, null, null, new google.maps.Size(60, 42)); // habad logo
	   pointMarkerImage[3]=  new google.maps.MarkerImage('imeg/kosher.png', null, null, null, new google.maps.Size(60, 42)); // kosher logo
var contentString ='Mikveh  is a bath used for the purpose of ritual immersion in Judaism';
	   
       //create number of markers based on collection.length
function setPoint(){
	  var infowindow = new google.maps.InfoWindow({
    content: json[0].desciption
  });
	
  for(var i=0; i<json.length; i++){ // adding the Mikveh markers
      pointMarker[i] = new google.maps.Marker({
            position: json[i].location,
            map: map,
            icon: pointMarkerImage[1],
            animation: google.maps.Animation.DROP,
            title: json[i].title,
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
			
    });
    pointMarker[i].addListener('click', function() {
    infowindow.open(map, pointMarker[i]);
  });
    google.maps.event.addListener(pointMarker[i], 'click', function(){
      window.open("blog/page01.html","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
    }
    );
  }
   for(var i=0; i<collectionB.length; i++){// adding the sinagogs markers
      pointMarker[i] = new google.maps.Marker({
            position: collectionB[i],
            map: map,
            icon: pointMarkerImage[0],
            animation: google.maps.Animation.DROP,
            title: beitK[i],
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
			
    });

    google.maps.event.addListener(pointMarker[i], 'click', function(){
      window.open("blog/page01.html","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
    }
    );
  }
   for(var i=0; i<collectionR.length; i++){ // adding the restaraunt markers
      pointMarker[i] = new google.maps.Marker({
            position: collectionR[i],
            map: map,
            icon: pointMarkerImage[3],
            animation: google.maps.Animation.DROP,
            title: rest[i],
			size: new google.maps.Size(42, 68),
			visible: true,
			zIndex: i 
			
    });

    google.maps.event.addListener(pointMarker[i], 'click', function(){
      window.open("blog/page01.html","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
    }
    );
  }
}


function initialize() { // initialize the map on load 
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(31.774464, 35.207478);
  var mapOptions = {
    zoom: 7,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
}

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
