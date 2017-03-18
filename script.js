var position = {
  'latitude' : 0,
  'longitude' : 0
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
}

function initMap() 
{
  log('initMap', 'start')
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  log('initMap','end');
}

function log(tag, message)
{
  console.log('['+tag+']'+message);
}