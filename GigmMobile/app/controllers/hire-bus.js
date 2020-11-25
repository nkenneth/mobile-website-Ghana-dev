(function () {

    'use strict';
    var controllerId = 'hire_bus';
    angular.module('gigm').controller(controllerId, ['common','datacontext','$localstorage', hire_bus])


    function hire_bus(common, datacontext, $localstorage) {

        var vm = this;

        vm.tripType = "1";

        vm.retain = "";
        vm.loading = false;
        vm.distance = "";
        vm.bussesForHire = {}; 

        vm.bussesForHireList = [];
        vm.currency = "";
        activate();

        function activate() {

            try {
                vm.bussesForHire = $localstorage.getObject('hireBusses');
                vm.distance = $localstorage.getObject('distance').distanceInKiloMeter;

                console.log(vm.bussesForHire);

            } catch (e) {
                console.log(e);
            }
        }

        vm.continue = function () {

            var result = {
                DestinationPoint: $('#HireDestinationPoint').val()  || "",
                DeparturePoint: $('#HireDeparturePoint').val() || "",
                DepartureDate: $('#hireDepart').val() || "",
                ReturnDate: $('#hireReturn').val() || "",
                TripType: vm.tripType,
                RetainOvernight: vm.retain === "yes" ? true : false
            }



           

            if (result.DepartureDate !== "" && result.DepartureDate !== undefined) {
                result.DepartureDate = moment(result.DepartureDate).format("MMMM DD, YYYY");
            }

            if (result.ReturnDate !== "" && result.ReturnDate !== undefined) {
                result.ReturnDate = moment(result.ReturnDate).format("YYYY-MM-DD");
            }

           

            var isAfter = common.isAfter(result.DepartureDate, result.ReturnDate);


            console.log("what?", isAfter);

            if (result.TripType === "1") {
                result.ReturnDate = "";
            } else {
                if (!result.ReturnDate) {
                    swal("Departure date must be selected for a round trip!", "", "error");
                    return;
                }
                if (isAfter) {
                    swal("Departure date must be before or equal to the arrival date!", "", "error");
                    return;
                }
            }

            vm.loading = true;

            $localstorage.setObject("hbr", result);

            datacontext.processGoogleMap(result).then(function (d) {
                vm.loading = false;
                if (d.data.Item3 && d.data.Item3.Object.Departures.length < 1) {
                    swal("No bus available for that at the moment, Please try again", "", "info");
                }
                else {
                    console.log("hiredata", d.data);
                    $localstorage.setObject("hireBusses", d.data.Item3.Object);
                    $localstorage.setObject("distance", d.data.Item1);
                    window.location.href = d.data.Item2;
                }
            }, function (err) {
                console.log(err);
                    swal("Error occured, Please try again", "", "error");
                vm.loading = false;
            });

            console.log(result);
        }

        vm.hireBus = function () {

            if (vm.bussesForHireList.length > 0) {
                $localstorage.setObject("selectedBusses", vm.bussesForHireList);
                window.location.href = "/pages/HirePassenger";
            } else {
                swal('A bus at least must be selected to proceed', '', 'info');
            }
        }



        vm.update = function (bus, index) {
            var result = {
                Id: bus.VehicleModelId,
                Quantity: $('#quantity' + (+index + 1)).val(),
                Price: bus.FarePrice,
                BusName: bus.VehicleModelName,
                SleepOverPrice: bus.SleepOverPrice
            }

            var isFound = false;

            if (result.Quantity > 0) {
                vm.bussesForHireList.find(function (obj) {
                    if (obj.Id === result.Id) {
                        console.log(obj);
                        isFound = true;
                        return;
                    }
                });


                if (!isFound) {
                    vm.bussesForHireList.add(result);
                }

              
                console.log(vm.bussesForHireList);
            }


        }


        
        $(function () {
            $('#hireArrive').hide();
        });
    }

})();