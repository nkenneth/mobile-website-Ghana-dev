﻿(function () {
    //'use strict'

    var controllerId = "passengerDetails";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout', '$localstorage', '$scope', 'datacontext', '$http', 'common', passenger]);

    function passenger($q, $timeout, $localstorage, $scope, datacontext, $http, common) {
        {
            var vm = this;
            var mainDiscountFare = localStorage.getItem("discount");

            var beneficiary = [];

            vm.user = {
                'Gender': 0
            };

            vm.docxType = {
                'DocumentType': 0
            };
            vm.currency  = "";
            //vm.user.Gender = 0;

            vm.travelDocuments = {};
            vm.travelDocumentType = "";
            vm.travelDocumentTypeNumber = "";


            vm.title = "Submit";

            vm.adultArr = [];

            vm.childArr = [];

            vm.guest = {};

            vm.data = {};

            vm.departureTrip = {};
            vm.arrivalTrip = {};
            vm.trips = {};
            vm.IsInternational = false;
            vm.fares = {};

            vm.departureseats = "";
            vm.arrivalseats = "";

            vm.transitDepartureSeats = "";
            vm.transitArrivalSeats = "";
            
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

            vm.documentType = {
                availableOptions: [
                    { TravelDocumentId: '0', DocumentType: 'Select document type' },

                    { TravelDocumentId: '1' ,  DocumentType: 'ECOWAS Passport Number' },
                    { TravelDocumentId: '2' ,  DocumentType: 'Nigerian National Identity Card Number'},
                    { TravelDocumentId: '3',  DocumentType: 'International Passport Number'}

                ],

                selectedOption: { TravelDocumentId: '0', name: vm.user.Gender || 'ECOWAS Passport Number' },
            };
                

            vm.pickup = {};
            vm.pickup.departure = {};
            vm.pickup.arrival = {};


            vm.pickup.departure.options = [];
            vm.pickup.arrival.options = [];

            vm.pickup.departure.selectedOption = {
                PickupPointId: 0,
                PickupPointName: "Select Pickup location",
                Latitude: 0,
                Longitude: 0,
                PickUpPointAndTime: "Select Pickup location for departure",
                Image: null,
                RouteId: 0,
                RouteName: null,
                TerminalId: 0,
                TerminalName: null
            }

            vm.pickup.arrival.selectedOption = {
                PickupPointId: 0,
                PickupPointName: "Select Pickup location",
                Latitude: 0,
                Longitude: 0,
                PickUpPointAndTime: "Select Pickup location for arrival",
                Image: null,
                RouteId: 0,
                RouteName: null,
                TerminalId: 0,
                TerminalName: null
            }

            vm.arrival_picupSelected = {};
            vm.departure_picupSelected = {};


            vm.bookingModel = {};



            vm.isPickUp = false; //tracks user's departure pickup choice
            vm.isPickUpArrival = false; //tracks user's arrival pickup choice

            activate();


        }


        function isEmpty(obj) {
            var isempty = false;
            if (Object.keys(obj).length > 0)
            {
                isUser = true;
            }
            return isempty;
        };

        function pos_to_neg(num) {
        	return -Math.abs(num);
        }

        function activate() {
            $('#countrydropdown').hide();
            var result = $localstorage.getObject("countrydetails");
           // vm.currency = result.CurrencySymbol;
            var promises = [getData().then(function (d) {
                {
                    //console.log("data", d);

                    try {

                        var isUser =  isEmpty(d.user);
                        if (isUser) {

                            vm.user = d.user.Item1 ? d.user.Item2.Object : vm.user;
                        }
                    } catch (e) {
                        //console.log("user", d.user.Item1.Object);
                        console.log(e);
                    }

                    // vm.user.PhoneNumber = +d.user.Item1.Object.PhoneNumber || "";
                    //  vm.user.NextOfKinName = "";
                    //  vm.user.NextOfKinPhone = "";
                    vm.data = d;
                    vm.currency = d.departure.Currency;
                    vm.departureTrip = d.departure;
                    vm.arrivalTrip = d.arrival;
                    vm.transitDepartureTrip = d.transitDeparture;
                    vm.transitArrivalTrip = d.transitArrival;


                    var returntripfare = 0;
                    var returndiscfare = 0;
                    var returnmemdiscfare = 0;

                    //checking has transit to determine departure fare and fare per pax
                    if (vm.data.trips.HasTransit == true) {
                        var depatureFare = vm.departureTrip.FarePrice + vm.transitDepartureTrip.FarePrice;
                        var fareperpax = vm.departureTrip.AdultFare + vm.transitDepartureTrip.AdultFare;

                    } else {
                        var depatureFare = vm.departureTrip.FarePrice;
                        var fareperpax = vm.departureTrip.AdultFare;
                    }
                    

                    if (vm.departureTrip.HasPickup) {
                        vm.pickup.departure.options = vm.departureTrip.pickup;
                        //$("#pickupnew").hide();
                        $('#pickupnew').show();
                        console.log("has it oh, clicked");
                        vm.pickup.departure.options.unshift(vm.pickup.departure.selectedOption);
                    }


                    try {
                        if (vm.arrivalTrip.HasPickup) {
                            vm.pickup.arrival.options = vm.arrivalTrip.pickup;
                            vm.pickup.arrival.options.unshift(vm.pickup.arrival.selectedOption);
                        }

                    } catch (e) {
                        console.log(e);
                    }
                    if (vm.data.trips.HasTransit === true) {
                        if (vm.data.trips.TripType === 1) {
                            returntripfare = vm.arrivalTrip.AdultFare + vm.transitArrivalTrip.AdultFare;

                            if (vm.data.numOfChildren > 0) {
                                minorfare = vm.departureTrip.ChildFare + vm.transitDepartureTrip.ChildFare;
                                rtminorfare = vm.arrivalTrip.ChildFare + vm.transitArrivalTrip.ChildFare;
                            }

                            if (isUser && vm.user.Item1.Object.IsActive) {
                                returnmemdiscfare = vm.arrivalTrip.ReturnFare + vm.transitArrivalTrip.ReturnFare;
                                returndiscfare = returnmemdiscfare;
                                fareperpax = vm.departureTrip.MemberFare + vm.transitDepartureTrip.MemberFare;
                                vm.isLoggedIn = true;
                            }
                            else {
                                returndiscfare = vm.arrivalTrip.FarePrice + vm.transitArrivalTrip.FarePrice;
                            }
                        } else {

                            fareperpax = vm.departureTrip.FarePrice + vm.transitDepartureTrip.FarePrice;

                            if (vm.data.numOfChildren > 0) {
                                minorfare = vm.departureTrip.ChildFare + vm.transitDepartureTrip.ChildFare;
                            }
                            if (isUser && vm.user.Item1.Object.IsActive) {
                                vm.isLoggedIn = true;
                                fareperpax = vm.departureTrip.MemberFare + vm.transitDepartureTrip.MemberFare;
                                console.log("first fare 1" + returndiscfare + fareperpax + vm.departureTrip.MemberFare);
                                returndiscfare = pos_to_neg(fareperpax - vm.departureTrip.MemberFare);
                                console.log("returndiscfare" + returndiscfare);

                            }
                        }
                    } else {
                            
                        if (vm.data.trips.TripType === 1) {
                            returntripfare = vm.arrivalTrip.AdultFare;

                            if (vm.data.numOfChildren > 0) {
                                minorfare = vm.departureTrip.ChildFare;
                                rtminorfare = vm.arrivalTrip.ChildFare;
                            }

                            if (isUser && vm.user.Item1.Object.IsActive) {
                                returnmemdiscfare = vm.arrivalTrip.ReturnFare;
                                returndiscfare = returnmemdiscfare;
                                fareperpax = vm.departureTrip.MemberFare;
                                vm.isLoggedIn = true;
                                console.log("first fare 2" + returndiscfare + fareperpax + vm.departureTrip.MemberFare);
                                returndiscfare = pos_to_neg(fareperpax - vm.departureTrip.MemberFare);
                                console.log("returndiscfare" + returndiscfare);
                            }
                            else {
                            	console.log("first fare 3" + returndiscfare + fareperpax + vm.departureTrip.MemberFare);
                            	returndiscfare = vm.arrivalTrip.FarePrice;
                            	returndiscfare = pos_to_neg(fareperpax - vm.departureTrip.MemberFare);
                            	console.log("returndiscfare" + returndiscfare);
                            }
                        } else {

                        	console.log("first fare 4" + returndiscfare + fareperpax + vm.departureTrip.MemberFare);
                        	fareperpax = vm.departureTrip.FarePrice;
                        	returndiscfare = pos_to_neg(fareperpax - vm.departureTrip.MemberFare);
                        	console.log("returndiscfare" + returndiscfare);
                            if (vm.data.numOfChildren > 0) {
                                minorfare = vm.departureTrip.ChildFare;
                            }
                            if (isUser && vm.user.Item1.Object.IsActive) {
                                vm.isLoggedIn = true;
                                fareperpax = vm.departureTrip.MemberFare;
                                console.log("first fare 5" + returndiscfare + fareperpax + vm.departureTrip.MemberFare);
                                console.log("first fare" + fareperpax + vm.departureTrip.MemberFare);
                                returndiscfare = pos_to_neg(fareperpax - vm.departureTrip.MemberFare);
                        	console.log("returndiscfare" + returndiscfare);

                            }
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
                vm.fares.priceperadult = depatureFare + returntripfare;
                vm.fares.adultbeforediscount = (depatureFare * +d.numOfAdults) + (returntripfare * +d.numOfAdults);

                vm.fares.totalperpax = fareperpax + returndiscfare;
                vm.fares.adultpaxtotal = fareperpax * vm.data.numOfAdults + returndiscfare * vm.data.numOfAdults;
                vm.fares.childamount = (minorfare + rtminorfare) * vm.data.numOfChildren;
                vm.fares.totalchildiscount = (vm.fares.priceperadult * vm.data.numOfChildren) - vm.fares.childamount;
                vm.fares.totaladultfare = vm.fares.adultpaxtotal * vm.data.numOfAdults;
                vm.fares.totaladultbd = vm.fares.priceperadult * vm.data.numOfAdults;
               
                vm.fares.totalbeforediscount = vm.fares.priceperadult * vm.data.maxPax;
                vm.fares.totaltopay = vm.fares.totalbeforediscount + vm.fares.childamount;
                vm.fares.totaladultdiscount = vm.fares.totaladultbd - vm.fares.adultpaxtotal;
                vm.fares.totaldiscount = vm.fares.totalbeforediscount - vm.fares.totaltopay;


                if (vm.isLoggedIn) {
                    vm.fares.totaladultdiscount = mainDiscountFare;
                    vm.fares.totaldiscount = mainDiscountFare;
                    vm.fares.totaltopay = vm.fares.totaltopay - vm.fares.totaldiscount;

                    console.log("main one here" + vm.fares.totaladultdiscount);
                }

                else {
                    vm.fares.totaladultdiscount = 0;
                    vm.fares.totaldiscount = 0;
                    vm.fares.totaltopay = vm.fares.totaltopay - vm.fares.totaldiscount;
                    console.log("main one here" + vm.fares.totaladultdiscount);

                }
                //returnmemdiscfare = vm.arrivalTrip.ReturnFare + vm.transitArrivalTrip.ReturnFare;
                console.log("fareperpax =" + fareperpax + vm.departureTrip.MemberFare + vm.fares.priceperadult + returndiscfare );
                console.log("fares", vm.fares);
                console.log("total to pay", vm.fares.totaltopay);
                console.log("vm.fares.totaladultbd" + vm.fares.totaladultbd + "and" + vm.fares.adultpaxtotal);
                vm.trips = d.trips;
               // console.log(d);
               // console.log("working baby " + d.departure.RouteId);

                angular.forEach(vm.data.departureSeats, function (seat, i) {
                    vm.departureseats = vm.departureseats + seat;

                    console.log(i);

                    if (i < vm.data.departureSeats.length - 1) {
                        vm.departureseats += ","
                    }
                });

                angular.forEach(vm.data.transitDepartureSeats, function (seat, i) {
                    vm.transitDepartureSeats = vm.transitDepartureSeats + seat;

                    console.log(i);

                    if (i < vm.data.transitDepartureSeats.length - 1) {
                        vm.transitDepartureSeats += ","
                    }
                });



                angular.forEach(vm.data.arrivalSeats, function (seat, i) {
                    vm.arrivalseats += seat;
                    console.log(i);
                    if (i < vm.data.arrivalSeats.length - 1) {
                        vm.arrivalseats += ",";
                    }
                });

                angular.forEach(vm.data.transitArrivalSeats, function (seat, i) {
                    vm.transitArrivalSeats = vm.transitArrivalSeats + seat;

                    console.log(i);

                    if (i < vm.data.transitArrivalSeats.length - 1) {
                        vm.transitArrivalSeats += ","
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
                var isUser = isEmpty(user);

                if (user) {
                    vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;
                }
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

            vm.countrycode = $localstorage.getObject('countrycode');

            if (vm.countrycode === "GH") {

                $("#paystackpayment").show();
                $("#flutterwavepayment").hide();
                $('#unifiedpayment').hide(100);
                $('#unionbankpayment').hide();
                $('#payswitchpayment').hide();
            } else {

                $("#paystackpayment").show();
                $("#flutterwavepayment").show();
                $('#unifiedpayment').show(100);
                $('#unionbankpayment').show();
                $('#payswitchpayment').hide();
            }

           

            vm.user = $localstorage.getObject('user');

            data.user = vm.user;

            data.trips = $localstorage.getObject('bus-data');

            data.maxPax = +$localstorage.get('max-pax');
            data.numOfAdults = +$localstorage.get('adults');
            data.numOfChildren = +$localstorage.get('children');

            data.departure = $localstorage.getObject('selectedDepartureTrip').trip;
            data.arrival = $localstorage.getObject('selectedArrivalTrip').trip;

            var selectedTransitDepartureTrip = $localstorage.getObject('selectedTransitDepartureTrip')
            if (selectedTransitDepartureTrip != null) {
                data.transitDeparture = selectedTransitDepartureTrip.trip;
                data.transitDepartureSeats = selectedTransitDepartureTrip.seats;
            }

            var selectedTransitArrivalTrip = $localstorage.getObject('selectedTransitArrivalTrip')
            
            if (selectedTransitArrivalTrip != null) {
            data.transitArrival = selectedTransitArrivalTrip.trip;
            data.transitArrivalSeats = selectedTransitArrivalTrip.seats;
            }

            data.departureSeats = $localstorage.getObject('selectedDepartureTrip').seats;
            data.arrivalSeats = $localstorage.getObject('selectedArrivalTrip').seats;

            

            try {
                data.pickup = $localstorage.getObject('pickup');
                data.arrivalPickup = $localstorage.getObject('selectedArrivalTrip').pickup;

                console.log("arrival_pickup", data.arrival.pickup);
            } catch (ex) {
                data.pickup = {};
            }


         loadTraveldocument();
           

            //console.log(data.departure.seats);

            return $q.when(data);

        }
        function loadTraveldocument() {
            vm.loading = true;
            datacontext.getTravelDocuments().then(function (resp) {
                //console.log(resp);

                try {
                    //vm.travelDocuments = resp.Items;
                    vm.availableOptions = resp.Items;
                  //  console.log("vm:", vm.travelDocuments);
                  //  console.log("option", vm.docx.availableOptions);

                } catch (exception) {
                    swal("please try again later!");
                }


                console.log(vm.travelDocuments);
                vm.loading = false;
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }

        function validateRequest() {

            console.log(booker);
            var pickupLoc = $('#pickupLocation_').val();
            var pickupLocArrival = $('#pickupLocationArrival_').val();

            console.log(!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber);

            if (!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber) {
                swal("Please supply contact details", "", "error");
                return false;
            }

            if (vm.data.trips.IsInternational == true && !vm.documentType.selectedOption) {

                swal("Please select travel document type", "", "error");
                return false;
            }

            if (vm.data.trips.IsInternational == true && !vm.travelDocumentTypeNumber) {

                swal("Please supply travel document number", "", "error");
                return false;
            }

            return true;

        }


        function processGigmRequest(paymentType) {

            if ($scope.informationStatus !== true) {
                swal("Please fill in all reqired information to proceed", "", "error");
                $scope.submited = true;
                return;
            }

            if (vm.departureTrip.HasPickup && vm.departure_picupSelected) {

            }




            debugger
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
                            isError = true;
                            return false;
                        }
                        //if (vm.data.trips.IsInternational == true && !vm.travelDocumentTypeNumber) {

                        //    swal("Please supply travel document number", "", "error");
                        //    isError = true;
                        //    return false;
                        //}
                        if (vm.data.trips.IsInternational == true) {

                            benef.TravelDocumentId = value[3].value;
                            if (!benef.TravelDocumentId || benef.TravelDocumentId == "0") { //throw Error()
                                benef.PassengerType == 1 ? swal("Passenger(child)'s travel document Number required", "", 'error') : swal("Passenger(adult)'s travel document Number required", "", 'error');
                                isError = true;
                                return false;
                            }

                            benef.IdentificationNumber = value[4].value;
                            if ( !benef.IdentificationNumber || benef.IdentificationNumber.length < 0) { //throw Error()
                                benef.PassengerType == 1 ? swal("Passenger(child)'s travel document Number is required", "", 'error') : swal("Passenger(adult)'s travel document Number is required", "", 'error');
                                isError = true;
                                return false;
                            }

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
            debugger
            mainPassenger.PassengerType = 1;
            mainPassenger.FullName = vm.user.FirstName;
            mainPassenger.Gender = !$('#paxGender').val() ? 0 : $('#paxGender').val();
            mainPassenger.TravelDocumentId = !$('#paxTravelType').val() ? 0 : $('#paxTravelType').val();

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
            postSearchModel.IdentificationNumber = vm.travelDocumentTypeNumber;
            postSearchModel.TravelDocumentId = mainPassenger.TravelDocumentId;
            postSearchModel.Currency = vm.currency;

            console.log("Amounter" + postSearchModel.Amount);

            if (vm.departureTrip.HasPickup && vm.isPickUp) {
                postSearchModel.PickUpId = +$('#pickupLocation_').val();
                postSearchModel.PickupStatus = 1;



            }


            try {
                if (vm.data.trips.TripType == 1 && vm.arrivalTrip.HasPickup && vm.isPickUpArrival) {
                    postSearchModel.ReturnPickUpId = +$('#pickupLocationArrival_').val();
                    postSearchModel.ReturnPickupStatus = 1;

                }
            } catch (e) {
                console.log(e);
            }


            if (vm.data.trips.TripType == 1 && (!(vm.departureTrip.HasPickup && vm.isPickUp) && !(vm.arrivalTrip.HasPickup && vm.isPickUpArrival))) {
                postSearchModel.PickupStatus = 0;
                postSearchModel.ReturnPickupStatus = 0;
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
            console.log("ROuteID", postSearchModel.RouteId);

            console.log("psm", postSearchModel);

            $localstorage.setObject('psm', postSearchModel);

            if (paymentType === 12 || paymentType === 11 || paymentType === 10 || paymentType === 2) {
                console.log(".");
            }
            debugger;
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
                if (postSearchModel.PaymentMethod === 5) {
                    if (res) {
                        window.location.href = res;
                    } else {
                        swal("Error occured, please try again", "", "error");
                        $timeout(function () {
                            window.location.href = "/Pages/Booking";
                        }, 3000);

                    }
                } else if (postSearchModel.PaymentMethod === 8) {
                    processFlutterWave(res);

                } else if (postSearchModel.PaymentMethod === 21) {
                    processPaySwitch(res);
                } else //book on hold
                    if (postSearchModel.PaymentMethod === 7 || postSearchModel.PaymentMethod === 12 || postSearchModel.PaymentMethod === 8
                        || postSearchModel.PaymentMethod === 10 || postSearchModel.PaymentMethod === 14 || postSearchModel.PaymentMethod === 16) {
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

        	console.log($(document).height());
			console.log("it is here");

            var pickupLoc = $('#pickupLocation_').val();
            var pickupLocArrival = $('#pickupLocationArrival_').val();


            console.log(vm.departureTrip.HasPickup, pickupLoc, vm.booking.PickUp);
            //if (vm.departureTrip.HasPickup && vm.isPickUp && +pickupLoc == 0) {
            //    console.log(vm.pickup.selectedOption)
            //    swal("Pls select a pickup location", "", "error");
            //    return false;
            //}



            try {

                if (vm.arrivalTrip && vm.arrivalTrip.HasPickup && vm.isPickUpArrival && +pickupLocArrival == 0) {
                    swal("Please select a pickup location for arrival", "", "error");
                    return false;
                }
                //Uncessessay block of code

                /*else {
                    vm.picupSelected = vm.pickup.departure.options.selectWhere("PickupPointId", +pickupLoc)[0];

                    $localstorage.setObject("pickup", vm.picupSelected);
                    console.log(vm.picupSelected);

                }*/
            } catch (e) {
                console.log(e);
            }

            //if the departure trip has pickup and user didn't opt for pickup
            if (vm.departureTrip.HasPickup && vm.isPickUp == false) {
                swal({
                    title: "Want to be picked up?",
                    text: "Tap OK to opt for pickup, Cancel to proceed",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((wantPickup) => {
                        if (wantPickup) {
                            $('html, body').animate({
                                scrollTop: 450,
                            }, 1000);

                            //vm.isPickUp = true;
                            vm.booking.PickUp = 1;
                            $('#pickup1_').click();
                            //$('#infoDiv').hide();
                            //$('#myModal').modal('show');
                            $('#paymentDiv').show();
                            //$('#trippanel3').hide();
                            $("#pickupLocation_ option:first").addClass('red-text');
                            $('.caret').click();
                        } else {
                            processGigmRequest(paymentType);
                        }
                    });
            }
            //else

            ////if the arrival trip has pickup and user didn't opt for pickup
            //if (vm.arrivalTrip && vm.arrivalTrip.HasPickup && !vm.isPickUpArrival) {

            //    swal({
            //        title: "Want pick up for the return trip?",
            //        text: "Tap OK to opt for pickup, Cancel to proceed",
            //      //  icon: "warning",
            //        buttons: true,
            //        dangerMode: false,
            //    }).then((wantPickup) => {
            //            if (wantPickup) {
            //                $('html, body').animate({
            //                    scrollTop: 490,
            //                }, 1000);
            //                vm.isPickUpArrival = true;
            //                vm.booking.PickUpArrival = 1;
            //                $('#pickup2_').clik();
            //               // $('#form6').hide();
            //                $('#infoDiv').hide();
            //                $('#paymentDiv').show();
            //                $('#trippanel').hide();
            //                $('#pickupLocationArrival_').click();
            //            } else {
            //                processGigmRequest(paymentType);
            //            }
            //        });
            //}
            else
                processGigmRequest(paymentType);

            //  processGigmRequest(paymentType);
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
            debugger;
            console.log(res.Item2);
            debugger;

            var readyStateCheckInterval = setInterval(function () {
                if (document.readyState === "complete") {
                    clearInterval(readyStateCheckInterval);

                    getpaidSetup({
                        customer_email: vm.user.Email,
                        amount: amount.split(".")[0],
                        currency: vm.currency,
                        country: 'NG',
                        payment_method: 'card',
                        txref: res.Item1,
                        PBFPubKey: 'FLWPUBK-b56fcd0ebeac1413e2adc7872da6339d-X',
                        integrity_hash: res.Item2,
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
        processPaySwitch = function (res) {

            var transid = res.Item1;
            var amount = vm.bookingModel.Amount;
            var redirect_url = res.Item3;
            var customer_email = vm.user.Email;

            var paramter = {
                amount: amount,
                customer_email: customer_email,
                transid: transid
            };

            //debugger;
            //var url = "/Pages/PaySwitchPaymentView?" + paramter;
            //var url = "/Pages/PaySwitchPaymentView";

            //var config = {
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            //        //'Content-Type': 'application/json;charset=utf-8;'
            //    }
            //}

            //var paramter = $.param({
            //    amount: amount,
            //    customer_email: customer_email,
            //    transid: transid
            //});



            //$http.post(url, JSON.stringify(paramter)).then(function (response) {

            //    if (response.data)

            //        console.log("Post Data Submitted Successfully!");

            //}, function (response) {

            //});
            //$http.post
            //    ({
            //        method: 'POST',
            //        url: '/Pages/PaySwitchPaymentView',
            //        data: JSON.stringify(paramter),
            //        config: config
            //    }).then(function successCallback(response) {
            //        console.log(response)
            //    }, function errorCallback(response) {
            //        console.log(response)
            //    });


            //var post = function () {
            //    $http({
            //        method: 'POST',
            //        url: '/Pages/PaySwitchPaymentView',
            //        data: JSON.stringify(paramter),
            //        config: config
            //    }).then(function successCallback(response) {
            //        console.log(response)
            //    }, function errorCallback(response) {
            //        console.log(response)
            //    });

            //    return $http.post(url, paramter).then(function (response) {

            //        console.log("obj...", JSON.stringify(paramter.Object));

            //        return response.paramter.Object;
            //    }, function (err) {
            //        console.log(err);

            //    });
            //}
            //post();


            //$http.post(url, paramter, config)
            //    .then(function (paramter, status, headers, config) {
            //        $scope.PostDataResponse = paramter;
            //    });

            //    .error(function (data, status, header, config) {
            //    });

            //$http.post(url, paramter, config)
            //    .then(function (response) {
            //       console.log(response.data)
            //    });


            //$http.post(url, JSON.stringify(paramter)).then(function (response) {

            //    if (response.paramter)

            //        $scope.msg = "Post Data Submitted Successfully!";

            //}, function (response) {

            //    $scope.msg = "Service not Exists";

            //    $scope.statusval = response.status;

            //    $scope.statustext = response.statusText;

            //    $scope.headers = response.headers();

            //});


            // window.location.href = "/Pages/PaySwitchPaymentView?paramter=" + paramter;
            window.location.href = "/Pages/PaySwitchPaymentView?amount=" + amount + "&" + "transid=" + transid + "&" + "customer_email=" + customer_email;
        };
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
            vm.isPickUp = false;
        }

        vm.hidePickUpArrival = function () {
            vm.isPickUpArrival = false;
        }

        vm.showPickUp = function () {
            vm.isPickUp = true;
            $('#blk-1').toggle();

        }

        vm.showPickUpArrival = function () {
            vm.isPickUpArrival = true;
        }

        vm.showHideSummary = function () {
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
        $("#blk-1 .back").click(function () {
            $("#blk-1").css("display", "none");
            $("#picupLoc").css("display", "none");
            //vm.isPickUp = false;
        });
    }
})();


