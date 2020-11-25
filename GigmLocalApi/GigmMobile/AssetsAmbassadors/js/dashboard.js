$(document).ready(function(){


  if (localStorage.getItem("Firstname") === null) {
    window.location.replace("login.html");
  }

  else {
    var FirstName = localStorage.getItem("Firstname");
    var LastName = localStorage.getItem("Lastname");
    var Refcode = localStorage.getItem("RefCode");
    var Amount = localStorage.getItem("Amount");
    var Invited = localStorage.getItem("Invited");
    console.log("Local Storage working" + FirstName + Refcode);
    console.log(Invited + "sfvsv");

      $('#name').text(FirstName + " " + LastName);
      $('#refcode').text(Refcode);
      $('#invited').text(Invited);
      var mainShareUrl = "https://m.gigm.com/ambassadors";

      $("#shareRoundIcons").jsSocials({
        url: mainShareUrl,
        text: "Kindly Use my refcode: " + Refcode + " ,",
        showCount: true,
        showLabel: false,
        shares: [
            { share: "twitter", via: "artem_tabalin", hashtags: "search,google" },
            "facebook",
            "linkedin",
            "whatsapp"
        ]
    });
    
    //   Pass amount value as Int Naira 
      const formatAmt = new Intl.NumberFormat('en-NG', {style: 'currency', currency: 'NGN'});
      var amt =  formatAmt.format(Amount);
      console.log(amt);
      $('#amount').text(amt);
    //end of passing
    console.log(mainShareUrl);
    $('#logout').click(function(){
        localStorage.clear();
        window.location.replace("login");
})
    //   $("#copy").click(function(){
    //     Refcode.select();
    // document.execCommand("copy");
    // alert("Copied the text: " + Refcode);
    //   });

  }

});
