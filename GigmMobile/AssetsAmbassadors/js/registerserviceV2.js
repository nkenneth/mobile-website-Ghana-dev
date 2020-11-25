$("#form1").validate({
	rules: {
		password: {
			required: true,
			minlength: 6,
			letters: true
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		password: "Please specify your name (only letters and spaces are allowed)",
		email: "Please specify a valid email address"
	},
	submitHandler: function() {
	
	}
});

var password;
var confirmPassword;
$("#passwordValidation").show();
$('#confirmPassword').on('input', function() {
	 password = $("#password").val();
	 confirmPassword = $("#confirmPassword").val();

	if(password !== confirmPassword){
		$("#passwordValidation").show();
	}
	else {
	$("#passwordValidation").hide();
}
});



$(function () {
	$('#buttoner').click(function (event) {
		//var URL = 'https://client.gigmobilitysystem.com/api/CampusAmbassador/create';
		var URL = 'https://client.thegigmobility.com/api/CampusAmbassador/create';
		let Token = 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg';
		//  Token = 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg';

		password = $("#password").val();
		confirmPassword = $("#confirmPassword").val();
		localStorage.setItem("emailVerify", $("#email").val());
		if ($("#form1").valid() && password === confirmPassword){
		event.preventDefault();
		console.log('clicked');
		var subscribeForm = $('#form1');
		var subscribeButton = $('#buttoner');

		var email = $("#email").val(), phone = $("#number").val();

		//var email = "ScarlettAppleton@dayrep.com";
		//	var phone = "08180074780";
		var emailResult = email.replace(/(\w{1})(.*)(\w{1})@(.*)/, '$1******$3@$4');
		var phoneResult = phone.replace(/(\d{1})(.*)(\d{3})/, '$1******$3');
		$('#emailLink').text(emailResult);
		$('#phoneLink').text(phoneResult);


		//document.getElementById("#emailLink").innerHTML = email.replace(/(\w{1})(.*)(\w{1})@(.*)/, '$1******$3@$4'
		//);

		//document.getElementById("#phoneLink").innerHTML = phone.replace(/(\d{1})(.*)(\d{3})/, '$1******$3')


		//$('#emailLink').text(transformEntry(email, 'email'));
		//$('#phoneLink').text(transformEntry(email, 'email'));

            // validate date of birth
	

			let TODAY = new Date(Date.now());
            let EIGHTEEN_YEARS_BACK = new Date(new Date(TODAY).getDate() + "/" + new Date(TODAY).getMonth() + "/" + (new Date(TODAY).getFullYear() - 18));

            var dob = Date.parse($("[name='DateOfBirth']").val());
            var curDate = Date.now();
			console.log(dob);
			if (EIGHTEEN_YEARS_BACK < dob) {
                swal({
                    text: 'Please make sure the date of birth is 18+',
                    icon: "warning"
                });

                return false;
            }
            


		// if ($("input[name='email']").val() === '') {
		//   alert('Please enter an email address')
		//   return
		// }
		var value = $('input').val();
		// if (value.length > 0) {


		// }

		// if ($(window).width() < 800) {
		// 	$('.device').val("Mobile Device");
		// }
		// else {
		// 	$('.device').val("Desktop PC");
		// }

		// if ($(".buttoner").val() == "Exit") {
		// 	location.reload();
		// }

		$('.box').show();
			if (password !== confirmPassword){
				$("#passwordValidation").show();
			
			}	
			else {
				
				$.ajax({
					url: URL,
					type: 'POST',
          crossDomain: true,
          data: $('#form1').serialize(),
					headers: {
						'accept': 'application/json',
						'Authorization': Token
					},
				})
				.done(function (response) {

					// $('#buttoner').html('Exit');
					
					// $('#buttoner').val("Exit");
					//alert('Thanks for subscribing!');
					$('.box').hide();
					if (response.ShortDescription !== "SUCCESS") {
						swal({
							title: response.ShortDescription,
							icon: "warning"
						})
					}

					else if (response.ShortDescription === "SUCCESS") {
						$('.modal2').addClass('is-visible');
					}



					$('#buttoner').html('Try Again');

					//subscribeButton.prop('disabled', false);
					$('#modal-container').addClass('out');
					$('#modal-container').removeClass('one');
				})
				.fail(function (response) {
					alert('something went wrong!, Kindly check your internet connection and retry');
					$('.buttoner').html('Kindly Reload page');
          subscribeButton.prop('disabled', false);
          console.log(response);
		  $('#buttoner').html('Try Again');

		  
				}); 
			}
			// }
		// }
			}
		else {
			password = $("#password").val();
			confirmPassword = $("#confirmPassword").val();

			if(password !== confirmPassword){
				swal({
					// title: response.ShortDescription,
					text: 'Please check your password',
					icon: "warning"
				})
			}
		else 
				swal({
					// title: response.ShortDescription,
					text: 'Please make sure you fill in all fields correctly',
					icon: "warning"
				})
			}
	});
});