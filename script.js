var position = {
  'latitude' : -25.363,
  'longitude' : 131.044
}

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

function storePosition(position)
{
  this.position.latitude = position.coords.latitude;
  this.position.longitude = position.coords.longitude;
  initMap();
}

function initMap() 
{
  log('initMap', 'start')
  var uluru = {lat: position.latitude, lng: position.longitude};
  var map = new google.maps.Map(document.getElementById("map"), { zoom : 7, center : uluru });
  var marker = new google.maps.Marker({ position : uluru, map : map });
  log('initMap','end');
}

function log(tag, message)
{
  console.log('['+tag+']'+message);
}