$("#post").submit(function (event) {
  event.preventDefault();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var number = $("#vehicle").val();
      var lagitude = $("#lat").val();
      var longitude = $("#long").val();
      var status = "on road";
      var current;
      var postdata = {
        'lat': lagitude,
        'lng': longitude
      };

      var newPostRef = firebase.database().ref().child("track").child(number);
      newPostRef.child("status").set(status);
      newPostRef.child("current").set(postdata);
      var locationRef = newPostRef.child("/location");
      locationRef.push(postdata);

      $("#post")[0].reset();

    } else {
      window.location.replace("index.html");
    }
  });

});

var data = {};
var jsonVariable = {};
for (var i = 1; i < 3; i++) {
  jsonVariable[i + 'name'] = 'name' + i;
}
console.log(jsonVariable);

$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var searchRef = firebase.database().ref().child('track');

      searchRef.on("child_changed", snap => {
        var current = snap.val().current;
        var id = snap.key;
        console.log(current);
        console.log(id);


        var trackRef = searchRef.child(id).child("location");

        trackRef.on("child_added", snap => {
          track = snap.val();
          data[id] =
            {
              "current": current,
              "logs": track
            }

        });

        console.log(data);


      });

    } else {
      window.location.replace("index.html");
    }
  });

})






function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: { lat: 17.781194, lng: 83.377222 }
  });
  // var contentString = '<div id="content">' +

  //   '<h1 id="firstHeading" class="firstHeading">event1</h1>' +
  //   '<div id="bodyContent">' +
  //   '<p><b>event1</b>lorem</p>' +
  //   '</div>' +
  //   '</div>';
  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString,
  //   maxWidth: 500
  // });
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  //   title: 'Uluru (Ayers Rock)'
  // });
  // marker.addListener('click', function () {
  //   infowindow.open(map, marker);
  // });




  // var coordinates = [
  //   { lat: 17.781194, lng: 83.377222 },
  //   { lat: 17.7811, lng: 83.3772 }
  // ];
  // var path = new google.maps.Polyline({
  //   path: coordinates,
  //   geodesic: true,
  //   strokeColor: '#000000',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2
  // });

  // path.setMap(map);
}











