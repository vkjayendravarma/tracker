$("#logout").click(function(){
    firebase.auth().signOut().then(function () {
       $(".table").html("<p>Logging Out</p>");
        window.location.replace("index.html");
      }, function (error) {
        console.log(error.message);
      });
});