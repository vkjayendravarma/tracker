var dbRef = firebase.database().ref("/");

var id;
$("#get").submit(function (e) {
    e.preventDefault();
    var number = $("#number").val();
    var data = [];
    $(".data").text("null");


    dbRef.on( "child_added", function(dataSnapshot){
        id = dataSnapshot.key;
        data = dataSnapshot.val();
        
        if (data.order == number){
            console.log(data);
            data = JSON.stringify(data);
            $(".data").text(data);
        }        

    } );

   
        
})

$("#post").submit(function (send) {
    send.preventDefault();
    var updater = $("#updater").val();   
   
    dbRef.on( "child_added", function(dataSnapshot){
        dbRef.child(id).update({"status" : updater});
    } ); 
        
})

dbRef.on("child_changed", snap =>  {
    var change = snap.key;
    data = snap.val();
    data = JSON.stringify(data);
    $(".data").text(data);
});