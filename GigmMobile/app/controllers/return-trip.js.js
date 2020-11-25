
(function () {
    'use strict';
    var controllerId = 'transit_bus';
    angular.module('gigm').controller(controllerId,
        ['$localstorage', 'datacontext', 'common', transit_bus]);

    function transit_bus($localstorage, datacontext, common) {


        console.log("here");
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Transit Bus';

        vm.tripDetails = {};

        vm.maxPax = undefined;

        vm.showReturn = false;

        vm.isArrival = false;

        vm.user = {};

        var isUserLoggedIn = false;

        vm.memberDiscount = 0;
        activate();

        function activate() {

            // console.log($localstorage.getObject("bus-data"));
            vm.maxPax = $localstorage.get("max-pax");
            try {
                vm.tripDetails = $localstorage.getObject("bus-data");
            } catch (e) {
                vm.tripDetails = {};
            }



            $(function () {
                $('.panel').hide();
                $('#arrival').hide();
            });

            $localstorage.setObject('selectedTransitDepartureTrip', {});
            $localstorage.setObject('selectedTransitArrivalTrip', {});


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


            //let maxPassenger = $localstorage.get("max-pax");
            $("#rent_advert").hide();
            if (vm.maxPax >= 2) {
                $("#rent_advert").show();
            }
            else {
                $("#rent_advert").hide();
            }
        }


        $('#flip').click(function () {
            console.log("flipped!!");
            this.toggle();
        });

        vm.viewSeats = function (id, trip) {

            // console.log(trip);

            var num = trip == 0 ? id + 1 : id + 11;

            var panelId = "#panel" + num;
            console.log(panelId);
            //console.log("flipping", "panel" + num);
            $(panelId).toggle();
        }

        vm.continue = function (id, trip, type) {

            let busdata = $localstorage.getObject('bus-data');
            console.log(busdata);
            console.log(busdata.HasTransit);

                //console.log(id, trip);

                var selectedSeats = [];

                selectedSeats = $('#selected_seats' + id).val();


                if (selectedSeats == undefined || selectedSeats.length < 1) {
                    var alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                    swal(alert, "", "error");
                    return;
                }



                selectedSeats = stringToArray(selectedSeats);

                //console.log(selectedSeats);

                //console.log($('#selected_seats' + id).val());

                // console.log(selectedSeats.length, vm.maxPax);


                if (selectedSeats.length != +vm.maxPax) {
                    var alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                    swal(alert, "", "warning");

                    //console.log(swal);
                } else {
                    //if trip has return
                    if (vm.tripDetails.TripType == 1 && selectedSeats.length == +vm.maxPax) {
                        console.log(".............");
                        if (type == 0) {
                            console.log("departure");
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedTransitDepartureTrip', _data);
                            vm.showReturn = true;
                            $(".departure-trip").hide();
                            $(".arrival-trip").show();
                            $('#departure').hide(100);
                            $('#arrival').show();
                            // debugger;
                            vm.isArrival = true;
                            if (_data.trip.HasPickup) {

                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                        // console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedTransitDepartureTrip", _data)

                                        // console.log("pickup", d);
                                        //sUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    }, function (err) {
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
                            $localstorage.setObject('selectedTransitArrivalTrip', _data);

                            if (_data.trip.HasPickup) {
                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                        console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedTransitArrivalTrip", _data)

                                        console.log("pickup", d);
                                        isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    }, function (err) {
                                        console.log(err);
                                        isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    });
                                    // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                } catch (ex) {
                                    console.log(ex);
                                }
                            } else {
                                isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                            }

                            //  window.location.href = 'Passenger';

                        }
                    } else {
                        if (vm.tripDetails.TripType == 0) {
                            // console.log("departure");
                            var _data = {};
                            _data.trip = trip;
                            _data.seats = [] = selectedSeats;
                            $localstorage.setObject('selectedTransitDepartureTrip', _data);

                            if (_data.trip.HasPickup) {

                                $localstorage.setObject("arrivalPickup", _data.pickup);
                                try {
                                    datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                        // console.log(d);
                                        vm.picupRoutes = d;
                                        _data.trip.pickup = d;

                                        $localstorage.setObject("selectedTransitDepartureTrip", _data);

                                        vm.showReturn = true;
                                        isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');

                                        console.log("pickup", d);
                                    }, function (err) {
                                        console.log(err);
                                        vm.showReturn = true;
                                        isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    });

                                    // vm.showReturn = true;
                                    //isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                } catch (ex) {
                                    console.log(ex);
                                }
                            } else {
                                isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                            }

                        }

                    }

                    vm.memberDiscount = getMemberDiscount();


                }

        }

        function stringToArray(stringArray) {
            console.log(stringArray.replace(/['"]+/g, ''));
            return stringArray.replace('[', '').replace(']', '').replace(/['"]+/g, '').split(',');
        }
                vm.logout = function () {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        }


        vm.hasMoreLegRoom = function (busname) {

            if (busname.toLowerCase() == 'sprinter' || busname.toLowerCase() == 'prime')
                return true;
            else
                return false;
        }

        function getMemberDiscount() {
            try {
                var departure = $localstorage.getObject('selectedTransitDepartureTrip').trip;
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

            } catch (ex) {
                console.log(ex);
            }
        }
    }
})();