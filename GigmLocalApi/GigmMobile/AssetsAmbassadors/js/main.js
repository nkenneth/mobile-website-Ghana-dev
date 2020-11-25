const hamburger = document.querySelector(".hamburger");
const navbarList = document.querySelector(".navbar-list");

hamburger.addEventListener("click", function() {
  this.classList.toggle("is-active");
  navbarList.classList.toggle("show");
});




		//	console.log("true");
		//	$(function () {
		//		$('#buttoner').click(function (event) {


        //  if ($("#form1").valid()){
		//			event.preventDefault();
		//			console.log('clicked');
		//			var subscribeForm = $('#form1');
		//			var subscribeButton = $('#buttoner');
			
		//			// if ($("input[name='email']").val() === '') {
		//			//   alert('Please enter an email address')
		//			//   return
		//			// }
		//			var value = $('input').val();
		//			// if (value.length > 0) {
			
			
		//			// }
			
		//			// if ($(window).width() < 800) {
		//			// 	$('.device').val("Mobile Device");
		//			// }
		//			// else {
		//			// 	$('.device').val("Desktop PC");
		//			// }
			
		//			// if ($(".buttoner").val() == "Exit") {
		//			// 	location.reload();
		//			// }
			
			
			
		//			// else {
			
		//				// if ($(".required").val() == "" || $(".required").val() == 0 || $(".number").val() == "" || $(".number").val() == 0 || $(".qualification").val() == "" || $(".qualification").val() == 0 || $(".age").val() == "" || $(".age").val() == 0 || $(".knowlegde").val() == "none" || $(".knowlegde").val() == 0 || $(".work3").val() == "none" || $(".work3").val() == 0 || $(".work2").val() == "none" || $(".work2").val() == 0 || $(".years").val() == "none" || $(".years").val() == 0 || $(".years2").val() == "none" || $(".years2").val() == 0) {
		//				// 	//for some reason "this" wasnt working, for now I will push this version 
		//				// 	//console.log(this);
		//				// 	//alert($(".required").attr("name"));
		//				// 	swal({
		//				// 		title: "Incomplete!",
		//				// 		text: "Please Fill in all the fields below!",
		//				// 		icon: "error"
		//				// 	})
		//				// 	//alert("Please Fill in all the fields below");
		//				// 	return false;
		//				// }
			
		//				// else {
		//					$(this).html('Processing!....');
			
			
		//					$.ajax({
		//						url: 'http://client.gigmobilitysystem.com/api/CampusAmbassador/ConfirmUser',
		//						type: 'POST',
		//						crossDomain: true,
		//						data: $('#form1').serialize(),
		//						headers: {
		//							'accept': 'application/json',
		//							'Authorization': 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg'
		//						},
							
		//						//beforeSend: function () {
		//						//	subscribeButton.prop('disabled', 'disabled');
		//						//}
		//					})
		//					.done(function (response) {
			
		//						$('.buttoner').html('Exit');
		//						$('.buttoner').val("Exit");
		//						//alert('Thanks for subscribing!');
		//						// swal({
		//						// 	title: response.ShortDescription,
		//						// 	text: response.ShortDescription,
		//						// 	icon: "success"
		//						// }).then(function () {
		//							// Redirect the user
		//							// window.location.href = "job-page.html";
		//							// location.reload();
			
		//							if (response.ShortDescription === "SUCCESS"){
		//							console.log('The Ok Button was clicked.');
		//				console.log(response.ShortDescription);
		//							console.log(response.Object.FirstName);
		//							console.log("haha" + response.Object.NumberOfReffers);
						
							
			
									
		//				localStorage.setItem("Firstname", response.Object.FirstName);
		//				localStorage.setItem("Lastname", response.Object.LastName);
		//				localStorage.setItem("RefCode", response.Object.ReferralCode);
		//				localStorage.setItem("Amount", response.Object.Amount);
		//				localStorage.setItem("Invited", response.Object.NumberOfReffers);
			
			
		//				window.location.replace("dashboard.html");
					
			
		//							console.log(response);
		//					$(this).html('done');
		//				}
			
		//				else {
		//					swal({
		//							title: response.ShortDescription,
		//							// text: response.ShortDescription,
		//							icon: "warning"
		//						}).then(function () {
		//							console.log("warning")
		//							$('#buttoner').html('Try Again');
			
		//						})
			
		//				}
		//						// });
			
		//						//swal({
		//						//	title: "Success!",
		//						//	text:  "You are now following",
		//						//	type: "success",
		//						//	timer: 3000,
		//						//	showConfirmButton: false
		//						//}), function(){
		//						//	location.reload();
		//						//};
			
			
		//						//subscribeButton.prop('disabled', false);
		//						$('#modal-container').addClass('out');
		//						$('#modal-container').removeClass('one');
		//					})
		//					.fail(function (response) {
		//						alert('something went wrong!, Kindly check your internet connection and retry');
		//						$('.buttoner').html('Kindly Reload page');
		//						subscribeButton.prop('disabled', false);
		//						console.log(response);
								
		//					});
		//				// }
		//			// }
        //    }
        //});
        
		//	});

		

	