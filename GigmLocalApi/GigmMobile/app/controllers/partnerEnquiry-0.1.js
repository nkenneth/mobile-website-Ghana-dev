(function () {
    'use strict';


    var controllerId = 'partnerEnquiry';
    angular.module('gigm').controller(controllerId,
        ['common', '$localstorage', '$scope', 'datacontext', partnerEnquiry]);

    function partnerEnquiry(common, $localstorage, $scope, datacontext) {
        $scope.vehicles = [{}];


        //var api_url = BaseUrl();
        var api_url = "http://client.thegigmobility.com/";

        var makeurl = api_url + 'api/vehicle/makes';
        var modelurl = api_url + 'api/vehicle/models';

        $scope.years = [];
        $scope.models = [];
        $scope.makes = [];
        $scope.colours = [];

        var d = new Date();
        var n = d.getFullYear();
        var i = 0;
        for (i = 2011; i <= n; i++) {
            $scope.years.push(i);
        }

        $.ajax({
            method: 'GET',
            url: makeurl,
            headers: {
                Authorization: 'Bearer srypV0O8tGLI6h2krC9Xwn6eu5GN1snXGimaEiP_CeHUGhJkEKTpLbE4MASB7RpQEiVclpWPscPYnrsZ-i6r08s-Jfa-FE4LRZLxHavKkJR5L5LYnSLnLYAB2srGwHjal9911F8BafP2yLNRmgSAKlipImza9mPgmXATcxT62ppEN1YyZiSdzXU-orFP1r_fCnd7P3wUpWxmD08FiE6LrUR5Wv-q4wKTi32gCa_bCCsiIb-VTZCjlIr_Ohd0jb0agWVEv53Bc40aUmjBgoZ0wbOS1EEe7KgDlsg1gNUKpO1Wek4wLGpiRSRqrpmsGS3RFj6WGVfJ6z87JHbSzvFBloAYVxpnvYPavSFKNB0ez2_6JGP1s3xV6PcCGM5V6OSXDn-QJtr7lKNXZXv62yhnZhK6r0-uC4VnT7-SJzlN0rAMkLRPi2c7uNnex7cacLrkf3Mp8DljzfJUSs7SPjN4tQ'
            },
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {
                $.each(result.Object.Items, function (index, make) {
                    //$scope.makes.push(make);
                });
            }
        });

        $.ajax({
            method: 'GET',
            url: modelurl,
            headers: {
                Authorization: 'Bearer srypV0O8tGLI6h2krC9Xwn6eu5GN1snXGimaEiP_CeHUGhJkEKTpLbE4MASB7RpQEiVclpWPscPYnrsZ-i6r08s-Jfa-FE4LRZLxHavKkJR5L5LYnSLnLYAB2srGwHjal9911F8BafP2yLNRmgSAKlipImza9mPgmXATcxT62ppEN1YyZiSdzXU-orFP1r_fCnd7P3wUpWxmD08FiE6LrUR5Wv-q4wKTi32gCa_bCCsiIb-VTZCjlIr_Ohd0jb0agWVEv53Bc40aUmjBgoZ0wbOS1EEe7KgDlsg1gNUKpO1Wek4wLGpiRSRqrpmsGS3RFj6WGVfJ6z87JHbSzvFBloAYVxpnvYPavSFKNB0ez2_6JGP1s3xV6PcCGM5V6OSXDn-QJtr7lKNXZXv62yhnZhK6r0-uC4VnT7-SJzlN0rAMkLRPi2c7uNnex7cacLrkf3Mp8DljzfJUSs7SPjN4tQ'
            },
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {
                $.each(result.Object.Items, function (index, model) {
                    //$scope.models.push(model);
                });
            }
        });

        $scope.toggle = function () {
            this.state = !this.state;
            console.log("clicked");
        };

        $scope.IsEnterprise = true;

        $scope.addVehicle = function () {
            var newVehicle = {};
            $scope.vehicles.push(newVehicle);
        };

        $scope.removeVehicle = function (vehicle) {
            var index = $scope.vehicles.indexOf(vehicle);
            $scope.vehicles.splice(index, 1);
        };

        var vm = this;

        vm.loading = false;

        vm.partnerEnquiry = {};
        vm.mileage = {};
        vm.state = {};
        vm.Colour = {};
        vm.date = {};
        vm.inspectionLocation = {};
        vm.partnerType = "individual";
        vm.numberOfVehicles = {};

        vm.mileage.availableOptions = [
            { option: 'Mileage of Vehicle with Lowest Mileage', value: '0' },
            { option: '0-90', value: '1' },
            { option: '90 and above', value: '2' }];

        vm.mileage.selectedOption = vm.mileage.availableOptions[0];

       vm.date.availableOptions = [$scope.years];

        vm.date.selectedOption = vm.date.availableOptions[0];

        $scope.colours = ["Silver", "Wine", "Navy", "Blue", "White", "Black", "Champagne", "Gold"];
       
        vm.Colour.availableOptions = [
            { option: 'Select Colour', value: '0' },
            { option: 'Silver', value: 'Silver' },
            { option: 'Wine', value: 'Wine' },
            { option: 'Navy', value: 'Navy' },
            { option: 'Blue', value: 'Blue' },
            { option: 'White', value: 'White' },
            { option: 'Black', value: 'Black' },
            { option: 'Champagne', value: 'Champagne' },
            { option: 'Gold', value: 'Gold' },
            { option: 'Gray', value: 'Gray' },
            { option: 'Black', value: 'Black' },
            { option: 'Gold', value: 'Gold' }
        ];
        vm.Colour.selectedOption = vm.Colour.availableOptions[0];

        $scope.makes = ["Nissan", "JET", "Foton", "Mercedes", "Toyota"];

        //vm.make.availableOptions = [
        //    { option: 'Select Make', value: '0' },
        //    { option: 'Nissan', value: 'Nissan' },
        //    { option: 'JET', value: 'JET' },
        //    { option: 'Foton', value: 'Foton' },
        //    { option: 'Mercedes', value: 'Mercedes' },
        //    { option: 'Toyota', value: 'Toyota' }
        //];
        //vm.make.selectedOption = vm.make.availableOptions[0];
        $scope.models = ["Hiace", "Sprinter", "Prime", "Business Class", "Sienna(6 passengers)", "Hiace X", "Jet Movers", "Jet Prime", "Jet Prime XL", "Nissan Urvan"];
        //vm.model.availableOptions = [
        //    { option: 'Select Model', value: '0' },
        //    { option: 'Hiace', value: 'Hiace' },
        //    { option: 'Sprinter', value: 'Sprinter' },
        //    { option: 'Prime', value: 'Prime' },
        //    { option: 'Business Class', value: 'Business Class' },
        //    { option: 'Sienna(6 passengers)', value: 'Sienna(6 passengers)' },
        //    { option: 'Hiace X', value: 'Hiace X' },
        //    { option: 'Jet Movers', value: 'Jet Movers' },
        //    { option: 'Jet Prime', value: 'Jet Prime' },
        //    { option: 'Jet Prime XL', value: 'Jet Prime XL' },
        //    { option: 'Nissan Urvan', value: 'Nissan Urvan' }
        //];
        //vm.model.selectedOption = vm.model.availableOptions[0];

        vm.inspectionLocation.availableOptions = [
            { option: 'Select Preferred Inspection Location', value: '0' },
            { option: 'Jibowu - Lagos', value: '1' },
            { option: 'Ajah - Lagos', value: '2' }, { option: 'Iyana Ipaja - Lagos', value: '3' }, { option: 'Asaba - Delta', value: '4' },
            { option: 'Utako - FCT', value: '5' }, { option: 'Uselu - Edo', value: '6' }];

        vm.inspectionLocation.selectedOption = vm.inspectionLocation.availableOptions[0];

        vm.numberOfVehicles.availableOptions = [
            { option: 'How many Bus(es) / Sienna(s) would you like to sign up with(minumum of 3 required)?', value: '0' },
            { option: '3', value: '3' },
            { option: '4', value: '4' },
            { option: '5', value: '5' },
            { option: '6', value: '6' },
            { option: '7', value: '7' },
            { option: '8', value: '8' },
            { option: '9', value: '9' },
            { option: '10', value: '10' },
            { option: '11', value: '11' },
            { option: '12', value: '12' }];

        //  vm.partnerType.availableOptions = [{ option: 'Select Partnet Type', value: "" }, { option: 'Individual', value: 1 }, { option: 'Coporate', value: 2 }];
        // vm.partnerType.selectedOption = vm.partnerType.availableOptions[0];

        vm.numberOfVehicles.selectedOption = vm.numberOfVehicles.availableOptions[0];


        vm.state.availableOptions = [
            { option: 'Select State', value: '0' },
            { option: 'Abia', value: 'Abia' },
            { option: 'Adamawa', value: 'Adamawa' },
            { option: 'Akwa Ibom', value: 'Akwa Ibom' },
            { option: 'Anambra', value: 'Anambra' },
            { option: 'Bauchi', value: 'Bauchi' },
            { option: 'Benue', value: 'Benue' },
            { option: 'Borno', value: 'Borno' },
            { option: 'Cross River', value: 'Cross River' },
            { option: 'Delta', value: 'Delta' },
            { option: 'Ebonyi', value: 'Ebonyi' },
            { option: 'Bauchi', value: 'Bauchi' },
            { option: 'Edo', value: 'Edo' },
            { option: 'Enugu', value: 'Enugu' },
            { option: 'Ekiti', value: 'Ekiti' },
            { option: 'Gombe', value: 'Gombe' },
            { option: 'Imo', value: 'Imo' },
            { option: 'Jigawa', value: 'Jigawa' },
            { option: 'Kaduna', value: 'Kaduna' },
			{ option: 'Lagos', value: 'Lagos' },
            { option: 'Nassarawa', value: 'Nassarawa' },
            { option: 'Niger', value: 'Niger' },
            { option: 'Ogun', value: 'Ogun' },
            { option: 'Ondo', value: 'Ondo' },
            { option: 'Osun', value: 'Osun' },
            { option: 'Oyo', value: 'Oyo' },
            { option: 'Plateau', value: 'Plateau' },
            { option: 'Rivers', value: 'Rivers' },
            { option: 'Sokoto', value: 'Sokoto' },
            { option: 'Taraba', value: 'Taraba' },
            { option: 'Yobe', value: 'Yobe' },
            { option: 'Osun', value: 'Osun' },
            { option: 'Zamfara', value: 'Zamfara' },
            { option: 'FCT', value: 'FCT' }];

        vm.state.selectedOption = vm.state.availableOptions[0];

        vm.setPartnerType = function (type) {
            vm.partnerType = type;
        };
            
        vm.saveEnquiry = function () {
            vm.Mileage = $('#mileage').val();
            vm.partnerEnquiry.state = $('#state').val();
            vm.partnerEnquiry.NumberOfVehicles = $('#numberOfVehicles').val();//vm.numberOfVehicles.selectedOption.option;
            vm.partnerEnquiry.InspectionLocation = $('#inspectionLocation').val(); // vm.inspectionLocation.selectedOption.option;

            /*if (vm.Mileage === vm.mileage.selectedOption.option) {
                swal("Select Mileage")
                    .then((value) => {              
                        return false;
                    });

                return false;
            }*/

            if (vm.partnerEnquiry.state === vm.state.selectedOption.option) {
                swal("Select State")
                    .then((value) => {
                        return false;
                    });

                return false;
            }

            if (vm.partnerEnquiry.NumberOfVehicles === vm.numberOfVehicles.selectedOption.option) {
                swal("Select Number of Vehicles")
                    .then((value) => {
                        return false;
                    });

                return false;
            }

            if (vm.partnerEnquiry.InspectionLocation === vm.inspectionLocation.selectedOption.option) {
                swal("Select preferred Inspection Location")
                    .then((value) => {
                        return false;
                    });

                return false;
            }

            $scope.submited = true;
            vm.loading = true;

            console.log(vm.partnerEnquiry);

            vm.partnerEnquiry.Vehicles = $scope.vehicles;


            if (vm.partnerType === 'coporate') {
                vm.partnerEnquiry.PartnerType = 0;
            } else
                vm.partnerEnquiry.PartnerType = 1;
            if (vm.requireFinance === true) {
                vm.partnerEnquiry.FinanceMode = 1;
            } else
                vm.partnerEnquiry.FinanceMode = 0;

            datacontext.savePartnerEnquiry(vm.partnerEnquiry).then(function (res) {
                vm.loading = false;

                debugger;
                if (res.Item1.Object !== null && res.Item1.Code === "200") {
                    console.log("something");

                    if (res.Item1.Object.Item2 === true) {
                        swal("Thanks for your enquiry! We would get back to you within the next 48 hours.")
                            .then((value) => {
                                window.location.href = "/";
                            });
                    } else

                        swal("Thanks for your enquiry! We would get back to you within the next 48 hours")
                            .then((value) => {
                                window.location.href = "/";
                            });
                } else {
                    swal("Error occured!")
                        .then((value) => {

                        });
                }


            }, function (error) {
                vm.loading = false;
                swal("Error occured pls try again!")
                    .then((value) => {
                        window.location.href = "/";
                    });
            });
        };
    }

})();