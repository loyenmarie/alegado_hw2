function login() {
     $.ajax(
         {
             url: "http://127.0.0.1:5000/login/",
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify({
                 'username': $("#username").val(),
                 'password': $("#password").val()
             }),
             type: "POST",
             dataType: "json",

             error: function (resp) {
                 //window.location.replace('404.html');
             },

             success: function (resp) {
                 if (resp.status === 'ok') {
                     window.location.replace('viewbus.html?username=' + resp.message + '/')
                     alert.message("Error Handling Request\n" + "Message: " + resp.message);
                 }
                 else {
                     window.location.replace('ui/404.html?username=' + resp.message + '/')
                 }
             }
         }
     );

 }

 function reserve() {
     $.ajax(
         {
             url: "http://127.0.0.1:5000/reserve/",
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify({
                 'name': $("#name").val(),
                 'contact': $("#contact").val(),
                 'tiime': $("#tiime").val(),
                 'route': $("#route").val(),
                 'seat_no': $("#seat_no").val(),
                 'bus_no': $("#bus_no").val()
             }),
             type: "POST",
             dataType: "json",

             error: function (resp) {
                 window.location.replace('updatedreservation.html');
             },

             success: function (resp) {
                alert(resp.status);
                 window.location.replace('myreservation.html');
             }
         }
     );

 }


 function daghanpurpose(){
    cleartable();
    viewres();
    showshow();
 }

function viewres(){

    $("#view_res").show();

$.ajax({
          url: 'http://127.0.0.1:5000/viewreservation/',
          type: "GET",
          dataType: "json",
          success: function(resp) {

            if (resp.status  === 'ok') {
               for (i = 0; i < resp.count; i++) {
                              name = resp.entries[i].name;
                              contact = resp.entries[i].contact;
                              tiime = resp.entries[i].tiime;
                              route = resp.entries[i].route;
                              seat_no = resp.entries[i].seat_no;
                              bus_no = resp.entries[i].bus_no;
                              price_rate = resp.entries[i].price_rate;
                              $("#view_res").append(showshow(name,contact,tiime,route,seat_no,bus_no,price_rate));
               }
            } else {
                $("#view_res").html("");
               alert('No reservations')
            }
          }
      });
}

function showshow(name,contact,tiime,route,seat_no,bus_no,price_rate)
{
   return '<div class="widget-content">'+
            '<table class="table table-striped table-bordered" id="view_res">'+
                '<tbody><tr class="edit" id="details">'+
                    '<td>'+ name +'</td>'+
                    '<td>'+ contact +'</td>'+
                    '<td>'+ tiime +'</td>'+
                    '<td>'+ route +'</td>'+
                    '<td>'+ seat_no +'</td>'+
                    '<td>'+ bus_no +'</td>'+
                    '<td>'+ price_rate +'</td>'+
                    '<td><button data-toggle="modal" data-target="#squarespaceModal" class="btn btn-warning center-block"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                '</tr></tbody>' +
            '</table>' +
       '</div>'
}


function cleartable()
{
     $("table.table-bordered").html('<thead><tr>' +
            '<th>Name</th>' +
            '<th>Contact</th>' +
            '<th>Time</th>' +
            '<th>Route</th>' +
            '<th>Seat Number</th>' +
            '<th>Bus Number</th>' +
            '<th>Rate</th>' +
            '<th>Action</th>' +
            '</tr></thead>')
}


function delete2() {

	$.ajax(
		{
			url: 'http://127.0.0.1:5000/delete2',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				}),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Successfully deleted!")
                    window.location.replace('myreservation.html')

                 }
				else {
					alert("ERROR")
                    window.location.replace('myreservation.html')

				}

			}
		});
}

function edit_reserve() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/edit_reserve',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
                'name': $("#name").val(),
				'contact': $("#contact").val(),
				'tiime': $("#tiime").val(),
				'route': $("#route").val(),
				'seat_no': $("#seat_no").val(),
                'bus_no': $("#bus_no").val()
			}),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("Successfully Edited!")
                    window.location.replace('myreservation.html')
                 }
				else {
					alert("There must be wrong. Please review your form.")
                    window.location.replace('myreservation.html')
				}
			}
		});
}

function editedit() {
	$.ajax(
		{
			url: 'http://127.0.0.1:5000/editedit',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
                'name': $("#name").val(),
				'contact': $("#contact").val(),
				'tiime': $("#tiime").val(),
				'route': $("#route").val(),
				'seat_no': $("#seat_no").val(),
                'bus_no': $("#bus_no").val()
			}),
			type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
                if (resp.status === 'ok') {
                	alert("success")
                    window.location.replace('myreservation.html')
                 }
				else {
					alert("input error")
				}
			}
		});
}