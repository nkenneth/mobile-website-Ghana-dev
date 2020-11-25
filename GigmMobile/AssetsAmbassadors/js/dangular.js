var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    let Refcode2 = localStorage.getItem("RefCode");
    console.log("Local Storage working" + Refcode2);
	  $scope.url = 'https://client.thegigmobility.com/api/CampusAmbassador/getcustomerbyrefcode/' + Refcode2;

	// $scope.url = 'https://client.gigmobilitysystem.com/api/CampusAmbassador/getcustomerbyrefcode/' + Refcode2;
	
    console.log($scope.url);

    //$scope.records = [
    //    {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Charles Onyinyechi",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }, {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Charles Onyinyechi",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }, {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Charles Onyinyechi",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }, {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Vincent Amara",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }, {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Charles Vincent Amara",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }, {
    //        "CustomerId": 320,
    //        "Title": null,
    //        "FirstName": "Vincent Amara Onyinyechi",
    //        "MiddleName": null,
    //        "LastName": " ",
    //        "DateOfBirth": null,
    //        "CustomerCode": null,
    //        "Gender": 0,
    //        "NextOfKinName": "Vincent Amara",
    //        "NextOfKinPhone": "08184563441",
    //        "Email": "charlesonyinyex@gmail.com",
    //        "Address": null,
    //        "PhoneNumber": "07037814447",
    //        "OptionalPhoneNumber": null,
    //        "LoginDeviceType": 1,
    //        "WalletId": null,
    //        "WalletNumber": null,
    //        "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
    //        "ReferralCode": "FF0A2-E5E79"
    //    }
    //]



	 $scope.type = 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg';
	//  $scope.type = 'Bearer pcTEoyHL_8v0gRwdhJtqWDzft2S6yaeC63p0EBc5SbCInoy2h27a9mdW9MS-o6pjWMhe9UzxVIp6mzkwpQBQp7zJVtCRmyCjgdyHpmb4ZLQ0u844q-k63vcUvESDhQwX-VMOx7BJAqBbqNsof5m1kJwyHYBu0P8x7UKRgjxOalTxXd5UVWy8czwEHENE0vRGLYP8Zdqlm77QUwXkAvle5UsApi45dxvOQma0IAXHLi-XpoZDIbqQs7SRqo9-WCpPhnV1CfZWgDyzKubULvsEmKXgGJBrGOjI-nL2idAXVViFVHsOahDCAD6OQCNYTgSYl_bc8-EfGvHw6E0MAff6VXTA9mxTEk1AcTzhyJpO8sqbu3pOzUzwiQiI_WiktzShmYdVP0FXaAiNZMOdFXyXL38YP4FV6Vf4dxvZb7zbxN4sJkE98H-8TumRjTVDWjPEnxzsr5l4HIvgzx5opPbaRg';
    $scope.method = 'GET';

   

    $http({
        method: "GET",
        url: $scope.url,
        headers: { 'Authorization': $scope.type }
    }).then(function mySuccess(response) {
        $scope.data = response.data.Object.Items;

    }, function myError(response) {
        $scope.data = response.statusText;
    });


});