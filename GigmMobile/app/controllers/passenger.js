(function () {
    'use stricts'

    var controllerId = "passengerDetails";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout', '$localstorage', '$scope', 'datacontext', 'common', passenger]);

    function passenger($q, $timeout, $localstorage, $scope, datacontext, common) {
        {
            var vm = this;

            var beneficiary = [];

            vm.user = {
                'Gender': 0
            };

            //vm.user.Gender = 0;



            vm.title = "Submit";

            vm.adultArr = [];

            vm.childArr = [];

            vm.guest = {};

            vm.data = {};

            vm.departureTrip = {};
            vm.arrivalTrip = {};
            vm.trips = {};

            vm.fares = {};

            vm.departureseats = "";
            vm.arrivalseats = "";

            vm.picupRoutes = [];

            vm.bookingResponse = {};
            var minorfare = 0;
            var rtminorfare = 0;

            vm.isLoggedIn = false;
            vm.loading = false

            vm.booking = {};



            var discountedFare = "";
            var discountedMember = "";

            vm.gender = {
                availableOptions: [
                    { id: '0', name: 'Male' },
                    { id: '1', name: 'Female' },
                ],

                selectedOption: { id: '0', name: vm.user.Gender || 'Male' }, //This sets the default value of the select in the ui

            };

            vm.pickup = {};

            vm.pickup.options = [];

            vm.pickup.selectedOption = {
                PickupPointId: 0,
                PickupPointName: "Select Pickup location",
                PickUpPointAndTime: "Select Pickup location",

            }

            vm.picupSelected = {};


            vm.bookingModel = {};


            vm.isPickUp = false;


            activate();


        }
        function activate() {

            


            var promises = [getData().then(function (d) {
                {
                    //console.log(d);

                    try {
                        vm.user = d.user.Item1 ? d.user.Item1.Object : vm.user;
                    } catch (e) {
                        console.log(e);
                    }

                    // vm.user.PhoneNumber = +d.user.Item1.Object.PhoneNumber || "";
                    //  vm.user.NextOfKinName = "";
                    //  vm.user.NextOfKinPhone = "";
                    vm.data = d;

                    vm.departureTrip = d.departure;
                    vm.arrivalTrip = d.arrival;

                    var returntripfare = 0;
                    var returndiscfare = 0;
                    var returnmemdiscfare = 0;
                    var depatureFare = vm.departureTrip.FarePrice;
                    var fareperpax = vm.departureTrip.AdultFare;

                    if (vm.departureTrip.HasPickup) {
                        vm.pickup.options = vm.departureTrip.pickup;

                        vm.pickup.options.unshift(vm.pickup.selectedOption);
                    }

                    if (vm.data.trips.TripType === 1) {
                        returntripfare = vm.arrivalTrip.AdultFare;

                        if (vm.data.numOfChildren > 0) {
                            minorfare = vm.departureTrip.ChildFare;
                            rtminorfare = vm.arrivalTrip.ChildFare;
                        }

                        if (vm.user && vm.user.IsActive) {
                            returnmemdiscfare = vm.arrivalTrip.ReturnFare;
                            returndiscfare = returnmemdiscfare;
                            fareperpax = vm.departureTrip.MemberFare;
                            vm.isLoggedIn = true;
                        }
                        else {
                            returndiscfare = vm.arrivalTrip.FarePrice;
                        }
                    } else {

                        fareperpax = vm.departureTrip.FarePrice;

                        if (vm.data.numOfChildren > 0) {
                            minorfare = vm.departureTrip.ChildFare;
                        }
                        if (vm.user && vm.user.IsActive) {
                            vm.isLoggedIn = true;
                            fareperpax = vm.departureTrip.MemberFare;
                        }
                    }

                }

                //double mainfarebeforediscount = (Convert.ToDouble(farebeforediscount) * paxno) + (Convert.ToDouble(returntripfare) * paxno);
                //double priceperadult = farebeforediscount + returntripfare;
                //double adultbeforediscount = (Convert.ToDouble(farebeforediscount) * adultnum) + (Convert.ToDouble(returntripfare) * adultnum);
                //double totalperpax = Convert.ToDouble(Convert.ToDouble(fareperpax) + Convert.ToDouble(returndiscfare));
                //double adultpaxtotal = Convert.ToDouble(Convert.ToDouble(fareperpax) * adultnum) + (Convert.ToDouble(returndiscfare) * adultnum);
                //var childamount = Convert.ToDouble(Convert.ToDouble(minorfare) + Convert.ToDouble(rtminorfare)) * numofChildren;
                //var totalchilddicount = Convert.ToDouble((Convert.ToDouble(priceperadult) * numofChildren) - childamount);
                //var totaladultfare = Convert.ToDouble(Convert.ToDouble(adultpaxtotal) * Convert.ToDouble(adultnum));
                //var totaladultbd = Convert.ToDouble(Convert.ToDouble(priceperadult) * Convert.ToDouble(adultnum));
                //var totaltopay = Math.Round(Convert.ToDouble(Convert.ToDouble(adultpaxtotal) + childamount));
                 //var totalbeforediscount = (Convert.ToDouble(priceperadult) * (Convert.ToInt32(paxno)));
                //var totaladultdiscount = totaladultbd - adultpaxtotal;
                 //var totaldiscount = (totalbeforediscount - totaltopay);
                vm.fares.mainfarebeforediscount = (depatureFare * +d.maxPax) + (returntripfare * +d.maxPax);
                vm.fares.priceperadult = depatureFare + returntripfare
                vm.fares.adultbeforediscount = (depatureFare * +d.numOfAdults) + (returntripfare * +d.numOfAdults);
                vm.fares.totalperpax = fareperpax + returndiscfare;
                vm.fares.adultpaxtotal = fareperpax * vm.data.numOfAdults + returndiscfare * vm.data.numOfAdults;
                vm.fares.childamount = (minorfare + rtminorfare) * vm.data.numOfChildren;
                vm.fares.totalchildiscount = (vm.fares.priceperadult * vm.data.numOfChildren) - vm.fares.childamount;
                vm.fares.totaladultfare = vm.fares.adultpaxtotal * vm.data.numOfAdults;
                vm.fares.totaladultbd = vm.fares.priceperadult * vm.data.numOfAdults;
                vm.fares.totaltopay = vm.fares.adultpaxtotal + vm.fares.childamount;
                vm.fares.totalbeforediscount = vm.fares.priceperadult * vm.data.maxPax;
                vm.fares.totaladultdiscount = vm.fares.totaladultbd - vm.fares.adultpaxtotal;
                vm.fares.totaldiscount = vm.fares.totalbeforediscount - vm.fares.totaltopay;


                vm.trips = d.trips;
                console.log(d);

                angular.forEach(vm.data.departureSeats, function (seat, i) {
                    vm.departureseats = vm.departureseats + seat

                    console.log(i);

                    if (i < vm.data.departureSeats.length - 1) {
                        vm.departureseats += ","
                    }
                });



                angular.forEach(vm.data.arrivalSeats, function (seat, i) {
                    vm.arrivalseats += seat;
                    console.log(i);
                    if (i < vm.data.arrivalSeats.length - 1) {
                        vm.arrivalseats += ","
                    }
                });

                console.log("dept", vm.departureseats);

                console.log("data", vm.data);
                console.log("seats", vm.data.departureSeats);
                //vm.guest.email = vm.data.user.Item1.Object.Email;

                for (var i = 0; i < vm.data.numOfAdults - 1; i++) {
                    vm.adultArr.push(i);
                }

                for (var i = 0; i < vm.data.numOfChildren; i++) {
                    vm.childArr.push(i);
                }
            }, function (err) {
                console.log(err);
            })];


            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;



                console.log(vm.isLoggedIn);
            } catch (e) {
                console.log(e);
                vm.isLoggedIn = false;
                vm.user = {};
            }


            console.log("fare-obj", vm.fares);

        }

        function getData() {
            var data = {};

            vm.user = $localstorage.getObject('user');

            data.user = vm.user;

            data.trips = $localstorage.getObject('bus-data');

            data.maxPax = +$localstorage.get('max-pax');
            data.numOfAdults = +$localstorage.get('adults');
            data.numOfChildren = +$localstorage.get('children');

            data.departure = $localstorage.getObject('selectedDepartureTrip').trip;
            data.arrival = $localstorage.getObject('selectedArrivalTrip').trip;

            data.departureSeats = $localstorage.getObject('selectedDepartureTrip').seats;
            data.arrivalSeats = $localstorage.getObject('selectedArrivalTrip').seats;

            try {
                data.pickup = $localstorage.getObject('pickup');
            } catch (ex) {
                data.pickup = {};
            }



            console.log(data.departure.seats);

            return $q.when(data);
        }

        function validateRequest() {

            console.log(booker);
            var pickupLoc = $('#pickupLocation_').val();
            console.log(vm.departureTrip.HasPickup, pickupLoc, vm.booking.PickUp);
            if (vm.departureTrip.HasPickup && vm.booking.PickUp == "1" && +pickupLoc == 0) {
                console.log(vm.pickup.selectedOption)
                swal("Pls select a pickup location", "", "error");
                return false;
            } else {
                vm.picupSelected = vm.pickup.options.selectWhere("PickupPointId", +pickupLoc)[0];

                $localstorage.setObject("pickup", vm.picupSelected);
                console.log(vm.picupSelected);

            }
            console.log(!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber);

            if (!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber) {
                swal("Pls supply contact details", "", "error");
                return false
            }

            return true;

        }

        function processGigmRequest(paymentType) {
 
            if ($scope.informationStatus !== true) {
                swal("Pls fill in all reqired information to proceed", "", "error");
                $scope.submited = true;
                return;
            }

            beneficiaryList = [];

            beneficiary.clear();


            for (var i = 1; i <= vm.data.numOfChildren; ++i) {
                beneficiary.push($('#form' + i).serializeArray());
            }

            console.log("xxxx", beneficiary);


            for (var i = 1; i <= vm.data.numOfAdults; ++i) {
                console.log(i);
                beneficiary.push($('#_form' + i).serializeArray());
            }

            console.log("yyy", beneficiary);


            console.log("bene:", beneficiary);
            var isError = false;
            angular.forEach(beneficiary, function (value, index) {
                var benef = {};

                try {
                    if (index != beneficiary.length - 1) {
                        console.log("value", value[1]);
                        benef.PassengerType = +value[0].value;
                        benef.FullName = value[1].value;
                        if (!benef.FullName || benef.FullName.length < 3) {
                            benef.PassengerType == 1 ? swal("Passenger(child)'s name required", "", 'error')
                                : swal("Passenger(adult)'s name required", "", 'error');
                            isError = true;
                            return false;
                        }

                        benef.Gender = value[2].value;
                        if (benef.Gender !== "0" && benef.Gender !== "1") { //throw Error()
                            benef.PassengerType == 1 ? swal("Passenger(child)'s gender required", "", 'error') : swal("Passenger(adult)'s gender required", "", 'error');
                            isError = true
                            return false;
                        }

                        benef.SeatNumber = vm.departureseats.trim().split(',')[index + 1];
                        beneficiaryList.push(benef);
                    }
                } catch (ex) {
                    swal("Check bebeficiary's details", "", "error");
                    console.log(ex);
                }

            });

            if (isError) {
                return;
            }

            if (!validateRequest()) {

                return;

            }

            vm.loading = true;

            var mainPassenger = {};

            mainPassenger.PassengerType = 1;
            mainPassenger.FullName = vm.user.FirstName;
            mainPassenger.Gender = !$('#paxGender').val() ? 0 : $('#paxGender').val();
            mainPassenger.SeatNumber = vm.departureseats.trim().split(',')[0].trim();

            //beneficiaryList.add(mainPassenger);

            var postSearchModel = {};

            console.log(vm.data.departure);

            postSearchModel.TripType = vm.data.trips.TripType;
            postSearchModel.BookingType = 2;
            postSearchModel.PaymentMethod = paymentType;
            postSearchModel.PosReference = "";
            postSearchModel.Beneficiaries = beneficiaryList;
            postSearchModel.SeatRegistrations = vm.data.departure.VehicleTripRegistrationId + ":" + vm.departureseats.trim();
            postSearchModel.FirstName = vm.user.FirstName;
            postSearchModel.Gender = mainPassenger.Gender;
            postSearchModel.Amount = vm.fares.totaltopay.toFixed(0);
           // postSearchModel.Discount = vm.fares.totaldiscount.toFixed(0);
            postSearchModel.Email = vm.user.Email;
            postSearchModel.PhoneNumber = vm.user.PhoneNumber;
            postSearchModel.NextOfKinName = vm.user.NextOfKinName;
            postSearchModel.NextOfKinPhone = vm.user.NextOfKinPhone;
            postSearchModel.IsLoggedIn = vm.isLoggedIn;

          
            if (vm.departureTrip.HasPickup && vm.isPickUp) {
                postSearchModel.PickUpId = +$('#pickupLocation_').val();

            }

            if (vm.data.departure.isSub) {
                postSearchModel.isSub = true;
            } else
                postSearchModel.isSub = false;
            if (vm.data.trips.TripType == 1 && vm.data.arrival.isSubReturn) {
                postSearchModel.isSubReturn = vm.data.arrival.isSubReturn;
                postSearchModel.RouteIdReturn = vm.data.arrival.RouteIdReturn;
            }

            if (vm.data.trips.TripType == 1) {
                postSearchModel.SeatRegistrations += ";" + vm.data.arrival.VehicleTripRegistrationId + ":" + vm.arrivalseats.trim();
            }


            postSearchModel.RouteId = vm.data.departure.RouteId;

            vm.bookingModel = postSearchModel;

            console.log("final list", beneficiaryList);

            console.log("psm", postSearchModel);

            $localstorage.setObject('psm', postSearchModel);

            if (paymentType == 12 || paymentType == 11 || paymentType == 10 || paymentType == 2) {

            }


            datacontext.postBoking(postSearchModel).then(function (res) {
                vm.bookingResponse = res;
                vm.loading = false;



                if (!res) {
                    swal("Error occured, please try again", "", "error");
                    $timeout(function () {
                        window.location.href = "/Pages/Booking";
                    }, 3000);

                    return;
                }
                if (postSearchModel.PaymentMethod == 5) {
                    if (res) {
                        window.location.href = res;
                    } else {
                        swal("Error occured, please try again", "", "error");
                        $timeout(function () {
                            window.location.href = "/Pages/Booking";
                        }, 3000);
                        
                    }
                } else if (postSearchModel.PaymentMethod == 8) {
                    processFlutterWave(res);
                } else //book on hold
                    if (postSearchModel.PaymentMethod == 7 || postSearchModel.PaymentMethod == 12
                        || postSearchModel.PaymentMethod == 10 || postSearchModel.PaymentMethod == 14) {
                     window.location.href = res;
                }
                console.log("booking response", res);
            }, function (err) {
                console.log(err);
                swal("Error", "Error occured, please try again", "error");
            });
        }

        vm.getInputs = function () {
            processGigmRequest();
        }

        vm.processPay = function (paymentType) {
           
            processGigmRequest(paymentType);
        }

        processFlutterWave = function (res) {
            
            var PBFPubKey = "FLWPUBK - 865c4665eee6ba09ed0df9ebae80878e-X";
            var PBFSecKey = "FLWSECK-7937608537d36ad6747ae2429474886f-X";
            var PBFPubKey_ = "FLWPUBK-b56fcd0ebeac1413e2adc7872da6339d-X";
            var PBFSecKey_ = "FLWSECK-7937608537d36ad6747ae2429474886f-X";
            var amount = vm.bookingModel.Amount;
            var redirectUrl = res.Item3;
            var txref = res.Item1;

            console.log("amount--", amount);

            console.log(res.Item2);

            var readyStateCheckInterval = setInterval(function () {
                if (document.readyState === "complete") {
                    clearInterval(readyStateCheckInterval);

                    getpaidSetup({
                        customer_email: vm.user.Email,
                        amount: amount.split(".")[0],
                        currency: 'NGN',
                        country: 'NG',
                        payment_method: 'card',
                        txref: res.Item1,
                        PBFPubKey: 'FLWPUBK-b56fcd0ebeac1413e2adc7872da6339d-X',
                        integrity_hash: res.Item2,
                        // normalize: '<%= normalize.Text %>',
                        redirect_url: redirectUrl,
                        redirect_no_json: 1,
                        onclose: function loadUrl() {
                            window.location.assign(redirectUrl);
                        }
                    }
                    );



                }
            }, 10);
        }
        processGtbUssd = function () {
            swal("Comming Soon!", "", "info");
        }

        processFbnUssd = function () {
            swal("Comming Soon!", "", "info");
        }

        $scope.$watch('booker.$valid', function (newVal) {
            //$scope.valid = newVal;
            console.log("state", newVal);
            $scope.informationStatus = newVal;
        });


        vm.hidePickUp = function () {
            console.log("...");
            vm.isPickUp = false;
        }

        vm.showPickUp = function () {
            console.log("..");
            vm.isPickUp = true;
        }

       vm.showHideSummary = function() {
            console.log("showHideSummary");
            $('#trippanel').toggle();
        }

        $('#hideShow').click(function (e) {
            console.log(e);
            $('#trippanel').toggle();
        });

        $(function myfunction() {
            console.log($('#hideShow'));
        });
    }
})();