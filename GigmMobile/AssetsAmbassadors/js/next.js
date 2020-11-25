// Quick & dirty toggle to demonstrate modal toggle behavior
$('.proceed').on('click', function (e) {
	e.preventDefault();
	$(".AmbassadorType").hide();
	console.log("keep on keeping on");
	var radioValue = $("input[name='radio']:checked").val();
	localStorage.setItem('radioVal', radioValue);
	console.log(localStorage.getItem('radioVal'));

	if (radioValue === "nysc") {
		//alert("Your are nysc");
		$('.modal').removeClass('is-visible');
		$('.left-wrapper').addClass('left-wrapper-nysc');


		$('.campus').hide();
		$('.school').hide();
		$('#nysc').attr('required', 'required');
		$('#NyscState').attr('required', 'required');
		$("#AmbassadorType").val(1);
	}
	else if (radioValue === "campus") {
		//alert("Your are campus");
		$('.modal').removeClass('is-visible');
		$('.nyscno').hide();
		$('.nyscstate').hide();
		$('#campus').attr('required', 'required');
		$("#AmbassadorType").val(2);
	}

});

//Modal to choose the email or phone number
$('.proceed2').on('click', function (e) {
	$('.box').show();

	e.preventDefault();
	//$(".AmbassadorType").hide();
	console.log("keep on keeping on");
	var radioValue = $("input[name='verify']:checked").val();
	localStorage.setItem('radioVal', radioValue);
	console.log(localStorage.getItem('radioVal'));

	if (radioValue === "email") {
		//alert("Your are nysc");
		$('.modal2').removeClass('is-visible');
		$.ajax(
{
	type: 'post',
	url: 'https://client.gigmobilitysystem.com/api/CampusAmbassador/requestverificationbyemail',
	data: {
		"Email": localStorage.getItem("emailVerify"),
		//"HashedVerifyData": localStorage.getItem("HashCode")
	},
	headers: {
		'accept': 'application/json',
		'Authorization': 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg'
		//	'Authorization': 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg'
	},
	success: function (response) {
		$('.box').hide();
		swal({
			title: response.ShortDescription,
			text: "Please kindly check your email",
			icon: "success"
		}).then(function () {

			if (response.ShortDescription === "SUCCESS") {
				window.location.replace("login");
			}
			$('#buttoner').html('Register');

			// Redirect the user
			// window.location.href = "job-page.html";
			// location.reload();
			console.log('The Ok Button was clicked.');
			console.log(response.ShortDescription);
			console.log(response);


		});
	},
	error: function () {
		$('.box').hide();

		swal({
			title: response.ShortDescription,
			// text: response.ShortDescription,


			icon: "warning"
		})
	}
}
);
	}
	else if (radioValue === "phone") {

		var phone = $("#number").val();
		console.log(phone);
		localStorage.setItem('phoneVerify', phone);
		console.log(localStorage.getItem("phoneVerify"));
		$.ajax(
{
	type: 'post',
	url: 'https://client.gigmobilitysystem.com/api/CampusAmbassador/requestverificationbyphone/' + localStorage.getItem("phoneVerify"),
	//data: {
	//	"Email": localStorage.getItem("emailVerify"),
	//	"HashedVerifyData": localStorage.getItem("HashCode")
	//},
	headers: {
		'accept': 'application/json',
		'Authorization': 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg'
		//	'Authorization': 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg'
	},
	success: function (response) {
		console.log(localStorage.getItem("phoneVerify") + "got here men");
		$('.box').hide();
		$(".otpcode").show();
		$(".verify").hide();
		$(".proceed2").hide();
		$(".proceed3").show();


		var add_minutes = function (dt, minutes) {
			return new Date(dt.getTime() + minutes * 60000);
		}

		// Set the date we're counting down to
		var countDownDate = add_minutes(new Date(), 5);

		//var countDownDate = new Date(new Date().getTime() + 5*60000);

		// Update the count down every 1 second
		var x = setInterval(function () {

			// Get today's date and time
			var now = new Date().getTime();
			
			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); 1
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Output the result in an element with id="demo"
			document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
			console.log(minutes + "m " + seconds + "s ");
			// If the count down is over, write some text 
			if (distance < 0) {
				//clearInterval(x);
				document.getElementById("demo").innerHTML = "";
				distance = null;
				swal({
					title: "Expired",
					text: "The time to enter OTP has expired",


					icon: "warning"
				}).then(function () {
					$(".otpcode").hide();
					$(".verify").show();
					$(".proceed2").show();
					$(".proceed3").hide();
					clearInterval(x);


				});


			}
			else {

			}

		}, 1000);




	},
	error: function () {
		$('.box').hide();

		swal({
			title: response.ShortDescription,
			// text: response.ShortDescription,


			icon: "warning"
		})
	}
}
);

	}

});


$('.proceed3').on('click', function (e) {
	$('.box').show();
	var otpCode = $("#otpCode").val();
	e.preventDefault();
	//$(".AmbassadorType").hide();
	console.log("keep on keeping on" + localStorage.getItem("phoneVerify") + "/" + otpCode);



	$.ajax(
{
	type: 'post',
	url: 'https://client.gigmobilitysystem.com/api/CampusAmbassador/verifybyphone/' + localStorage.getItem("phoneVerify") + "/" + otpCode,
	//data: {
	//	"Email": localStorage.getItem("emailVerify"),
	//	"HashedVerifyData": localStorage.getItem("HashCode")
	//},
	headers: {
		'accept': 'application/json',
		'Authorization': 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg'
		//	'Authorization': 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg'
	},
	success: function (response) {
		$('.box').hide();

		if (response.ShortDescription === "Invalid Verification Code.") {

			swal({
				title: response.ShortDescription,
				text: "Invalid Verification Code.",


				icon: "warning"
			})


		}

		else {
		
		swal({
			title: response.ShortDescription,
			text: "You are now verified",


			icon: "success"
		}).then(function () {


			window.location.replace("login");
			$('#buttoner').html('Register');

			// Redirect the user
			// window.location.href = "job-page.html";
			// location.reload();
			console.log('The Ok Button was clicked.');
			console.log(response.ShortDescription);
			console.log(response);


		});

	}
	},
	error: function () {
		$('.box').hide();

		swal({
			title: response.ShortDescription,
			// text: response.ShortDescription,


			icon: "warning"
		})
	}
}
);





	//		$.ajax(
	//{
	//	type: 'post',
	//	url: 'https://client.gigmobilitysystem.com/api/CampusAmbassador/verifybyphone/' + localStorage.getItem("phoneVerify") + "/" + otpCode,
	//	//data: {
	//	//	"Email": localStorage.getItem("emailVerify"),
	//	//	"HashedVerifyData": localStorage.getItem("HashCode")
	//	//},
	//	headers: {
	//		'accept': 'application/json',
	//		'Authorization': 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg'
	//		//	'Authorization': 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg'
	//	},
	//	success: function (response) {
	//		$('.box').hide();
	//		swal({
	//			title: response.ShortDescription,
	//			text: "You are now verified",


	//			icon: "success"
	//		}).then(function () {


	//				window.location.replace("login");
	//			$('#buttoner').html('Register');

	//			// Redirect the user
	//			// window.location.href = "job-page.html";
	//			// location.reload();
	//			console.log('The Ok Button was clicked.');
	//			console.log(response.ShortDescription);
	//			console.log(response);


	//		});
	//	},
	//	error: function () {
	//		$('.box').hide();

	//		swal({
	//			title: response.ShortDescription,
	//			// text: response.ShortDescription,


	//			icon: "warning"
	//		})
	//	}
	//}
	//);


});

