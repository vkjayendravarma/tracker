var messagesRef = firebase.database().ref('data');

$("#date").val(date);
$("form").submit(function (e) {
    e.preventDefault();
    var date = new Date();
    date = date.toString();
    
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
        'date and time': date,
        'consignmentNumber': ConsignmentNumber,
        'order': order,
        'email': email,
        'phone': phone,
        'to address': toAddr,
        'from address': fromAddr,
        'weight': weight,
        'dimensions': dimensions,
        'status': 'received',
    };
    var newPostRef = firebase.database().ref();
    newPostRef.push(postdata);
    $("form")[0].reset();
    location.reload();
})
       