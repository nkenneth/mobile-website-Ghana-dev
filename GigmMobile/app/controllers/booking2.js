(function() {
    'use strict';
    var controllerId = 'booking';
    angular.module('gigm').controller(controllerId,
        ['$route', '$localstorage', '$scope', 'common', 'datacontext', booking]);


    //location.reload();

    function booking($route, $localstorage, $scope, common, datacontext) {

        var vm = this;

        vm.departureTerminals = [];

        vm.arrivalTerminals = [];
        vm.dropDownParam = {};
        vm.booking = {};

        vm.loading = false;
        vm.booking.TripType = 0;
        vm.isLoggedIn = false;
        vm.countrycode = "";
        activate();

        function activate() {

            $('#countrydropdown').hide();

            vm.countrycode = $localstorage.getObject('countrycode');
            var promises = [loadDeparturesWithCountrycode(vm.countrycode)];
           // var promises = [loadDepartures()];
            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;
                // console.log(vm.isLoggedIn);
            } catch (e) {
                // console.log(e);
                vm.isLoggedIn = false;
            }
        }


        vm.title = 'Boking';
        console.log("countrycode:", vm.countrycode);

        var countrycode = vm.countrycode;

        if (countrycode == "GH") {

        	$(".custom-pickup-table").hide();

        }
        //load departure with countrycode 
        function loadDeparturesWithCountrycode(countrycode) {
            vm.loading = true;
            datacontext.getDepartureTerminalsByCountryCode(countrycode).then(function(resp) {
                //console.log(resp);

                try {
                    vm.departureTerminals = resp.Items;
                } catch (exception) {
                    swal("please try again later!");
                }



                // console.log(vm.departureTerminals[0]);
                vm.loading = false;
            }, function(err) {
                console.log(err);
                vm.loading = false;
            });
        }

        //load departure without countrycode 
        //function loadDepartures() {
        //    vm.loading = true;
        //    datacontext.getDepartureTerminals().then(function (resp) {
        //        //console.log(resp);

        //        try {
        //            vm.departureTerminals = resp.Items;
        //        }catch(exception){
        //            swal("pls try again later!");
        //        }


        //       // console.log(vm.departureTerminals[0]);
        //        vm.loading = false;
        //    }, function (err) {
        //        console.log(err);
        //        vm.loading = false;
        //    });
        //}

        function loadArrivals(terminalId) {
            vm.loading = true;
            datacontext.getDestinationTerminals(terminalId).then(function(resp) {
                // console.log("arrivals ",resp);
                vm.arrivalTerminals = resp;
                vm.loading = false;

            }, function(err) {
                console.log(err);
                vm.loading = false;
            });
        }

        vm.onDepartureSelected = function(item, model) {
            loadArrivals(model.TerminalId);
        }



        this.initMdb = function() {
            $(function() {
                $("#week2").prop("checked", true);
                $("#week2").attr('checked', 'checked');
                document.getElementById('hide').style.display = 'none';
                // document.getElementById('hide').style.display = 'block';
            })
        }


        vm.data = {
            availableOptions: [
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
                { id: '6', name: '6' },
                { id: '7', name: '7' },
                { id: '8', name: '8' },
                { id: '9', name: '9' },
                { id: '10', name: '10' },
                { id: '11', name: '11' },
                { id: '12', name: '12' },
                { id: '13', name: '13' }
            ],
            childOptions: [
                { id: '0', name: '0' },
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' }
            ],
            selectedOption: { id: '1', name: '1' }, //This sets the default value of the select in the ui

            selectedOption_: { id: '0', name: '0' }
        };

        vm.next = function() {
            console.log($('#mySelect').val());
            //console.log(vm.data.selectedOption);

            var result = {};

            //console.log($('#date-picker-example').val());
            try {
                result = {
                    DepartureDate: $('.date-departure').val(),
                    ReturnDate: $('.date-arrival').val(),
                    NumberOfAdults: $('#mySelect').val() == 0 ? 1 : $('#mySelect').val(),
                    NumberOfChildren: $('#mySelect1').val() || 0,
                    DepartureTerminalId: vm.terminal.selected.TerminalId,
                    DestinationTerminalId: vm.terminal.selected2.TerminalId,
                    TripType: +vm.booking.TripType
                }
                /* console.log((moment($('#date-departure').val()).isAfter(monent($('#date-arrival').val()))));
                  if (moment($('#date-departure').val()).isAfter(monent($('#date-arrival').val()))) {
  
                  }*/

                if ((+result.NumberOfAdults + +result.NumberOfChildren) > 13) {
                    swal("You cannot select more than 13 passengers in total", "", "error");

                    return;
                }

                if (!result.DepartureDate) {
                    swal("Please select departure date", "", "error");
                    return;
                }

                if (!result.ReturnDate && vm.TripType == 1) {
                    swal("Please select return date", "", "error");
                    return;
                }
            } catch (e) {
                console.log(e);
                swal("Error!", "Please select all fields!", "error");
                //swal({ text: "Please select all fields", title: "Error", icon:"error" });
                return true;
            }

            // debugger;
            if (result.TripType == 1) {
                if (!result.DepartureDate || !result.ReturnDate || !result.DepartureTerminalId || !result.DestinationTerminalId) {
                    swal("Please select all fields!", "", "error");
                    return;
                }

                if (common.isAfter(result.DepartureDate, result.ReturnDate) || result.DepartureDate == result.ReturnDate) {
                    swal("Departure date must be before the arrival date!", "", "error");
                    return;
                }
            } else {
                if (!result.DepartureDate || !result.DepartureTerminalId || !result.DestinationTerminalId) {
                    swal("Error!", "Please select all fields!", "error");
                    return;
                }
            }


            result.DepartureDate = moment(result.DepartureDate).format("MMMM DD, YYYY");

            if (result.ReturnDate) {
                result.ReturnDate = moment(result.ReturnDate).format("MMMM DD, YYYY");
            }


            vm.loading = true;

            // console.log("num", result.NumberOfChildren);
            datacontext.loadBusForDay(result).then(function(d) {

                vm.loading = false;
                console.log(+result.NumberOfAdults + +result.NumberOfChildren);

                $localstorage.set("max-pax", +result.NumberOfChildren + +result.NumberOfAdults);
                $localstorage.set("adults", +result.NumberOfAdults);
                $localstorage.set("children", +result.NumberOfChildren);

                //  console.log("res", d);
               // console.log("routid");
               // console.log("result", result);
               // console.log("res", d);
                $localstorage.setObject("bus-data", d);

                try {
                    if (d.Departures.length < 1) {
                        swal("Not Available!", "No bus available for the selected route, please chose another route or try again later", "info");
                    }
                } catch (e) {
                    swal("Not Available!", "No bus available for the selected route, please chose another route or try again later", "info");

                    return;
                }
                window.location.href = 'SelectBus';

            }, function(err) {
                console.log(err);
                vm.loading = false;
            });
        }
        this.initMdb();

        $scope.$watch('vm.data.selectedOption', function(newVal) {
            console.log(newVal.id);
        });


        vm.indexChanged = function() {

            var childOptions = [
                { id: '0', name: '0' },
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' }
            ];

            var selectedValue = $("#mySelect").val();

            console.log("changed...", childOptions.indexOf(getIndexInArray(childOptions, '2')));
            if (+selectedValue < 11 && vm.data.childOptions.length < 3) {
                vm.data.childOptions = childOptions;
            }

            if (+selectedValue == 11 && vm.data.childOptions.length < 3) {
                //   vm.data.childOptions.push({ id: "1", value: "1" });
                //   vm.data.childOptions.push({ id: "2", value: "2" });

                // vm.data.childOptions = childOptions;
            }

            if (+selectedValue == 12 && vm.data.childOptions.length < 3) {
                //vm.data.childOptions.push({ id: "2", value: "2" });
                // vm.data.childOptions.push({ id: "2", value: "2" });
                // vm.data.childOptions = childOptions;
            }


            if (+selectedValue == 13 && vm.data.childOptions.length < 3) {
                // vm.data.childOptions.push({ id: "1", value: "1" });
                // vm.data.childOptions.push({ id: "2", value: "2" });
                // vm.data.childOptions = childOptions;
            }


        }


        function getIndexInArray(list, id) {
            var index = list.where(x => x.id == id);
            console.log("index", index);

            var item = {};
            item.isFound = false;



            $.grep(list, function(e) {
                if (e.id == id) {
                    console.log(e);
                    item.obj = e;
                    item.isFound = true;
                    return e;
                }
            });
            console.log(item.isFound);

            console.log(item.obj);
            return item;
        }

        $("#mySelect").change(function(e) {
            var selectedValue = $("#mySelect").val();

            if (+selectedValue == 11) {


                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }

            } else if (+selectedValue == 12) {
                // vm.data.childOptions.splice(indexOf({id:"2", name: "2"}), 1);
                // vm.data.childOptions.splice(indexOf({id:"3", name: "3"}), 1);

                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }



            } else if (+selectedValue == 13) {

                if (getIndexInArray(vm.data.childOptions, '1').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '1')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }
            }




        });



    };


})();