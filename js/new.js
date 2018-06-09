var messagesRef = firebase.database().ref('data');


$("form").submit(function (e) {
    e.preventDefault();
    var date = new Date();
    var d;
    var month = date.getMonth()+1;
    d = date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    date = d.toString();
    
    var ConsignmentNumber = $("#Consignment").val();
    var order = $("#order").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var toAddr = $("#toAddr").val();
    var fromAddr = $("#fromAddr").val();
    var weight = $("#weight").val();
    var dimensions = $("#dimensions").val();
    var status;
    var postdata = {
        'date_and_time': date,
        'consignment_Number': ConsignmentNumber,
        'order': order,
        'email': email,
        'phone': phone,
        'to_address': toAddr,
        'from_address': fromAddr,
        'weight': weight,
        'dimensions': dimensions,
        'status': 'received',
    };
    var newPostRef = firebase.database().ref();
    newPostRef.push(postdata);
 
    $("form")[0].reset();
    location.reload();
})