var k = 1;

$("#consignment").click(function(){
  if($("#consignment").is(':checked')){
    k=1;
    $("#placeholder").text("Search with consignment number");
  }
});

$("#email_id").click(function(){
  if($("#email_id").is(':checked')){
    k=3;
    $("#placeholder").text("Search with email id");
  }
});

$("#Phone").click(function(){
  if($("#Phone").is(':checked')){
    k=4;
    $("#placeholder").text("Search with phone number");
  }
});

$("#status").click(function(){
  if($("#status").is(':checked')){
    k=9;
    $("#placeholder").text("Search with order status");
  }
});


function consignment() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByClassName("target_row");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[k]; 
    if (td ) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

