var dbRef = firebase.database().ref("/");
$("#change").attr("disabled", "disabled");
var id;
var text;
var temp;
$("#get").submit(function (e) {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            id =null;
            var number = $("#number").val();
            var data = [];
            $(".data").text("null");
            dbRef.on("child_added", function (dataSnapshot) {
                data = dataSnapshot.val();
                if (data.consignment_Number == number) {
                    $(".data").html("<div class='row'><div class='col-md-6'><label >Date:</label><p id='date_and_time' class='Data_padding'>" + data.date_and_time + "</p></div><div class='col-md-6'><label >Remarks:</label><p id='remarks' class='Data_padding'>" + data.remarks + "</p></div><div class='col-md-6'><label>Order Status:</label><p id='status' class='Data_padding'>" + data.status + "</p></div><div class='col-md-6'><label>consignment number:</label><p id='consignment_Number' class='Data_padding'>" + data.consignment_Number + "</p></div><div class='col-md-6'><label>order number:</label><p id='order' class='Data_padding'>" + data.order + "</p></div><div class='col-md-6'><label>e-Mail Id:</label><p id='email' class='Data_padding'>" + data.email + " </p></div><div class='col-md-6'><label>Contact number:</label><p id='phone' class='Data_padding'>" + data.phone + "</p></div><div class='col-md-12'><label >To Address:</label><p id='to_address' class='Data_padding'>" + data.to_address + "</p> </div><div class='col-md-12'><label>From Address:</label><p id='from_address' class='Data_padding'>" + data.from_address + "</p></div><div class='col-md-6'><label>Weight:</label><p id='weight' class='Data_padding'>" + data.weight + "</p></div><div class='col-md-6'><label >Dimensions: </label><p id='dimensions' class='Data_padding'>" + data.dimensions + "</p></div></div>");
                    id = dataSnapshot.key;
                    text = data.remarks;
                    console.log(id);
                    console.log(text);
                     temp = user.email;
                    console.log(temp);                    
                }
            });

            if(id == null){
                $("#change").attr("disabled", "disabled");
            }
            else{
                $("#change").removeAttr("disabled");
            }

            
        }

        else {
            window.location.replace("index.html");
        }


    });


});


$("#post").submit(function (send) {
    send.preventDefault();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var update_status = $("#status_update").val();
            var update_remarks = $("#remarks").val();
            var date = new Date();
            var d;
            var month = date.getMonth() + 1;
            d = date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            date = d.toString();
            console.log(date);     
            text = text + " <br> " + date + " ?? " + update_remarks + " ?? updated by " + temp;
            var update = {
                "status": update_status,
                "remarks": text,
            };

            console.log(id);
            console.log(update);
            dbRef.on("child_added", function (dataSnapshot) {
                dbRef.child(id).update(update);
            });
        }

        else {
            window.location.replace("index.html");
        }


    });


})

dbRef.on("child_changed", snap => {
    var change = snap.key;
    data = snap.val();
    $(".data").html("<div class='row'><div class='col-md-6'><label >Date:</label><p id='date_and_time' class='Data_padding'>" + data.date_and_time + "</p></div><div class='col-md-6'><label >Remarks:</label><p id='remarks' class='Data_padding'>" + data.remarks + "</p></div><div class='col-md-6'><label>Order Status:</label><p id='status' class='Data_padding'>" + data.status + "</p></div><div class='col-md-6'><label>consignment number:</label><p id='consignment_Number' class='Data_padding'>" + data.consignment_Number + "</p></div><div class='col-md-6'><label>order number:</label><p id='order' class='Data_padding'>" + data.order + "</p></div><div class='col-md-6'><label>e-Mail Id:</label><p id='email' class='Data_padding'>" + data.email + " </p></div><div class='col-md-6'><label>Contact number:</label><p id='phone' class='Data_padding'>" + data.phone + "</p></div><div class='col-md-12'><label >To Address:</label><p id='to_address' class='Data_padding'>" + data.to_address + "</p> </div><div class='col-md-12'><label>From Address:</label><p id='from_address' class='Data_padding'>" + data.from_address + "</p></div><div class='col-md-6'><label>Weight:</label><p id='weight' class='Data_padding'>" + data.weight + "</p></div><div class='col-md-6'><label >Dimensions: </label><p id='dimensions' class='Data_padding'>" + data.dimensions + "</p></div></div>");
});