
(function() {
    'use strict';
    var controllerId = 'select_bus';
    angular.module('gigm').controller(controllerId,
        ['$localstorage', 'datacontext', 'common', select_bus]);

    function select_bus($localstorage, datacontext, common) {


        console.log("here");
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Select Bus';

        vm.tripDetails = {};

        vm.maxPax = undefined;

        vm.showReturn = false;

        vm.isArrival = false;

        vm.user = {};
        vm.currency = "";

        var isUserLoggedIn = false;

        vm.memberDiscount = 0;

        function isEmpty(obj) {
            var isempty = false;
            if (Object.keys(obj).length > 0) {
                isUser = true;
            }
            return isempty;
        };
        activate();

        function activate() {
            $('#countrydropdown').hide();
            // console.log($localstorage.getObject("bus-data"));
            var result = $localstorage.getObject("countrydetails");
           // vm.currency = result.CurrencySymbol;
            
            vm.maxPax = $localstorage.get("max-pax");
            try {
                vm.tripDetails = $localstorage.getObject("bus-data");
                vm.currency = vm.tripDetails.Departures[0].Currency;
               
            } catch (e) {
                vm.tripDetails = {};
            }


            $(function() {
                $('.panel').hide();
                $('#arrival').hide();
                $('.transit-departure-trip').hide();
                $('#transit-departure').hide();
                $('#transit-arrival').hide();
                $('.transit-arrival-trip').hide();

            });

            $localstorage.setObject('selectedDepartureTrip', {});
            $localstorage.setObject('selectedArrivalTrip', {});


            try {
                var user = $localstorage.getObject('user');

                vm.isLoggedIn = isUserLoggedIn = user.Item1.Object.IsActive ? true : false;
                //console.log(vm.isLoggedIn);
            } catch (e) {
                console.log(e);
                vm.isLoggedIn = false;
                vm.user = {};
            }

            console.log("max-pax", vm.maxPax);
        }


        $('#flip').click(function() {
            console.log("flipped!!");
            this.toggle();
        });

        vm.viewSeats = function(id, trip, transit) {

            // console.log(trip);

            if (transit == 0) {
                var num = trip == 0 ? id + 1 : id + 11;

            } else {
                var num = trip == 0 ? id + 12 : id + 20;

            }
            var panelId = "#panel" + num;
            console.log(panelId);
            //console.log("flipping", "panel" + num);
            $(panelId).toggle();
        }

        vm.continue = function(id, trip, type) {
            //console.log(id, trip);
            console.log(vm.tripDetails.HasTransit);

            var selectedSeats = [];

            selectedSeats = $('#selected_seats' + id).val();

            if (selectedSeats == undefined || selectedSeats.length < 1) {
                var alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                swal(alert, "", "error");
                return;
            }

            selectedSeats = stringToArray(selectedSeats);

            console.log("entering" + selectedSeats);

            //console.log($('#selected_seats' + id).val());

            // console.log(selectedSeats.length, vm.maxPax);


            if (selectedSeats.length != +vm.maxPax) {
                var alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                swal(alert, "", "warning");

                //console.log(swal);
            } else {
                if (vm.tripDetails.HasTransit == true) {

                    //if trip has transit
                    if (vm.tripDetails.HasTransit == true && selectedSeats.length == +vm.maxPax) {
                        console.log("entering transit departure page");
                        //going into the transit departure page and saving selected transit trip
                        if (type == 0) {
                            console.log("departure trip saved");
                            console.log("entering transit dept" + selectedSeats);
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedDepartureTrip', _data);
                            //vm.showReturn = true;
                            $(".departure-trip").hide();
                            $(".transit-departure-trip").show();
                            $('#departure').hide(100);
                            $('#transit-departure').show();
                            // debugger;
                            //vm.isArrival = true;
                            vm.isTransitDeparture = true;
                            selectedSeats = [];
                        }
                        else if (vm.tripDetails.TripType == 1 && type == 2) {
                            console.log("arrival entered");
                            //leaving transit departure and entering  arrival 
                            console.log("transit-departure saved");
                            console.log("entering arrival" + selectedSeats);
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedTransitDepartureTrip', _data);
                            //vm.showReturn = true;
                            $(".arrival-trip").show();
                            $(".transit-departure-trip").hide();
                            $('#arrival').show();
                            $('#transit-departure').hide();
                            // debugger;
                            vm.isArrival = true;
                            selectedSeats = [];

                        } else if (vm.tripDetails.TripType == 1 && type == 1) {
                            console.log("transit arrival entered");

                            //entering transit arrival 
                            console.log("arrival saved");
                            console.log("entering transit arrival" + selectedSeats);
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedArrivalTrip', _data);
                            //vm.showReturn = true;
                            $(".transit-arrival-trip").show();
                            $(".arrival-trip").hide();
                            $('#transit-arrival').show();
                            $('#arrival').hide();
                            // debugger;
                            vm.isArrival = true;
                            selectedSeats = [];

                        } else if (vm.tripDetails.TripType == 1 && type == 3) {

                            console.log("transit arrival saved");
                            //entering transit arrival 
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedTransitArrivalTrip', _data);
                            //vm.showReturn = true;
                            console.log("saving transit arrival")
                            if (_data.trip.HasPickup) {
                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function(d) {
                                        console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedArrivalTrip", _data)

                                        console.log("pickup", d);
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                    }, function(err) {
                                        console.log(err);
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                    });
                                    // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                } catch (ex) {
                                    console.log(ex);
                                }
                            } else {
                                isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                            }

                            window.location.href = "Passenger2"

                        }
                        else {
                            //has transit but has no return
                            if (vm.tripDetails.HasTransit == true && vm.tripDetails.TripType == 0) {
                                // console.log("departure");
                                var _data = {};
                                _data.trip = trip;
                                _data.seats = [] = selectedSeats;
                                $localstorage.setObject('selectedTransitDepartureTrip', _data);

                                if (_data.trip.HasPickup) {

                                    $localstorage.setObject("arrivalPickup", _data.pickup);
                                    try {
                                        datacontext.getPickupRoutes(_data.trip.TripId).then(function(d) {
                                            // console.log(d);
                                            vm.picupRoutes = d;
                                            _data.trip.pickup = d;

                                            $localstorage.setObject("selectedDepartureTrip", _data);

                                            vm.showReturn = true;
                                            isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');

                                            console.log("pickup", d);
                                        }, function(err) {
                                            console.log(err);
                                            vm.showReturn = true;
                                            isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                        });

                                        // vm.showReturn = true;
                                        //isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    } catch (ex) {
                                        console.log(ex);
                                    }
                                } else {
                                    isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                }

                            }

                        }
                    }

                } else {
                    //if trip has return and has no transit

                    if (vm.tripDetails.HasTransit == false && vm.tripDetails.TripType == 1 && selectedSeats.length == +vm.maxPax) {
                        console.log(".............");
                        if (type == 0) {
                            console.log("departure");
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedDepartureTrip', _data);
                            vm.showReturn = true;
                            $(".departure-trip").hide();
                            $(".arrival-trip").show();
                            $('#departure').hide(100);
                            $('#arrival').show();
                            // debugger;
                            vm.isArrival = true;
                            if (_data.trip.HasPickup) {

                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function(d) {
                                        // console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedDepartureTrip", _data)

                                        // console.log("pickup", d);
                                        //sUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    }, function(err) {
                                        // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                        console.log(err);
                                    });
                                } catch (ex) {
                                    console.log(ex);
                                }

                            } else {
                                // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                            }

                        }
                        else {
                            // console.log("arrival");

                            /// main - selected - departure 
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedArrivalTrip', _data);

                            if (_data.trip.HasPickup) {
                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function(d) {
                                        console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedArrivalTrip", _data)

                                        console.log("pickup", d);
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                    }, function(err) {
                                        console.log(err);
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                    });
                                    // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                } catch (ex) {
                                    console.log(ex);
                                }
                            } else {
                                isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                            }

                            //  window.location.href = 'Passenger';

                        }
                    } else {
                        if (vm.tripDetails.TripType == 0) {
                            // console.log("departure");
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedDepartureTrip', _data);

                            if (_data.trip.HasPickup) {

                                $localstorage.setObject("arrivalPickup", _data.pickup);
                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function(d) {
                                        // console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedDepartureTrip", _data);

                                        vm.showReturn = true;
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');

                                        console.log("pickup", d);
                                    }, function(err) {
                                        console.log(err);
                                        vm.showReturn = true;
                                        isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                                    });

                                    // vm.showReturn = true;
                                    //isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                } catch (ex) {
                                    console.log(ex);
                                }
                            } else {
                                isUserLoggedIn ? window.location.href = "Passenger2" : $('#showModal').trigger('click');
                            }

                        }

                    }
                } //don't touch






                vm.memberDiscount = getMemberDiscount();


            }


        }

        function stringToArray(stringArray) {
            console.log(stringArray.replace(/['"]+/g, ''));
            return stringArray.replace('[', '').replace(']', '').replace(/['"]+/g, '').split(',');
        }

        vm.logout = function() {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        }


        vm.hasMoreLegRoom = function(busname) {

            if (busname.toLowerCase() == 'sprinter' || busname.toLowerCase() == 'prime')
                return true;
            else
                return false;
        }

        function getMemberDiscount() {
            try {
                var departure = $localstorage.getObject('selectedDepartureTrip').trip;
                var maxPax = +$localstorage.get('max-pax');

                var memberDiscount = (departure.FarePrice - departure.MemberFare);


                console.log("discount", memberDiscount);

                console.log(departure.HasReturn);

                if (vm.tripDetails.TripType == 1) {
                    memberDiscount = memberDiscount * 2;
                    console.log("discount return", memberDiscount);
                }
                console.log("discount", memberDiscount);

                $("#discount").text(memberDiscount);
                return memberDiscount;
                localStorage.setItem("discount", memberDiscount);
            } catch (ex) {
                console.log(ex);
            }
        }
    }
})();
