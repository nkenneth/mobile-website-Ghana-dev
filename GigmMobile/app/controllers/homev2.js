
(function() {
    'use strict';
    var controllerId = 'home';
    angular.module('gigm').controller(controllerId,
        ['common', '$localstorage', 'datacontext', '$http', terminal]);

    function terminal(common, $localstorage, datacontext, $http) {


        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Home';
        vm.isLoggedIn = false;
        vm.refcode = "";
        vm.dropDownParam = {};
        vm.bookings = [];
        vm.dropDownValue = 0;
        vm.user = {};
        vm.isCountryByDropDownSet = false;
        vm.iSCountryDropDown = false;



        //i am setting default value to NG just for tetsing 

        vm.countrycode = {};
        vm.geoApi = {};


        vm.loading = false;

        vm.currentPage = 1;
        vm.pageSize = 5;

        activate();

        function activate() {

            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;
                vm.user = user.Item1.Object;
                vm.bookings = $localstorage.getObject("bookings");
            } catch (e) {
                //console.log(e);
                vm.isLoggedIn = false;
            }

            try {
                vm.bookingDetails = $localstorage.getObject('booking-details');
                console.log(vm.bookingDetails);
            } catch (e) {
                console.log(e);
            }


            vm.changeCountryToNigeria = function(value) {
                vm.dropDownValue = value;
                $localstorage.setObject("countrycode", "NG");
                vm.iSCountryDropDown = true;
                sessionStorage.setItem('iSCountryDropDown', vm.iSCountryDropDown);
               // $localstorage.setObject("iSCountryDropDown", vm.iSCountryDropDown);
                swal('You have switched to Nigeria');
                $('#orangeModalSubscription2').modal('hide');
                $('.ghana-round').hide();
                $('.nigeria-round').show();
            };

            vm.changeCountryToGhana = function(value) {
                vm.dropDownValue = value;
                $localstorage.setObject("countrycode", "GH");
                vm.iSCountryDropDown = true;
                sessionStorage.setItem('iSCountryDropDown', vm.iSCountryDropDown);
               // $localstorage.setObject("iSCountryDropDown", vm.iSCountryDropDown);
                swal('You have switched to Ghana');
                $('#orangeModalSubscription2').modal('hide');
                $('.ghana-round').show();
                $('.nigeria-round').hide();
            };

            var isdropdown = sessionStorage.getItem('iSCountryDropDown');
            if (isdropdown != null) {
                vm.isCountryByDropDownSet = isdropdown;
            }
            if (vm.iSCountryDropDown == false && vm.dropDownValue == 0 && vm.isCountryByDropDownSet == false) {
                try {
                    // trying to get the country code  on homepage load 
                    $http.get("https://geoip-db.com/json/").then(function(response) {
                        vm.geoApi = response.data.country_code;
                        vm.countrycode = vm.geoApi;
                        $localstorage.setObject("countrycode", vm.countrycode);
                        $localstorage.removeItem("iSCountryDropDown");
                    });
                } catch (e) {

                    console.log(e);
                }
            } 


            try {
                
            	var countrycode = $localstorage.getObject('countrycode');
          
                datacontext.getCountryDetails(countrycode).then(function(d) {
                    // console.log(d);
                    vm.countryDeatils = d.Object;
                    $localstorage.setObject("countrydetails", d.Object);
                    //console.log("countryDeatils", d);
                }, function(err) {
                    console.log(err);
                });


            } catch (e) {

                console.log(e);
            }
        }



        vm.checkStatus = function() {
            vm.loading = true;
            $localstorage.setObject("booking-details", {});

            datacontext.getBookingStatus(vm.refcode).then(function(d) {
                if (d.Object) {
                    vm.loading = false;
                    window.location.href = "/Pages/BookingStatus";
                    $localstorage.setObject("booking-details", d.Object);

                } else {
                    vm.loading = false;
                    swal(d.ShortDescription, "", "error");
                }
                // console.log(d);
            }, function(err) {
                console.log(err);
                    swal("Error occured, Please try again", "", "error");
                vm.loading = false;
            });
        };




        vm.logout = function() {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        };

        vm.showAuth = function() {

        };

        vm.getHistory = function() {
            vm.loading = true;
            // console.log(vm.user.PhoneNumber, vm.user);
            datacontext.getHistory(vm.user.PhoneNumber).then(function(d) {
                vm.loading = true;
                console.log(d.Object);
                $localstorage.setObject("bookings", d.Object);
                window.location.href = "/Pages/Account";
            }, function(err) {
                vm.loading = true;
                console.log(err);
            });
        }


        vm.convertDate = function(date) {

            let options = {
                //  weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                // hour: '2-digit',
                //  minute: '2-digit'
            };

            //console.log(date, new Date(date).toLocaleString('en-us', options));

            try {
                return new Date(date).toLocaleString('en-us', options) || date;
            } catch (e) {

                console.log(e);
            }
        };

        vm.isAfter = function(start, end) {
            console.log(moment(new Date(start)).isAfter(new Date(end)));
            return moment(new Date(start)).isAfter(new Date(end));
        };

    };


})();