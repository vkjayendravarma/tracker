
$("#login").submit(function (e){
  e.preventDefault();

  var id = $("#id").val();
  var pass = $("#pass").val();
  $("#login-stats").text("checking data");

  firebase.auth().signInWithEmailAndPassword(id, pass).catch(function (error) {
    var errorMessage = error.message;
    if (errorMessage != null) {
      $("#login")[0].reset();
      $("#login-stats").text(errorMessage);
    }
  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#login-stats").text("signed in");
      window.location.replace("dash.html");
    } else {
      
    }
  });
});