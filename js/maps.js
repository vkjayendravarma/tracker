$("#post").submit(function (event) {
  event.preventDefault();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var number = $("#vehicle").val();
      var logitude = $("#lat").val();
      var longitude = $("#long").val();
      var status = "on road" ;
      var current;
      var postdata = {
        'logitude': logitude,
        'longitude': longitude
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



$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          var searchRef = firebase.database().ref().child('track');
                    
          searchRef.on("child_changed", snap => {            
            var current = snap.val().current;
            var id = snap.key; 
            console.log(current);

            var trackRef = searchRef.child(id).child("location");
            var c =0;
            trackRef.limitToLast(1).on('child_added', function(data) {
              c++;
             if (c==2){
              var temp = data.val();
              var tempID = data.key;
              console.log(tempID);
              console.log(temp);
             } 
              
            });
           
            
             
          });

      } else {
        window.location.replace("index.html");
      }
  });

})






function initMap() {
  var uluru = { lat: 17.781194, lng: 83.377222 };
  var bravo = { lat: 17.7811, lng: 83.3772 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var contentString = '<div id="content">' +

    '<h1 id="firstHeading" class="firstHeading">event1</h1>' +
    '<div id="bodyContent">' +
    '<p><b>event1</b>lorem</p>' +
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


  var contentString1 = '<div id="content">' +

    '<h1 id="firstHeading" class="firstHeading">event2</h1>' +
    '<div id="bodyContent">' +
    '<p><b>event2</b>lorem</p>' +

    '</p>' +
    '</div>' +
    '</div>';



  var infowindow1 = new google.maps.InfoWindow({
    content: contentString1,
    maxWidth: 500
  });
  var beta = new google.maps.Marker({
    position: bravo,
    map: map,
    title: 'bravo (Ayers Rock)'
  });
  beta.addListener('click', function () {
    infowindow1.open(map, beta);
  });
}









// $(document).ready(function () {
//   firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//           var searchRef = firebase.database().ref().child('truck');
//           var referance = [];
//           searchRef.on("child_added", snap => {
//               referance = snap.val();
//               var id = snap.key;
//               $("table").append("<tr class='target_row' id = " + id + ">" + "<td>" + referance.date_and_time + "</td>" + "<td class='target'>" + referance.consignment_Number + "</td>"
//                   + "<td>" + referance.order + "</td>" + "<td class='target'>" + referance.email + "</td>" + "<td class='target'>" + referance.phone + "</td>"
//                   + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
//                   "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status  + "</tr>");
//           });
//           searchRef.on("child_changed", snap => {
//               var change = snap.key;
//               referance = snap.val();
//               document.getElementById(change).innerHTML = "<td>" + referance.date_and_time + "</td>" + "<td>" + referance.consignment_Number + "</td>"
//                   + "<td>" + referance.order + "</td>" + "<td>" + referance.email + "</td>" + "<td>" + referance.phone + "</td>"
//                   + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
//                   "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status  + "<td>"  + "</td>"
//           });

//       } else {
//           $(".table").css("display","none");
//           window.location.replace("index.html");
//       }
//   });

// })


