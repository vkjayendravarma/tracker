// $("#post").submit(function (event) {
//   event.preventDefault();
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       var number = $("#vehicle").val();
//       var lagitude = $("#lat").val();
//       var longitude = $("#long").val();
//       var status = "on road";
//       var current;
//       var postdata = {
//         'lat': lagitude,
//         'lng': longitude
//       };

//       var newPostRef = firebase.database().ref().child("track").child(number);
//       newPostRef.child("status").set(status);
//       newPostRef.child("current").set(postdata);
//       var locationRef = newPostRef.child("/location");
//       locationRef.push(postdata);

//       $("#post")[0].reset();

//     } else {
//       window.location.replace("index.html");
//     }
//   });

// });


// -----------------------------------------
$(".clear-logs").click(function (e) { 
  e.preventDefault();

  var dbRef =firebase.database().ref().child('track').child('AP31CM2090');
  dbRef.child('location').remove();
  
});


var track = [] ;
var keshav = { lat: 17.781277, lng: 83.376805 };

$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var searchRef = firebase.database().ref().child('track');    
      searchRef.on("child_changed", snap => {        
        now = snap.val().current;
        var lat = JSON.parse(now.lat);
        var lng = JSON.parse(now.lng);
        var uluru = { "lat":lat, "lng": lng };          
        initMap(uluru,track);        
      });
      searchRef.on("child_added", snap => {        
        now = snap.val().current;
        var lat = JSON.parse(now.lat);
        var lng = JSON.parse(now.lng);
        var uluru = { "lat":lat, "lng": lng };          
        initMap(uluru,track);        
      });

      var trackRef = searchRef.child("AP31CM2090").child("location");

      trackRef.on("child_added", snap => {
        var location = snap.val();
        var nlat = JSON.parse(location.lat);
        var nlng = JSON.parse(location.lng);
        var ntrack = { "lat":nlat, "lng": nlng };  
        track = track.concat(ntrack);
        initMap(uluru,track);        
      });


    } else {
      window.location.replace("index.html");
    }
  });

})





function initMap(t,c) {
uluru = t;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">event1</h1>' +
    '<div id="bodyContent">' +
    '<p><b>event1</b>lorem</p>' +
    '<p>View on google maps: <a href="https://goo.gl/maps/H7fLhbDM13p">' +
    'click here</a> ' +
    '</p>' +
    '</div>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 500
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });

  var Coordinates = c;
  var Path = new google.maps.Polyline({
    path: Coordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  Path.setMap(map);
  
}
