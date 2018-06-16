
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var searchRef = firebase.database().ref();
            var referance = [];
            searchRef.on("child_added", snap => {
                referance = snap.val();
                var id = snap.key;
                $("table").append("<tr class='target_row' id = " + id + ">" + "<td>" + referance.date_and_time + "</td>" + "<td class='target'>" + referance.consignment_Number + "</td>"
                    + "<td>" + referance.order + "</td>" + "<td class='target'>" + referance.email + "</td>" + "<td class='target'>" + referance.phone + "</td>"
                    + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
                    "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status  + "</tr>");
            });
            searchRef.on("child_changed", snap => {
                var change = snap.key;
                referance = snap.val();
                document.getElementById(change).innerHTML = "<td>" + referance.date_and_time + "</td>" + "<td>" + referance.consignment_Number + "</td>"
                    + "<td>" + referance.order + "</td>" + "<td>" + referance.email + "</td>" + "<td>" + referance.phone + "</td>"
                    + "<td>" + referance.to_address + "</td>" + "<td>" + referance.from_address + "</td>" +
                    "<td>" + referance.weight + "</td>" + "<td>" + referance.dimensions + "</td>" + "<td>" + referance.status  + "<td>"  + "</td>"
            });

        } else {
            $(".table").css("display","none");
            window.location.replace("index.html");
        }
    });

})


