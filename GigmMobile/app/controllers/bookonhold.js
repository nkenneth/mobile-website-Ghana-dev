(function () {
    'use strict'

    var controllerId = "bookonhold";

    angular.module('gigm').controller(controller, ['$localstorage', bookonhold]);

    function bookonhold() {

        var vm = this;

        vm.booking = {};

        activate();

        function activate() {
            try {
                vm.booking = $localStorage.getObject('psm');
                console.log(vm.booking);

                console.log(vm.booking.PaymentType);
            } catch (e) {
                console.log(e);
            }
        }
    }





})();