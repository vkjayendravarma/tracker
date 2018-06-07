$(document).ready(function () {
    var searchRef = firebase.database().ref();  

    searchRef.on("child_added", function (data) {
        var referance = data.val().phone;
        var search = 9490230173 ;
        if (referance == search){
            console.log(data.val());
        }
    });
})






