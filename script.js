//object to store position attributes
var position = {
  'latitude' : -25.363,
  'longitude' : 131.044
}

var db_url = {
  'ip' : 'response.json',
  'port' : 80 
}

var locations_json = {
  'locations' : []
};

function storeLocal()
{
  //Check for broweser support of local storage
  if (typeof(Storage) != "undefinded")
  {
    for (var i = 0; i < locations_json.length; i++)
    {
      localStorage.setItem('locations_json'+i,locations_json[i]);
    }
  }
  //Broswer does not support local storage
  else
  {
    alert("Note: current browser does not support localstorage so data cannot be cached for later use");
  }
}

//Gelocation api
function geoLocate()
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(storePosition);
  }
  else
  {
    alert('could not determinate');
  }
}

//Geolocation position callback
function storePosition(position)
{
  this.position.latitude = position.coords.latitude;
  this.position.longitude = position.coords.longitude;
  initMap();
}

//Calls backend server for displayable locations
function getLocations()
{
  var request = new XMLHttpRequest();
  request.open('GET', db_url.ip, false);
  request.onload = function ()
  {
    if (request.status >= 200 && request.status < 400)
    {
      log('getLocations',request.responseText);
      //locations_json = request.responseText;
      storeLocations(JSON.parse(request.responseText));
    }
    else
      alert('request was denied by server');
  }
  request.onerror = function ()
  {
    alert('error sending request');
  }
  request.send();
}

function storeLocations(object_response)
{
  locations_json.locations = object_response.locations;
  log('storeLocations',locations_json.locations);
}

//Google maps view
function initMap() 
{
  log('initMap', 'start')
  var uluru = {lat: position.latitude, lng: position.longitude};
  var map = new google.maps.Map(document.getElementById("map"), { zoom : 7, center : uluru });
  getLocations();
  var marker = new google.maps.Marker({ position : uluru, map : map });
  var markers = [];
  for (var i = 0; i < locations_json.locations; i++)
  {
    var location = { lat: locations_json.locations[i].lat, lng: locations_json.locations[i].lng};
    markers[i] = new google.maps.Marker({ position : location, map : map});
  }
  log('initMap', locations_json.locations.length;);
  var contentString = '<div class="container">'+
    '<div class="row">'+
      '<div class="col-lg-12">'+
        //Place window content here
        'temp'+
      '</div>'+
    '</div>'+
  '</div>';
  var infoWindow = new google.maps.InfoWindow({
    content : contentString
  });
  marker.addListener('click', function()
  {
    infoWindow.open(map,marker);
  });
  log('initMap','end');
}

//consistent log function for consistent console prints
function log(tag, message)
{
  console.log('['+tag+']'+message);
}