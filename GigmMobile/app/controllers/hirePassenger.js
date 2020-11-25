(function () {
    'use strict'
    var controllerId = "busBookerPay";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout','$scope', '$localstorage', 'datacontext', busBookerPay]);


    function busBookerPay($q, $timeout, $scope, $localstorage, datacontext) {

        var vm = this;

        vm.distance = 0;
        vm.hireRequest = {};
        vm.busPrototype = {};
        vm.hireBusses = {};
        vm.selectedBusses = [];
        vm.currency = "";
        vm.fares = {};
        vm.fares.total = 0;
        vm.fares.sleepOver = 0;
        vm.fares.priceWithoutSleepOver = 0;


        vm.user = {};


        activate();


        vm.gender = {
            availableOptions: [
                { id: '0', name: 'Male' },
                { id: '1', name: 'Female' },
            ],

            selectedOption: { id: '0', name: vm.user.Gender || 'Male' }, //This sets the default value of the select in the ui

        };

        vm.processPay = function (paymentMethod) {
            
            if ($scope.informationStatus !== true) {
                swal("Please fill in all reqired information to proceed", "", "error");
                $scope.submited = true;

                return;
            }
            var vehicleHireRequest = {};

            var vehicleObjectList = [];

            angular.forEach(vm.selectedBusses, function (bus) {
                console.log(bus);
                var vehicleObj = {
                    FarePrice: bus.Price,
                    NoOfBookedVehicle: bus.Quantity,
                    SleepOverPrice: bus.SleepOverPrice,
                    VehicleModelId: bus.Id
                }

                vehicleObjectList.add(vehicleObj);
            });

            vehicleHireRequest.Address = vm.user.Address;
            vehicleHireRequest.FullName = vm.user.FirstName;
            vehicleHireRequest.Gender = +vm.user.Gender == 0? 'Male' :'Female';
            vehicleHireRequest.Email = vm.user.Email;
            vehicleHireRequest.PhoneNumber = vm.user.PhoneNumber;
            vehicleHireRequest.NextOfKinPhoneNumber = vm.user.NextOfKinPhone;
            vehicleHireRequest.NextOfKinName = vm.user.NextOfKinName;
            vehicleHireRequest.HiredServiceType = 0;
            vehicleHireRequest.OnewayPickupLocation = vm.busPrototype.OnewayPickupLocation;
            vehicleHireRequest.OneWayDropoffLocation = vm.busPrototype.OneWayDropoffLocation;
            vehicleHireRequest.OnewayDistanceApart = vm.distance;
            vehicleHireRequest.OnewayPickupDate = vm.hireRequest.DepartureDate;
            vehicleHireRequest.paymentMethod = paymentMethod;
            vehicleHireRequest.IsSleepOver = vm.busPrototype.IsSleepOver;
            vehicleHireRequest.Amount = vm.fares.total;


            if (+vm.hireRequest.TripType == 2) {
                vehicleHireRequest.ReturnDropoffLocation = vm.hireRequest.DestinationPoint;
                vehicleHireRequest.ReturnPickupLocation = vm.hireRequest.DeparturePoint;
                vehicleHireRequest.ReturnPickupDate = vm.hireRequest.ReturnDate;
                vehicleHireRequest.ReturnDistanceApart = vm.busPrototype.ReturnDistanceApart;
                vehicleHireRequest.HiredServiceType = 1;

            }

            vehicleHireRequest.HireVehicleDetail = vehicleObjectList;

            var request = {};

            if (+vm.hireRequest.TripType == 2) 
                request = vehicleHireRequest;
            else 
                request = vehicleHireRequest;
            
                
            vm.loading = true;
            datacontext.postHireBooking(request, +vm.hireRequest.TripType).then(function (res) {
                vm.loading = false;
                if (+vehicleHireRequest.paymentMethod == 5 && !res.Item2) {
                    $localstorage.setObject("phr", res.Item3);
                    window.location.href = res.Item1;
                } else if (res.Item1 == "failed" && res.Item2) {
                    swal(res.Item2, "", "error");
                } else if (+vehicleHireRequest.paymentMethod == 12 ) {
                    window.location.href = res;
                }
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }

        function activate() {

            var result = $localstorage.getObject("countrydetails");
            vm.countrycode = result.CountryCode;

            if (vm.countrycode === "GH") {

                $("#paystackpayment").show();
                $('#unifiedpayment').hide(100);
                $('#payswitchpayment').hide();
            } else {

                $("#paystackpayment").show();
                $('#unifiedpayment').show(100);
                $('#payswitchpayment').hide();
            }
            try {

               // var result = $localstorage.getObject("countrydetails");
                //vm.currency = result.CurrencySymbol;
                vm.selectedBusses = $localstorage.getObject('selectedBusses');
                vm.hireBusses = $localstorage.getObject('hireBusses');
                vm.busPrototype = vm.hireBusses.Departures[0];
                vm.currency = vm.busPrototype.currency;
                vm.distance = $localstorage.getObject('distance').distanceInKiloMeter;
                vm.hireRequest = $localstorage.getObject('hbr');

                console.log(vm.selectedBusses);
               
                console.log(vm.hireBusses.Departures[0]);
                angular.forEach(vm.selectedBusses, function (bus) {
                    if (+vm.hireRequest.TripType == 2) {
                       
                        if (+vm.hireRequest.RetainOvernight == true) {
                            vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity * 2) + bus.SleepOverPrice * bus.Quantity;
                            vm.fares.sleepOver = vm.fares.sleepOver + bus.SleepOverPrice * bus.Quantity;
                            vm.fares.priceWithoutSleepOver = vm.fares.priceWithoutSleepOver + (bus.Price * bus.Quantity * 2);
                           
                        } else {
                            vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity * 2);
                           // vm.fares.priceWithoutSleepOver = vm.fares.priceWithoutSleepOver + (bus.Price * bus.Quantity);
                        }
                    } else {
                        vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity);
                    }


                    //vm.SleepOverPrice + bus
                    
                });


                vm.user = $localstorage.getObject("user").Item1.Object;
                console.log(vm.fares);
            } catch (e) {
                console.log(e);
            }
        }

        $scope.$watch('booker.$valid', function (newVal) {
            console.log('form state', newVal);
            $scope.informationStatus = newVal;
        });

    }


})();