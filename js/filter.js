
$(document).ready(function () {
    var searchRef = firebase.database().ref();
    var referance = [];
    searchRef.on("child_added", snap =>  {
        referance = snap.val(); 
        var id = snap.key;       
        $("table").append("<tr id = "+ id + ">"+"<td>" + referance.date_and_time + "</td>" + "<td>" + referance.consignment_Number + "</td>"
            + "<td>" + referance.order + "</td>" + "<td>" + referance.email + "</td>" + "<td>" + referance.phone + "</td>"
            + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
            "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status + "</td>" + "</tr>");
    });
    searchRef.on("child_changed", snap =>  {
        var change = snap.key;
        referance = snap.val();
        document.getElementById(change).innerHTML = "<td>" + referance.date_and_time + "</td>" + "<td>" + referance.consignment_Number + "</td>"
        + "<td>" + referance.order + "</td>" + "<td>" + referance.email + "</td>" + "<td>" + referance.phone + "</td>"
        + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
        "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status + "</td>"
    });
})