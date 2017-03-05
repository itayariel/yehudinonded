/*
*
jerusalem data
*
*/
// Mikveh collection
var jsonM = [{title : "ben david 15 Mikveh", 
				Lat: 31.754133, Lng: 35.226074, 
				desciption: 'Mikveh  is a bath used for the purpose of ritual immersion in Judaism1'}, 
				{title : "Strauss 26 Mikveh",
				Lat: 31.786688,  Lng: 35.218852, 
				desciption: 'Mikveh  is a bath used for the purpose of ritual immersion in Judaism2'},
				{title : "David Ben 15 Mikveh",
				Lat: 31.776762, Lng: 35.229683,
				desciption: 'Mikveh  is a bath used for the purpose of ritual immersion in Judaism3'},
				{title : "Kiryat Yovel Florentin Mikveh",
				Lat: 31.760301, Lng: 35.176763,
				desciption: 'Mikveh  is a bath used for the purpose of ritual immersion in Judaism4'},
				{title : "Elisha 10 Jerusalem Mikveh",
				Lat: 31.780956, Lng: 35.225784, 
				desciption: 'Mikveh  is a bath used for the purpose of ritual immersion in Judaism5'}];
				
// beyt cneset collection	
var jsonB = [{title : 'Synagogue love of Zion and Jerusalem', 
				Lat: 31.814551, Lng: 35.205378, 
				desciption: 'A synagogue is a Jewish house of prayer'}, 
				{title : "Synagogue in Bnei Zion Horb",
				Lat: 31.776377,  Lng: 35.215192, 
				desciption: 'A synagogue is a Jewish house of prayer'},
				{title : "Father David Synagogue",
				Lat: 31.781308, Lng: 35.211178,
				desciption: 'A synagogue is a Jewish house of prayer'},
				{title : "Synagogue Youth Paras",
				Lat: 31.784827, Lng: 35.210663,
				desciption: 'A synagogue is a Jewish house of prayer'},
				{title : "Synagogue lion mizpe",
				Lat: 31.811952, Lng: 35.194305, 
				desciption: 'A synagogue is a Jewish house of prayer'}];

// resteraunt collection				
var jsonR = [{title : "Pini's kitchen", 
				Lat: 31.764567, Lng: 35.220505, 
				desciption: '"One of the best Kosher resteraunts'}, 
				{title : "Jacques Street",
				Lat: 31.784864,  Lng: 35.211679, 
				desciption: 'One of the best Kosher resteraunts'},
				{title : "Trattoria Chabba",
				Lat: 31.785752, Lng: 35.212528,
				desciption: 'One of the best Kosher resteraunts'},
				{title : "eucalyptus",
				Lat: 31.773662, Lng: 35.226803,
				desciption:'One of the best Kosher resteraunts'},
				{title : "Hamotzi",
				Lat: 31.783682, Lng:35.215744, 
				desciption: 'One of the best Kosher resteraunts'}];
var jsonC = [{title : "Chabad of israel", 
				Lat: 31.774816, Lng: 35.211262, 
				desciption: 'One of the best Kosher resteraunts'}, 
				{title : "Chabad of israel",
				Lat: 31.760301,  Lng: 35.176763, 
				desciption: 'One of the best Kosher resteraunts'}];			
var jsonH = [{title : "The Jewish house", 
				Lat: 31.775950, Lng: 35.217208, 
				desciption: 'One of the best Kosher resteraunts'}];						
var jerusalem = {Mikveh: jsonM, synagogue: jsonB, resteraunt: jsonR, chabad: jsonC, Jewish: jsonH}; //all the info of Jerusalem
var milan;
var city = {jerusalem: jerusalem, milan: milan}// all the citys info
/*
*
markers data
*
*/
var pointMarkerImage = new Array();//store image of marker in array
var pointMarker = new Array();//store marker in array

pointMarkerImage[0]= new google.maps.MarkerImage('image/star.png', null, null, null, new google.maps.Size(42, 42)); // star of david
pointMarkerImage[1]= new google.maps.MarkerImage('image/drop1.png',null, null, null, new google.maps.Size(42, 42)); // drop of water
pointMarkerImage[2]= new google.maps.MarkerImage('image/flag.png', null, null, null, new google.maps.Size(50, 42)); // habad logo
pointMarkerImage[3]= new google.maps.MarkerImage('image/kosher.png', null, null, null, new google.maps.Size(60, 42)); // kosher logo
pointMarkerImage[4]= new google.maps.MarkerImage('image/house.png', null, null, null, new google.maps.Size(50, 42)); // jewish house logo

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
