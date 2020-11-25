$(function() {
  $(".btn").click(function(event) {
    event.preventDefault();
    console.log("clicked");
    var subscribeForm = $("#signup");
    var subscribeButton = $(".btn");

    var value = $("input");

    if (
      $("input[name='name']").val() === "" &&
      $("input[name='phone']").val() === "" &&
      $("input[name='email']").val() === "" &&
      $("input[name='date']").val() === "" &&
      $("input[name='destination']").val() === "" &&
      $("input[name='school']").val() === ""
    ) {
      swal("Alert", "Please fill all fields", "error");
      return;
    }
    $(this).html("Processing!....");

    $.ajax({
      url: "https://api.formbucket.com/f/buk_KtPuaivHDVuGuuwxBq0vTfqQ",
      type: "POST",
      crossDomain: true,
      headers: {
        accept: "application/javascript"
      },
      data: $("#signup").serialize()
    })
      .done(function(response) {
        $(".btn").html("sign up");

        // $('.btn').val("Exit");
        //alert('Thanks for subscribing!');
        swal({
          title: "Success!",
          text:
            "Thanks for applying to be a GIGM Ambassador. We review applications on a regular basis and will send you an email if your application is accepted.",
          icon: "success"
        }).then(function() {
          console.log("The Ok Button was clicked.");
          $(value).each(function(index, value) {
            $(this).val("");
          });
        });
      })
      .fail(function(response) {
        alert(
          "something went wrong!, Kindly check your internet connection and retry"
        );
        $(".btn").html("Kindly Reload page");
        subscribeButton.prop("disabled", false);
      });
  });
});
