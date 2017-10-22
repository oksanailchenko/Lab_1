var map;
var cities;
var query = 'http://api.openweathermap.org/data/2.5/group?id=2964574,2643743,3333229,' +
  '2267056,6359304,6455259,2800866,2759794,703448,524901,625144,588409,593116,456172,' +
  '6695624,2950159,3169070,2761367,3067695,3054643&appid=f95b9fc5813501eb46fd085f1d1ea632&units=metric';
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 50, lng: 20 },
    zoom: 5
  });

  fetch(query)
    .then(function (response) {
      response.json().then(function (data) {
        for (var i = 0; i < data.list.length; ++i) {
          var city = data.list[i];
          var postion = { lat: city.coord.lat, lng: city.coord.lon };
          var icon = 'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png';
          var info = [city.weather[0].main, city.main.temp, city.main.pressure, city.main.humidity, city.wind.speed];
          
          var marker = new google.maps.Marker({
            position: postion,
            map: map,
            icon: icon,
            title: city.name
          });
          attachInfo(marker, info);
          
        }
      });
    });
}

function attachInfo(marker, info) {
  var infowindow = new google.maps.InfoWindow({
    content: "<h2>Detailed information</h2>" + "<b>Weather parameter: </b>" + info[0] + "</br><b>Temperature: </b>" + info[1] + " C" +
    "</br><b>Pressure: </b>" + info[2] + " hPa" + "</br><b>Humidity: </b>" + info[3] + " %" +
    "</br><b>Wind speed: </b>" + info[4] + " m/s"
  });

  marker.addListener('mouseover', function () {
    infowindow.open(marker.get('map'), marker);
  });

  marker.addListener('mouseout', function () {
    infowindow.close(marker.get('map'), marker);
  });
}