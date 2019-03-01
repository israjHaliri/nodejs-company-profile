// link to controller js

// function open_page(id){
//    var get_base_url = $("#"+id).data('url');
//    var type = $("#"+id).data('type');
//    var link = $("#"+id).data('link');
//    var url= get_base_url+link + '/' + type;

//    $("div#content_backend_ajax").load(url, function() {
//     $(".dashboard").hide();
//     $(".myuser").hide();


//  });
// }

// // save shirt js
// function save_shirt(){
//    var get_base_url = $("#btn-save").data('url');
//    var form = $('.form-shirt');
//    var image = $('#input-foto');
//    var param =form.serialize();
//    $.ajax({
//       type: "POST",
//       url: get_base_url+"backend_controller/shirt_controller/insert_data", 
//       data:  param+image,
//       dataType: 'json',        
//       success: function(response) {
//          console.log(response);
//          alert(response);
//       }
//    });

// $.post( get_base_url+"backend_controller/shirt_controller/insert_data",param, function( data ) {
//  console.log(data[0]);
//  alert("works");
// },"json");
// };


$(document).ready(function() {
   $('#list-shirt').DataTable();
   $('#list-pant').DataTable();
   $('#list-merchand').DataTable();
   $('#list-cart-admin').DataTable();
} );








