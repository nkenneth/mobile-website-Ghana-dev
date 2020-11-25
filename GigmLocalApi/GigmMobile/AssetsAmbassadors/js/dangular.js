var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    let Refcode2 = localStorage.getItem("RefCode");
    console.log("Local Storage working" + Refcode2);
    $scope.url = 'https://client.thegigmobility.com/api/CampusAmbassador/getcustomerbyrefcode/' + Refcode2;
    console.log($scope.url);

    $scope.records = [
        {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Charles Onyinyechi",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }, {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Charles Onyinyechi",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }, {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Charles Onyinyechi",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }, {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Vincent Amara",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }, {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Charles Vincent Amara",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }, {
            "CustomerId": 320,
            "Title": null,
            "FirstName": "Vincent Amara Onyinyechi",
            "MiddleName": null,
            "LastName": " ",
            "DateOfBirth": null,
            "CustomerCode": null,
            "Gender": 0,
            "NextOfKinName": "Vincent Amara",
            "NextOfKinPhone": "08184563441",
            "Email": "charlesonyinyex@gmail.com",
            "Address": null,
            "PhoneNumber": "07037814447",
            "OptionalPhoneNumber": null,
            "LoginDeviceType": 1,
            "WalletId": null,
            "WalletNumber": null,
            "DeviceToken": "cFC8EL71DcQ:APA91bEmaJ6PvS0aooXRA1cqMfsQarK1ITBrMw-22GbsmUBVCsxt2A5CwJ6HUTemFzdGuHhFAKTO4Q7ygqk-fM5LJnxVws9E6fzYszdKLq-GCSdq9rhK-phvQIDKxpuxhXnO21wnvCLxa1B4UtjMjUlYrXPAUfuyHg",
            "ReferralCode": "FF0A2-E5E79"
        }
    ]



    $scope.type = 'Bearer i35gGm6IyOZ17oqk7lkXzVpTim-cTnk_WMwq15AeXqy0ms33YSVeojZmXer5EeZ7GoIeSS61905ti-2sMJDjnyCDVCVpV7gfs8oWv6yOnCsDehVH83eV-wkCL_S-hvBb-ph7HyuVfoZv6HhtgJspVv0OAuDOo_27OU0zex__WGpB-XLjYBsqaeZM5gQmut9FIv2Wt3zSeEv9KY2l_gSSxCBJQCjtyJMNo4_gwrlWYHZ5vPAil7dhDvHPJjoDMAWVXnDmNYREQHg2Zp-x9XGoYRPnabsL5ak6iLPHGxmX7_i4BftmkIt8jLI-o0TEmsb-RhxBQs0LiOWolmDRv_D5AvToKx3FYLUPJSgazp9eimG4B9yQhr8DtXjTqF6UhUmV5JuGjihiMxIims-PdiYB1ZqKPm4XFl75Br8Yhs05QaoYyIq4iEZjApxKrX_Z-Cd4wWuFcVtRAPCwPT7QTR_Tvg';
    $scope.method = 'GET';
	//   $scope.url = 'https://client.thegigmobility.com/api/CampusAmbassador/getcustomerbyrefcode/FF0A2-E5E79';

   

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