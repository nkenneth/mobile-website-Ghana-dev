
$('.button').click(function () {
	var buttonId = $(this).attr('id');
	$('#modal2-container').addClass('one');
	$('#modal2-container').removeClass('out');
	console.log('clicked');
	// $('body').addClass('modal-active');
})

$('.close').click(function () {
	$('#modal2-container').addClass('out');
	$('#modal2-container').removeClass('one');
	console.log('clicked');

});

$('former').click(function () {
	$('#modal2-container').removeClass('close');
});

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

$(function () {
	$('.buttoner').click(function (event) {
		event.preventDefault();
		console.log('clicked');
		var subscribeForm = $('#form1');
		var subscribeButton = $('.buttoner');

		// if ($("input[name='email']").val() === '') {
		//   alert('Please enter an email address')
		//   return
		// }
		var value = $('input').val();
		if (value.length > 0) {


		}

		if ($(window).width() < 800) {
			$('.device').val("Mobile Device");
		}
		else {
			$('.device').val("Desktop PC");
		}

		if ($(".buttoner").val() == "Exit") {
			location.reload();
		}



		else {

			if ($(".required").val() == "" || $(".required").val() == 0 || $(".number").val() == "" || $(".number").val() == 0 || $(".qualification").val() == "" || $(".qualification").val() == 0 || $(".age").val() == "" || $(".age").val() == 0 || $(".knowlegde").val() == "none" || $(".knowlegde").val() == 0 || $(".work3").val() == "none" || $(".work3").val() == 0 || $(".work2").val() == "none" || $(".work2").val() == 0 || $(".years").val() == "none" || $(".years").val() == 0 || $(".years2").val() == "none" || $(".years2").val() == 0) {
				//for some reason "this" wasnt working, for now I will push this version 
				//console.log(this);
				//alert($(".required").attr("name"));
				swal({
					title: "Incomplete!",
					text: "Please Fill in all the fields below!",
					icon: "error"
				})
				//alert("Please Fill in all the fields below");
				return false;
			}

			else {
				$(this).html('Processing!....');


				$.ajax({
					url: 'https://api.formbucket.com/f/buk_CCEkmQQxhg4STIMOXVgnjze8',
					type: 'POST',
					crossDomain: true,
					headers: {
						'accept': 'application/javascript',
					},
					data: $('#form1').serialize()
					//beforeSend: function () {
					//	subscribeButton.prop('disabled', 'disabled');
					//}
				})
				.done(function (response) {

					$('.buttoner').html('Exit');
					$('.buttoner').val("Exit");
					//alert('Thanks for subscribing!');
					swal({
						title: "Success!",
						text: "Thanks for applying to GIGM. We review applications on a regular basis and will send you an email if your application is accepted.",
						icon: "success"
					}).then(function () {
						// Redirect the user
						//window.location.href = "new_url.html";
						location.reload();
						console.log('The Ok Button was clicked.');
					});

					//swal({
					//	title: "Success!",
					//	text:  "You are now following",
					//	type: "success",
					//	timer: 3000,
					//	showConfirmButton: false
					//}), function(){
					//	location.reload();
					//};


					//subscribeButton.prop('disabled', false);
					$('#modal-container').addClass('out');
					$('#modal-container').removeClass('one');
				})
				.fail(function (response) {
					alert('something went wrong!, Kindly check your internet connection and retry');
					$('.buttoner').html('Kindly Reload page');
					subscribeButton.prop('disabled', false);
				});
			}
		}

	});
});