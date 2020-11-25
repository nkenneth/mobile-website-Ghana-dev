
(function () {
    'use strict';
    var controllerId = 'home';
    angular.module('gigm').controller(controllerId,
        ['common', '$localstorage','datacontext', terminal]);

    function terminal(common, $localstorage,datacontext) {

        
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Home';

        vm.isLoggedIn = false;

        vm.refcode = "";

        vm.bookings = [];

        vm.user = {};

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
                console.log(e);
                vm.isLoggedIn = false;
            }

            try {
                vm.bookingDetails = $localstorage.getObject('booking-details');
                console.log(vm.bookingDetails);
            } catch (e) {
                console.log(e);
            }
           
            
        }

        vm.checkStatus = function () {
            vm.loading = true;
            $localstorage.setObject("booking-details", {});

            datacontext.getBookingStatus(vm.refcode).then(function (d) {
                if (d.Object) {
                    vm.loading = false;
                    window.location.href = "/Pages/BookingStatus";
                    $localstorage.setObject("booking-details", d.Object)

                } else {
                    vm.loading = false;
                    swal(d.ShortDescription, "", "error");
                }
               // console.log(d);
            }, function (err) {
                console.log(err);
                swal("Error occured, pls try again", "", "error");
                vm.loading = false;
            });
        }

        vm.logout = function () {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        }

        vm.showAuth = function () {

        }

        vm.getHistory = function () {
            vm.loading = true;
           // console.log(vm.user.PhoneNumber, vm.user);
            datacontext.getHistory(vm.user.PhoneNumber).then(function (d) {
                vm.loading = true;
                console.log(d.Object);
                $localstorage.setObject("bookings", d.Object);
                window.location.href = "/Pages/Account";
            }, function (err) {
                vm.loading = true;
                console.log(err);
            });
        }


        vm.convertDate = function (date) {

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

            }

           
        }

        vm.isAfter = function (start, end) {
            console.log(moment(new Date(start)).isAfter(new Date(end)));
            return moment(new Date(start)).isAfter(new Date(end));
        }

    };


})();