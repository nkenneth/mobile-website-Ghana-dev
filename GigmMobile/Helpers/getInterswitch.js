function Test() {
    var amount = document.getElementById("lblDefaultData2").value;
    alert(amount);
}

function fetchData() {
    //
    try {
        //getData();
        //getViewData();
       var hash= document.getElementById("lblDefaultData3").value
        var TransDetails = {
            productid:5064,
            transactionreference:document.getElementById("lblDefaultData").value,
            amount:document.getElementById("lblDefaultData2").value,
            
        };

        $.ajax({
            url: "https://webpay.interswitchng.com/paydirect/api/v1/gettransaction.json",
            type: 'GET',
            headers: { 'Hash': hash },
            dataType: 'json',
            data:TransDetails,
            success: function (data, textStatus, xhr) {

               // $.each(data, function (index, election) {

                    alert(data);


               // });
                
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Status Code: " + xhr.status + ", Status Message: " + textStatus + ", Error                             Message: " + errorThrown);
            }

        });

    } catch (ex) {

        alert(ex);
    }
}